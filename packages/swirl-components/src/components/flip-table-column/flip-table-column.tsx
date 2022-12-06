import { Component, Element, h, Host, Listen, Prop } from "@stencil/core";
import classnames from "classnames";

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

  private isInFirstHalfOfTable: boolean;

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.updatePosition();
  }

  private updatePosition() {
    this.el.style.left = "";
    this.el.style.position = "";

    if (this.sticky) {
      const columns = Array.from(this.el.parentElement.childNodes);
      const index = columns.indexOf(this.el);

      this.isInFirstHalfOfTable = index <= Math.floor(columns.length / 2);

      setTimeout(() => {
        if (this.isInFirstHalfOfTable) {
          this.el.style.left = this.sticky ? `${this.el.offsetLeft}px` : "";
          this.el.style.position = this.sticky ? "sticky" : "";
        } else {
          const parentTable = this.el.closest("flip-table");
          const tableContainerWidth = parentTable?.parentElement.clientWidth;

          const offset = Math.max(
            0,
            tableContainerWidth - (this.el.offsetLeft + this.el.offsetWidth)
          );

          this.el.style.right = this.sticky ? `${offset}px` : "";
          this.el.style.position = this.sticky ? "sticky" : "";
        }
      });
    }
  }

  render() {
    this.updatePosition();

    const nextColumnIsSticky = (
      this.el.nextElementSibling as HTMLFlipTableColumnElement
    )?.sticky;

    const prevColumnIsSticky = (
      this.el.previousElementSibling as HTMLFlipTableColumnElement
    )?.sticky;

    const hasShadow =
      this.sticky &&
      ((this.isInFirstHalfOfTable && !nextColumnIsSticky) ||
        (!this.isInFirstHalfOfTable && !prevColumnIsSticky));

    const styles = {
      flex: Boolean(this.width) ? `0 0 ${this.width}` : "",
      maxWidth: this.maxWidth || "",
      minWidth: this.minWidth || "",
      zIndex: this.isInFirstHalfOfTable && nextColumnIsSticky ? "1" : "",
    };

    const className = classnames("table-column", {
      "table-column--has-shadow": hasShadow,
    });

    return (
      <Host
        aria-sort={this.sort}
        class={className}
        role="columnheader"
        style={styles}
      >
        <slot></slot>
      </Host>
    );
  }
}
