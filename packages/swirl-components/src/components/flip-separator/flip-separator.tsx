import { Component, h, Host } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-separator.css",
  tag: "flip-separator",
})
export class FlipSeparator {
  render() {
    return (
      <Host class="separator" role="separator">
        <span class="separator__line"></span>
      </Host>
    );
  }
}
