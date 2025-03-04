import debouncePromise from "debounce-promise";

import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";

import Sortable, { SortableEvent } from "sortablejs";
import { debounce, isMobileViewport, querySelectorAllDeep } from "../../utils";

export type SwirlTableDropRowEvent = Pick<
  SortableEvent,
  "oldIndex" | "newIndex" | "item"
> & {
  itemId: string;
  newNextSiblingItemId: string | undefined;
  newPrevSiblingItemId: string | undefined;
};

const defaultDragDropInstructions = {
  end: "Dropped. Final position in table: {position} of {rowCount}.",
  initial: "Press space to move the row.",
  moved: "Current position in table: {position} of {rowCount}.",
  start:
    "Row grabbed. Current position in table: {position} of {rowCount}. Press up and down arrow keys to change position, Space to drop.",
};

/**
 * @slot columns - Column container, should contain SwirlTableColumns.
 * @slot rows - Row container, should contain SwirlTableRows.
 */
@Component({
  shadow: false,
  scoped: true,
  styleUrl: "swirl-table.css",
  tag: "swirl-table",
})
export class SwirlTable {
  @Element() el: HTMLElement;

  @Prop() caption?: string;
  @Prop() dragDropHandle?: string;
  @Prop() dragDropInstructions = defaultDragDropInstructions;
  @Prop() emptyStateLabel?: string = "No results found.";
  @Prop() enableDragDrop?: boolean;
  @Prop() label!: string;

  @Event() dropRow: EventEmitter<SwirlTableDropRowEvent>;

  @State() empty: boolean;
  @State() liveRegionText = "";
  @State() scrollable: boolean;
  @State() scrolled: boolean;
  @State() scrolledToEnd: boolean;

  private bodyEl: HTMLElement;
  private container: HTMLElement;
  private dragDropContainer: HTMLElement;
  private intersectionObserver: IntersectionObserver;
  private movingViaKeyboard: boolean;
  private positionBeforeKeyboardMove?: number;
  private sortable: Sortable | undefined;

  async componentDidLoad() {
    this.setupIntersectionObserver();

    queueMicrotask(() => {
      this.setupDragDrop();
    });
  }

  disconnectedCallback() {
    this.intersectionObserver?.disconnect();
    this.sortable?.destroy();
  }

  @Watch("enableDragDrop")
  handleEnableDragDropChange() {
    queueMicrotask(() => {
      this.setupDragDrop();
    });
  }

