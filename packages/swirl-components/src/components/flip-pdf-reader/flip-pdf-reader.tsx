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
import { FlipFileViewerPdfZoom } from "../flip-file-viewer/viewers/flip-file-viewer-pdf/flip-file-viewer-pdf";

@Component({
  shadow: true,
  styleUrl: "flip-pdf-reader.css",
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
  @State() zoom: FlipFileViewerPdfZoom;

  private modal: A11yDialog;
  private modalEl: HTMLElement;
  private viewer: HTMLFlipFileViewerElement;
  private zoomSteps: number[] = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

  // TODO: pinch

  componentWillLoad() {
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
    if (!Boolean(this.viewer)) {
      return;
    }

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
    const scrollContainer = this.viewer.shadowRoot.querySelector(
      ".file-viewer-pdf__pages"
    );

    if (Boolean(scrollContainer)) {
      disableBodyScroll(scrollContainer);
    }
  }

  private unlockBodyScroll() {
    const scrollContainer = this.viewer.shadowRoot.querySelector(
      ".file-viewer-pdf__pages"
    );

    if (Boolean(scrollContainer)) {
      enableBodyScroll(scrollContainer);
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      this.close();
    }
  };

  private onActivate = (event: CustomEvent<HTMLElement>) => {
    this.viewer = event.detail as HTMLFlipFileViewerElement;

    this.lockBodyScroll();
  };

  private onCloseButtonClick = () => {
    this.close();
  };

  private onPrintButtonClick = () => {
    this.viewer.print();
  };

  private onDownloadButtonClick = () => {
    this.viewer.download();
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
                  hideLabel
                  icon="<flip-icon-download></flip-icon-download>"
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
            </div>
          </div>
        </section>
      </Host>
    );
  }
}
