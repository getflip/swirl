import {
  defaultRangeExtractor,
  elementScroll,
  observeElementOffset,
  observeElementRect,
  observeWindowOffset,
  observeWindowRect,
  Virtualizer,
  VirtualizerOptions,
  windowScroll,
} from "@tanstack/virtual-core";

export interface SwirlTableVirtualizerConfig {
  estimatedRowHeight: number;
  keptIndexes: number[];
  overscan: number;
  rowCount: number;
}

type ScrollElement = HTMLElement | Window;

/**
 * Decides which rows of a swirl-table to draw and positions them. The consumer
 * renders the rows, identified by `data-index`. Padding on the table body
 * stands in for the rows not drawn. A row's margin-top fills the gap before a
 * kept row far from the visible ones.
 */
export class SwirlTableVirtualizer {
  private virtualizer: Virtualizer<ScrollElement, HTMLElement>;
  private unmount: () => void;
  private scrollMargin: number;
  // Index each row was last measured for. Rows can be reused for other indexes.
  private measuredIndexes = new WeakMap<HTMLElement, number>();
  private observedRows = new Set<HTMLElement>();
  /**
   * Own observer, because the virtualizer's `measureElement` caches elements
   * by index and stops observing reused ones.
   */
  private resizeObserver = new ResizeObserver((entries) =>
    this.resizeRows(
      entries.map(({ borderBoxSize, target }) => ({
        row: target as HTMLElement,
        height: borderBoxSize[0].blockSize,
      }))
    )
  );
  private indexes: number[] = [];
  private isResizingRows = false;
  private hasChangeWhileResizing = false;

  constructor(
    private bodyEl: HTMLElement,
    readonly scrollElement: ScrollElement,
    private config: SwirlTableVirtualizerConfig,
    private onIndexesChange: (indexes: number[]) => void
  ) {
    this.bodyEl.style.overflowAnchor = "none";
    this.scrollMargin = this.measureScrollMargin();
    this.virtualizer = new Virtualizer(this.options());
    this.unmount = this.virtualizer._didMount();
    this.virtualizer._willUpdate();
    this.update();
  }

  setConfig(config: SwirlTableVirtualizerConfig) {
    this.config = config;
    this.applyOptions();
  }

  /**
   * Call after rows were added, removed or re-indexed. Measures new rows and
   * positions all rows.
   */
  sync() {
    this.updateScrollMargin();

    this.observedRows.forEach((row) => {
      if (!row.isConnected) {
        this.resizeObserver.unobserve(row);
        this.observedRows.delete(row);
      }
    });

    const rows = this.getRenderedRows();

    rows.forEach((row) => {
      if (!this.observedRows.has(row)) {
        this.observedRows.add(row);
        this.resizeObserver.observe(row);
      }
    });

    // Read all heights before resizeRows() writes styles, so the browser lays
    // out the table once instead of once per row.
    this.resizeRows(
      rows
        .filter((row) => this.measuredIndexes.get(row) !== getRowIndex(row))
        .map((row) => ({ row, height: row.getBoundingClientRect().height }))
    );

    this.layout();
  }

  destroy() {
    this.unmount();
    this.resizeObserver.disconnect();
    this.observedRows.clear();
    this.bodyEl.style.overflowAnchor = "";
    this.bodyEl.style.paddingTop = "";
    this.bodyEl.style.paddingBottom = "";
    this.getRenderedRows().forEach((row) => (row.style.marginTop = ""));
  }

  private applyOptions() {
    this.virtualizer.setOptions(this.options());
    this.virtualizer._willUpdate();
    this.update();
  }

  private update() {
    // applyOptions() calls update() again with the new margin.
    if (this.updateScrollMargin()) {
      return;
    }

    const indexes = this.virtualizer
      .getVirtualItems()
      .map(({ index }) => index);

    if (!equalIndexes(indexes, this.indexes)) {
      this.indexes = indexes;
      this.onIndexesChange(indexes);
    }

    this.layout();
  }

  /**
   * Measures where the rows start again, as content above the table can
   * change height, e.g. a toolbar appears. Returns whether it changed.
   */
  private updateScrollMargin() {
    const scrollMargin = this.measureScrollMargin();

    if (Math.abs(scrollMargin - this.scrollMargin) < 1) {
      return false;
    }

    this.scrollMargin = scrollMargin;
    this.applyOptions();
    return true;
  }

