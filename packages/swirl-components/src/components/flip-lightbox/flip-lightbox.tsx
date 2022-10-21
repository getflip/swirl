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

@Component({
  shadow: true,
  styleUrl: "flip-lightbox.css",
  tag: "flip-lightbox",
})
export class FlipLightbox {
  @Element() el: HTMLElement;

  @Prop() closeButtonLabel?: string = "Close modal";
  @Prop() label!: string;
  @Prop() nextSlideButtonLabel?: string = "Next slide";
  @Prop() previousSlideButtonLabel?: string = "Previous slide";

  @State() activeSlideIndex: number = 0;
  @State() closing = false;
  @State() slides: HTMLFlipFileViewerElement[];

  private modal: A11yDialog;
  private modalEl: HTMLElement;

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
      this.closing = false;
    }, 150);
  }

  /**
   * Activate a slide.
   * @param newActiveSlideIndex
   */
  @Method()
  async activateSlide(newActiveSlideIndex: number) {
    this.activeSlideIndex = newActiveSlideIndex;

    this.slides.forEach((slide, index) => {
      if (index === this.activeSlideIndex) {
        slide.removeAttribute("aria-hidden");
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
        if (index !== this.activeSlideIndex) {
          slide.setAttribute("active", "false");
        }
      });
    }, 300);
  }

  private onCloseButtonClick = () => {
    this.close();
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
    this.slides = Array.from(this.el.children) as HTMLFlipFileViewerElement[];
    this.setSlideAttributes();
  };

  private setSlideAttributes() {
    this.slides.forEach((slide) => {
      slide.setAttribute("active", "false");
      slide.setAttribute("aria-label", slide.file);
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("role", "group");
    });
  }

  private lockBodyScroll() {
    disableBodyScroll(this.el);
  }

  private unlockBodyScroll() {
    enableBodyScroll(this.el);
  }

  render() {
    const className = classnames("lightbox", {
      "lightbox--closing": this.closing,
    });

    return (
      <Host onKeyDown={this.onKeyDown}>
        <section
          aria-hidden="true"
          aria-label={this.label}
          class={className}
          id="lightbox"
          ref={(el) => (this.modalEl = el)}
        >
          <div class="lightbox__body" role="document">
            <header class="lightbox__header">
              <button
                aria-label={this.closeButtonLabel}
                class="lightbox__close-button"
                onClick={this.onCloseButtonClick}
              >
                <flip-icon-close></flip-icon-close>
              </button>
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
                <flip-icon-arrow-left></flip-icon-arrow-left>
              </button>
              <button
                aria-label={this.nextSlideButtonLabel}
                class="lightbox__next-slide-button"
                disabled={this.activeSlideIndex === this.slides.length - 1}
                onClick={this.onNextSlideClick}
              >
                <flip-icon-arrow-right></flip-icon-arrow-right>
              </button>
            </div>
          </div>
        </section>
      </Host>
    );
  }
}
