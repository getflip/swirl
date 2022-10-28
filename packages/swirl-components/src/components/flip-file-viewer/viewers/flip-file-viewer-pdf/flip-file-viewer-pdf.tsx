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
import pdf, {
  getDocument,
  PDFDocumentProxy,
  PDFPageProxy,
  renderTextLayer,
} from "pdfjs-dist/legacy/build/pdf.js";
import {
  debounce,
  getVisibleHeight,
  isMobileViewport,
} from "../../../../utils";

pdf.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

export type FlipFileViewerPdfZoom = number | "auto";

@Component({
  shadow: true,
  styleUrl: "flip-file-viewer-pdf.css",
  tag: "flip-file-viewer-pdf",
})
export class FlipFileViewerPdf {
  @Element() el: HTMLElement;

  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;
  @Prop() singlePageMode: boolean = navigator?.platform === "iPhone";
  @Prop() zoom?: FlipFileViewerPdfZoom = 1;

  @State() doc: PDFDocumentProxy;
  @State() error: boolean;
  @State() loading: boolean = true;
  @State() renderedPages: number[] = [];
  @State() scrolledDown: boolean = false;
  @State() singlePageModePage: number = 1;
  @State() visiblePages: number[] = [];

  @Event() activate: EventEmitter<HTMLElement>;

  private pages: PDFPageProxy[] = [];
  private renderingPageNumbers: number[] = [];
  private scrollContainer: HTMLDivElement;
  private recentScrollPosition: { x: number; y: number } = { x: 0, y: 0 };

  async componentWillLoad() {
    await this.getPages();
  }

  async componentDidLoad() {
    await this.updateVisiblePages();
    this.activate.emit(this.el);

    this.determineScrollStatus();
  }

  disconnectedCallback() {
    this.doc?.destroy();
  }

  @Listen("resize", { target: "window" })
  async onWindowResize() {
    this.visiblePages = [];
    this.renderedPages = [];
    await this.updateVisiblePages();

    this.determineScrollStatus();
  }

  @Watch("file")
  async watchProps() {
    await this.getPages();
    await this.updateVisiblePages();

    this.determineScrollStatus();
  }

  @Watch("zoom")
  watchZoom() {
    queueMicrotask(async () => {
      this.restoreScrollPosition();

      this.visiblePages = [];
      this.renderedPages = [];
      await this.updateVisiblePages();

      this.determineScrollStatus();
    });
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
    this.setPage(this.singlePageModePage + 1);
    this.updateVisiblePages();
  }

  /**
   * Navigate to previous page, if single page mode is enabled.
   */
  @Method()
  async previousPage() {
    this.setPage(this.singlePageModePage - 1);
    this.updateVisiblePages();
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
    this.updateVisiblePages();
  }

  private async getPages() {
    this.error = false;
    this.loading = true;

    try {
      if (Boolean(this.doc)) {
        this.doc.destroy();
      }

      this.doc = await getDocument(this.file).promise;

      for (let i = 1; i <= this.doc.numPages; i++) {
        const page = await this.doc.getPage(i);
        this.pages[i] = page;
      }

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

      if (!this.visiblePages.includes(page.pageNumber)) {
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

    await page.render(renderContext).promise;

    page.cleanup();

    textContainer.innerHTML = "";

    this.renderTextLayer(page, textContainer);

    this.renderingPageNumbers = this.renderingPageNumbers.filter(
      (pageNumber) => pageNumber !== page.pageNumber
    );
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

    if (this.singlePageMode) {
      visiblePages = [this.singlePageModePage];
    } else {
      visiblePages = forPrint
        ? pages.map((page) => +page.dataset.pageNumber)
        : pages
            .filter((page) => getVisibleHeight(page, this.scrollContainer) > 0)
            .map((page) => +page.dataset.pageNumber);

      const visiblePagesDidNotChanged =
        this.visiblePages.length === visiblePages.length &&
        this.visiblePages.every((pageNumber) =>
          visiblePages.includes(pageNumber)
        );

      if (visiblePagesDidNotChanged) {
        return;
      }
    }

    this.visiblePages = visiblePages;

    await this.renderVisiblePages(forPrint);
  }

  private async renderTextLayer(page: PDFPageProxy, container: HTMLElement) {
    renderTextLayer({
      container,
      textContent: await page.getTextContent(),
      viewport: page.getViewport({
        scale: this.getScale(page),
      }),
    });
  }

  private async openPrintDialog() {
    const canvases = Array.from(
      this.scrollContainer.querySelectorAll("canvas")
    );

    let styles = `
      *, *:before, *:after {
        margin: 0;
        padding: 0;
      }

      img {
        display: block;
        width: 100%;
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

    return this.zoom === "auto"
      ? (this.scrollContainer?.clientWidth - padding) / page.view[2]
      : isNaN(this.zoom)
      ? 1
      : this.zoom;
  }

  private restoreScrollPosition() {
    this.scrollContainer.scrollTop =
      this.recentScrollPosition.y * this.scrollContainer?.scrollHeight;

    this.scrollContainer.scrollLeft =
      this.recentScrollPosition.x * this.scrollContainer?.scrollWidth;
  }

  private determineScrollStatus = () => {
    const scrolledDown =
      Math.ceil(
        this.scrollContainer?.scrollTop + this.scrollContainer?.offsetHeight
      ) >= this.scrollContainer?.scrollHeight;

    if (scrolledDown !== this.scrolledDown) {
      this.scrolledDown = scrolledDown;
    }
  };

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
    this.determineScrollStatus();
    this.storeRecentScrollPosition();
  }, 60);

  render() {
    const showPagination =
      !this.error && !this.loading && this.visiblePages.length > 0;

    const currentPage =
      this.scrolledDown && !this.singlePageMode
        ? this.pages.length - 1
        : this.visiblePages[0];

    const showSpinner = this.loading;

    return (
      <Host class="file-viewer-pdf">
        {this.error && (
          <flip-inline-error
            class="file-viewer-pdf__error"
            message={this.errorMessage}
          ></flip-inline-error>
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
                  <flip-spinner class="file-viewer-pdf__page-spinner"></flip-spinner>
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
          <span class="file-viewer-pdf__pagination" id="pagination">
            <span aria-current="page">{currentPage}</span> / {this.doc.numPages}
          </span>
        )}
        {showSpinner && (
          <div class="file-viewer-pdf__spinner">
            <flip-spinner></flip-spinner>
          </div>
        )}
      </Host>
    );
  }
}
