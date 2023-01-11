import { Component, h, Host } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-visually-hidden.css",
  tag: "flip-visually-hidden",
})
export class FlipVisuallyHidden {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
