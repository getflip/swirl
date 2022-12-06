import { Component, Element, h, Host, Listen, Prop } from "@stencil/core";

/**
 * @slot columns - Column container, should contain FlipTableColumns.
 * @slot rows - Row container, should contain FlipTableRows.
 */
@Component({
  shadow: true,
  styleUrl: "flip-table.css",
  tag: "flip-table",
})
export class FlipTable {
  @Element() el: HTMLElement;

  @Prop() caption?: string;
  @Prop() label!: string;

  componentDidRender() {
    this.updateCellStyles();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.updateCellStyles();
  }

  private updateCellStyles() {
    const columns = Array.from(this.el.querySelectorAll("flip-table-column"));
    const cells = Array.from(this.el.querySelectorAll("flip-table-cell"));

    columns.forEach((column, colIndex) => {
      const cellsOfColumn = cells.filter((_, cellIndex) => {
        return (colIndex - cellIndex) % columns.length === 0;
      });

      const isInFirstHalfOfTable = colIndex <= Math.floor(columns.length / 2);

      const offset = isInFirstHalfOfTable
        ? window.getComputedStyle(column).left
        : window.getComputedStyle(column).right;

      const nextColumnIsSticky = columns[colIndex + 1]?.sticky;
      const prevColumnIsSticky = columns[colIndex - 1]?.sticky;
      const isSticky = column.sticky;
      const width = column.width;
      const maxWidth = column.maxWidth;
      const minWidth = column.minWidth;

      cellsOfColumn.forEach((cell) => {
        cell.style.flex = Boolean(width) ? `0 0 ${width}` : "";
        cell.style.left = isSticky && isInFirstHalfOfTable ? offset : "";
        cell.style.right = isSticky && !isInFirstHalfOfTable ? offset : "";
        cell.style.maxWidth = maxWidth || "";
        cell.style.minWidth = minWidth || "";
        cell.style.position = isSticky ? "sticky" : "";
        cell.style.zIndex =
          isInFirstHalfOfTable && nextColumnIsSticky ? "1" : "";

        if (
          isSticky &&
          ((isInFirstHalfOfTable && !nextColumnIsSticky) ||
            (!isInFirstHalfOfTable && !prevColumnIsSticky))
        ) {
          cell.classList.add("table-cell--has-shadow");
        } else {
          cell.classList.remove("table-cell--has-shadow");
        }
      });
    });
  }

  render() {
    return (
      <Host>
        <div
          aria-describedby={Boolean(this.caption) ? "caption" : undefined}
          aria-label={this.label}
          role="table"
          class="table"
        >
          {this.caption && (
            <flip-visually-hidden>
              <div id="caption">{this.caption}</div>
            </flip-visually-hidden>
          )}
          <div role="rowgroup">
            <div class="table__header" role="row">
              <slot name="columns"></slot>
            </div>
          </div>
          <div class="table__body" role="rowgroup">
            <slot name="rows"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
