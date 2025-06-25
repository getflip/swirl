const isMobileViewportSpy = jest.fn();

jest.mock("../../utils", () => {
  const original = jest.requireActual("../../utils");

  return {
    ...original,
    isMobileViewport: isMobileViewportSpy,
  };
});

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

import { newSpecPage } from "@stencil/core/testing";

import { SwirlPopover } from "../swirl-popover/swirl-popover";
import { SwirlDateInput } from "./swirl-date-input";

describe("swirl-date-input", () => {
  beforeEach(() => {
    isMobileViewportSpy.mockReset();
  });

  it("renders the input and picker", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input></swirl-date-input>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-date-input>
        <div class="date-input">
          <input class="date-input__input" id="swirl-date-input-0" inputmode="numeric" placeholder="yyyy-mm-dd" type="text">
          <swirl-popover-trigger swirlpopover="popover-swirl-date-input-0">
          <button aria-label="Open date picker" class="date-input__date-picker-button" type="button">
              <swirl-icon-today size="24"></swirl-icon-today>
            </button>
          </swirl-popover-trigger>
        </div>
        <swirl-popover animation="scale-in-y" class="date-input__date-picker-popover" id="popover-swirl-date-input-0" label="Date picker" placement="bottom-end">
          <swirl-date-picker firstdayofweek="0" locale="en-US"></swirl-date-picker>
        </swirl-popover>
      </swirl-date-input>
    `);
  });

  it("handles different formats", async () => {
    await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input value="2022-12-11" format="yyyy-MM-dd"></swirl-date-input>`,
    }).then((page) => {
      const input = page.root.querySelector("input");
      expect(input.value).toBe("2022-12-11");
    });

    await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input value="2022-12-11" format="dd.MM.yyyy"></swirl-date-input>`,
    }).then((page) => {
      const input = page.root.querySelector("input");
      expect(input.value).toBe("11.12.2022");
    });
  });

  it("fires valueChange events for valid values", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input></swirl-date-input>`,
    });

    const spy = jest.fn();
    const input = page.root.querySelector("input");

    page.root.addEventListener("valueChange", spy);

    input.value = "2022-";
    input.dispatchEvent(new Event("input"));

    expect(spy).toHaveBeenCalledTimes(0);

    input.value = "2022-12-11";
    input.dispatchEvent(new Event("input"));

    expect(spy.mock.calls[0][0].detail).toBe("2022-12-11");

    page.root.format = "dd.MM.yyyy";
    input.value = "01.12.2022";
    input.dispatchEvent(new Event("input"));

    expect(spy.mock.calls[2][0].detail).toBe("2022-12-01");
  });

  it.only("fires invalidInput event for invalid value", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input format="dd-MM-yyyy"></swirl-date-input>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("invalidInput", spy);
    page.root.value = "2022-12-11";
    expect(spy).toHaveBeenCalledTimes(0);

    page.root.value = "9999-99-99";
    expect(spy).toHaveBeenCalledTimes(1);

    page.root.value = "42";
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("corrects partial input values", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input></swirl-date-input>`,
    });

    const input = page.root.querySelector("input");

    input.value = "2022-5-6";
    input.dispatchEvent(new Event("input"));

    expect(input.value).toBe("2022-05-06");
  });

  it("opens the datepicker when input gets clicked and preferredInputMode is 'pick'", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");
    const popover = page.root.querySelector("swirl-popover");
    const spy = jest.fn();

    Object.defineProperty(popover, "open", { value: spy });
    page.root.preferredInputMode = "pick";
    input.dispatchEvent(new MouseEvent("click"));

    await new Promise((resolve) => setTimeout(resolve));

    expect(spy).toHaveBeenCalled();
  });

  it("doesn't open the datepicker when input gets clicked and preferredInputMode isn't 'pick'", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");
    const popover = page.root.querySelector("swirl-popover");
    const spy = jest.fn();

    Object.defineProperty(popover, "open", { value: spy });
    page.root.preferredInputMode = "input";
    input.dispatchEvent(new MouseEvent("click"));

    expect(spy).not.toHaveBeenCalled();
  });

  it("closes the datepicker on mouse down when preferredInputMode is 'pick'", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");
    const popover = page.root.querySelector("swirl-popover");
    const spy = jest.fn();

    Object.defineProperty(popover, "close", { value: spy });
    page.root.preferredInputMode = "pick";
    input.dispatchEvent(new MouseEvent("mousedown"));

    expect(spy).toHaveBeenCalled();
  });

  it("doesn't close the datepicker on mouse down when preferredInputMode isn't 'pick'", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");
    const popover = page.root.querySelector("swirl-popover");
    const spy = jest.fn();

    Object.defineProperty(popover, "close", { value: spy });
    page.root.preferredInputMode = "input";
    input.dispatchEvent(new MouseEvent("mousedown"));

    expect(spy).not.toHaveBeenCalled();
  });

  it("keeps the focus on the input when the datepicker is opened with click on desktop", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");
    const spy = jest.fn();

    isMobileViewportSpy.mockImplementation(() => false);
    page.root.preferredInputMode = "pick";

    input.addEventListener("focus", spy);
    input.dispatchEvent(new MouseEvent("click"));

    await new Promise((resolve) => setTimeout(resolve));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("loses the focus on the input when the datepicker is opened with focus on mobile", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");
    const spy = jest.fn();

    isMobileViewportSpy.mockImplementation(() => true);
    page.root.preferredInputMode = "pick";

    input.addEventListener("focus", spy);
    input.dispatchEvent(new MouseEvent("click"));

    await new Promise((resolve) => setTimeout(resolve));

    expect(spy).not.toHaveBeenCalled();
  });

  it("makes the input as readonly on initialization when preferredInputMode is 'pick' and viewport is mobile", async () => {
    isMobileViewportSpy.mockImplementation(() => true);
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input preferred-input-mode="pick"></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");

    expect(input.readOnly).toBeTruthy();
  });

  it("doesn't make the input as readonly on initialization when preferredInputMode isn't 'pick'", async () => {
    isMobileViewportSpy.mockImplementation(() => true);
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input preferred-input-mode="input"></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");

    expect(input.readOnly).toBeFalsy();
  });

  it("doesn't make the input as readonly on initialization when viewport isn't mobile", async () => {
    isMobileViewportSpy.mockImplementation(() => false);
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input preferred-input-mode="pick"></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");

    expect(input.readOnly).toBeFalsy();
  });

  it("makes the input as readonly on blur when element receiving focus in not the popover", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");

    isMobileViewportSpy.mockImplementation(() => true);
    page.root.preferredInputMode = "pick";
    input.dispatchEvent(new FocusEvent("blur", { relatedTarget: null }));
    await page.waitForChanges();

    expect(input.readOnly).toBeTruthy();
  });

  it("makes the input as not readonly on blur when element receiving focus in the popover", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");
    const popover = page.root.querySelector("swirl-popover");

    isMobileViewportSpy.mockImplementation(() => true);
    page.root.preferredInputMode = "pick";
    input.dispatchEvent(new FocusEvent("blur", { relatedTarget: null }));
    await page.waitForChanges();
    input.dispatchEvent(new FocusEvent("blur", { relatedTarget: popover }));
    await page.waitForChanges();

    expect(input.readOnly).toBeFalsy();
  });

  it("doesn't make the input as readonly on blur when preferredInputMode isn't 'pick'", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");

    isMobileViewportSpy.mockImplementation(() => true);
    page.root.preferredInputMode = "input";
    input.dispatchEvent(new FocusEvent("blur"));
    await page.waitForChanges();

    expect(input.readOnly).toBeFalsy();
  });

  it("doesn't make the input as readonly on blur when viewport isn't mobile", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput, SwirlPopover],
      html: `<swirl-date-input></swirl-date-input>`,
    });
    const input = page.root.querySelector("input");

    isMobileViewportSpy.mockImplementation(() => false);
    page.root.preferredInputMode = "pick";
    input.dispatchEvent(new FocusEvent("blur"));
    await page.waitForChanges();

    expect(input.readOnly).toBeFalsy();
  });
});
