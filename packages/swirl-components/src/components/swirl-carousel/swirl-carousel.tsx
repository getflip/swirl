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
} from "@stencil/core";
import { debounce } from "../../utils";

/**
 * slot - The slides
 */
@Component({
  shadow: true,
  styleUrl: "swirl-carousel.css",
  tag: "swirl-carousel",
})
export class SwirlCarousel {
  @Element() el: HTMLElement;

  @Prop() label!: string;
  @Prop() nextSlideButtonLabel?: string = "Next slide";
  @Prop() previousSlideButtonLabel?: string = "Previous slide";
  @Prop() loopAround?: boolean = false;

  @State() isAtEnd: boolean;
  @State() isAtStart: boolean;
  @State() isScrollable: boolean;

  @Event() activeSlidesChange: EventEmitter<HTMLSwirlCarouselSlideElement[]>;

  private slidesContainer: HTMLElement;
  private activeSlides: HTMLSwirlCarouselSlideElement[] = [];

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.checkScrollStatus();
  }

  componentDidLoad() {
    queueMicrotask(() => {
      this.checkScrollStatus();
      this.checkScrollPosition();
    });
  }

  /**
   * Scroll to slide with id.
   */
  @Method()
  async scrollToSlide(id: string) {
    const slides = this.getSlides();
    const slide = slides.find((slide) => slide.id === id);

    if (!Boolean(slide)) {
      return;
    }

    slide.scrollIntoView({ block: "nearest", inline: "start" });
  }

  private previousSlide() {
    const slides = this.getSlides();
    const activeSlides = this.getActiveSlides();
    const previouSlide =
      activeSlides[0].previousElementSibling ||
      (this.loopAround ? slides[slides.length - 1] : activeSlides[0]);

    previouSlide?.scrollIntoView({ block: "nearest", inline: "start" });
  }

  private nextSlide() {
    const slides = this.getSlides();
    const activeSlides = this.getActiveSlides();
    const isAtEnd = !Boolean(
      activeSlides[activeSlides.length - 1].nextElementSibling
    );

    const nextSlide =
      isAtEnd && this.loopAround
        ? slides[0]
        : activeSlides[0].nextElementSibling;

    nextSlide?.scrollIntoView({ block: "nearest", inline: "start" });
  }

  private getSlides() {
    return Array.from(this.el.querySelectorAll("swirl-carousel-slide"));
  }

  private getActiveSlides() {
    const slides = this.getSlides();

    return slides.filter((slide) => this.checkInView(slide));
  }

  private checkScrollStatus() {
    this.isScrollable =
      this.slidesContainer.scrollWidth > this.slidesContainer.offsetWidth;
  }

  private checkScrollPosition() {
    const slides = this.getSlides();
    const activeSlides = this.getActiveSlides();

    const isAtStart = activeSlides[0] === slides[0];
    const isAtEnd =
      activeSlides[activeSlides.length - 1] === slides[slides.length - 1];

    if (isAtStart !== this.isAtStart) {
      this.isAtStart = isAtStart;
    }

    if (isAtEnd !== this.isAtEnd) {
      this.isAtEnd = isAtEnd;
    }
  }

  private checkInView(element: HTMLElement) {
    let containerLeft = this.slidesContainer.scrollLeft;
    let containerRight = containerLeft + this.slidesContainer.clientWidth;

    let elementLeft = element.offsetLeft;
    let elementRight = elementLeft + element.clientWidth;

    let inInView =
      elementLeft >= containerLeft && elementRight <= containerRight;

    return inInView;
  }

  private updateActiveSlideReferences = debounce(() => {
    const activeSlides = this.getActiveSlides();
    const activeSlidesChanged = activeSlides.some(
      (slide, index) => this.activeSlides[index] !== slide
    );

    if (activeSlidesChanged) {
      this.activeSlides = activeSlides;
      this.activeSlidesChange.emit(this.activeSlides);
    }
  }, 100);

  private onPreviousSlideButtonClick = () => {
    this.previousSlide();
  };

  private onNextSlideButtonClick = () => {
    this.nextSlide();
  };

  private onSlotChange = () => {
    // restore scroll position to active slide when slides are removed or added after first render
    this.activeSlides[0]?.scrollIntoView({ block: "nearest", inline: "start" });
  };

  private onScroll = () => {
    this.updateActiveSlideReferences();
    this.checkScrollPosition();
  };

  render() {
    return (
      <Host
        aria-label={this.label}
        aria-roledescription="carousel"
        role="group"
      >
        <div class="carousel">
          {this.isScrollable && !this.isAtStart && (
            <swirl-button
              class="carousel__previous-slide-button"
              hideLabel
              icon="<swirl-icon-arrow-back></swirl-icon-arrow-back>"
              label={this.previousSlideButtonLabel}
              onClick={this.onPreviousSlideButtonClick}
              pill
              variant="floating"
            ></swirl-button>
          )}
          {this.isScrollable && !this.isAtEnd && (
            <swirl-button
              class="carousel__next-slide-button"
              hideLabel
              icon="<swirl-icon-arrow-forward></swirl-icon-arrow-forward>"
              label={this.nextSlideButtonLabel}
              onClick={this.onNextSlideButtonClick}
              pill
              variant="floating"
            ></swirl-button>
          )}
          <div
            aria-live="polite"
            class="carousel__slides"
            onScroll={this.onScroll}
            ref={(el) => (this.slidesContainer = el)}
          >
            <slot onSlotchange={this.onSlotChange}></slot>
          </div>
        </div>
      </Host>
    );
  }
}
