import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import pdf, {
  PDFDocumentProxy,
  PDFPageProxy,
} from "pdfjs-dist/legacy/build/pdf.js";
import { getVisibleHeight } from "../../../../utils";

pdf.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

@Component({
  shadow: true,
  styleUrl: "flip-file-viewer-pdf.css",
  tag: "flip-file-viewer-pdf",
})
export class FlipFileViewerPdf {
  @Element() el: HTMLElement;

  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;

  @State() doc: PDFDocumentProxy;
  @State() error: boolean;
  @State() loading: boolean = true;
  @State() visiblePages: number[] = [];

  private pages: PDFPageProxy[] = [];
  private renderingPageNumbers: number[] = [];
  private scrollContainer: HTMLDivElement;

  componentWillLoad() {
    this.getPages();
  }

  componentDidLoad() {
    this.updateVisiblePages();
  }

  componentDidRender() {
    this.renderVisiblePages();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.visiblePages = [];
    this.updateVisiblePages();
  }

  @Watch("file")
  watchProps() {
    this.getPages();
    this.updateVisiblePages();
  }

  private async getPages() {
    this.error = false;
    this.loading = true;

    try {
      this.doc = this.doc || (await pdf.getDocument(this.file).promise);

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

  private async renderVisiblePages() {
    const canvases = Array.from(this.el.shadowRoot.querySelectorAll("canvas"));

    for (const canvas of canvases) {
      const page = this.pages.find(
        (page) =>
          page?.pageNumber ===
          +canvas.closest<HTMLDivElement>(".file-viewer-pdf__page")?.dataset
            .pageNumber
      );

      if (
        !Boolean(page) ||
        this.renderingPageNumbers.includes(page.pageNumber)
      ) {
        return;
      }

      this.renderingPageNumbers = [
        ...this.renderingPageNumbers,
        page.pageNumber,
      ];

      const viewport = page.getViewport({
        scale: this.scrollContainer.clientWidth / page.view[2],
      });

      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      this.renderingPageNumbers = this.renderingPageNumbers.filter(
        (pageNumber) => pageNumber !== page.pageNumber
      );
    }
  }

  private updateVisiblePages() {
    const pages = Array.from(
      this.el.shadowRoot.querySelectorAll<HTMLDivElement>(
        ".file-viewer-pdf__page"
      )
    );

    let visiblePages = pages
      .filter((page) => getVisibleHeight(page, this.scrollContainer) > 0)
      .map((page) => +page.dataset.pageNumber);

    if (visiblePages.length === 0) {
      visiblePages = [1];
    }

    const visiblePagesChanged = !(
      visiblePages.every(
        (pageNumber, index) => this.visiblePages[index] === pageNumber
      ) && visiblePages.length === this.visiblePages.length
    );

    if (visiblePagesChanged) {
      this.visiblePages = visiblePages;
    }
  }

  private onScroll = () => {
    this.updateVisiblePages();
  };

  render() {
    const showPagination =
      !this.error && !this.loading && this.visiblePages.length > 0;

    return (
      <Host class="file-viewer-pdf">
        {this.loading && (
          <flip-spinner class="file-viewer-pdf__spinner"></flip-spinner>
        )}
        {this.error && (
          <flip-inline-error
            class="file-viewer-pdf__error"
            message={this.errorMessage}
          ></flip-inline-error>
        )}
        <div
          class="file-viewer-pdf__pages"
          onScroll={this.onScroll}
          ref={(el) => (this.scrollContainer = el)}
        >
          {this.pages.map((page) => {
            const viewport = page.getViewport({
              scale: (this.scrollContainer.clientWidth - 32) / page.view[2],
            });

            return (
              <div
                class="file-viewer-pdf__page"
                data-page-number={page.pageNumber}
                id={`page-${page.pageNumber}`}
                key={page.pageNumber}
                style={{
                  width: `${viewport.width}px`,
                  height: `${viewport.height}px`,
                }}
              >
                {this.visiblePages.includes(page.pageNumber) && (
                  <canvas class="file-viewer-pdf__canvas"></canvas>
                )}
              </div>
            );
          })}
        </div>
        {showPagination && (
          <span class="file-viewer-pdf__pagination">
            {this.visiblePages[0]} / {this.doc.numPages}
          </span>
        )}
      </Host>
    );
  }
}
