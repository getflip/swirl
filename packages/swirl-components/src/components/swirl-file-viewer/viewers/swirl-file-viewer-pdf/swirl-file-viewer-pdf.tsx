import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import * as pdf from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  getDocument,
  PDFDocumentProxy,
  PDFPageProxy,
  TextLayer,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  debounce,
  getVisibleHeight,
  isMobileViewport,
} from "../../../../utils";

declare global {
  interface Window {
    pdf: any;
  }
}

window.pdf = pdf;

export type SwirlFileViewerPdfZoom = number | "auto";

export type SwirlFileViewerPdfViewMode = "single" | "side-by-side";

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-pdf.css",
  tag: "swirl-file-viewer-pdf",
})
export class SwirlFileViewerPdf {
  @Element() el: HTMLElement;

  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;
  @Prop() singlePageMode: boolean;
  @Prop() viewMode?: SwirlFileViewerPdfViewMode = "single";
  @Prop() workerSrc?: string = "/pdfjs/pdf.worker.min.mjs";
  @Prop() zoom?: SwirlFileViewerPdfZoom = 1;

  @State() currentPage: number = null;
  @State() doc: PDFDocumentProxy;
  @State() error: boolean;
  @State() loading: boolean = true;
  @State() renderedPages: number[] = [];
  @State() singlePageModePage: number = 1;
  @State() visiblePages: number[] = [];

  @Event() activate: EventEmitter<HTMLElement>;
  @Event() visiblePagesChange: EventEmitter<number[]>;

  private pages: PDFPageProxy[] = [];
  private renderingPageNumbers: number[] = [];
  private scrollContainer: HTMLDivElement;
  private recentScrollPosition: { x: number; y: number } = { x: 0, y: 0 };

  componentWillLoad() {
    window.pdf.GlobalWorkerOptions.workerSrc = this.workerSrc;
  }

  async componentDidLoad() {
    await this.getPages();
    await this.updateVisiblePages();

    this.activate.emit(this.el);
  }

  componentDidRender() {
    this.updateVisiblePages();
  }

  disconnectedCallback() {
    this.doc?.destroy();
  }

  @Listen("resize", { target: "window" })
  async onWindowResize() {
    this.visiblePages = [];
    this.renderedPages = [];
    await this.updateVisiblePages();
  }

  @Watch("file")
  async watchProps() {
    await this.getPages();
    await this.updateVisiblePages();
  }

  @Watch("viewMode")
  async watchViewMode() {
    queueMicrotask(async () => {
      this.visiblePages = [];
      this.renderedPages = [];
      await this.updateVisiblePages();
    });
  }

  @Watch("zoom")
  watchZoom() {
    queueMicrotask(async () => {
      this.restoreScrollPosition();

      this.visiblePages = [];
      this.renderedPages = [];
      await this.updateVisiblePages();
    });
  }

  /**
   * Get thumbnails of all pages.
   */
  @Method()
  async getThumbnails() {
    return await Promise.all(
      this.pages.filter(Boolean).map((page) => {
        const vp = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");

        canvas.width = vp.width;
        canvas.height = vp.height;

        const scale = Math.min(
          canvas.width / vp.width,
          canvas.height / vp.height
        );

        return page
          .render({
            canvasContext: canvas.getContext("2d"),
            viewport: page.getViewport({ scale: scale }),
          })
          .promise.then(function () {
            return canvas;
          });
      })
    );
  }

  /**
   * Print the file.
   */
  @Method()
  async print() {
    this.loading = true;

    await this.updateVisiblePages(true);
    await this.openPrintDialog();

    this.loading = false;
  }

  /**
   * Navigate to next page, if single page mode is enabled.
   */
  @Method()
  async nextPage() {
    await this.setPage(this.singlePageModePage + 1);
    await this.updateVisiblePages();
  }

  /**
   * Navigate to previous page, if single page mode is enabled.
   */
  @Method()
  async previousPage() {
    await this.setPage(this.singlePageModePage - 1);
    await this.updateVisiblePages();
  }

  /**
   * Navigate to specific page, if single page mode is enabled.
   */
  @Method()
  async setPage(page: number) {
    this.singlePageModePage = Math.min(
      Math.max(page, 1),
      this.pages.length - 1
    );

    await this.updateVisiblePages();
  }

