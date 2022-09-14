import { newSpecPage } from "@stencil/core/testing";

import { FlipSwitch } from "./flip-switch";

describe("flip-switch", () => {
  it("renders all props", async () => {
    const page = await newSpecPage({
      components: [FlipSwitch],
      html: `<flip-switch checked="true" disabled="true" input-id="switch" input-name="switch" label="Label" value="Value"></flip-switch>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <flip-switch checked="true" disabled="true" input-id="switch" input-name="switch" label="Label" value="Value">
        <label class="switch switch--disabled switch--on switch--size-m" htmlfor="switch">
          <span class="switch__control">
            <flip-visually-hidden>
              <input aria-checked="true" checked="" class="switch__input" disabled="" id="switch" name="switch" role="switch" type="checkbox" value="Value">
            </flip-visually-hidden>
            <span aria-hidden="true" class="switch__thumb"></span>
          </span>
          <span class="switch__label">
            Label
          </span>
        </label>
      </flip-switch>
    `);
  });

  it("can be deselected", async () => {
    const page = await newSpecPage({
      components: [FlipSwitch],
      html: `<flip-switch checked="true" input-id="switch" input-name="switch" label="Label"></flip-switch>`,
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
      components: [FlipSwitch],
      html: `<flip-switch checked="false" input-id="switch" input-name="switch" label="Label"></flip-switch>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);
    page.root.querySelector("input").dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe(true);
  });
});
