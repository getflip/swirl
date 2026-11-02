import { getScrollParent } from "./utils";

describe("getScrollParent", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    // mock-doc has no layout: read overflow-y from the inline style.
    jest
      .spyOn(global as any, "getComputedStyle")
      .mockImplementation((el: HTMLElement) => ({
        overflowY: el.style.overflowY || "visible",
      }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns the nearest ancestor that scrolls vertically", () => {
    const outer = scroller(true);
    const inner = scroller(true);
    const el = document.createElement("div");

    outer.appendChild(inner);
    inner.appendChild(el);
    document.body.appendChild(outer);

    expect(getScrollParent(el)).toBe(inner);
  });

  it("skips ancestors that could scroll but don't overflow", () => {
    const outer = scroller(true);
    const inner = scroller(false);
    const el = document.createElement("div");

    outer.appendChild(inner);
    inner.appendChild(el);
    document.body.appendChild(outer);

    expect(getScrollParent(el)).toBe(outer);
  });

  it("finds a scroller inside the shadow root an element is slotted into", () => {
    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode: "open" });
    const section = scroller(true);
    const slot = document.createElement("slot");
    const el = document.createElement("div");

    section.appendChild(slot);
    shadowRoot.appendChild(section);
    host.appendChild(el);
    document.body.appendChild(host);
    // mock-doc doesn't assign slots.
    Object.defineProperty(el, "assignedSlot", { value: slot });

    expect(getScrollParent(el)).toBe(section);
  });

  it("falls back to the window", () => {
    const el = document.createElement("div");

    document.body.appendChild(el);

    expect(getScrollParent(el)).toBe(window);
  });
});

function scroller(overflows: boolean) {
  const el = document.createElement("div");

  el.style.overflowY = "auto";
  Object.defineProperty(el, "clientHeight", { value: 100 });
  Object.defineProperty(el, "scrollHeight", { value: overflows ? 200 : 100 });

  return el;
}
