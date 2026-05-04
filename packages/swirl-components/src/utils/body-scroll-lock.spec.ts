describe("body-scroll-lock (non-iOS)", () => {
  let disableBodyScroll: typeof import("./body-scroll-lock").disableBodyScroll;
  let enableBodyScroll: typeof import("./body-scroll-lock").enableBodyScroll;
  let el1: HTMLDivElement;
  let el2: HTMLDivElement;

  beforeEach(() => {
    jest.resetModules();

    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120",
      configurable: true,
    });

    const mod = require("./body-scroll-lock");
    disableBodyScroll = mod.disableBodyScroll;
    enableBodyScroll = mod.enableBodyScroll;

    el1 = document.createElement("div");
    el2 = document.createElement("div");
    document.body.style.overflow = "";
    document.body.style.position = "";
  });

  afterEach(() => {
    enableBodyScroll(el1);
    enableBodyScroll(el2);
  });

  it("sets overflow hidden on body when locking", () => {
    disableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("does not set position fixed on body (non-iOS path)", () => {
    disableBodyScroll(el1);
    expect(document.body.style.position).toBe("");
  });

  it("restores overflow on body when unlocking", () => {
    document.body.style.overflow = "auto";
    disableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("hidden");
    enableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("auto");
  });

  it("handles reference counting with multiple locks", () => {
    disableBodyScroll(el1);
    disableBodyScroll(el2);
    expect(document.body.style.overflow).toBe("hidden");

    enableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("hidden");

    enableBodyScroll(el2);
    expect(document.body.style.overflow).toBe("");
  });

  it("is idempotent for the same element", () => {
    disableBodyScroll(el1);
    disableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("hidden");

    enableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("");
  });

  it("does not throw when called with null or undefined", () => {
    expect(() => disableBodyScroll(null)).not.toThrow();
    expect(() => disableBodyScroll(undefined)).not.toThrow();
    expect(() => enableBodyScroll(null)).not.toThrow();
    expect(() => enableBodyScroll(undefined)).not.toThrow();
  });

  it("does not throw when unlocking an element that was never locked", () => {
    expect(() => enableBodyScroll(el1)).not.toThrow();
  });

  it("preserves and restores original body styles", () => {
    document.body.style.overflow = "scroll";
    document.body.style.position = "relative";

    disableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("hidden");

    enableBodyScroll(el1);
    expect(document.body.style.overflow).toBe("scroll");
    expect(document.body.style.position).toBe("relative");
  });
});

describe("body-scroll-lock (iOS)", () => {
  let disableBodyScroll: typeof import("./body-scroll-lock").disableBodyScroll;
  let enableBodyScroll: typeof import("./body-scroll-lock").enableBodyScroll;
  let el1: HTMLDivElement;
  let el2: HTMLDivElement;
  let scrollToSpy: jest.SpyInstance;
  let addEventSpy: jest.SpyInstance;
  let removeEventSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();

    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
      configurable: true,
    });

    const mod = require("./body-scroll-lock");
    disableBodyScroll = mod.disableBodyScroll;
    enableBodyScroll = mod.enableBodyScroll;

    el1 = document.createElement("div");
    el2 = document.createElement("div");

    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.width = "";

    scrollToSpy = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    addEventSpy = jest.spyOn(document, "addEventListener");
    removeEventSpy = jest.spyOn(document, "removeEventListener");
  });

  afterEach(() => {
    enableBodyScroll(el1);
    enableBodyScroll(el2);
    scrollToSpy.mockRestore();
    addEventSpy.mockRestore();
    removeEventSpy.mockRestore();
  });

  it("sets position fixed on body with scroll offset", () => {
    Object.defineProperty(window, "scrollY", { value: 200, configurable: true });
    Object.defineProperty(window, "scrollX", { value: 50, configurable: true });

    disableBodyScroll(el1);

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe("-200px");
    expect(document.body.style.left).toBe("-50px");
    expect(document.body.style.width).toBe("100%");
    expect(document.body.style.overflow).toBe("hidden");

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    Object.defineProperty(window, "scrollX", { value: 0, configurable: true });
  });

  it("restores body styles and scroll position on unlock", () => {
    document.body.style.position = "relative";
    document.body.style.top = "10px";
    document.body.style.left = "5px";
    document.body.style.width = "auto";
    document.body.style.overflow = "scroll";

    Object.defineProperty(window, "scrollY", { value: 300, configurable: true });
    Object.defineProperty(window, "scrollX", { value: 20, configurable: true });

    disableBodyScroll(el1);
    enableBodyScroll(el1);

    expect(document.body.style.position).toBe("relative");
    expect(document.body.style.top).toBe("10px");
    expect(document.body.style.left).toBe("5px");
    expect(document.body.style.width).toBe("auto");
    expect(document.body.style.overflow).toBe("scroll");
    expect(scrollToSpy).toHaveBeenCalledWith(20, 300);

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    Object.defineProperty(window, "scrollX", { value: 0, configurable: true });
  });

  it("adds touchmove listener to document with passive: false", () => {
    disableBodyScroll(el1);

    expect(addEventSpy).toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function),
      { passive: false }
    );
  });

  it("removes document touchmove listener only when all locks are cleared", () => {
    disableBodyScroll(el1);
    disableBodyScroll(el2);

    enableBodyScroll(el1);
    expect(removeEventSpy).not.toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function)
    );

    enableBodyScroll(el2);
    expect(removeEventSpy).toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function)
    );
  });

  it("sets touch handlers on target element and clears them on unlock", () => {
    disableBodyScroll(el1);
    expect(el1.ontouchstart).toBeInstanceOf(Function);
    expect(el1.ontouchmove).toBeInstanceOf(Function);

    enableBodyScroll(el1);
    expect(el1.ontouchstart).toBeNull();
    expect(el1.ontouchmove).toBeNull();
  });

  it("keeps body locked while any element is still locked (ref counting)", () => {
    disableBodyScroll(el1);
    disableBodyScroll(el2);

    enableBodyScroll(el1);
    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.overflow).toBe("hidden");

    enableBodyScroll(el2);
    expect(document.body.style.position).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it("does not restore scroll position until all locks cleared", () => {
    Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
    Object.defineProperty(window, "scrollX", { value: 15, configurable: true });

    disableBodyScroll(el1);
    disableBodyScroll(el2);

    enableBodyScroll(el1);
    expect(scrollToSpy).not.toHaveBeenCalled();

    enableBodyScroll(el2);
    expect(scrollToSpy).toHaveBeenCalledWith(15, 100);

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    Object.defineProperty(window, "scrollX", { value: 0, configurable: true });
  });
});

