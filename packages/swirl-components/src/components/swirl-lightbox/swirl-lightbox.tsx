import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";
import { tabbable } from "tabbable";
import { querySelectorAllDeep } from "../../utils";

/**
 * @slot toolbar - Slot for additional toolbar items displayed in the header.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-lightbox.css",
  tag: "swirl-lightbox",
})
export class SwirlLightbox {
  @Element() el: HTMLElement;

  @Prop() closeButtonLabel?: string = "Close modal";
  @Prop() downloadButtonEnabled?: boolean = true;
  @Prop() downloadButtonLabel?: string = "Download";
  @Prop() hideMenu?: boolean;
  @Prop() label!: string;
  @Prop() menuLabel?: string = "Slide options";
  @Prop() menuTriggerLabel?: string = "Open slide menu";
  @Prop() nextSlideButtonLabel?: string = "Next slide";
  @Prop() previousSlideButtonLabel?: string = "Previous slide";

  @Event() activeSlideChange: EventEmitter<number>;
  @Event() lightboxClose: EventEmitter<void>;

  @State() activeSlideIndex: number = 0;
  @State() closing = false;
  @State() opening = false;
  @State() slides: HTMLSwirlFileViewerElement[];

  private activateSlideTimeout: NodeJS.Timeout;
  private closingTimeout: NodeJS.Timeout;
  private dragging: boolean = false;
  private dragStartPosition: number;
  private dragDelta: number;
  private menu: HTMLSwirlPopoverElement;
  private modalEl: HTMLDialogElement;
  private slidesContainer: HTMLElement;
  private previousSlideButton: HTMLButtonElement;
  private nextSlideButton: HTMLButtonElement;

  componentWillLoad() {
    this.registerSlides();
  }

  componentDidLoad() {
    this.ensureOpening();
    this.setDialogCustomProps();
    this.activateSlide(0);
  }

  disconnectedCallback() {
    this.unlockBodyScroll();

    if (this.activateSlideTimeout) {
      clearTimeout(this.activateSlideTimeout);
    }

    if (this.closingTimeout) {
      clearTimeout(this.closingTimeout);
    }

    if (this.modalEl?.open) {
      this.modalEl.close();
    }
  }

  @Watch("activeSlideIndex")
  watchActiveSlideIndex() {
    this.activeSlideChange.emit(this.activeSlideIndex);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.close();
    } else if (event.code === "ArrowLeft") {
      this.onPreviousSlideClick();
    } else if (event.code === "ArrowRight") {
      this.onNextSlideClick();
    }
  };

  /**
   * Open the lightbox.
   */
  @Method()
  async open() {
    this.opening = true;

    if (!this.modalEl) {
      return;
    }

    this.modalEl.showModal();
    this.lockBodyScroll();
    this.activateSlide(this.activeSlideIndex || 0);
  }

  /**
   * Close the lightbox.
   */
  @Method()
  async close() {
    if (this.closing) {
      return;
    }

    this.closing = true;
    this.unlockBodyScroll();

    if (this.closingTimeout) {
      clearTimeout(this.closingTimeout);
      this.closingTimeout = undefined;
    }

    this.closingTimeout = setTimeout(() => {
      this.resetImageZoom();
      this.stopAllMediaPlayers();
      this.modalEl.close();
      this.closing = false;
      this.lightboxClose.emit();
    }, 150);
  }

  /**
   * Activate a slide.
   * @param newActiveSlideIndex
   */
  @Method()
  async activateSlide(newActiveSlideIndex: number) {
    this.menu?.close?.();

    this.dragging = false;
    this.activeSlideIndex = newActiveSlideIndex;

    this.slides.forEach((slide, index) => {
      if (index === this.activeSlideIndex) {
        slide.removeAttribute("aria-hidden");
        slide.setAttribute("active", "true");
      } else if (
        index === this.activeSlideIndex - 1 ||
        index === this.activeSlideIndex + 1
      ) {
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("active", "true");
      } else {
        slide.setAttribute("aria-hidden", "true");
      }

      slide.style.transform = `translate3d(-${
        100 * this.activeSlideIndex
      }%, 0, 0)`;
    });

    if (this.activateSlideTimeout) {
      clearTimeout(this.activateSlideTimeout);
      this.activateSlideTimeout = undefined;
    }

    // wait for slide animation before deactivating the slide
    this.activateSlideTimeout = setTimeout(() => {
      this.slides.forEach((slide, index) => {
        if (
          index !== this.activeSlideIndex &&
          index !== this.activeSlideIndex - 1 &&
          index !== this.activeSlideIndex + 1
        ) {
          slide.setAttribute("active", "false");
        }
      });
    }, 300);

    this.stopAllMediaPlayers();
    this.resetImageZoom();
  }

  private ensureOpening() {
    if (this.opening && !this.modalEl?.open) {
      this.open();
    }
  }

  private setDialogCustomProps() {
    this.modalEl.setAttribute("closedby", "none");
  }

  private setSlideAttributes() {
    this.slides.forEach((slide) => {
      slide.setAttribute("active", "false");
      slide.setAttribute("aria-label", slide.file);
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("role", "group");
      slide.addEventListener("dragstart", (event) => event.preventDefault());
    });
  }

  private resetSlidePositions() {
    this.slides.forEach((slide) => {
      slide.style.transform = `translate3d(-${
        100 * this.activeSlideIndex
      }%, 0, 0)`;
    });
  }

  private getCurrentFileName() {
    const activeSlide = this.slides[this.activeSlideIndex];
    return activeSlide?.fileName || activeSlide?.file?.split("/").pop();
  }

  private getCurrentFileType() {
    return this.slides[this.activeSlideIndex]?.type;
  }

  private getCurrentThumbnailUrl() {
    return this.slides[this.activeSlideIndex]?.thumbnailUrl;
  }

  private lockBodyScroll() {
    disableBodyScroll(this.el);
  }

  private unlockBodyScroll() {
    enableBodyScroll(this.el);
  }

  private onCloseButtonClick = () => {
    this.close();
  };

  private onDownloadButtonClick = () => {
    this.slides[this.activeSlideIndex]?.download();
    this.menu.close();
  };

  private onNextSlideClick = () => {
    this.activateSlide(
      Math.min(this.slides.length - 1, this.activeSlideIndex + 1)
    );

    if (this.activeSlideIndex === this.slides.length - 1) {
      if (this.slides.length > 1) {
        this.previousSlideButton.focus();
      } else {
        tabbable(this.modalEl).at(0)?.focus();
      }
    }
  };

  private onPreviousSlideClick = () => {
    this.activateSlide(Math.max(0, this.activeSlideIndex - 1));

    if (this.activeSlideIndex === 0) {
      if (this.slides.length > 1) {
        this.nextSlideButton.focus();
      } else {
        tabbable(this.modalEl).at(0)?.focus();
      }
    }
  };

  private registerSlides = () => {
    this.slides = Array.from(this.el.children).filter(
      (el) => el.tagName === "SWIRL-FILE-VIEWER"
    ) as HTMLSwirlFileViewerElement[];

    this.setSlideAttributes();
  };

  private getMediaPlayers() {
    const mediaPlayers = querySelectorAllDeep<
      HTMLAudioElement | HTMLVideoElement
    >(this.el, "video");

    return mediaPlayers;
  }

  private stopAllMediaPlayers() {
    this.getMediaPlayers().forEach((mediaPlayer) => mediaPlayer.pause());
  }

  private resetImageZoom() {
    this.slides.forEach((slide) => {
      const imageViewer = slide?.shadowRoot?.querySelector(
        "swirl-file-viewer-image"
      );

      if (Boolean(imageViewer)) {
        imageViewer.resetZoom();
      }
    });
  }

  private onPointerDown = (event: MouseEvent | TouchEvent) => {
    if (this.slides.length <= 1) {
      return;
    }

    this.dragging = true;

    this.dragStartPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

    this.slides.forEach((slide) => {
      slide.style.transition = "none";
    });
  };

  private onPointerMove = async (event: MouseEvent | TouchEvent) => {
    if (!this.dragging) {
      return;
    }

    const isMultiTouch =
      !(event instanceof MouseEvent) && event.touches.length > 1;

    const imageViewer = this.slides[
      this.activeSlideIndex
    ]?.shadowRoot?.querySelector("swirl-file-viewer-image");

    const showsZoomedImage = Boolean(imageViewer)
      ? (await imageViewer.getZoom()) > 1
      : false;

    if (isMultiTouch || showsZoomedImage) {
      return;
    }

    event.preventDefault();

    const deltaX =
      event instanceof MouseEvent
        ? event.clientX - this.dragStartPosition
        : event.touches[0].clientX - this.dragStartPosition;

    this.slides.forEach((slide) => {
      const pixelOffset =
        this.activeSlideIndex * slide.getBoundingClientRect().width;

      this.dragDelta = deltaX;

      slide.style.transform = `translate3d(${
        (-pixelOffset + this.dragDelta) / 16
      }rem, 0, 0)`;
    });
  };

  private onPointerUp = () => {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragStartPosition = undefined;

    const dragRatio =
      this.dragDelta /
      this.slides[this.activeSlideIndex].getBoundingClientRect().width;

    this.dragDelta = 0;

    const shouldMoveToPreviousSlide = dragRatio > 0.2;
    const shouldMoveToNextSlide = dragRatio < -0.2;

    this.slides.forEach((slide) => {
      slide.style.transition = "";
    });

    if (shouldMoveToPreviousSlide) {
      this.onPreviousSlideClick();
    } else if (shouldMoveToNextSlide) {
      this.onNextSlideClick();
    } else {
      this.resetSlidePositions();
    }
  };

  private onBackdropClick = (event: MouseEvent) => {
    if (event.target !== this.slidesContainer) {
      return;
    }

    this.close();
  };

  private onContextMenu = (event: MouseEvent) => {
    if (!this.downloadButtonEnabled) {
      event.preventDefault();
    }
  };

  render() {
    const showPagination = this.slides.length > 1;

    const currentFileName = this.getCurrentFileName();
    const currentFileType = this.getCurrentFileType();
    const currentThumbnailUrl = this.getCurrentThumbnailUrl();

    const hasMenuItems =
      Boolean(this.el.querySelector("[slot='menu-items']")) ||
      this.downloadButtonEnabled;

    const hasToolbar = Boolean(this.el.querySelector("[slot='toolbar']"));

    const className = classnames("lightbox", {
      "lightbox--closing": this.closing,
      "lightbox--hide-menu": !hasMenuItems,
      "lightbox--hide-toolbar": !hasToolbar,
    });

    return (
      <Host>
        <dialog
          aria-label={this.label}
          class={className}
          id="lightbox"
          onKeyDown={this.onKeyDown}
          onMouseDown={this.onPointerDown}
          onMouseMove={this.onPointerMove}
          onMouseOut={this.onPointerUp}
          onMouseUp={this.onPointerUp}
          onTouchEnd={this.onPointerUp}
          onTouchMove={this.onPointerMove}
          onTouchStart={this.onPointerDown}
          ref={(el) => (this.modalEl = el)}
        >
          <div class="lightbox__body" role="document">
            <header class="lightbox__header">
              <button
                aria-label={this.closeButtonLabel}
                class="lightbox__close-button"
                onClick={this.onCloseButtonClick}
              >
                <swirl-icon-close></swirl-icon-close>
              </button>

              <div class="lightbox__toolbar">
                <slot name="toolbar"></slot>
              </div>

              {!this.hideMenu && (
                <swirl-popover-trigger swirlPopover={this.menu}>
                  <button
                    aria-label={this.menuTriggerLabel}
                    class="lightbox__menu-button"
                  >
                    <swirl-icon-more-vertikal></swirl-icon-more-vertikal>
                  </button>
                </swirl-popover-trigger>
              )}
            </header>
            <div
              aria-roledescription="carousel"
              class="lightbox__content"
              role="group"
            >
              <div
                aria-atomic="false"
                aria-live="polite"
                class="lightbox__slides"
                onClick={this.onBackdropClick}
                onContextMenu={this.onContextMenu}
                ref={(el) => (this.slidesContainer = el)}
              >
                <slot onSlotchange={this.registerSlides}></slot>
              </div>
            </div>
            <div class="lightbox__controls">
              <button
                aria-label={this.previousSlideButtonLabel}
                class="lightbox__previous-slide-button"
                disabled={this.activeSlideIndex === 0}
                onClick={this.onPreviousSlideClick}
                ref={(el) => (this.previousSlideButton = el)}
              >
                <swirl-icon-arrow-left></swirl-icon-arrow-left>
              </button>
              <button
                aria-label={this.nextSlideButtonLabel}
                class="lightbox__next-slide-button"
                disabled={this.activeSlideIndex === this.slides.length - 1}
                onClick={this.onNextSlideClick}
                ref={(el) => (this.nextSlideButton = el)}
              >
                <swirl-icon-arrow-right></swirl-icon-arrow-right>
              </button>
            </div>
            {showPagination && (
              <span class="lightbox__pagination">
                <span aria-current="page">{this.activeSlideIndex + 1}</span> /{" "}
                {this.slides.length}
              </span>
            )}
          </div>
          {!this.hideMenu && (
            <swirl-popover
              animation="scale-in-y"
              disableScrollLock
              id="slide-menu"
              label={this.menuLabel}
              placement="bottom-end"
              ref={(el) => (this.menu = el)}
            >
              <swirl-stack>
                <div class="lightbox__meta">
                  {currentThumbnailUrl && (
                    <div class="lightbox__thumbnail">
                      <swirl-thumbnail
                        alt=""
                        src={currentThumbnailUrl}
                      ></swirl-thumbnail>
                    </div>
                  )}
                  <div class="lightbox__file-info">
                    <swirl-text truncate weight="semibold">
                      {currentFileName}
                    </swirl-text>
                    <swirl-text color="subdued" size="sm" truncate>
                      {currentFileType}
                    </swirl-text>
                  </div>
                </div>
                {hasMenuItems && <swirl-separator></swirl-separator>}
                <swirl-action-list>
                  {this.downloadButtonEnabled && (
                    <swirl-action-list-item
                      icon="<swirl-icon-download></swirl-icon-download>"
                      label={this.downloadButtonLabel}
                      onClick={this.onDownloadButtonClick}
                    ></swirl-action-list-item>
                  )}
                  <slot name="menu-items"></slot>
                </swirl-action-list>
              </swirl-stack>
            </swirl-popover>
          )}
        </dialog>
      </Host>
    );
  }
}
