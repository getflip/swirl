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
  @Prop() minWidth?: string = "40px";
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
        <slot></slot>
      </Host>
    );
  }
}
