import debouncePromise from "debounce-promise";

import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";

import { debounce, isMobileViewport } from "../../utils";

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

  /**
   * Force a re-render of the table
   */
  @Method()
  async rerender() {
    this.triggerRerender();
  }

  private triggerRerender = debounce(
    async () => {
      await this.updateLayout();
      this.updateScrolledState();
      this.updateEmptyState();
    },
    0,
    true
  );

  private resetEmptyRowStyles() {
    const emptyRow =
      this.el.shadowRoot.querySelector<HTMLElement>(".table__empty-row");

    if (!Boolean(emptyRow)) {
      return;
    }

    emptyRow.style.width = "";
  }

  private resetRowGroupStyles() {
    const tableRowGroups = Array.from(
      this.el.querySelectorAll("swirl-table-row-group")
    );

    tableRowGroups.forEach((tableRowGroup) => {
      const headerRow = tableRowGroup.shadowRoot.querySelector<HTMLDivElement>(
        ".table-row-group__header-row"
      );

      if (!Boolean(headerRow)) {
        return;
      }

      tableRowGroup.shadowRoot.querySelector<HTMLDivElement>(
        ".table-row-group__header-row"
      ).style.width = "";
    });
  }

  private resetColumnStyles() {
    const columns = this.getColumns();

    columns.forEach((column) => {
      column.classList.remove(
        "table-column--has-shadow",
        "table-column--is-sticky",
        "table-column--is-sticky-right"
      );

      column.style.right = "";
      column.style.left = "";
      column.style.position = "";
    });
  }

  private resetCellStyles() {
    const cells = this.getCells();

    cells.forEach((cell) => {
      cell.classList.remove(
        "table-cell--has-shadow",
        "table-cell-is-sticky",
        "table-cell-is-sticky-right"
      );

      cell.style.flex = "";
      cell.style.left = "";
      cell.style.right = "";
      cell.style.position = "";
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

  private updateLayout = debouncePromise(
    async () => {
      this.resetCellStyles();
      this.resetColumnStyles();
      this.resetEmptyRowStyles();
      this.resetRowGroupStyles();
      this.layoutEmptyRow();
      this.layoutRowGroups();
      this.layOutCellsAndColumns();
    },
    16,
    { leading: true }
  );

  private layoutEmptyRow() {
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

  private layoutRowGroups() {
    const tableRowGroups = Array.from(
      this.el.querySelectorAll("swirl-table-row-group")
    );

    const scrollWidth = `${
      this.el.shadowRoot.querySelector(".table__container")?.scrollWidth
    }px`;

    tableRowGroups.forEach((tableRowGroup) => {
      const headerRow = tableRowGroup.shadowRoot.querySelector<HTMLDivElement>(
        ".table-row-group__header-row"
      );

      if (!Boolean(headerRow)) {
        return;
      }

      tableRowGroup.shadowRoot.querySelector<HTMLDivElement>(
        ".table-row-group__header-row"
      ).style.width = scrollWidth;
    });
  }

  private layOutCellsAndColumns() {
    const columns = this.getColumns();
    const cells = this.getCells();
    let leftOffsetForStickyColumn = 0;

    columns.forEach((column, colIndex) => {
      const cellsOfColumn = cells.filter((_, cellIndex) => {
        return (colIndex - cellIndex) % columns.length === 0;
      });

      const columnWidth =
        column.width || `${column.getBoundingClientRect().width}px`;
      const isLastColumnSticky =
        column.sticky && columns.length === colIndex + 1;
      const hasShadowRight =
        column.sticky &&
        !columns.slice(colIndex + 1, columns.length - 1).some((c) => c.sticky);

      cellsOfColumn.forEach((cell) => {
        cell.style.flex = Boolean(columnWidth) ? `0 0 ${columnWidth}` : "";
        if (isMobileViewport()) {
          return;
        }
        if (column.sticky && !isLastColumnSticky) {
          cell.classList.add("table-cell--is-sticky");
          cell.style.left = leftOffsetForStickyColumn + "px";
          if (hasShadowRight) {
            cell.classList.add("table-cell--has-shadow-right");
          }
        }
        if (isLastColumnSticky) {
          cell.classList.add(
            "table-cell--is-sticky-right",
            "table-cell--has-shadow-left"
          );
        }
      });
      if (isMobileViewport()) {
        return;
      }
      if (column.sticky && !isLastColumnSticky) {
        column.classList.add("table-column--is-sticky");
        column.style.left = leftOffsetForStickyColumn + "px";
        if (hasShadowRight) {
          column.classList.add("table-column--has-shadow-right");
        }

        leftOffsetForStickyColumn += column.getBoundingClientRect().width;
      }
      if (isLastColumnSticky) {
        column.classList.add(
          "table-column--is-sticky-right",
          "table-column--has-shadow-left"
        );
      }
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
