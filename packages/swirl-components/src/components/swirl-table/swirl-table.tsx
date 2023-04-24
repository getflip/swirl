import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import debouncePromise from "debounce-promise";
import { isMobileViewport } from "../../utils";

/**
 * @slot columns - Column container, should contain SwirlTableColumns.
 * @slot rows - Row container, should contain SwirlTableRows.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-table.css",
  tag: "swirl-table",
})
export class SwirlTable {
  @Element() el: HTMLElement;

  @Prop() caption?: string;
  @Prop() emptyStateLabel?: string = "No results found.";
  @Prop() label!: string;

  @State() empty: boolean;
  @State() scrollable: boolean;
  @State() scrolled: boolean;
  @State() scrolledToEnd: boolean;

  private container: HTMLElement;
  private columnObserver: MutationObserver;

  componentDidLoad() {
    this.observeColumnChanges();
  }

  disconnectedCallback() {
    this.columnObserver?.disconnect();
  }

  async componentDidRender() {
    await this.updateLayout();
    this.updateScrolledState();
    this.updateEmptyState();
  }

  @Listen("resize", { target: "window" })
  async onWindowResize() {
    await this.updateLayout();
    this.updateScrolledState();
  }

  private observeColumnChanges() {
    this.columnObserver = new MutationObserver(this.onSlotChange);

    const columnsContainer = this.el.shadowRoot
      .querySelector<HTMLSlotElement>('slot[name="columns"]')
      .assignedElements?.()?.[0];

    if (!Boolean(columnsContainer)) {
      return;
    }

    this.columnObserver.observe(columnsContainer, {
      childList: true,
    });
  }

  private updateScrolledState() {
    const isMobile = isMobileViewport();
    const scrollable = this.container.scrollWidth > this.container.clientWidth;
    const scrolled = this.container.scrollLeft > 0;

    const scrolledToEnd =
      Math.ceil(this.container.clientWidth + this.container.scrollLeft) >=
      Math.floor(this.container.scrollWidth);

    if (scrollable !== this.scrollable) {
      if (scrollable && !isMobile) {
        this.container.classList.add("table__container--scrollable");
      } else {
        this.container.classList.remove("table__container--scrollable");
      }
    }

    if (scrolled !== this.scrolled) {
      if (scrolled && !isMobile) {
        this.container.classList.add("table__container--scrolled");
      } else {
        this.container.classList.remove("table__container--scrolled");
      }
    }

    if (scrolledToEnd !== this.scrolledToEnd) {
      if (scrolledToEnd && !isMobile) {
        this.container.classList.add("table__container--scrolled-to-end");
      } else {
        this.container.classList.remove("table__container--scrolled-to-end");
      }
    }
  }

  private getColumns() {
    return Array.from(this.el.querySelectorAll("swirl-table-column"));
  }

  private getCells() {
    return Array.from(this.el.querySelectorAll("swirl-table-cell"));
  }

  private async resetEmptyRowStyles() {
    const emptyRow =
      this.el.shadowRoot.querySelector<HTMLElement>(".table__empty-row");

    if (!Boolean(emptyRow)) {
      return;
    }

    emptyRow.style.width = "";

    await new Promise((resolve) => setTimeout(resolve));
  }

  private async resetRowGroupStyles() {
    const tableRowGroups = Array.from(
      this.el.querySelectorAll("swirl-table-row-group")
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

  private updateLayout = debouncePromise(
    async () => {
      await this.resetEmptyRowStyles();
      await this.resetRowGroupStyles();
      await this.resetCellStyles();
      await this.resetColumnStyles();
      await this.layoutEmptyRow();
      await this.layoutRowGroups();
      await this.layOutColumns();
      this.layOutCells();
    },
    16,
    { leading: true }
  );

  private async layoutEmptyRow() {
    const emptyRow =
      this.el.shadowRoot.querySelector<HTMLElement>(".table__empty-row");

    if (!Boolean(emptyRow)) {
      return;
    }

    const scrollWidth = `${
      this.el.shadowRoot.querySelector(".table__container").scrollWidth
    }px`;

    emptyRow.style.width = scrollWidth;
  }

  private async layoutRowGroups() {
    const tableRowGroups = Array.from(
      this.el.querySelectorAll("swirl-table-row-group")
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
        column.classList.add(
          isInFirstHalfOfTable
            ? "table-column--has-shadow-right"
            : "table-column--has-shadow-left"
        );
      } else {
        column.classList.remove("table-column--has-shadow-right");
        column.classList.remove("table-column--has-shadow-left");
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
          cell.classList.add(
            isInFirstHalfOfTable
              ? "table-cell--has-shadow-right"
              : "table-cell--has-shadow-left"
          );
        } else {
          cell.classList.remove("table-cell--has-shadow-right");
          cell.classList.remove("table-cell--has-shadow-left");
        }
      });
    });
  }

  private updateEmptyState() {
    const rowsContainer = this.el.querySelector('[slot="rows"]');

    this.empty = !Boolean(rowsContainer) || rowsContainer.children.length === 0;
  }

  private onScroll = () => {
    this.updateScrolledState();
  };

  private onSlotChange = async () => {
    await this.updateLayout();
    this.updateScrolledState();
    this.updateEmptyState();
  };

  render() {
    return (
      <Host>
        <div class="table">
          <div
            class="table__container"
            onScroll={this.onScroll}
            ref={(el) => (this.container = el)}
          >
            <div
              aria-describedby={Boolean(this.caption) ? "caption" : undefined}
              aria-label={this.label}
              role="table"
              class="table__table"
            >
              {this.caption && (
                <swirl-visually-hidden>
                  <div id="caption">{this.caption}</div>
                </swirl-visually-hidden>
              )}
              <div role="rowgroup">
                <div class="table__header" role="row">
                  <slot name="columns" onSlotchange={this.onSlotChange}></slot>
                </div>
              </div>
              <div class="table__body">
                <slot name="rows" onSlotchange={this.onSlotChange}></slot>
                {this.empty && (
                  <div class="table__empty-row" role="row">
                    <div
                      aria-colspan={this.getColumns().length}
                      class="table__empty-row-cell"
                      role="cell"
                    >
                      <swirl-text align="center" size="sm">
                        {this.emptyStateLabel}
                      </swirl-text>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
