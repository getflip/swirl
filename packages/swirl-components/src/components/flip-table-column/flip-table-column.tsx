import { Component, Element, h, Host, Prop } from "@stencil/core";

export type FlipTableColumnSort = "ascending" | "descending";

/**
 * @slot slot - The column label.
 */
@Component({
  shadow: true,
  styleUrl: "flip-table-column.css",
  tag: "flip-table-column",
})
export class FlipTableColumn {
  @Element() el: HTMLElement;

  @Prop() sort?: FlipTableColumnSort;
  @Prop() maxWidth?: string;
  @Prop() minWidth?: string = "fit-content";
  @Prop() sticky?: boolean;
  @Prop() width?: string;

  render() {
    const styles = {
      flex: Boolean(this.width) ? `0 0 ${this.width}` : "",
      maxWidth: this.maxWidth || "",
      minWidth: this.minWidth || "",
    };

    return (
      <Host
        aria-sort={this.sort}
        class="table-column"
        role="columnheader"
        style={styles}
      >
        <span>
          <slot></slot>
        </span>
        <span class="table-column__sort-indicator">
          {this.sort === "ascending" && (
            <flip-icon-expand-less></flip-icon-expand-less>
          )}
          {this.sort === "descending" && (
            <flip-icon-expand-more></flip-icon-expand-more>
          )}
          {!Boolean(this.sort) && " "}
        </span>
      </Host>
    );
  }
}
