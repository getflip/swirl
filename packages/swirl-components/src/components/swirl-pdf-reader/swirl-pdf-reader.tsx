import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import A11yDialog from "a11y-dialog";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";
import { isMobileViewport } from "../../utils";
import { FlipFileViewerPdfZoom } from "../swirl-file-viewer/viewers/swirl-file-viewer-pdf/swirl-file-viewer-pdf";

@Component({
  shadow: true,
  styleUrl: "swirl-pdf-reader.css",
  tag: "flip-pdf-reader",
})
export class FlipPdfReader {
  @Element() el: HTMLElement;

  @Prop() autoZoomLabel?: string = "Full width";
  @Prop() closeButtonLabel?: string = "Close PDF viewer";
  @Prop() downloadButtonLabel?: string = "Download PDF";
  @Prop() file!: string;
  @Prop() label!: string;
  @Prop() printButtonLabel?: string = "Print PDF";
  @Prop() zoomInButtonLabel?: string = "Zoom in";
  @Prop() zoomOutButtonLabel?: string = "Zoom out";
  @Prop() zoomSelectLabel?: string = "Select zoom";

  @State() active = false;
  @State() closing = false;
  @State() downloading = false;
  @State() zoom: FlipFileViewerPdfZoom;
  @State() zoomSteps: number[];

  private desktopZoomSteps: number[] = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
  private mobileZoomSteps: number[] = [0.5, 0.75, 1, 1.25, 1.5];
  private modal: A11yDialog;
  private modalEl: HTMLElement;
  private pdfViewer: HTMLFlipFileViewerPdfElement;
  private viewer: HTMLFlipFileViewerElement;

  componentWillLoad() {
    this.updateZoomSteps();

    this.zoom = isMobileViewport() ? "auto" : 1;
  }

  componentDidLoad() {
    this.modal = new A11yDialog(this.modalEl);
  }

  disconnectedCallback() {
    this.unlockBodyScroll();
    this.modal?.destroy();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    if (!Boolean(this.pdfViewer)) {
      return;
    }

    this.updateZoomSteps();

    this.zoom = isMobileViewport() ? "auto" : 1;
  }

  /**
   * Open the reader.
   */
  @Method()
  async open() {
    this.modal.show();
    this.active = true;
  }

  /**
   * Close the reader.
   */
  @Method()
  async close() {
    if (this.closing) {
      return;
    }

    this.closing = true;

    this.unlockBodyScroll();

    setTimeout(() => {
      this.modal.hide();
      this.closing = false;
      this.active = false;
    }, 150);
  }

  private lockBodyScroll() {
    const scrollContainer = this.pdfViewer.shadowRoot.querySelector(
      ".file-viewer-pdf__pages"
    );

    if (Boolean(scrollContainer)) {
      disableBodyScroll(scrollContainer);
    }
  }

  private unlockBodyScroll() {
    const scrollContainer = this.pdfViewer.shadowRoot.querySelector(
      ".file-viewer-pdf__pages"
    );

    if (Boolean(scrollContainer)) {
      enableBodyScroll(scrollContainer);
    }
  }

