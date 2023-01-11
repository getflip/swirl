import { newSpecPage } from "@stencil/core/testing";

import { FlipCheckbox } from "./swirl-checkbox";

describe("flip-checkbox", () => {
  it("renders all props", async () => {
    const page = await newSpecPage({
      components: [FlipCheckbox],
      html: `<flip-checkbox checked="true" description="Description" disabled="true" input-id="checkbox" input-name="checkbox" label="Label" value="Value"></flip-checkbox>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <flip-checkbox checked="true" description="Description" disabled="true" input-id="checkbox" input-name="checkbox" label="Label" value="Value">
        <label class="checkbox checkbox--checked checkbox--disabled" htmlfor="checkbox">
          <span class="checkbox__control">
            <flip-visually-hidden>
              <input aria-checked="true" checked="" class="checkbox__input" disabled="" id="checkbox" name="checkbox" type="checkbox" value="Value">
            </flip-visually-hidden>
            <span aria-hidden="true" class="checkbox__box">
              <span class="checkbox__icon">
                <flip-icon-check-strong></flip-icon-check-strong>
              </span>
            </span>
          </span>
          <span class="checkbox__label-container">
            <span class="checkbox__label">
              Label
            </span>
            <span class="checkbox__description">
              Description
            </span>
          </span>
        </label>
      </flip-checkbox>
    `);
  });

  it("can be deselected", async () => {
    const page = await newSpecPage({
      components: [FlipCheckbox],
      html: `<flip-checkbox checked="true" input-id="checkbox" input-name="checkbox" label="Label"></flip-checkbox>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);
    page.root.querySelector("input").dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe(false);
  });

  it("can be selected", async () => {
    const page = await newSpecPage({
      components: [FlipCheckbox],
      html: `<flip-checkbox checked="false" input-id="checkbox" input-name="checkbox" label="Label"></flip-checkbox>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);
    page.root.querySelector("input").dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe(true);
  });
});
