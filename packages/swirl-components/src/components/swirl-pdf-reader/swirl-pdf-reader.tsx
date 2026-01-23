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
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";
import { isMobileViewport, querySelectorAllDeep } from "../../utils";
import {
  SwirlFileViewerPdfViewMode,
  SwirlFileViewerPdfZoom,
} from "../swirl-file-viewer/viewers/swirl-file-viewer-pdf/swirl-file-viewer-pdf";

@Component({
  shadow: true,
  styleUrl: "swirl-pdf-reader.css",
  tag: "swirl-pdf-reader",
})
export class SwirlPdfReader {
  @Element() el: HTMLElement;

  @Prop() autoZoomLabel?: string = "Full width";
  @Prop() closeButtonLabel?: string = "Close PDF viewer";
  @Prop() downloadButtonEnabled?: boolean = true;
  @Prop() downloadButtonLabel?: string = "Download PDF";
  @Prop() file!: string;
  @Prop() fileName?: string;
  @Prop() fileTypeLabel?: string = "PDF Document";
  @Prop() label!: string;
  @Prop() menuLabel?: string = "File menu";
  @Prop() menuTriggerLabel?: string = "Open file menu";
  @Prop() pdfWorkerSrc?: string;
  @Prop() printButtonEnabled?: boolean = true;
  @Prop() printButtonLabel?: string = "Print PDF";
  @Prop() sideBySideButtonLabel?: string = "Toggle side by side view";
  @Prop() thumbnailButtonLabel?: string = "Scroll to page";
  @Prop() thumbnailsButtonLabel?: string = "Toggle thumbnails";
  @Prop() thumbnailsLabel?: string = "Page thumbnails";
  @Prop() zoomInButtonLabel?: string = "Zoom in";
  @Prop() zoomOutButtonLabel?: string = "Zoom out";
  @Prop() zoomSelectLabel?: string = "Select zoom";
  @Prop() skipNativeDownload?: boolean = false;

  @Event() modalClose: EventEmitter<void>;
  @Event() modalOpen: EventEmitter<void>;

  @State() active = false;
  @State() closing = false;
  @State() opening = false;
  @State() downloading = false;
  @State() loadingThumbnails = false;
  @State() thumbnails: HTMLCanvasElement[] = [];
  @State() showThumbnails: boolean;
  @State() viewMode: SwirlFileViewerPdfViewMode = "single";
  @State() visiblePages: number[] = [];
  @State() zoom: SwirlFileViewerPdfZoom;
  @State() zoomSteps: number[];

  private desktopZoomSteps: number[] = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
  private menu: HTMLSwirlPopoverElement;
  private mobileZoomSteps: number[] = [0.5, 0.75, 1, 1.25, 1.5];
  private modalEl: HTMLDialogElement;
  private pdfViewer: HTMLSwirlFileViewerPdfElement;
  private viewer: HTMLSwirlFileViewerElement;

  componentWillLoad() {
    this.updateZoomSteps();

    this.zoom = isMobileViewport() ? "auto" : 1;
  }

  componentDidLoad() {
    this.ensureOpening();
    this.setDialogCustomProps();
  }

  disconnectedCallback() {
    this.unlockBodyScroll();
    if (this.modalEl?.open) {
      this.modalEl.close();
    }
  }

  private ensureOpening() {
    if (this.opening && !this.modalEl?.open) {
      this.open();
    }
  }

  private setDialogCustomProps() {
    this.modalEl.setAttribute("closedby", "none");
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    if (!Boolean(this.pdfViewer)) {
      return;
    }

    this.updateZoomSteps();

    this.zoom = isMobileViewport() ? "auto" : 1;
  }

  @Watch("showThumbnails")
  watchShowThumbnails() {
    if (this.showThumbnails) {
      this.loadingThumbnails = true;
      queueMicrotask(async () => {
        await this.generateThumbnails();
        this.loadingThumbnails = false;
      });
    }
  }

