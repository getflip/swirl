import { newSpecPage } from "@stencil/core/testing";

import { SwirlRadio } from "./swirl-radio";

describe("swirl-radio", () => {
  it("renders all props", async () => {
    const page = await newSpecPage({
      components: [SwirlRadio],
      html: `<swirl-radio checked="true" disabled="true" input-id="radio" input-name="radio" label="Label" value="Value"></swirl-radio>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-radio checked="true" disabled="true" input-id="radio" input-name="radio" label="Label" value="Value">
        <label class="radio radio--checked radio--disabled" htmlfor="radio">
          <span class="radio__control">
            <swirl-visually-hidden>
              <input aria-checked="true" checked="" class="radio__input" disabled="" id="radio" name="radio" type="radio" value="Value">
            </swirl-visually-hidden>
            <span aria-hidden="true" class="radio__box"></span>
          </span>
          <span class="radio__label-container">
            <span class="radio__label">
              Label
            </span>
          </span>
        </label>
      </swirl-radio>
    `);
  });

  it("can be selected", async () => {
    const page = await newSpecPage({
      components: [SwirlRadio],
      html: `<swirl-radio checked="false" input-id="radio" input-name="radio" label="Label" value="Value"></swirl-radio>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);
    page.root.querySelector("input").dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe("Value");
  });
});
