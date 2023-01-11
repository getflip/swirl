import { Component, h, Host } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-separator.css",
  tag: "swirl-separator",
})
export class SwirlSeparator {
  render() {
    return (
      <Host class="separator" role="separator">
        <span class="separator__line"></span>
      </Host>
    );
  }
}
