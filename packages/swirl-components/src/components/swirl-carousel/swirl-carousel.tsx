import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-carousel.css",
  tag: "swirl-carousel",
})
export class SwirlCarousel {
  @Prop() label: string;

  render() {
    return (
      <Host aria-roledescription="carousel" class="carousel">
        <button class="nav-button carousel__previous">
          <swirl-icon-arrow-back></swirl-icon-arrow-back>
        </button>
        <div class="carousel__content">
          <slot></slot>
        </div>
        <button class="nav-button carousel__next">
          <swirl-icon-arrow-forward></swirl-icon-arrow-forward>
        </button>
      </Host>
    );
  }
}
