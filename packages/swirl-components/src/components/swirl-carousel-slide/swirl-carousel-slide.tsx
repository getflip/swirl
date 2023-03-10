import { Component, h, Host, Prop } from "@stencil/core";

/**
 * slot - The slide contents
 */
@Component({
  shadow: true,
  styleUrl: "swirl-carousel-slide.css",
  tag: "swirl-carousel-slide",
})
export class SwirlCarouselSlide {
  @Prop() label!: string;

  render() {
    return (
      <Host
        aria-roledescription="slide"
        aria-label={this.label}
        class="carousel-slide"
        role="group"
        tabIndex={0}
      >
        <slot></slot>
      </Host>
    );
  }
}