  /**
   * Set up an Intersection Observer to monitor when the table container becomes visible.
   * This is important because the table's layout may need updating when it becomes visible,
   * especially if it is rendered within a modal that opens after rendering.
   */
  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      this.onVisibilityChange.bind(this),
      {
        threshold: 0,
      }
    );

    this.intersectionObserver.observe(this.container);
  }

  private setupDragDrop() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = undefined;
    }

    if (this.enableDragDrop) {
      const tableHasRowGroups = !!this.el.querySelector(
        "swirl-table-row-group"
      );

      if (tableHasRowGroups) {
        // Drag & drop for multiple row groups is not yet implemented.
        console.warn(
          '[Swirl] Drag & drop is not yet supported for swirl-tables using the "swirl-table-row-group" component.'
        );
        return;
      }

      if (!this.dragDropHandle) {
        console.warn(
          '[Swirl] swirl-table required the "dragDropHandle" prop to be set when drag & drop is enabled.'
        );
        return;
      }

      const slottedEl = this.el.querySelector('[slot="rows"]') as HTMLElement;

      this.dragDropContainer =
        slottedEl?.tagName !== "SWIRL-TABLE-ROW"
          ? slottedEl ?? this.bodyEl
          : this.bodyEl;

      this.sortable = new Sortable(this.dragDropContainer, {
        animation: 100,
        direction: "vertical",
        handle: this.dragDropHandle,
        fallbackOnBody: true,
        group: `swirl-table-${Math.random().toString().substring(2)}`,
        onEnd: (event) => {
          event.stopPropagation();

          const { to, newIndex, oldIndex, item } = event;

          this.dropRow.emit({
            newIndex,
            oldIndex,
            item,
            itemId:
              item.id ?? item.querySelector(":scope > swirl-table-row").id,
            newNextSiblingItemId:
              newIndex < to.children.length - 1
                ? to.children[newIndex + 1].id
                : undefined,
            newPrevSiblingItemId:
              newIndex > 0 ? to.children[newIndex - 1].id : undefined,
          });
        },
      });
    }
  }

  private async onVisibilityChange(entries: IntersectionObserverEntry[]) {
    const inViewport = entries.some((entry) => entry.isIntersecting);

    if (inViewport) {
      // Delay layout update to ensure the container is fully visible,
      // especially if it was initially rendered in a modal.
      setTimeout(async () => {
        await this.updateLayout();
      }, 100);
    }
  }

  async componentDidRender() {
    await this.updateLayout();
    this.updateEmptyState();
  }

  @Listen("resize", { target: "window" })
  async onWindowResize() {
    await this.updateLayout();
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
      this.updateEmptyState();
    },
    0,
    true
  );

  private resetEmptyRowStyles() {
    const emptyRow = this.el.querySelector<HTMLElement>(".table__empty-row");

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
      column.style.zIndex = "";
    });
  }

  private resetCellStyles() {
    const cells = this.getCells();

    cells.forEach((cell) => {
      cell.classList.remove(
        "table-cell--has-shadow",
        "table-cell--is-sticky",
        "table-cell--is-sticky-right"
      );

      cell.style.flex = "";
      cell.style.left = "";
      cell.style.right = "";
      cell.style.position = "";
      cell.style.zIndex = "";
    });
  }

  private updateScrolledState() {
    const isMobile = isMobileViewport();

    if (this.container === undefined) {
      return;
    }

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
      this.updateScrolledState();
    },
    16,
    { leading: true }
  );

  private layoutEmptyRow() {
    const emptyRow = this.el.querySelector<HTMLElement>(".table__empty-row");

    if (!Boolean(emptyRow)) {
      return;
    }

    const scrollWidth = `${
      this.el.querySelector(".table__container").scrollWidth
    }px`;

    emptyRow.style.width = scrollWidth;
  }

  private layoutRowGroups() {
    const tableRowGroups = Array.from(
      this.el.querySelectorAll("swirl-table-row-group")
    );

    const scrollWidth = `${
      this.el.querySelector(".table__container")?.scrollWidth
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

    columns.forEach((column, colIndex) => {
      const cellsOfColumn = this.getCellsForColumn(cells, columns, colIndex);
      const columnProperties = this.calculateColumnProperties(
        column,
        columns,
        colIndex
      );

      cellsOfColumn.forEach((cell) =>
        this.applyCellStyles(cell, column, columnProperties)
      );

      this.applyColumnStyles(column, columnProperties);
    });
  }

  private getCellsForColumn(cells, columns, colIndex) {
    return cells.filter(
      (_, cellIndex) => (colIndex - cellIndex) % columns.length === 0
    );
  }

  private calculateColumnProperties(column, columns, colIndex) {
    const leftOffsetForStickyColumn = column.sticky
      ? this.getLeftOffsetForStickyColumn(columns, colIndex)
      : 0;
    const columnWidth = `${column.getBoundingClientRect().width}px`;
    const isLastColumnSticky = column.sticky && columns.length === colIndex + 1;
    const hasShadowRight =
      column.sticky && !this.hasStickyColumnsToRight(columns, colIndex);

    return {
      leftOffsetForStickyColumn,
      columnWidth,
      isLastColumnSticky,
      hasShadowRight,
    };
  }

  private applyCellStyles(cell, column, columnProperties) {
    const {
      leftOffsetForStickyColumn,
      columnWidth,
      isLastColumnSticky,
      hasShadowRight,
    } = columnProperties;

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
  }

  private applyColumnStyles(column, columnProperties) {
    if (isMobileViewport()) {
      return;
    }

    const { leftOffsetForStickyColumn, isLastColumnSticky, hasShadowRight } =
      columnProperties;

    if (column.sticky && !isLastColumnSticky) {
      column.classList.add("table-column--is-sticky");
      column.style.left = leftOffsetForStickyColumn + "px";

      if (hasShadowRight) {
        column.classList.add("table-column--has-shadow-right");
      }
    }

    if (isLastColumnSticky) {
      column.classList.add(
        "table-column--is-sticky-right",
        "table-column--has-shadow-left"
      );
    }
  }

  private getLeftOffsetForStickyColumn(columns, colIndex) {
    return columns.slice(0, colIndex).reduce((acc, column) => {
      if (column.sticky) {
        acc += column.getBoundingClientRect().width;
        return acc;
      }
    }, 0);
  }

  private hasStickyColumnsToRight(columns, colIndex) {
    return columns
      .slice(colIndex + 1, columns.length - 1)
      .some((column) => column.sticky);
  }

  private updateEmptyState() {
    const rowsContainer = this.el.querySelector('[slot="rows"]');

    this.empty = !Boolean(rowsContainer) || rowsContainer.children.length === 0;
  }

  private updateLiveRegionText(
    key?: keyof typeof this.dragDropInstructions,
    data: { position?: number; rowCount?: number } = {}
  ) {
    let newText = key ? this.dragDropInstructions[key] : "";

    for (const [key, value] of Object.entries(data ?? {})) {
      newText = newText.replaceAll(`{${key}}`, String(value));
    }

    if (newText !== this.liveRegionText) {
      this.liveRegionText = newText;
    }
  }

  private toggleKeyboardMove(row: HTMLSwirlTableRowElement) {
    if (this.movingViaKeyboard) {
      this.endKeyboardMove(row);
    } else {
      this.startKeyboardMove(row);
    }
  }

  private startKeyboardMove(row: HTMLSwirlTableRowElement) {
    this.movingViaKeyboard = true;
    this.positionBeforeKeyboardMove = Array.from(this.bodyEl.children).indexOf(
      row
    );

    row.classList.add("table-row--moving");

    this.updateLiveRegionText("start", {
      position: Array.from(this.bodyEl.children).indexOf(row) + 1,
      rowCount: this.bodyEl.children.length,
    });
  }

  private endKeyboardMove(row: HTMLSwirlTableRowElement) {
    this.movingViaKeyboard = false;

    row.classList.remove("table-row--moving");

    this.updateLiveRegionText("end", {
      position: Array.from(this.bodyEl.children).indexOf(row) + 1,
      rowCount: this.bodyEl.children.length,
    });

    this.dropRow.emit({
      item: row,
      newIndex: Array.from(this.bodyEl.children).indexOf(row),
      oldIndex: this.positionBeforeKeyboardMove,
      itemId: row.id,
      newNextSiblingItemId:
        Array.from(this.bodyEl.children).indexOf(row) <
        this.bodyEl.children.length - 1
          ? this.bodyEl.children[
              Array.from(this.bodyEl.children).indexOf(row) + 1
            ].id
          : undefined,
      newPrevSiblingItemId:
        Array.from(this.bodyEl.children).indexOf(row) > 0
          ? this.bodyEl.children[
              Array.from(this.bodyEl.children).indexOf(row) - 1
            ].id
          : undefined,
    });

    this.positionBeforeKeyboardMove = undefined;
  }

  private moveRow(row: HTMLSwirlTableRowElement, direction: "up" | "down") {
    if (!this.movingViaKeyboard) {
      return;
    }

    let newIndex: number;

    if (direction === "up") {
      const currentIndex = Array.from(this.dragDropContainer.children).indexOf(
        row
      );
      newIndex = Math.max(0, currentIndex - 1);

      this.dragDropContainer.insertBefore(
        row,
        this.dragDropContainer.children[newIndex]
      );
    } else {
      const currentIndex = Array.from(this.dragDropContainer.children).indexOf(
        row
      );
      newIndex = Math.min(
        this.dragDropContainer.children.length - 1,
        currentIndex + 1
      );

      this.dragDropContainer.insertBefore(
        row,
        this.dragDropContainer.children[newIndex + 1]
      );
    }

    this.updateLiveRegionText("moved", {
      position: newIndex + 1,
      rowCount: this.dragDropContainer.children.length,
    });

    const handle = querySelectorAllDeep(row, this.dragDropHandle)?.[0];

    if (handle.tagName === "BUTTON") {
      handle.focus();
    } else {
      handle.querySelector("button")?.focus();
    }
  }

  private onScroll = () => {
    this.updateScrolledState();
  };

  private onSlotChange = async () => {
    await this.updateLayout();
    this.updateEmptyState();
    this.setupDragDrop();
  };

  private onFocus = (event: FocusEvent) => {
    const focusedDragHandle = !!(event.target as HTMLElement)?.closest(
      this.dragDropHandle
    );

    if (this.liveRegionText === "" && focusedDragHandle) {
      this.updateLiveRegionText("initial");
    }
  };

  private onBlur = (event: FocusEvent) => {
    const newlyFocusedElement = event.relatedTarget as HTMLElement | undefined;
    const focusedDragHandle = !!newlyFocusedElement?.closest(
      this.dragDropHandle
    );

    if (this.el.contains(newlyFocusedElement) && focusedDragHandle) {
      return;
    }

    if (this.liveRegionText !== "") {
      this.updateLiveRegionText();
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.enableDragDrop) {
      return;
    }

    const row = (event.target as HTMLElement)?.closest("swirl-table-row");
    const focusedDragHandle = !!(event.target as HTMLElement)?.closest(
      this.dragDropHandle
    );

    if (!focusedDragHandle) {
      return;
    }

    if (event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();

      this.toggleKeyboardMove(row);
    } else if (event.code === "ArrowUp") {
      this.moveRow(row, "up");
    } else if (event.code === "ArrowDown") {
      this.moveRow(row, "down");
    }
  };

  render() {
    return (
      <Host>
        <div class="table">
          {this.enableDragDrop && (
            <swirl-visually-hidden>
              <span aria-live="assertive">{this.liveRegionText}</span>
            </swirl-visually-hidden>
          )}

          <div
            class="table__container"
            onFocusin={this.onFocus}
            onFocusout={this.onBlur}
            onKeyDown={this.onKeyDown}
            onScroll={this.onScroll}
            ref={(el) => (this.container = el)}
            tabIndex={-1}
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
              <div class="table__body" ref={(el) => (this.bodyEl = el)}>
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
