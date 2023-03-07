import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-carousel.css",
  tag: "swirl-carousel",
})
export class SwirlCarousel {
  @Prop() label: string;

  render() {
    return <Host>Hello World {this.label}</Host>;
  }
}
