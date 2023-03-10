import { Component, Element, h, Host, Prop } from "@stencil/core";

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

  private slidesContainer: HTMLElement;

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
        class="carousel"
        role="group"
      >
        <swirl-button
          class="carousel__previous-slide-button"
          hideLabel
          icon="<swirl-icon-arrow-left></swirl-icon-arrow-left>"
          label={this.previousSlideButtonLabel}
          onClick={this.onPreviousSlideButtonClick}
          pill
          variant="flat"
        ></swirl-button>
        <swirl-button
          class="carousel__next-slide-button"
          hideLabel
          icon="<swirl-icon-arrow-right></swirl-icon-arrow-right>"
          label={this.nextSlideButtonLabel}
          onClick={this.onNextSlideButtonClick}
          pill
          variant="flat"
        ></swirl-button>
        <div
          aria-live="polite"
          class="carousel__slides"
          ref={(el) => (this.slidesContainer = el)}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
