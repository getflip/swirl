import { Component, h, Host } from "@stencil/core";

@Component({
  scoped: true,
  shadow: false,
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
