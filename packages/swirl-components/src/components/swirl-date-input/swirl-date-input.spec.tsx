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
          <input class="date-input__input" id="swirl-date-input-1" placeholder="yyyy-mm-dd" type="text">
          <button aria-hidden="true" class="date-input__date-picker-button" id="swirl-date-input-1-trigger" tabIndex="-1" type="button">
            <swirl-icon-today></swirl-icon-today>
          </button>
        </div>
        <swirl-popover label="Date picker" placement="bottom-end" popoverid="popover" trigger="swirl-date-input-1-trigger">
          <swirl-date-picker></swirl-date-picker>
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

    expect(maskSpy).toHaveBeenCalledWith("#swirl-date-input-1", {
      mask: "####-##-##",
    });

    page.root.format = "dd.MM.yyyy";

    expect(maskSpy).toHaveBeenCalledWith("#swirl-date-input-1", {
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
});
