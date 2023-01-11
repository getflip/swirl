import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot slot - The cells of this row.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-table-row.css",
  tag: "flip-table-row",
})
export class FlipTableRow {
  @Prop() highlighted?: boolean;
  @Prop() index?: number;

  render() {
    const className = classnames("table-row", {
      "table-row--highlighted": this.highlighted,
    });

    return (
      <Host aria-rowindex={this.index} class={className} role="row">
        <slot></slot>
      </Host>
    );
  }
}
