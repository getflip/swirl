import { newSpecPage } from "@stencil/core/testing";

import { FlipRadio } from "./flip-radio";

describe("flip-radio", () => {
  it("renders all props", async () => {
    const page = await newSpecPage({
      components: [FlipRadio],
      html: `<flip-radio checked="true" disabled="true" input-id="radio" input-name="radio" label="Label" value="Value"></flip-radio>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <flip-radio checked="true" disabled="true" input-id="radio" input-name="radio" label="Label" value="Value">
        <label class="radio radio--checked radio--disabled" htmlfor="radio">
          <span class="radio__control">
            <flip-visually-hidden>
              <input aria-checked="true" checked="" class="radio__input" disabled="" id="radio" name="radio" type="radio" value="Value">
            </flip-visually-hidden>
            <span aria-hidden="true" class="radio__backdrop"></span>
            <span aria-hidden="true" class="radio__box"></span>
          </span>
          <span class="radio__label">
            Label
          </span>
        </label>
      </flip-radio>
    `);
  });

  it("can be selected", async () => {
    const page = await newSpecPage({
      components: [FlipRadio],
      html: `<flip-radio checked="false" input-id="radio" input-name="radio" label="Label"></flip-radio>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);
    page.root.querySelector("input").dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe(true);
  });
});
