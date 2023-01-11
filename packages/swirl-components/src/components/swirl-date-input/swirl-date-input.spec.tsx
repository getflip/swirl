const maskSpy = jest.fn();

jest.mock("maska/dist/es6/maska", () => ({
  create: maskSpy,
}));

import { newSpecPage } from "@stencil/core/testing";

import { FlipDateInput } from "./swirl-date-input";

describe("flip-date-input", () => {
  beforeEach(() => {
    maskSpy.mockReset();
  });

  it("renders the input and picker", async () => {
    const page = await newSpecPage({
      components: [FlipDateInput],
      html: `<flip-date-input></flip-date-input>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-date-input>
        <div class="date-input">
          <input class="date-input__input" id="flip-date-input-1" placeholder="yyyy-mm-dd" type="text">
          <button aria-hidden="true" class="date-input__date-picker-button" id="flip-date-input-1-trigger" tabIndex="-1" type="button">
            <flip-icon-today></flip-icon-today>
          </button>
        </div>
        <flip-popover label="Date picker" placement="bottom-end" popoverid="popover" trigger="flip-date-input-1-trigger">
          <flip-date-picker></flip-date-picker>
        </flip-popover>
      </flip-date-input>
    `);
  });

  it("handles different formats", async () => {
    const page = await newSpecPage({
      components: [FlipDateInput],
      html: `<flip-date-input value="2022-12-11"></flip-date-input>`,
    });

    const input = page.root.querySelector("input");

    expect(input.value).toBe("2022-12-11");

    page.root.format = "dd.MM.yyyy";
    await page.waitForChanges();

    expect(input.value).toBe("11.12.2022");
  });

  it("masks values according to the format", async () => {
    const page = await newSpecPage({
      components: [FlipDateInput],
      html: `<flip-date-input></flip-date-input>`,
    });

    expect(maskSpy).toHaveBeenCalledWith("#flip-date-input-1", {
      mask: "####-##-##",
    });

    page.root.format = "dd.MM.yyyy";

    expect(maskSpy).toHaveBeenCalledWith("#flip-date-input-1", {
      mask: "##.##.####",
    });
  });

  it("fires valueChange events for valid values", async () => {
    const page = await newSpecPage({
      components: [FlipDateInput],
      html: `<flip-date-input></flip-date-input>`,
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
});