describe("body-scroll-lock (iOS touch handling)", () => {
  let disableBodyScroll: typeof import("./body-scroll-lock").disableBodyScroll;
  let enableBodyScroll: typeof import("./body-scroll-lock").enableBodyScroll;
  let el: HTMLDivElement;

  function makeTouchEvent(
    type: string,
    clientY: number,
    touchCount = 1
  ): TouchEvent {
    const touch = { clientY } as Touch;
    const touches = Array(touchCount).fill(touch);

    return {
      type,
      touches,
      targetTouches: touches,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as TouchEvent;
  }

  beforeEach(() => {
    jest.resetModules();

    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
      configurable: true,
    });

    const mod = require("./body-scroll-lock");
    disableBodyScroll = mod.disableBodyScroll;
    enableBodyScroll = mod.enableBodyScroll;

    el = document.createElement("div");
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    enableBodyScroll(el);
    jest.restoreAllMocks();
  });

  it("records initial touch position on touchstart", () => {
    disableBodyScroll(el);

    const startEvent = makeTouchEvent("touchstart", 200);
    el.ontouchstart(startEvent);

    // Subsequent touchmove should use 200 as baseline
    Object.defineProperty(el, "scrollTop", { value: 0, configurable: true });
    Object.defineProperty(el, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(el, "clientHeight", {
      value: 300,
      configurable: true,
    });

    // Moving down (clientY > initialClientY) → positive delta → at top → prevent
    const moveEvent = makeTouchEvent("touchmove", 250);
    el.ontouchmove(moveEvent);
    expect(moveEvent.preventDefault).toHaveBeenCalled();
  });

  it("prevents scroll when at the top and swiping down", () => {
    disableBodyScroll(el);

    Object.defineProperty(el, "scrollTop", { value: 0, configurable: true });
    Object.defineProperty(el, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(el, "clientHeight", {
      value: 300,
      configurable: true,
    });

    // Set initial touch position
    el.ontouchstart(makeTouchEvent("touchstart", 100));

    // Swipe down (clientY increases → positive delta)
    const moveEvent = makeTouchEvent("touchmove", 150);
    el.ontouchmove(moveEvent);

    expect(moveEvent.preventDefault).toHaveBeenCalled();
  });

  it("prevents scroll when at the bottom and swiping up", () => {
    disableBodyScroll(el);

    // Element is fully scrolled to bottom
    Object.defineProperty(el, "scrollTop", { value: 200, configurable: true });
    Object.defineProperty(el, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(el, "clientHeight", {
      value: 300,
      configurable: true,
    });

    el.ontouchstart(makeTouchEvent("touchstart", 200));

    // Swipe up (clientY decreases → negative delta)
    const moveEvent = makeTouchEvent("touchmove", 150);
    el.ontouchmove(moveEvent);

    expect(moveEvent.preventDefault).toHaveBeenCalled();
  });

  it("allows scroll in the middle of scrollable content", () => {
    disableBodyScroll(el);

    // Element is in the middle of scroll
    Object.defineProperty(el, "scrollTop", { value: 100, configurable: true });
    Object.defineProperty(el, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(el, "clientHeight", {
      value: 300,
      configurable: true,
    });

    el.ontouchstart(makeTouchEvent("touchstart", 200));

    const moveEvent = makeTouchEvent("touchmove", 150);
    el.ontouchmove(moveEvent);

    expect(moveEvent.preventDefault).not.toHaveBeenCalled();
    expect(moveEvent.stopPropagation).toHaveBeenCalled();
  });

  it("ignores multi-touch touchstart events", () => {
    disableBodyScroll(el);

    Object.defineProperty(el, "scrollTop", { value: 0, configurable: true });
    Object.defineProperty(el, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(el, "clientHeight", {
      value: 300,
      configurable: true,
    });

    // Multi-touch start — should not record initialClientY
    const startEvent = makeTouchEvent("touchstart", 100, 2);
    el.ontouchstart(startEvent);

    // Multi-touch move — should not call preventDefault
    const moveEvent = makeTouchEvent("touchmove", 150, 2);
    el.ontouchmove(moveEvent);

    expect(moveEvent.preventDefault).not.toHaveBeenCalled();
  });
});

describe("body-scroll-lock (iOS bottom bar compensation)", () => {
  let disableBodyScroll: typeof import("./body-scroll-lock").disableBodyScroll;
  let enableBodyScroll: typeof import("./body-scroll-lock").enableBodyScroll;
  let el: HTMLDivElement;

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeEach(() => {
    jest.resetModules();

    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
      configurable: true,
    });

    const mod = require("./body-scroll-lock");
    disableBodyScroll = mod.disableBodyScroll;
    enableBodyScroll = mod.enableBodyScroll;

    el = document.createElement("div");
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    enableBodyScroll(el);
    jest.restoreAllMocks();
  });

  it("adjusts body top when bottom bar appears after scrolling past viewport", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 1200,
      configurable: true,
    });
    Object.defineProperty(window, "scrollX", {
      value: 0,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      configurable: true,
    });

    disableBodyScroll(el);
    expect(document.body.style.top).toBe("-1200px");

    // Simulate the bottom bar appearing (innerHeight shrinks by 50px)
    Object.defineProperty(window, "innerHeight", {
      value: 750,
      configurable: true,
    });

    // Wait for the 300ms setTimeout + rAF to complete
    await wait(350);

    // top should be adjusted: -(1200 + 50) = -1250
    expect(document.body.style.top).toBe("-1250px");

    Object.defineProperty(window, "scrollY", {
      value: 0,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      configurable: true,
    });
  });

  it("does not adjust when scrollY is below viewport height", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 400,
      configurable: true,
    });
    Object.defineProperty(window, "scrollX", {
      value: 0,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      configurable: true,
    });

    disableBodyScroll(el);
    expect(document.body.style.top).toBe("-400px");

    // Bottom bar appears, but scrollY < innerHeight so no adjustment
    Object.defineProperty(window, "innerHeight", {
      value: 750,
      configurable: true,
    });

    await wait(350);

    expect(document.body.style.top).toBe("-400px");

    Object.defineProperty(window, "scrollY", {
      value: 0,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      configurable: true,
    });
  });

  it("does not adjust when innerHeight has not changed", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 1200,
      configurable: true,
    });
    Object.defineProperty(window, "scrollX", {
      value: 0,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      configurable: true,
    });

    disableBodyScroll(el);

    await wait(350);

    // No height change → no adjustment
    expect(document.body.style.top).toBe("-1200px");

    Object.defineProperty(window, "scrollY", {
      value: 0,
      configurable: true,
    });
  });
});

