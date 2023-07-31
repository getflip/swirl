import {
  Component,
  Element,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import A11yDialog from "a11y-dialog";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";
import { querySelectorAllDeep } from "../../utils";

@Component({
  shadow: true,
  styleUrl: "swirl-lightbox.css",
  tag: "swirl-lightbox",
})
export class SwirlLightbox {
  @Element() el: HTMLElement;

  @Prop() closeButtonLabel?: string = "Close modal";
  @Prop() downloadButtonLabel?: string = "Download";
  @Prop() label!: string;
  @Prop() menuLabel?: string = "Slide options";
  @Prop() menuTriggerLabel?: string = "Open slide menu";
  @Prop() nextSlideButtonLabel?: string = "Next slide";
  @Prop() previousSlideButtonLabel?: string = "Previous slide";

  @State() activeSlideIndex: number = 0;
  @State() closing = false;
  @State() slides: HTMLSwirlFileViewerElement[];

  private dragging: boolean = false;
  private dragStartPosition: number;
  private dragDelta: number;
  private menu: HTMLSwirlPopoverElement;
  private modal: A11yDialog;
  private modalEl: HTMLElement;
  private mediaPlayers: (HTMLVideoElement | HTMLAudioElement)[] = [];

  componentWillLoad() {
    this.registerSlides();
  }

  componentDidLoad() {
    this.modal = new A11yDialog(this.modalEl);
    this.activateSlide(0);
  }

  disconnectedCallback() {
    this.modal?.destroy();
    this.unlockBodyScroll();
  }

  /**
   * Open the lightbox.
   */
  @Method()
  async open() {
    this.modal.show();
    this.lockBodyScroll();
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

    setTimeout(() => {
      this.modal.hide();
      this.resetImageZoom();
      this.closing = false;
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

    // wait for slide animation before deactivating the slide
    setTimeout(() => {
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
    this.updateMediaPlayers();
    this.resetImageZoom();
  }

  private setSlideAttributes() {
    this.slides.forEach((slide) => {
      slide.setAttribute("active", "false");
      slide.setAttribute("aria-label", slide.file);
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("role", "group");
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
    return this.slides[this.activeSlideIndex]?.file?.split("/").pop();
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

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      this.close();
    } else if (event.code === "ArrowLeft") {
      this.onPreviousSlideClick();
    } else if (event.code === "ArrowRight") {
      this.onNextSlideClick();
    }
  };

  private onNextSlideClick = () => {
    this.activateSlide(
      Math.min(this.slides.length - 1, this.activeSlideIndex + 1)
    );
  };

  private onPreviousSlideClick = () => {
    this.activateSlide(Math.max(0, this.activeSlideIndex - 1));
  };

  private registerSlides = () => {
    this.slides = Array.from(this.el.children).filter(
      (el) => el.tagName === "SWIRL-FILE-VIEWER"
    ) as HTMLSwirlFileViewerElement[];
    this.setSlideAttributes();
    this.updateMediaPlayers();
  };

  private updateMediaPlayers() {
    const mediaPlayers = querySelectorAllDeep<
      HTMLAudioElement | HTMLVideoElement
    >(this.el, "video");

    this.mediaPlayers = mediaPlayers;
  }

  private stopAllMediaPlayers() {
    this.mediaPlayers.forEach((mediaPlayer) => mediaPlayer.pause());
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
    this.dragging = true;

    this.dragStartPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

    this.slides.forEach((slide) => {
      slide.style.transition = "none";
    });
  };

  private onPointerMove = async (event: MouseEvent | TouchEvent) => {
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

    if (this.dragging) {
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
    }
  };

  private onPointerUp = () => {
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

  render() {
    const showPagination = this.slides.length > 1;

    const currentFileName = this.getCurrentFileName();
    const currentFileType = this.getCurrentFileType();
    const currentThumbnailUrl = this.getCurrentThumbnailUrl();

    const className = classnames("lightbox", {
      "lightbox--closing": this.closing,
    });

    return (
      <Host>
        <section
          aria-hidden="true"
          aria-label={this.label}
          class={className}
          id="lightbox"
          onMouseDown={this.onPointerDown}
          onMouseMove={this.onPointerMove}
          onMouseOut={this.onPointerUp}
          onMouseUp={this.onPointerUp}
          onKeyDown={this.onKeyDown}
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
              <swirl-popover-trigger popover={this.menu}>
                <button
                  aria-label={this.menuTriggerLabel}
                  class="lightbox__menu-button"
                >
                  <swirl-icon-more-vertikal></swirl-icon-more-vertikal>
                </button>
              </swirl-popover-trigger>
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
              >
                <swirl-icon-arrow-left></swirl-icon-arrow-left>
              </button>
              <button
                aria-label={this.nextSlideButtonLabel}
                class="lightbox__next-slide-button"
                disabled={this.activeSlideIndex === this.slides.length - 1}
                onClick={this.onNextSlideClick}
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
              <swirl-separator></swirl-separator>
              <swirl-action-list>
                <swirl-action-list-item
                  icon="<swirl-icon-download></swirl-icon-download>"
                  label={this.downloadButtonLabel}
                  onClick={this.onDownloadButtonClick}
                ></swirl-action-list-item>
                <slot name="menu-items"></slot>
              </swirl-action-list>
            </swirl-stack>
          </swirl-popover>
        </section>
      </Host>
    );
  }
}
