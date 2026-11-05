import {
  SwirlTableVirtualizer,
  SwirlTableVirtualizerConfig,
} from "./swirl-table-virtualizer";

const viewportHeight = 560;
const rowHeight = 56;

class MockResizeObserver {
  static instances: MockResizeObserver[] = [];

  observed = new Set<Element>();

  constructor(public callback: (entries: unknown[]) => void) {
    MockResizeObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.add(el);
  }

  unobserve(el: Element) {
    this.observed.delete(el);
  }

  disconnect() {
    this.observed.clear();
  }

  /** Reports new heights, like the browser does after layout. */
  static resize(row: HTMLElement, height: number) {
    MockResizeObserver.instances
      .filter((observer) => observer.observed.has(row))
      .forEach((observer) =>
        observer.callback([
          { target: row, borderBoxSize: [{ blockSize: height }] },
        ])
      );
  }
}

function setup(
  config: Partial<SwirlTableVirtualizerConfig> = {},
  scrollTop = 0
) {
  const scrollEl = document.createElement("div");
  const bodyEl = document.createElement("div");

  scrollEl.appendChild(bodyEl);
  document.body.appendChild(scrollEl);

  Object.defineProperty(scrollEl, "clientHeight", { value: viewportHeight });
  Object.defineProperty(scrollEl, "clientWidth", { value: 800 });
  scrollEl.getBoundingClientRect = () => rect(0, viewportHeight);
  scrollEl.scrollTo = jest.fn();
  scrollEl.scrollTop = scrollTop;
  bodyEl.getBoundingClientRect = () => rect(-scrollEl.scrollTop, 0);

  const onIndexesChange = jest.fn();

  const virtualizer = new SwirlTableVirtualizer(
    bodyEl,
    scrollEl,
    {
      estimatedRowHeight: rowHeight,
      keptIndexes: [],
      overscan: 2,
      rowCount: 1000,
      ...config,
    },
    onIndexesChange
  );

  return {
    bodyEl,
    onIndexesChange,
    scrollEl,
    virtualizer,
    lastIndexes: (): number[] => onIndexesChange.mock.lastCall[0],
  };
}

/** Renders rows like a consumer does, in order, with their data-index. */
function renderRows(
  bodyEl: HTMLElement,
  indexes: number[],
  height = rowHeight
): HTMLSwirlTableRowElement[] {
  bodyEl.innerHTML = "";

  return indexes.map((index) => {
    const row = document.createElement(
      "swirl-table-row"
    ) as HTMLSwirlTableRowElement;

    row.setAttribute("data-index", String(index));
    row.getBoundingClientRect = () => rect(0, height);
    bodyEl.appendChild(row);

    return row;
  });
}

function scrollTo(scrollEl: HTMLElement, top: number) {
  scrollEl.scrollTop = top;
  scrollEl.dispatchEvent(new Event("scroll"));
}