  private updateZoomSteps() {
    this.zoomSteps = isMobileViewport()
      ? this.mobileZoomSteps
      : this.desktopZoomSteps;
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      this.close();
    }
  };

  private onActivate = (event: CustomEvent<HTMLElement>) => {
    this.pdfViewer = event.detail as HTMLFlipFileViewerPdfElement;

    this.lockBodyScroll();
  };

  private onCloseButtonClick = () => {
    this.close();
  };

  private onPrintButtonClick = () => {
    this.pdfViewer.print();
  };

  private onDownloadButtonClick = async () => {
    this.downloading = true;
    await this.viewer.download();
    this.downloading = false;
  };

  private onZoomInButtonClick = () => {
    const currentZoomStepIndex = this.zoomSteps.indexOf(+this.zoom);

    this.zoom =
      currentZoomStepIndex === -1
        ? 1
        : this.zoomSteps[
            Math.min(this.zoomSteps.length - 1, currentZoomStepIndex + 1)
          ];
  };

  private onZoomOutButtonClick = () => {
    const currentZoomStepIndex = this.zoomSteps.indexOf(+this.zoom);

    this.zoom =
      currentZoomStepIndex === -1
        ? 1
        : this.zoomSteps[Math.max(0, currentZoomStepIndex - 1)];
  };

  private onZoomAutoButtonClick = () => {
    this.zoom = this.zoom === "auto" ? 1 : "auto";
  };

  private onZoomChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;

    this.zoom = value === "auto" ? value : +value;
  };

  render() {
    const className = classnames("pdf-reader", {
      "pdf-reader--closing": this.closing,
    });

    return (
      <Host>
        <section
          aria-hidden="true"
          aria-label={this.label}
          class={className}
          id="pdf-reader"
          onKeyDown={this.onKeyDown}
          ref={(el) => (this.modalEl = el)}
        >
          <div class="pdf-reader__body" role="document">
            <header class="pdf-reader__header">
              <span class="pdf-reader__header-left">
                <flip-button
                  class="pdf-reader__close-button"
                  hideLabel
                  icon="<flip-icon-close></flip-icon-close>"
                  label={this.closeButtonLabel}
                  onClick={this.onCloseButtonClick}
                ></flip-button>
                <span class="pdf-reader__label">{this.label}</span>
              </span>
              <span class="pdf-reader__header-center">
                <span class="pdf-reader__zoom-button-container">
                  <flip-button
                    class="pdf-reader__zoom-button"
                    disabled={this.zoom === this.zoomSteps[0]}
                    hideLabel
                    icon="<flip-icon-remove></flip-icon-remove>"
                    label={this.zoomOutButtonLabel}
                    onClick={this.onZoomOutButtonClick}
                  ></flip-button>
                  <flip-button
                    class="pdf-reader__zoom-button"
                    disabled={
                      this.zoom === this.zoomSteps[this.zoomSteps.length - 1]
                    }
                    hideLabel
                    icon="<flip-icon-add></flip-icon-add>"
                    label={this.zoomInButtonLabel}
                    onClick={this.onZoomInButtonClick}
                  ></flip-button>
                </span>
                <span class="pdf-reader__zoom-select-container">
                  <select
                    aria-label={this.zoomSelectLabel}
                    class="pdf-reader__zoom-select"
                    name="zoom-select"
                    id="zoom-select"
                    onChange={this.onZoomChange}
                  >
                    <option selected={this.zoom === "auto"} value="auto">
                      {this.autoZoomLabel}
                    </option>
                    {this.zoomSteps.map((zoom) => (
                      <option
                        key={zoom}
                        selected={this.zoom === zoom}
                        value={zoom}
                      >
                        {zoom * 100}%
                      </option>
                    ))}
                  </select>
                  <flip-icon-expand-more class="pdf-reader__zoom-select-icon"></flip-icon-expand-more>
                </span>
              </span>
              <span class="pdf-reader__header-right">
                <flip-button
                  class="pdf-reader__print-button"
                  hideLabel
                  icon="<flip-icon-print></flip-icon-print>"
                  label={this.printButtonLabel}
                  onClick={this.onPrintButtonClick}
                ></flip-button>
                <flip-button
                  class="pdf-reader__download-button"
                  disabled={this.downloading}
                  hideLabel
                  icon={
                    !this.downloading
                      ? "<flip-icon-download></flip-icon-download>"
                      : '<flip-spinner size="s"></flip-spinner>'
                  }
                  label={this.downloadButtonLabel}
                  onClick={this.onDownloadButtonClick}
                ></flip-button>
              </span>
            </header>
            <div class="pdf-reader__content">
              <flip-file-viewer
                active={this.active}
                file={this.file}
                onActivate={this.onActivate}
                ref={(el) => (this.viewer = el)}
                type="application/pdf"
                zoom={this.zoom}
              ></flip-file-viewer>

              <div class="pdf-reader__mobile-zoom-controls">
                <button
                  aria-label={this.autoZoomLabel}
                  class="pdf-reader__mobile-zoom-button"
                  onClick={this.onZoomAutoButtonClick}
                  type="button"
                >
                  {this.zoom === "auto" ? (
                    <flip-icon-fullscreen-exit></flip-icon-fullscreen-exit>
                  ) : (
                    <flip-icon-fullscreen></flip-icon-fullscreen>
                  )}
                </button>
                <button
                  aria-label={this.zoomInButtonLabel}
                  class="pdf-reader__mobile-zoom-button"
                  disabled={
                    this.zoom === this.zoomSteps[this.zoomSteps.length - 1]
                  }
                  onClick={this.onZoomInButtonClick}
                  type="button"
                >
                  <flip-icon-add></flip-icon-add>
                </button>
                <button
                  aria-label={this.zoomOutButtonLabel}
                  class="pdf-reader__mobile-zoom-button"
                  disabled={this.zoom === this.zoomSteps[0]}
                  onClick={this.onZoomOutButtonClick}
                  type="button"
                >
                  <flip-icon-remove></flip-icon-remove>
                </button>
              </div>
            </div>
          </div>
        </section>
      </Host>
    );
  }
}