describe("body-scroll-lock (iPad OS detection)", () => {
  let disableBodyScroll: typeof import("./body-scroll-lock").disableBodyScroll;
  let enableBodyScroll: typeof import("./body-scroll-lock").enableBodyScroll;

  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("detects iPad OS (reports as Macintosh with touch)", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
      configurable: true,
    });
    Object.defineProperty(navigator, "maxTouchPoints", {
      value: 5,
      configurable: true,
    });

    const mod = require("./body-scroll-lock");
    disableBodyScroll = mod.disableBodyScroll;
    enableBodyScroll = mod.enableBodyScroll;

    const el = document.createElement("div");
    disableBodyScroll(el);

    // iPad OS should use the iOS path (position: fixed)
    expect(document.body.style.position).toBe("fixed");

    enableBodyScroll(el);

    Object.defineProperty(navigator, "maxTouchPoints", {
      value: 0,
      configurable: true,
    });
  });

  it("does not falsely detect macOS desktop as iOS", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
      configurable: true,
    });
    Object.defineProperty(navigator, "maxTouchPoints", {
      value: 0,
      configurable: true,
    });

    const mod = require("./body-scroll-lock");
    disableBodyScroll = mod.disableBodyScroll;
    enableBodyScroll = mod.enableBodyScroll;

    const el = document.createElement("div");
    disableBodyScroll(el);

    // macOS desktop should use non-iOS path (no position: fixed)
    expect(document.body.style.position).toBe("");
    expect(document.body.style.overflow).toBe("hidden");

    enableBodyScroll(el);
  });
});
