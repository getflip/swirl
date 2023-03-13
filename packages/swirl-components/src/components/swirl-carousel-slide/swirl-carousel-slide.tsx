import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * slot - The slide contents
 */
@Component({
  shadow: true,
  styleUrl: "swirl-carousel-slide.css",
  tag: "swirl-carousel-slide",
})
export class SwirlCarouselSlide {
  @Prop() label?: string;
  @Prop() minHeight?: string;
  @Prop() width?: string = "15.5rem";

  render() {
    const className = classnames("carousel-slide", {
      "carousel-slide--has-min-height": Boolean(this.minHeight),
    });

    return (
      <Host
        aria-roledescription="slide"
        aria-label={this.label}
        class={className}
        role="group"
        style={{ flexBasis: this.width, minHeight: this.minHeight }}
        tabIndex={0}
      >
        <slot></slot>
      </Host>
    );
  }
}
