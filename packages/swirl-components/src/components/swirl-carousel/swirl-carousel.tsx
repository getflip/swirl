import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";

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

  @State() isScrollable: boolean;

  private slidesContainer: HTMLElement;

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.checkScrollStatus();
  }

  componentDidLoad() {
    queueMicrotask(() => {
      this.checkScrollStatus();
    });
  }

  private checkScrollStatus() {
    this.isScrollable =
      this.slidesContainer.scrollWidth > this.slidesContainer.offsetWidth;
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

  private checkInView(element: HTMLElement) {
    let containerLeft = this.slidesContainer.scrollLeft;
    let containerRight = containerLeft + this.slidesContainer.clientWidth;

    let elementLeft = element.offsetLeft;
    let elementRight = elementLeft + element.clientWidth;

    let inInView =
      elementLeft >= containerLeft && elementRight <= containerRight;

    return inInView;
  }

  private onPreviousSlideButtonClick = () => {
    this.previousSlide();
  };

  private onNextSlideButtonClick = () => {
    this.nextSlide();
  };

  render() {
    return (
      <Host
        aria-label={this.label}
        aria-roledescription="carousel"
        role="group"
      >
        <div class="carousel">
          {this.isScrollable && (
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
          {this.isScrollable && (
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
            ref={(el) => (this.slidesContainer = el)}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