  /**
   * Reports each row's height for its current index. Every resize makes the
   * virtualizer call onChange, so the rows are positioned once at the end
   * instead of after each resize.
   */
  private resizeRows(sizes: { row: HTMLElement; height: number }[]) {
    this.isResizingRows = true;

    try {
      sizes.forEach(({ row, height }) => {
        const index = getRowIndex(row);

        // An unrendered row has no height yet. Counting it as 0 would draw
        // every row. The ResizeObserver measures it later.
        if (!row.isConnected || Number.isNaN(index) || height === 0) {
          return;
        }

        this.measuredIndexes.set(row, index);
        this.virtualizer.resizeItem(index, height);
      });
    } finally {
      this.isResizingRows = false;
    }

    if (this.hasChangeWhileResizing) {
      this.hasChangeWhileResizing = false;
      this.update();
    }
  }

  private handleChange() {
    if (this.isResizingRows) {
      this.hasChangeWhileResizing = true;
      return;
    }

    this.update();
  }

  private layout() {
    const items = new Map(
      this.virtualizer.getVirtualItems().map((item) => [item.index, item])
    );
    let cursor: number | undefined;

    this.getRenderedRows().forEach((row) => {
      const index = getRowIndex(row);
      const item = items.get(index);

      // The consumer hasn't removed this row yet.
      if (!item) {
        return;
      }

      // aria-rowindex starts at 1, which is the header row.
      if (row.index !== index + 2) {
        row.index = index + 2;
      }

      const start = item.start - this.scrollMargin;

      if (cursor === undefined) {
        setStyle(this.bodyEl, "paddingTop", start);
        setStyle(row, "marginTop", 0);
      } else {
        setStyle(row, "marginTop", start - cursor);
      }

      cursor = item.end - this.scrollMargin;
    });

    if (cursor === undefined) {
      setStyle(this.bodyEl, "paddingTop", 0);
    }

    setStyle(
      this.bodyEl,
      "paddingBottom",
      this.virtualizer.getTotalSize() - (cursor ?? 0)
    );
  }

  private getRenderedRows() {
    return Array.from(
      this.bodyEl.querySelectorAll<HTMLSwirlTableRowElement>(
        "swirl-table-row[data-index]"
      )
    );
  }

  private options(): VirtualizerOptions<ScrollElement, HTMLElement> {
    const { estimatedRowHeight, keptIndexes, overscan, rowCount } = this.config;
    const isWindow = this.scrollElement instanceof Window;

    return {
      count: rowCount,
      estimateSize: () => estimatedRowHeight,
      getScrollElement: () => this.scrollElement,
      // defaults to 0, which makes the virtualizer scroll to the top when it
      // subscribes to the scroll container.
      initialOffset: () =>
        this.scrollElement instanceof Window
          ? this.scrollElement.scrollY
          : this.scrollElement.scrollTop,
      overscan,
      scrollMargin: this.scrollMargin,
      rangeExtractor: (range) =>
        mergeIndexes(
          defaultRangeExtractor(range),
          keptIndexes.filter(
            (index) => Number.isInteger(index) && index >= 0 && index < rowCount
          )
        ),
      observeElementRect: (isWindow
        ? observeWindowRect
        : observeElementRect) as VirtualizerOptions<
        ScrollElement,
        HTMLElement
      >["observeElementRect"],
      observeElementOffset: (isWindow
        ? observeWindowOffset
        : observeElementOffset) as VirtualizerOptions<
        ScrollElement,
        HTMLElement
      >["observeElementOffset"],
      scrollToFn: (isWindow
        ? windowScroll
        : elementScroll) as VirtualizerOptions<
        ScrollElement,
        HTMLElement
      >["scrollToFn"],
      onChange: () => this.handleChange(),
    };
  }

  /** Offset of the first row from the top of the scrolled content. */
  private measureScrollMargin() {
    const bodyTop = this.bodyEl.getBoundingClientRect().top;

    if (this.scrollElement instanceof Window) {
      return bodyTop + this.scrollElement.scrollY;
    }

    return (
      bodyTop -
      this.scrollElement.getBoundingClientRect().top +
      this.scrollElement.scrollTop
    );
  }
}

function getRowIndex(row: HTMLElement) {
  return Number(row.dataset.index);
}

function mergeIndexes(a: number[], b: number[]) {
  return [...new Set([...a, ...b])].sort((x, y) => x - y);
}

function equalIndexes(a: number[], b: number[]) {
  return a.length === b.length && a.every((index, i) => index === b[i]);
}

function setStyle(
  el: HTMLElement,
  property: "marginTop" | "paddingTop" | "paddingBottom",
  px: number
) {
  const value = px > 0 ? `${px}px` : "";

  if (el.style[property] !== value) {
    el.style[property] = value;
  }
}
