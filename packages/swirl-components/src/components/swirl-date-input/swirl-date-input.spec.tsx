const maskSpy = jest.fn();

jest.mock("maska/dist/es6/maska", () => ({
  create: maskSpy,
}));

import { newSpecPage } from "@stencil/core/testing";

import { SwirlDateInput } from "./swirl-date-input";

describe("swirl-date-input", () => {
  beforeEach(() => {
    maskSpy.mockReset();
  });

  it("renders the input and picker", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input></swirl-date-input>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-date-input>
        <div class="date-input">
          <input class="date-input__input" id="swirl-date-input-0" placeholder="yyyy-mm-dd" type="text">
          <swirl-popover-trigger popover="popover-swirl-date-input-0">
          <button aria-label="Open date picker" class="date-input__date-picker-button" type="button">
              <swirl-icon-today size="24"></swirl-icon-today>
            </button>
          </swirl-popover-trigger>
        </div>
        <swirl-popover animation="scale-in-y" id="popover-swirl-date-input-0" label="Date picker" placement="bottom-end">
          <swirl-date-picker locale="en-US"></swirl-date-picker>
        </swirl-popover>
      </swirl-date-input>
    `);
  });

  it("handles different formats", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input value="2022-12-11"></swirl-date-input>`,
    });

    const input = page.root.querySelector("input");

    expect(input.value).toBe("2022-12-11");

    page.root.format = "dd.MM.yyyy";
    await page.waitForChanges();

    expect(input.value).toBe("11.12.2022");
  });

  it("masks values according to the format", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input></swirl-date-input>`,
    });

    expect(maskSpy).toHaveBeenCalledWith("#swirl-date-input-0", {
      mask: "####-##-##",
    });

    page.root.format = "dd.MM.yyyy";

    expect(maskSpy).toHaveBeenCalledWith("#swirl-date-input-0", {
      mask: "##.##.####",
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

    expect(spy.mock.calls[1][0].detail).toBe("2022-12-01");
  });

  it("fires invalidInPut event for invalid values", async () => {
    const page = await newSpecPage({
      components: [SwirlDateInput],
      html: `<swirl-date-input></swirl-date-input>`,
    });

    const spy = jest.fn();
    const input = page.root.querySelector("input");

    page.root.addEventListener("invalidInput", spy);

    input.value = "2022-12-12";
    input.dispatchEvent(new Event("input"));

    expect(spy).toHaveBeenCalledTimes(0);

    input.value = "2022-22-22";
    input.dispatchEvent(new Event("input"));

    expect(spy.mock.calls[0][0].detail).toBe("2022-22-22");
  });
});
