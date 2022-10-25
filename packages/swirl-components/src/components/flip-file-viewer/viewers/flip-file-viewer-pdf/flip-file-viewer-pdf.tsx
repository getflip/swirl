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
  @Prop() zoom?: FlipFileViewerPdfZoom = 1;

  @State() doc: PDFDocumentProxy;
  @State() error: boolean;
  @State() loading: boolean = true;
  @State() visiblePages: number[] = [];

  @Event() activate: EventEmitter<HTMLElement>;

  private pages: PDFPageProxy[] = [];
  private renderedPages: number[] = [];
  private renderingPageNumbers: number[] = [];
  private scrollContainer: HTMLDivElement;

  async componentWillLoad() {
    await this.getPages();
  }

  async componentDidLoad() {
    await this.updateVisiblePages();
    this.activate.emit(this.el);
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

  @Watch("zoom")
  watchZoom() {
    queueMicrotask(async () => {
      this.visiblePages = [];
      this.renderedPages = [];
      await this.updateVisiblePages();
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

      const textContainer = container?.querySelector<HTMLDivElement>(
        ".file-viewer-pdf__text-container"
      );

      const page = this.pages.find(
        (page) => page?.pageNumber === +container?.dataset.pageNumber
      );

      if (
        !Boolean(page) ||
        !this.visiblePages.includes(page.pageNumber) ||
        this.renderingPageNumbers.includes(page.pageNumber)
      ) {
        continue;
      }

      if (this.renderedPages.includes(page.pageNumber) && !forPrint) {
        renderedPages.push(page.pageNumber);
        continue;
      }

      this.renderingPageNumbers = [
        ...this.renderingPageNumbers,
        page.pageNumber,
      ];

      const scale = forPrint ? 4 : this.getScale(page);

      const viewport = page.getViewport({
        scale,
      });

      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      this.renderTextLayer(page, textContainer);

      renderedPages.push(page.pageNumber);

      this.renderingPageNumbers = this.renderingPageNumbers.filter(
        (pageNumber) => pageNumber !== page.pageNumber
      );
    }

    this.renderedPages = renderedPages;
  }

  private async updateVisiblePages(forPrint?: boolean) {
    const pages = Array.from(
      this.el.shadowRoot.querySelectorAll<HTMLDivElement>(
        ".file-viewer-pdf__page"
      )
    );

    let visiblePages = forPrint
      ? pages.map((page) => +page.dataset.pageNumber)
      : pages
          .filter((page) => getVisibleHeight(page, this.scrollContainer) > 0)
          .map((page) => +page.dataset.pageNumber);

    if (visiblePages.length === 0) {
      visiblePages = [1, 2, 3, 4];
    }

    const visiblePagesDidNotChanged =
      this.visiblePages.length === visiblePages.length &&
      this.visiblePages.every((pageNumber) =>
        visiblePages.includes(pageNumber)
      );

    if (visiblePagesDidNotChanged) {
      return;
    }

    this.visiblePages = visiblePages;

    await this.renderVisiblePages(forPrint);
  }

  private async renderTextLayer(page: PDFPageProxy, container: HTMLElement) {
    renderTextLayer({
      container,
      textContent: await page.getTextContent(),
      viewport: page.getViewport({
        scale: this.getScale(page) / 2,
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

    const win = window.open(" ");

    win.document.write(html);
    win.document.close();
    win.focus();

    await new Promise((resolve) => setTimeout(resolve));

    win.print();
    win.close();
  }

  private getScale(page: PDFPageProxy) {
    const padding = isMobileViewport() ? 0 : 32;

    return this.zoom === "auto"
      ? ((this.scrollContainer?.clientWidth - padding) / page.view[2]) * 2
      : isNaN(this.zoom)
      ? 2
      : this.zoom * 2;
  }

  private onScroll = debounce(() => {
    this.updateVisiblePages();
  }, 60);

  render() {
    const showPagination =
      !this.error && !this.loading && this.visiblePages.length > 0;

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
              scale: this.getScale(page) / 2,
            });

            return (
              <div
                aria-label={page.pageNumber}
                class="file-viewer-pdf__page"
                data-page-number={page.pageNumber}
                id={`page-${page.pageNumber}`}
                key={page.pageNumber}
                role="region"
                style={{
                  width: `${viewport.width}px`,
                  height: `${viewport.height}px`,
                }}
                tabIndex={0}
              >
                <canvas class="file-viewer-pdf__canvas"></canvas>
                <div class="file-viewer-pdf__text-container"></div>
              </div>
            );
          })}
        </div>
        {showPagination && (
          <span class="file-viewer-pdf__pagination" id="pagination">
            <span aria-current="page">{this.visiblePages[0]}</span> /{" "}
            {this.doc.numPages}
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