  /**
   * Open the reader.
   */
  @Method()
  async open() {
    this.opening = true;

    if (!this.modalEl) {
      return;
    }

    this.modalEl.showModal();
    this.active = true;
    this.modalOpen.emit();
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
      this.modalEl.close();
    }, 150);
  }

  private onClose = () => {
    this.closing = false;
    this.active = false;
    this.modalClose.emit();
  };

  private lockBodyScroll() {
    const scrollContainer = this.pdfViewer?.shadowRoot.querySelector(
      ".file-viewer-pdf__pages"
    );

    if (Boolean(scrollContainer)) {
      disableBodyScroll(scrollContainer);
    }
  }

  private unlockBodyScroll() {
    const scrollContainer = this.pdfViewer?.shadowRoot.querySelector(
      ".file-viewer-pdf__pages"
    );

    if (Boolean(scrollContainer)) {
      enableBodyScroll(scrollContainer);
    }
  }

  private async generateThumbnails() {
    this.thumbnails = await this.pdfViewer.getThumbnails();
  }

  private updateZoomSteps() {
    this.zoomSteps = isMobileViewport()
      ? this.mobileZoomSteps
      : this.desktopZoomSteps;
  }

  private toggleViewMode = () => {
    if (this.viewMode === "single") {
      this.viewMode = "side-by-side";
    } else {
      this.viewMode = "single";
    }
  };

  private toggleThumbnals = () => {
    this.showThumbnails = !this.showThumbnails;
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.close();
    }
  };

  private onActivate = async (event: CustomEvent<HTMLElement>) => {
    this.pdfViewer = event.detail as HTMLSwirlFileViewerPdfElement;

    this.lockBodyScroll();
  };

  private onVisiblePagesChange = async (event: CustomEvent<number[]>) => {
    this.visiblePages = event.detail;
  };

  private onCloseButtonClick = () => {
    this.close();
  };

  private onPrintButtonClick = () => {
    this.pdfViewer.print();
    this.menu.close();
  };

  private onDownloadButtonClick = async () => {
    this.downloading = true;
    await this.viewer.download();
    this.downloading = false;
    this.menu.close();
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

  private onThumbnailClick = (index: number) => () => {
    const page = querySelectorAllDeep(
      this.el,
      `[data-page-number="${index + 1}"]`
    )?.[0];

    page?.scrollIntoView();
  };

  render() {
    const hasMenuItems =
      Boolean(this.el.querySelector("[slot='menu-items']")) ||
      this.printButtonEnabled ||
      this.downloadButtonEnabled;

    const className = classnames("pdf-reader", {
      "pdf-reader--closing": this.closing,
      "pdf-reader--hide-menu": !hasMenuItems,
      "pdf-reader--show-thumbnails": this.showThumbnails,
    });

    return (
      <Host>
        <dialog
          aria-label={this.label}
          class={className}
          id="pdf-reader"
          onClose={this.onClose}
          onKeyDown={this.onKeyDown}
          ref={(el) => (this.modalEl = el)}
        >
          <div class="pdf-reader__body" role="document">
            <header class="pdf-reader__header">
              <span class="pdf-reader__header-left">
                <swirl-button
                  class="pdf-reader__close-button"
                  hideLabel
                  icon="<swirl-icon-close></swirl-icon-close>"
                  label={this.closeButtonLabel}
                  onClick={this.onCloseButtonClick}
                ></swirl-button>
                <span class="pdf-reader__label">{this.label}</span>
              </span>
              <span class="pdf-reader__header-center">
                <span class="pdf-reader__zoom-button-container">
                  <swirl-button
                    class="pdf-reader__zoom-button"
                    disabled={this.zoom === this.zoomSteps[0]}
                    hideLabel
                    icon="<swirl-icon-remove></swirl-icon-remove>"
                    label={this.zoomOutButtonLabel}
                    onClick={this.onZoomOutButtonClick}
                  ></swirl-button>
                  <swirl-button
                    class="pdf-reader__zoom-button"
                    disabled={
                      this.zoom === this.zoomSteps[this.zoomSteps.length - 1]
                    }
                    hideLabel
                    icon="<swirl-icon-add></swirl-icon-add>"
                    label={this.zoomInButtonLabel}
                    onClick={this.onZoomInButtonClick}
                  ></swirl-button>
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
                  <swirl-icon-expand-more class="pdf-reader__zoom-select-icon"></swirl-icon-expand-more>
                </span>
              </span>
              <span class="pdf-reader__header-right">
                <swirl-popover-trigger swirlPopover={this.menu}>
                  <swirl-button
                    class="pdf-reader__menu-button"
                    hideLabel
                    icon="<swirl-icon-more-vertikal></swirl-icon-more-vertikal>"
                    label={this.menuTriggerLabel}
                  ></swirl-button>
                </swirl-popover-trigger>
              </span>
              <span class="pdf-reader__floating-tools">
                <button
                  aria-label={this.sideBySideButtonLabel}
                  class="pdf-reader__floating-tool-button"
                  onClick={this.toggleViewMode}
                  type="button"
                >
                  <swirl-icon-menu-book></swirl-icon-menu-book>
                </button>
                <button
                  aria-controls="thumbnails"
                  aria-expanded={String(Boolean(this.showThumbnails))}
                  aria-label={this.thumbnailsButtonLabel}
                  class="pdf-reader__floating-tool-button"
                  onClick={this.toggleThumbnals}
                  type="button"
                >
                  <swirl-icon-file-copy></swirl-icon-file-copy>
                </button>
              </span>
            </header>
            <div class="pdf-reader__content">
              <nav
                aria-label={this.thumbnailsLabel}
                class="pdf-reader__thumbnails"
                id="thumbnails"
              >
                {this.loadingThumbnails && <swirl-spinner></swirl-spinner>}
                {!this.loadingThumbnails &&
                  this.thumbnails.map((thumbnail, index) => {
                    const thumbnailClassName = classnames(
                      "pdf-reader__thumbnail",
                      {
                        "pdf-reader__thumbnail--active":
                          this.visiblePages[0] === index + 1,
                      }
                    );

                    return (
                      <button
                        aria-label={`${this.thumbnailButtonLabel} ${index + 1}`}
                        class={thumbnailClassName}
                        onClick={this.onThumbnailClick(index)}
                        type="button"
                      >
                        <img src={thumbnail.toDataURL("image/png")} alt="" />
                      </button>
                    );
                  })}
              </nav>
              <swirl-file-viewer
                active={this.active}
                class="pdf-reader__viewer"
                disablePrint={!this.printButtonEnabled}
                file={this.file}
                fileName={this.fileName}
                onActivate={this.onActivate}
                onVisiblePagesChange={this.onVisiblePagesChange}
                pdfWorkerSrc={this.pdfWorkerSrc}
                ref={(el) => (this.viewer = el)}
                type="application/pdf"
                viewMode={this.viewMode}
                zoom={this.zoom}
                skipNativeDownload={this.skipNativeDownload}
              ></swirl-file-viewer>
              <div class="pdf-reader__mobile-zoom-controls">
                <button
                  aria-label={this.autoZoomLabel}
                  class="pdf-reader__mobile-zoom-button"
                  onClick={this.onZoomAutoButtonClick}
                  type="button"
                >
                  {this.zoom === "auto" ? (
                    <swirl-icon-fullscreen-exit></swirl-icon-fullscreen-exit>
                  ) : (
                    <swirl-icon-fullscreen></swirl-icon-fullscreen>
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
                  <swirl-icon-add></swirl-icon-add>
                </button>
                <button
                  aria-label={this.zoomOutButtonLabel}
                  class="pdf-reader__mobile-zoom-button"
                  disabled={this.zoom === this.zoomSteps[0]}
                  onClick={this.onZoomOutButtonClick}
                  type="button"
                >
                  <swirl-icon-remove></swirl-icon-remove>
                </button>
              </div>
            </div>
          </div>
          <swirl-popover
            animation="scale-in-y"
            disableScrollLock
            id="menu"
            label={this.menuLabel}
            placement="bottom-end"
            ref={(el) => (this.menu = el)}
          >
            <swirl-stack>
              <div class="pdf-reader__meta">
                <div class="pdf-reader__file-icon">
                  <svg fill="none" height="36" viewBox="0 0 24 36" width="24">
                    <path
                      d="M7.01755 21.6V15.192H8.39455C8.64655 15.192 8.86855 15.225 9.06055 15.291C9.25255 15.357 9.42655 15.474 9.58255 15.642C9.73855 15.81 9.84655 16.008 9.90655 16.236C9.96655 16.458 9.99655 16.761 9.99655 17.145C9.99655 17.433 9.97855 17.676 9.94255 17.874C9.91255 18.072 9.84355 18.258 9.73555 18.432C9.60955 18.642 9.44155 18.807 9.23155 18.927C9.02155 19.041 8.74555 19.098 8.40355 19.098H7.93555V21.6H7.01755ZM7.93555 16.056V18.234H8.37655C8.56255 18.234 8.70655 18.207 8.80855 18.153C8.91055 18.099 8.98555 18.024 9.03355 17.928C9.08155 17.838 9.10855 17.727 9.11455 17.595C9.12655 17.463 9.13255 17.316 9.13255 17.154C9.13255 17.004 9.12955 16.863 9.12355 16.731C9.11755 16.593 9.09055 16.473 9.04255 16.371C8.99455 16.269 8.92255 16.191 8.82655 16.137C8.73055 16.083 8.59255 16.056 8.41255 16.056H7.93555Z"
                      fill="white"
                    />
                    <path
                      d="M10.6826 21.6V15.192H12.0416C12.5696 15.192 12.9686 15.336 13.2386 15.624C13.5146 15.912 13.6526 16.32 13.6526 16.848V19.845C13.6526 20.445 13.5056 20.889 13.2116 21.177C12.9236 21.459 12.5066 21.6 11.9606 21.6H10.6826ZM11.6006 16.056V20.736H12.0236C12.2816 20.736 12.4646 20.673 12.5726 20.547C12.6806 20.415 12.7346 20.211 12.7346 19.935V16.848C12.7346 16.596 12.6836 16.401 12.5816 16.263C12.4796 16.125 12.2936 16.056 12.0236 16.056H11.6006Z"
                      fill="white"
                    />
                    <path
                      d="M14.5146 21.6V15.192H17.2506V16.056H15.4326V18H17.0166V18.864H15.4326V21.6H14.5146Z"
                      fill="white"
                    />
                    <path
                      d="M3.59961 9.00001C3.59961 8.0059 4.4055 7.20001 5.39961 7.20001H14.854C15.3314 7.20001 15.7893 7.38965 16.1268 7.72722L19.8724 11.4728C20.21 11.8104 20.3996 12.2682 20.3996 12.7456V27C20.3996 27.9941 19.5937 28.8 18.5996 28.8H5.39961C4.4055 28.8 3.59961 27.9941 3.59961 27V9.00001Z"
                      fill="#FF574D"
                    />
                    <path
                      d="M15.5996 7.36166V10.2C15.5996 11.1941 16.4055 12 17.3996 12H20.2379C20.3237 12.1884 20.3768 12.3913 20.3937 12.6H17.3996C16.0785 12.6 15.0067 11.5325 14.9996 10.213L14.9996 7.20587C15.2083 7.2228 15.4112 7.27593 15.5996 7.36166Z"
                      fill="white"
                    />
                    <path
                      d="M7.01755 21.6V15.192H8.39455C8.64655 15.192 8.86855 15.225 9.06055 15.291C9.25255 15.357 9.42655 15.474 9.58255 15.642C9.73855 15.81 9.84655 16.008 9.90655 16.236C9.96655 16.458 9.99655 16.761 9.99655 17.145C9.99655 17.433 9.97855 17.676 9.94255 17.874C9.91255 18.072 9.84355 18.258 9.73555 18.432C9.60955 18.642 9.44155 18.807 9.23155 18.927C9.02155 19.041 8.74555 19.098 8.40355 19.098H7.93555V21.6H7.01755ZM7.93555 16.056V18.234H8.37655C8.56255 18.234 8.70655 18.207 8.80855 18.153C8.91055 18.099 8.98555 18.024 9.03355 17.928C9.08155 17.838 9.10855 17.727 9.11455 17.595C9.12655 17.463 9.13255 17.316 9.13255 17.154C9.13255 17.004 9.12955 16.863 9.12355 16.731C9.11755 16.593 9.09055 16.473 9.04255 16.371C8.99455 16.269 8.92255 16.191 8.82655 16.137C8.73055 16.083 8.59255 16.056 8.41255 16.056H7.93555Z"
                      fill="white"
                    />
                    <path
                      d="M10.6826 21.6V15.192H12.0416C12.5696 15.192 12.9686 15.336 13.2386 15.624C13.5146 15.912 13.6526 16.32 13.6526 16.848V19.845C13.6526 20.445 13.5056 20.889 13.2116 21.177C12.9236 21.459 12.5066 21.6 11.9606 21.6H10.6826ZM11.6006 16.056V20.736H12.0236C12.2816 20.736 12.4646 20.673 12.5726 20.547C12.6806 20.415 12.7346 20.211 12.7346 19.935V16.848C12.7346 16.596 12.6836 16.401 12.5816 16.263C12.4796 16.125 12.2936 16.056 12.0236 16.056H11.6006Z"
                      fill="white"
                    />
                    <path
                      d="M14.5146 21.6V15.192H17.2506V16.056H15.4326V18H17.0166V18.864H15.4326V21.6H14.5146Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="pdf-reader__file-info">
                  <swirl-text truncate weight="semibold">
                    {this.label}
                  </swirl-text>
                  <swirl-text color="subdued" size="sm" truncate>
                    {this.fileTypeLabel}
                  </swirl-text>
                </div>
              </div>
              {hasMenuItems && <swirl-separator></swirl-separator>}
              <swirl-action-list class="pdf-reader__menu">
                {this.printButtonEnabled && (
                  <swirl-action-list-item
                    class="pdf-reader__print-button"
                    icon="<swirl-icon-print></swirl-icon-print>"
                    label={this.printButtonLabel}
                    onClick={this.onPrintButtonClick}
                  ></swirl-action-list-item>
                )}
                {this.downloadButtonEnabled && (
                  <swirl-action-list-item
                    class="pdf-reader__download-button"
                    disabled={this.downloading}
                    icon={
                      !this.downloading
                        ? "<swirl-icon-download></swirl-icon-download>"
                        : '<swirl-spinner size="xs"></swirl-spinner>'
                    }
                    label={this.downloadButtonLabel}
                    onClick={this.onDownloadButtonClick}
                  ></swirl-action-list-item>
                )}
                <slot name="menu-items"></slot>
              </swirl-action-list>
            </swirl-stack>
          </swirl-popover>
        </dialog>
      </Host>
    );
  }
}
