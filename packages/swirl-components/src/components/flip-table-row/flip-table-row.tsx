import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @slot slot - The cells of this row.
 */
@Component({
  shadow: true,
  styleUrl: "flip-table-row.css",
  tag: "flip-table-row",
})
export class FlipTableRow {
  @Prop() index?: number;

  render() {
    return (
      <Host aria-rowindex={this.index} class="table-row" role="row">
        <slot></slot>
      </Host>
    );
  }
}
