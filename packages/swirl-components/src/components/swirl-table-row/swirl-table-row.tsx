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

  /**
   * 0-indexed tree depth. Mapped to 1-based `aria-level` for treegrid.
   */
  @Prop() treeLevel?: number;

  /**
   * Whether this row has children. When true, `aria-expanded` is set from
   * `treeExpanded`.
   */
  @Prop() treeExpandable?: boolean = false;

  /**
   * Whether this expandable row is currently expanded. Ignored when not
   * expandable.
   */
  @Prop() treeExpanded?: boolean = false;

  /**
   * Number of siblings at this level. Mapped to `aria-setsize`.
   */
  @Prop() treeSetSize?: number;

  /**
   * 1-based position among siblings. Mapped to `aria-posinset`.
   */
  @Prop() treePosInset?: number;

  componentDidLoad() {
    const table = closestPassShadow(this.el, "swirl-table");

    (table as HTMLSwirlTableElement)?.rerender();
  }

  render() {
    const className = classnames("table-row", {
      "table-row--highlighted": this.highlighted,
    });

    const ariaLevel =
      this.treeLevel === undefined ? undefined : this.treeLevel + 1;

    return (
      <Host
        aria-expanded={
          this.treeExpandable ? String(Boolean(this.treeExpanded)) : undefined
        }
        aria-level={ariaLevel}
        aria-posinset={this.treePosInset}
        aria-rowindex={this.index}
        aria-setsize={this.treeSetSize}
        class={className}
        role="row"
      >
        <slot></slot>
      </Host>
    );
  }
}
