import { Component, h, Host } from "@stencil/core";

/**
 * @slot slot - The description list items
 */
@Component({
  shadow: true,
  styleUrl: "swirl-description-list.css",
  tag: "swirl-description-list",
})
export class SwirlDescriptionList {
  render() {
    return (
      <Host>
        <div class="description-list" role="list">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