function rect(top: number, height: number) {
  return { top, height, bottom: top + height } as DOMRect;
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

describe("SwirlTableVirtualizer", () => {
  beforeEach(() => {
    MockResizeObserver.instances = [];
    (global as any).Window = window.constructor;
    (global as any).ResizeObserver = MockResizeObserver;
    // virtual-core takes it from the element's window, where mock-doc only
    // defines a getter.
    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      value: MockResizeObserver,
    });
    document.body.innerHTML = "";
  });

  it("reports the visible rows plus the overscan", () => {
    const { lastIndexes } = setup();

    // 560px fit rows 0 to 9, plus 2 rows of overscan below.
    expect(lastIndexes()).toEqual(range(0, 11));
  });

  it("reports new rows when scrolled", () => {
    const { lastIndexes, scrollEl } = setup();

    scrollTo(scrollEl, 100 * rowHeight);

    expect(lastIndexes()).toEqual(range(98, 111));
  });

  it("keeps the scroll position of its scroll container when created", () => {
    const { lastIndexes, scrollEl } = setup({}, 100 * rowHeight);

    expect(scrollEl.scrollTo).not.toHaveBeenCalledWith(
      expect.objectContaining({ top: 0 })
    );
    expect(lastIndexes()).toEqual(range(98, 111));
  });

  it("adds kept rows, ignoring invalid indexes", () => {
    const { lastIndexes, scrollEl, virtualizer } = setup({
      keptIndexes: [-1, 1.5, NaN, 500, 2000],
    });

    expect(lastIndexes()).toEqual([...range(0, 11), 500]);

    // Scrolling still works, which an invalid index broke.
    scrollTo(scrollEl, 100 * rowHeight);
    expect(lastIndexes()).toEqual([...range(98, 111), 500]);
    scrollTo(scrollEl, 0);

    expect(lastIndexes()).toEqual([...range(0, 11), 500]);

    virtualizer.setConfig({
      estimatedRowHeight: rowHeight,
      keptIndexes: [500],
      overscan: 2,
      rowCount: 100,
    });

    expect(lastIndexes()).toEqual(range(0, 11));
  });

  it("positions rendered rows and sets their aria-rowindex", () => {
    const { bodyEl, scrollEl, virtualizer } = setup({ keptIndexes: [500] });

    scrollTo(scrollEl, 100 * rowHeight);
    const rows = renderRows(bodyEl, [...range(98, 111), 500]);
    virtualizer.sync();

    expect(bodyEl.style.paddingTop).toBe(`${98 * rowHeight}px`);
    expect(rows[1].style.marginTop).toBe("");
    // The kept row sits after the gap to row 111.
    expect(rows.at(-1).style.marginTop).toBe(`${(500 - 112) * rowHeight}px`);
    expect(bodyEl.style.paddingBottom).toBe(`${(1000 - 501) * rowHeight}px`);
    // aria-rowindex starts at 1, which is the header row.
    expect(rows.map((row) => row.index)).toEqual(
      [...range(98, 111), 500].map((index) => index + 2)
    );
  });

  it("measures new rows in one batch", () => {
    const { bodyEl, lastIndexes, onIndexesChange, virtualizer } = setup();
    const callsBefore = onIndexesChange.mock.calls.length;

    renderRows(bodyEl, range(0, 11), 2 * rowHeight);
    virtualizer.sync();

    // Rows twice as high: 5 fit, plus 2 rows of overscan, reported once.
    expect(onIndexesChange.mock.calls.length).toBe(callsBefore + 1);
    expect(lastIndexes()).toEqual(range(0, 6));
  });

  it("measures a row again when its data-index changes", () => {
    const { bodyEl, lastIndexes, virtualizer } = setup();
    const rows = renderRows(bodyEl, range(0, 11));

    virtualizer.sync();

    // Rows tracked by position are reused: row 0's element now shows row 1.
    rows.forEach((row, i) => row.setAttribute("data-index", String(i + 1)));
    rows[0].getBoundingClientRect = () => rect(0, 5 * rowHeight);
    virtualizer.sync();

    // Row 1 is 5 rows high, so rows 0 to 5 fill the viewport.
    expect(lastIndexes()).toEqual(range(0, 7));
  });

  it("updates when a rendered row resizes", () => {
    const { bodyEl, lastIndexes, virtualizer } = setup();
    const rows = renderRows(bodyEl, range(0, 11));

    virtualizer.sync();
    MockResizeObserver.resize(rows[0], 2 * rowHeight);

    // Row 0 now takes 2 rows' height, so rows 0 to 8 are visible.
    expect(lastIndexes()).toEqual(range(0, 10));
  });

  it("ignores rows without a height, which aren't laid out yet", () => {
    const { bodyEl, lastIndexes, virtualizer } = setup();

    renderRows(bodyEl, range(0, 11), 0);
    virtualizer.sync();

    expect(lastIndexes()).toEqual(range(0, 11));
  });

  it("removes its styles when destroyed", () => {
    const { bodyEl, scrollEl, virtualizer } = setup({ keptIndexes: [500] });

    scrollTo(scrollEl, 100 * rowHeight);
    const rows = renderRows(bodyEl, [...range(98, 111), 500]);
    virtualizer.sync();
    virtualizer.destroy();

    expect(bodyEl.style.paddingTop).toBe("");
    expect(bodyEl.style.paddingBottom).toBe("");
    expect(bodyEl.style.overflowAnchor).toBe("");
    expect(rows.at(-1).style.marginTop).toBe("");
  });
});