  private async getPages() {
    this.error = false;
    this.loading = true;

    try {
      if (Boolean(this.doc)) {
        this.doc.destroy();
      }

      // Don't remove the isEvalSupported property. https://github.com/advisories/GHSA-wgrm-67xf-hhpq
      this.doc = await getDocument({ isEvalSupported: false, url: this.file })
        .promise;

      const pages = [];

      for (let i = 1; i <= this.doc.numPages; i++) {
        pages.push(this.doc.getPage(i));
      }

      this.pages = await Promise.all(pages);
      this.loading = false;
    } catch (e) {
      this.error = true;
      this.loading = false;
    }
  }

  private async renderVisiblePages(forPrint?: boolean) {
    const canvases = Array.from(this.el.shadowRoot.querySelectorAll("canvas"));
    const renderedPages = [];

    for (const canvas of canvases) {
      const container = canvas.closest<HTMLDivElement>(
        ".file-viewer-pdf__page"
      );

      const page = this.pages.find(
        (page) => page?.pageNumber === +container?.dataset.pageNumber
      );

      if (
        !Boolean(page) ||
        this.renderingPageNumbers.includes(page.pageNumber)
      ) {
        continue;
      }

      if (!this.visiblePages.includes(page.pageNumber) && !forPrint) {
        this.destroyPage(page);
        continue;
      }

      if (this.renderedPages.includes(page.pageNumber) && !forPrint) {
        renderedPages.push(page.pageNumber);
        continue;
      }

      await this.renderPage(page, canvas, forPrint);

      renderedPages.push(page.pageNumber);
    }

    this.renderedPages = renderedPages;
  }

  private async renderPage(
    page: PDFPageProxy,
    canvas: HTMLCanvasElement,
    forPrint?: boolean
  ) {
    const container = canvas.closest<HTMLDivElement>(".file-viewer-pdf__page");

    const textContainer = container?.querySelector<HTMLDivElement>(
      ".file-viewer-pdf__text-container"
    );

    this.renderingPageNumbers = [...this.renderingPageNumbers, page.pageNumber];

    const scale = forPrint ? 2 : this.getScale(page);
    const outputScale = window.devicePixelRatio || 1;

    const transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    const viewport = page.getViewport({ scale });
    const context = canvas.getContext("2d");

    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.width = Math.floor(viewport.width * outputScale);

    const renderContext = {
      canvasContext: context,
      transform,
      viewport: viewport,
    };

    try {
      await page.render(renderContext).promise;

      page.cleanup();

      textContainer.innerHTML = "";

      this.renderTextLayer(page, textContainer).catch();

      this.renderingPageNumbers = this.renderingPageNumbers.filter(
        (pageNumber) => pageNumber !== page.pageNumber
      );
    } catch (e) {}
  }

  private destroyPage(page: PDFPageProxy) {
    const container = this.el.shadowRoot.querySelector(
      `[data-page-number="${page.pageNumber}"]`
    );

    const canvas = container.querySelector("canvas");
    const textLayer = container.querySelector(
      ".file-viewer-pdf__text-container"
    );

    canvas.width = 1;
    canvas.height = 1;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    textLayer.innerHTML = "";
  }

  private async updateVisiblePages(forPrint?: boolean) {
    const pages = Array.from(
      this.el.shadowRoot.querySelectorAll<HTMLDivElement>(
        ".file-viewer-pdf__page"
      )
    );

    let visiblePages: number[] = [];
    let currentPage = null;

    if (this.singlePageMode) {
      visiblePages = [this.singlePageModePage];
      currentPage = this.singlePageModePage;
    } else if (forPrint) {
      visiblePages = pages.map((page) => +page.dataset.pageNumber);
    } else {
      const visiblePagesVisibleHeight = pages
        .map((page) => ({
          pageNumber: +page.dataset.pageNumber,
          visibleHeight: getVisibleHeight(page, this.scrollContainer),
        }))
        .filter(({ visibleHeight }) => visibleHeight > 0);

      visiblePages = visiblePagesVisibleHeight.map((page) => page.pageNumber);

      if (visiblePagesVisibleHeight.length > 0) {
        const firstMostVisiblePage = visiblePagesVisibleHeight.reduce(
          (previous, current) =>
            current.visibleHeight > previous.visibleHeight ? current : previous,
          visiblePagesVisibleHeight[0]
        );

        currentPage = firstMostVisiblePage.pageNumber;
      }
    }

    const visiblePagesDidNotChanged =
      this.visiblePages.length === visiblePages.length &&
      this.visiblePages.every((pageNumber) =>
        visiblePages.includes(pageNumber)
      );

    if (visiblePagesDidNotChanged && this.currentPage === currentPage) {
      return;
    }

    this.visiblePages = visiblePages;
    this.currentPage = currentPage;

    await this.renderVisiblePages(forPrint);

    this.visiblePagesChange.emit(this.visiblePages);
  }

