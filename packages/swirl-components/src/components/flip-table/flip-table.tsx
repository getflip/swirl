import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";
import { isMobileViewport } from "../../utils";
import debouncePromise from "debounce-promise";

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

  @State() scrollable: boolean;

  private container: HTMLElement;

  async componentDidRender() {
    await this.updateLayout();
    this.updateScrollable();
  }

  @Listen("resize", { target: "window" })
  async onWindowResize() {
    await this.updateLayout();
    this.updateScrollable();
  }

  private updateScrollable() {
    const scrollable = this.container.scrollWidth > this.container.clientWidth;

    if (scrollable !== this.scrollable) {
      this.scrollable = scrollable;
    }
  }

  private getColumns() {
    return Array.from(this.el.querySelectorAll("flip-table-column"));
  }

  private getCells() {
    return Array.from(this.el.querySelectorAll("flip-table-cell"));
  }

  private async resetRowGroupStyles() {
    const tableRowGroups = Array.from(
      this.el.querySelectorAll("flip-table-row-group")
    );

    tableRowGroups.forEach((tableRowGroup) => {
      tableRowGroup.shadowRoot.querySelector<HTMLDivElement>(
        ".table-row-group__header-row"
      ).style.width = "";
    });

    await new Promise((resolve) => setTimeout(resolve));
  }

  private async resetColumnStyles() {
    const columns = this.getColumns();

    columns.forEach((column) => {
      column.classList.remove("table-column--has-shadow");

      column.style.right = "";
      column.style.left = "";
      column.style.position = "";
      column.style.zIndex = "";
    });

    await new Promise((resolve) => setTimeout(resolve));
  }

  private async resetCellStyles() {
    const cells = this.getCells();

    cells.forEach((cell) => {
      cell.classList.remove("table-cell--has-shadow");

      cell.style.flex = "";
      cell.style.left = "";
      cell.style.right = "";
      cell.style.position = "";
      cell.style.zIndex = "";
    });

    await new Promise((resolve) => setTimeout(resolve));
  }

  private updateLayout = debouncePromise(async () => {
    await this.resetRowGroupStyles();
    await this.resetCellStyles();
    await this.resetColumnStyles();
    await this.layoutRowGroups();
    await this.layOutColumns();
    this.layOutCells();
  }, 100);

  private async layoutRowGroups() {
    const tableRowGroups = Array.from(
      this.el.querySelectorAll("flip-table-row-group")
    );

    const scrollWidth = `${
      this.el.shadowRoot.querySelector(".table__container").scrollWidth
    }px`;

    tableRowGroups.forEach((tableRowGroup) => {
      tableRowGroup.shadowRoot.querySelector<HTMLDivElement>(
        ".table-row-group__header-row"
      ).style.width = scrollWidth;
    });
  }

  private async layOutColumns() {
    const columns = this.getColumns();
    const tableContainer = this.container;
    const tableContainerWidth = tableContainer.clientWidth;

    columns.forEach((column, index) => {
      if (!column.sticky || isMobileViewport()) {
        return;
      }

      const isInFirstHalfOfTable = index <= Math.floor(columns.length / 2);
      const nextColumnIsSticky = columns[index + 1]?.sticky;
      const prevColumnIsSticky = columns[index - 1]?.sticky;
      const columnIsOnTopOfShadow = isInFirstHalfOfTable && nextColumnIsSticky;

      column.style.zIndex = columnIsOnTopOfShadow ? "1" : "";

      const columnHasShadow =
        (isInFirstHalfOfTable && !nextColumnIsSticky) ||
        (!isInFirstHalfOfTable && !prevColumnIsSticky);

      if (columnHasShadow) {
        column.classList.add("table-column--has-shadow");
      } else {
        column.classList.remove("table-column--has-shadow");
      }

      const offset = isInFirstHalfOfTable
        ? column.offsetLeft
        : Math.max(
            0,
            tableContainerWidth -
              (column.offsetLeft + column.getBoundingClientRect().width)
          );

      column.style.position = "sticky";

      if (isInFirstHalfOfTable) {
        column.style.left = `${offset}px`;
      } else {
        column.style.right = `${offset}px`;
      }
    });

    await new Promise((resolve) => setTimeout(resolve));
  }

  private layOutCells() {
    const columns = this.getColumns();
    const cells = this.getCells();

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
      const columnIsSticky = column.sticky;
      const columnWidth =
        column.width || `${column.getBoundingClientRect().width}px`;

      cellsOfColumn.forEach((cell) => {
        const cellSticksToLeft = columnIsSticky && isInFirstHalfOfTable;
        const cellSticksToRight = columnIsSticky && !isInFirstHalfOfTable;
        const cellIsOnTopOfShadow = isInFirstHalfOfTable && nextColumnIsSticky;

        cell.style.flex = Boolean(columnWidth) ? `0 0 ${columnWidth}` : "";

        if (isMobileViewport()) {
          cell.classList.remove("table-cell--has-shadow");

          cell.style.left = "";
          cell.style.right = "";
          cell.style.position = "";
          cell.style.zIndex = "";

          return;
        }

        cell.style.left = cellSticksToLeft ? offset : "";
        cell.style.right = cellSticksToRight ? offset : "";
        cell.style.position = columnIsSticky ? "sticky" : "";
        cell.style.zIndex = cellIsOnTopOfShadow ? "1" : "";

        const cellHasShadow =
          columnIsSticky &&
          ((isInFirstHalfOfTable && !nextColumnIsSticky) ||
            (!isInFirstHalfOfTable && !prevColumnIsSticky));

        if (cellHasShadow) {
          cell.classList.add("table-cell--has-shadow");
        } else {
          cell.classList.remove("table-cell--has-shadow");
        }
      });
    });
  }

  render() {
    const className = classnames("table", {
      "table--scrollable": this.scrollable,
    });

    return (
      <Host>
        <div class={className}>
          <div class="table__container" ref={(el) => (this.container = el)}>
            <div
              aria-describedby={Boolean(this.caption) ? "caption" : undefined}
              aria-label={this.label}
              role="table"
              class="table__table"
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
              <div class="table__body">
                <slot name="rows"></slot>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
