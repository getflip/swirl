import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { closestPassShadow } from "../../utils";

/**
 * @slot slot - The cells of this row.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-table-row.css",
  tag: "swirl-table-row",
})
export class SwirlTableRow {
  @Element() el: HTMLElement;

  @Prop() highlighted?: boolean;
  @Prop() index?: number;

  componentDidLoad() {
    const table = closestPassShadow(this.el, "swirl-table");

    (table as HTMLSwirlTableElement)?.rerender();
  }

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
