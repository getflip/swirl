import { Component, h, Host } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-banner.css",
  tag: "flip-banner",
})
export class FlipBanner {
  render() {
    return <Host tabIndex="0">Hello World</Host>;
  }
}
