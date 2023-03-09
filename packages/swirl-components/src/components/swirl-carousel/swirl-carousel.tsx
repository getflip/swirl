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

  private slidesContainer: HTMLElement;

  private previousSlide() {
    const slides = this.getSlides();
    const activeSlide = this.getActiveSlide();
    const previouSlide =
      activeSlide.previousElementSibling || slides[slides.length - 1];

    previouSlide?.scrollIntoView({ block: "nearest", inline: "start" });
  }

  private nextSlide() {
    const slides = this.getSlides();
    const activeSlide = this.getActiveSlide();
    const nextSlide = activeSlide.nextElementSibling || slides[0];

    nextSlide?.scrollIntoView();
  }

  private getSlides() {
    return Array.from(this.el.querySelectorAll("swirl-carousel-slide"));
  }

  private getActiveSlide() {
    const slides = this.getSlides();

    return slides.find(
      (slide) => slide.offsetLeft >= this.slidesContainer?.scrollLeft
    );
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
