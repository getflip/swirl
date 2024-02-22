const maskSpy = jest.fn();

jest.mock("maska/dist/es6/maska", () => ({
  create: maskSpy,
}));

import { newSpecPage } from "@stencil/core/testing";

import { SwirlTimeInput } from "./swirl-time-input";

describe("swirl-time-input", () => {
  beforeEach(() => {
    maskSpy.mockReset();
  });

  it("renders the input", async () => {
    const page = await newSpecPage({
      components: [SwirlTimeInput],
      html: `<swirl-time-input></swirl-time-input>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-time-input>
        <div class="time-input">
          <input class="time-input__input" id="swirl-time-input-0" inputmode="numeric" placeholder="hh:mm" type="text">
          <span class="time-input__icon">
            <swirl-icon-time-outlined size="24"></swirl-icon-time-outlined>
          </span>
        </div>
      </swirl-time-input>
    `);
  });

  it("handles different formats", async () => {
    const page = await newSpecPage({
      components: [SwirlTimeInput],
      html: `<swirl-time-input value="12:30:00"></swirl-time-input>`,
    });

    const input = page.root.querySelector("input");

    expect(input.value).toBe("12:30");

    page.root.format = "HH:mm:ss";
    await page.waitForChanges();

    expect(input.value).toBe("12:30:00");
  });

  it("masks values according to the format", async () => {
    const page = await newSpecPage({
      components: [SwirlTimeInput],
      html: `<swirl-time-input value="12:30:00"></swirl-time-input>`,
    });

    expect(maskSpy).toHaveBeenCalledWith("#swirl-time-input-0", {
      mask: "##:##",
    });

    page.root.format = "HH:mm:ss";

    expect(maskSpy).toHaveBeenCalledWith("#swirl-time-input-0", {
      mask: "##:##:##",
    });
  });

  it("fires valueChange events for valid values", async () => {
    const page = await newSpecPage({
      components: [SwirlTimeInput],
      html: `<swirl-time-input></swirl-time-input>`,
    });

    const spy = jest.fn();
    const input = page.root.querySelector("input");

    page.root.addEventListener("valueChange", spy);

    input.value = "12:";
    input.dispatchEvent(new Event("input"));

    expect(spy).toHaveBeenCalledTimes(0);

    input.value = "12:30";
    input.dispatchEvent(new Event("input"));

    expect(spy.mock.calls[0][0].detail).toBe("12:30:00");

    page.root.format = "HH:mm:ss";
    input.value = "12:30:20";
    input.dispatchEvent(new Event("input"));

    expect(spy.mock.calls[1][0].detail).toBe("12:30:20");
  });
});
