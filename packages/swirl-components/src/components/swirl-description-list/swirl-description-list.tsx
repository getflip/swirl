import { Component, h, Host } from "@stencil/core";

/**
 * @slot slot - The description list items
 */
@Component({
  shadow: true,
  styleUrl: "swirl-description-list.css",
  tag: "flip-description-list",
})
export class FlipDescriptionList {
  render() {
    return (
      <Host>
        <dl class="description-list">
          <slot></slot>
        </dl>
      </Host>
    );
  }
}
