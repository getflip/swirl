import { Component, h, Host } from "@stencil/core";

/**
 * @slot slot - The cell content.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-table-cell.css",
  tag: "swirl-table-cell",
})
export class SwirlTableCell {
  render() {
    return (
      <Host class="table-cell" role="cell">
        <slot></slot>
      </Host>
    );
  }
}
