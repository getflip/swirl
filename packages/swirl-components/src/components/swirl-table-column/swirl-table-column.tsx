import { Component, Element, h, Host, Prop } from "@stencil/core";
import classNames from "classnames";
import { closestPassShadow } from "../../utils";

export type SwirlTableColumnSort = "ascending" | "descending";
export type SwirlTableColumnVariant = "default" | "sunken";

/**
 * @slot slot - The column label.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-table-column.css",
  tag: "swirl-table-column",
})
export class SwirlTableColumn {
  @Element() el: HTMLElement;

  @Prop() variant?: SwirlTableColumnVariant = "default";
  @Prop() sort?: SwirlTableColumnSort;
  @Prop() sortable?: boolean;
  @Prop() maxWidth?: string;
  @Prop() minWidth?: string = "fit-content";
  @Prop() sticky?: boolean;
  @Prop() width?: string;

  componentDidRender() {
    const table = closestPassShadow(
      this.el,
      "swirl-table"
    ) as HTMLSwirlTableElement;

    table?.rerender();
  }

  render() {
    const styles = {
      flex: Boolean(this.width) ? `0 0 ${this.width}` : "",
      maxWidth: this.maxWidth || "",
      minWidth: this.minWidth || "",
    };

    const variant = this.variant ?? "default";
    const className = classNames("table-column", {
      "table-column--default": variant === "default",
      "table-column--sunken": variant === "sunken",
    });

    return (
      <Host
        aria-sort={this.sort}
        class={className}
        role="columnheader"
        style={styles}
      >
        <span>
          <slot></slot>
        </span>
        {this.sortable && (
          <span class="table-column__sort-indicator">
            {this.sort === "ascending" && (
              <swirl-icon-arrow-upward
                aria-hidden="true"
                size={20}
              ></swirl-icon-arrow-upward>
            )}
            {this.sort === "descending" && (
              <swirl-icon-arrow-downward
                aria-hidden="true"
                size={20}
              ></swirl-icon-arrow-downward>
            )}
            {!Boolean(this.sort) && " "}
          </span>
        )}
      </Host>
    );
  }
}
