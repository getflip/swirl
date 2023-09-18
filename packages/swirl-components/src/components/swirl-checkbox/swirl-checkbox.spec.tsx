import { newSpecPage } from "@stencil/core/testing";

import { SwirlCheckbox } from "./swirl-checkbox";

describe("swirl-checkbox", () => {
  it("renders all props", async () => {
    const page = await newSpecPage({
      components: [SwirlCheckbox],
      html: `<swirl-checkbox checked="true" description="Description" disabled="true" input-id="checkbox" input-name="checkbox" label="Label" value="Value"></swirl-checkbox>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-checkbox checked="true" description="Description" disabled="true" input-id="checkbox" input-name="checkbox" label="Label" value="Value">
        <label class="checkbox checkbox--checked checkbox--disabled checkbox--label-weight-medium checkbox--variant-default" htmlfor="checkbox">
          <span class="checkbox__control">
            <swirl-visually-hidden>
              <input aria-checked="true" checked="" class="checkbox__input" disabled="" id="checkbox" name="checkbox" type="checkbox" value="Value">
            </swirl-visually-hidden>
            <span aria-hidden="true" class="checkbox__box">
              <span class="checkbox__icon">
                <swirl-icon-check-strong></swirl-icon-check-strong>
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
      </swirl-checkbox>
    `);
  });

  it("can be deselected", async () => {
    const page = await newSpecPage({
      components: [SwirlCheckbox],
      html: `<swirl-checkbox checked="true" input-id="checkbox" input-name="checkbox" label="Label"></swirl-checkbox>`,
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
      components: [SwirlCheckbox],
      html: `<swirl-checkbox checked="false" input-id="checkbox" input-name="checkbox" label="Label"></swirl-checkbox>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);
    page.root.querySelector("input").dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe(true);
  });
});
