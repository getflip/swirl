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
                 maxlength="9"
                 required=""
                 spellcheck="false"
                 type="text"
                 value="#ff0000">
          <span class="color-input__preview" style="background-color: var(--s-border-subdued);"></span>
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
      page.root.querySelector<HTMLElement>(".color-input__preview").style
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
