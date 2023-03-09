import { Component, h, Host, Element } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-carousel.css",
  tag: "swirl-carousel",
})
export class SwirlCarousel {
  @Element() el!: HTMLElement;

  private scrollElement;

  private scrollToPrevious(): (event: MouseEvent) => void {
    console.log(this.scrollElement);
    this.scrollElement?.scroll(-100, 0);
    return;
  }

  private scrollToNext(): (event: MouseEvent) => void {
    this.scrollElement?.scroll(100, 0);
    return;
  }

  componentDidLoad() {
    console.log(
      this.el.shadowRoot.getElementById("carousel-content").scroll(100, 0)
    );
    this.scrollElement = this.el.shadowRoot.getElementById("carousel-content");
    console.log(this.scrollElement);
  }

  render() {
    return (
      <Host aria-roledescription="carousel" class="carousel">
        <button
          class="nav-button carousel__previous"
          onClick={this.scrollToPrevious}
        >
          <swirl-icon-arrow-back></swirl-icon-arrow-back>
        </button>
        <div class="carousel__content" id="carousel-content">
          <slot></slot>
        </div>
        <button class="nav-button carousel__next" onClick={this.scrollToNext}>
          <swirl-icon-arrow-forward></swirl-icon-arrow-forward>
        </button>
      </Host>
    );
  }
}