  private async renderTextLayer(page: PDFPageProxy, container: HTMLElement) {
    return new TextLayer({
      container,
      textContentSource: await page.getTextContent(),
      viewport: page.getViewport({
        scale: this.getScale(page),
      }),
    }).render();
  }

  private async openPrintDialog() {
    const canvases = Array.from(
      this.scrollContainer.querySelectorAll("canvas")
    );

    let styles = `
      *, *:before, *:after {
        margin: 0;
        padding: 0;
        outline: 0;
      }

      @page {
        size: a4 !important;
        margin: 0;
        padding: 0;
      }

      html, body {
        width: 210mm;
        height: 297mm;
      }

      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        page-break-after: always;
      }
    `;

    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.file}</title>
        <style>${styles}</style>
      </head>
      <body>
    `;

    for (const canvas of canvases) {
      html += `<img src="${canvas.toDataURL()}">`;
    }

    html += `
      </body>
      </html>
    `;

    const iframe = document.createElement("iframe");

    this.el.append(iframe);

    const win = iframe.contentWindow;

    win.document.write(html);
    win.focus();

    await new Promise((resolve) => setTimeout(resolve, 100));

    win.print();
    iframe.remove();
  }

  private getScale(page: PDFPageProxy) {
    const padding = isMobileViewport() ? 0 : 32;

    if (this.zoom === "auto") {
      return (this.scrollContainer?.clientWidth - padding) / page.view[2];
    } else if (isNaN(this.zoom)) {
      return 1;
    }

    return this.zoom;
  }

  private restoreScrollPosition() {
    this.scrollContainer.scrollTop =
      this.recentScrollPosition.y * this.scrollContainer?.scrollHeight;

    this.scrollContainer.scrollLeft =
      this.recentScrollPosition.x * this.scrollContainer?.scrollWidth;
  }

  private storeRecentScrollPosition = () => {
    this.recentScrollPosition = {
      x:
        Math.round(
          (this.scrollContainer?.scrollLeft /
            this.scrollContainer?.scrollWidth) *
            100
        ) / 100,
      y:
        Math.round(
          (this.scrollContainer?.scrollTop /
            this.scrollContainer?.scrollHeight) *
            100
        ) / 100,
    };
  };

  private onScroll = debounce(() => {
    this.updateVisiblePages();
    this.storeRecentScrollPosition();
  }, 60);

  render() {
    const showPagination =
      !this.error && !this.loading && this.visiblePages.length > 0;

    const showSpinner = this.loading;

    const className = classnames(
      "file-viewer-pdf",
      `file-viewer-pdf--view-mode-${this.viewMode}`
    );

    return (
      <Host class={className} exportparts="file-viewer-pdf__pagination">
        {this.error && (
          <swirl-inline-error
            class="file-viewer-pdf__error"
            message={this.errorMessage}
          ></swirl-inline-error>
        )}
        <div
          aria-describedby="pagination"
          class="file-viewer-pdf__pages"
          onScroll={this.onScroll}
          ref={(el) => (this.scrollContainer = el)}
        >
          {this.pages.map((page) => {
            const viewport = page.getViewport({
              scale: this.getScale(page),
            });

            const height = viewport.height;
            const width = viewport.width;

            const rendered = this.renderedPages.includes(page.pageNumber);

            return (
              <div
                aria-label={page.pageNumber}
                class="file-viewer-pdf__page"
                data-page-number={page.pageNumber}
                hidden={
                  !this.singlePageMode ||
                  page.pageNumber === this.singlePageModePage
                    ? undefined
                    : true
                }
                id={`page-${page.pageNumber}`}
                key={page.pageNumber}
                role="region"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                }}
                tabIndex={0}
              >
                {!rendered && (
                  <swirl-spinner class="file-viewer-pdf__page-spinner"></swirl-spinner>
                )}
                <canvas
                  class="file-viewer-pdf__canvas"
                  style={{ opacity: rendered ? "1" : "0" }}
                ></canvas>
                <div class="file-viewer-pdf__text-container"></div>
              </div>
            );
          })}
        </div>
        {showPagination && (
          <span
            class="file-viewer-pdf__pagination"
            id="pagination"
            part="file-viewer-pdf__pagination"
          >
            <span aria-current="page">{this.currentPage}</span> /{" "}
            {this.doc.numPages}
          </span>
        )}
        {showSpinner && (
          <div class="file-viewer-pdf__spinner">
            <swirl-spinner></swirl-spinner>
          </div>
        )}
      </Host>
    );
  }
}
