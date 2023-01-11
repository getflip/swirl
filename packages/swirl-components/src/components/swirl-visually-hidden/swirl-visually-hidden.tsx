import { Component, h, Host } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-visually-hidden.css",
  tag: "swirl-visually-hidden",
})
export class SwirlVisuallyHidden {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
