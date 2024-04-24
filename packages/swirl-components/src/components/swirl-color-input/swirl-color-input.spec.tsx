import { newSpecPage } from "@stencil/core/testing";

import { SwirlColorInput } from "./swirl-color-input";

describe("swirl-color-input", () => {
  it("renders the input with props", async () => {
    const page = await newSpecPage({
      components: [SwirlColorInput],
      html: `<swirl-color-input
              disabled="true"
              swirl-aria-describedby="id"
              invalid="true"
              required="true"
              value="#ff0000">
            </swirl-color-input>`,
    });

    const pickerId = page.root.querySelector("swirl-popover").id;

    expect(page.root).toEqualHtml(`
      <swirl-color-input disabled="true"
                      swirl-aria-describedby="id"
                      invalid="true"
                      required="true"
                      value="#ff0000">
        <div class="color-input">
          <input aria-describedby="id"
                 aria-disabled="true"
                 aria-invalid="true"
                 class="color-input__input"
                 disabled=""
                 maxlength="7"
                 required=""
                 spellcheck="false"
                 type="text"
                 value="#ff0000">
          <swirl-popover-trigger swirl-popover="${pickerId}">
            <button aria-label="Open color picker" class="color-input__preview-button" type="button" style="background-color: var(--s-border-subdued);"></button>
          </swirl-popover-trigger>
          <swirl-popover animation="scale-in-y" id="${pickerId}" label="Color picker" placement="bottom-end">
            <swirl-box centerinline="" paddingblockend="8" paddingblockstart="8" paddinginlineend="16" paddinginlinestart="16">
              <hex-color-picker color="#ff0000"></hex-color-picker>
            </swirl-box>
          </swirl-popover>
        </div>
      </swirl-color-input>
    `);
  });

  it("shows a preview", async () => {
    const page = await newSpecPage({
      components: [SwirlColorInput],
      html: `<swirl-color-input value="Value"></swirl-color-input>`,
    });

    const input = page.root.querySelector<HTMLButtonElement>(
      ".color-input__input"
    );

    input.value = "#ccddee";
    input.dispatchEvent(new Event("input"));
    await page.waitForChanges();

    expect(
      page.root.querySelector<HTMLElement>(".color-input__preview-button").style
        .backgroundColor
    ).toEqual("#ccddee");
  });

  it("fires valueChange events", async () => {
    const page = await newSpecPage({
      components: [SwirlColorInput],
      html: `<swirl-color-input value="Value"></swirl-color-input>`,
    });

    const spy = jest.fn();
    const input = page.root.querySelector<HTMLButtonElement>(
      ".color-input__input"
    );

    page.root.addEventListener("valueChange", spy);

    input.value = "New Value";
    input.dispatchEvent(new Event("input"));

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe("New Value");
  });
});
