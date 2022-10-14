import { Component, Element, h, Host, Prop, State, Watch } from "@stencil/core";
import pdf, { PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.js";

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
  @State() page: number = 1;

  private canvas: HTMLCanvasElement;

  componentDidLoad() {
    this.renderPage();
  }

  @Watch("file")
  @Watch("page")
  watchProps() {
    this.renderPage();
  }

  private async renderPage() {
    this.error = false;
    this.loading = true;

    try {
      this.doc = this.doc || (await pdf.getDocument(this.file).promise);

      const page = await this.doc.getPage(this.page);

      let viewport = page.getViewport({ scale: 1 });

      const scale = this.el.clientWidth / viewport.width;

      viewport = page.getViewport({ scale });

      const context = this.canvas.getContext("2d");

      this.canvas.height = viewport.height;
      this.canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      this.loading = false;
    } catch (e) {
      this.error = true;
      this.loading = false;
    }
  }

  render() {
    const showPagination = !this.error && !this.loading;

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
        <canvas
          class="file-viewer-pdf__canvas"
          ref={(el) => (this.canvas = el)}
        ></canvas>
        {showPagination && (
          <span class="file-viewer-pdf__pagination">
            {this.page} / {this.doc.numPages}
          </span>
        )}
      </Host>
    );
  }
}
