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
import classnames from "classnames";
import { debounce } from "../../utils";

export type SwirlCarouselFadeColor = "default" | "on-surface-overlay";

export type SwirlCarouselSpacing =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "24"
  | "32"
  | "40"
  | "48"
  | "64";

export type SwirlCarouselPadding =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "24"
  | "32"
  | "40"
  | "48"
  | "64";

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
  @Prop() fade?: boolean = false;
  @Prop() fadeColor?: SwirlCarouselFadeColor = "default";
  @Prop() loopAround?: boolean = false;
  @Prop() padding?: SwirlCarouselPadding = "16";
  @Prop() paddingBlockEnd?: SwirlCarouselPadding;
  @Prop() paddingBlockStart?: SwirlCarouselPadding;
  @Prop() paddingInlineEnd?: SwirlCarouselPadding;
  @Prop() paddingInlineStart?: SwirlCarouselPadding;
  @Prop() spacing?: SwirlCarouselSpacing = "16";

  @State() isAtEnd: boolean;
  @State() isAtStart: boolean;
  @State() isScrollable: boolean;

  @Event() activeSlidesChange: EventEmitter<HTMLSwirlCarouselSlideElement[]>;

  private slidesContainer: HTMLElement;
  private activeSlides: HTMLSwirlCarouselSlideElement[] = [];
  private carouselFadeColorMap: Map<SwirlCarouselFadeColor, string> = new Map<
    SwirlCarouselFadeColor,
    string
  >([
    ["default", "var(--s-background-default)"],
    ["on-surface-overlay", "var(--s-surface-overlay-default)"],
  ]);

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.checkScrollStatus();
    this.checkScrollPosition();
  }

  componentDidLoad() {
    queueMicrotask(() => {
      if (!this.el.isConnected) {
        return;
      }

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

    this.scrollToElement(slide);
  }

  private scrollToElement(element: HTMLElement) {
    if (this.slidesContainer && element) {
      this.slidesContainer?.scroll({
        left: element.offsetLeft,
        behavior: "smooth",
      });
    }
  }

  private previousSlide() {
    const slides = this.getSlides();
    const activeSlides = this.getActiveSlides();
    const previousSlide =
      activeSlides[0].previousElementSibling ||
      (this.loopAround ? slides[slides.length - 1] : activeSlides[0]);

    this.scrollToElement(previousSlide as HTMLElement);
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

    this.scrollToElement(nextSlide as HTMLElement);
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
    if (this.activeSlides.length) {
      this.scrollToElement(this.activeSlides[0]);
    }

    this.checkScrollStatus();
    this.checkScrollPosition();
  };

  private onScroll = () => {
    this.updateActiveSlideReferences();
    this.checkScrollPosition();
  };

  render() {
    this.el.style.setProperty("--swirl-carousel-spacing", `${this.spacing}px`);
    this.el.style.setProperty(
      "--swirl-carousel-fade-color",
      this.carouselFadeColorMap.get(this.fadeColor)
    );

    const slidesStyles = {
      padding: Boolean(this.padding)
        ? `var(--s-space-${this.padding})`
        : undefined,
      paddingBlockEnd: Boolean(this.paddingBlockEnd)
        ? `var(--s-space-${this.paddingBlockEnd})`
        : undefined,
      paddingBlockStart: Boolean(this.paddingBlockStart)
        ? `var(--s-space-${this.paddingBlockStart})`
        : undefined,
      paddingInlineEnd: Boolean(this.paddingInlineEnd)
        ? `var(--s-space-${this.paddingInlineEnd})`
        : undefined,
      paddingInlineStart: Boolean(this.paddingInlineStart)
        ? `var(--s-space-${this.paddingInlineStart})`
        : undefined,
      scrollPadding: Boolean(this.paddingInlineStart)
        ? `var(--s-space-${this.paddingInlineStart})`
        : Boolean(this.padding)
        ? `var(--s-space-${this.padding})`
        : undefined,
    };

    const className = classnames("carousel", {
      "carousel--fade": this.fade,
      "carousel--is-at-start": this.isAtStart,
      "carousel--is-at-end": this.isAtEnd,
    });

    return (
      <Host
        aria-label={this.label}
        aria-roledescription="carousel"
        role="group"
      >
        <div class={className}>
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
            style={slidesStyles}
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
