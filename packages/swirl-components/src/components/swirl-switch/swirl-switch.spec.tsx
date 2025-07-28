import { newSpecPage } from "@stencil/core/testing";

import { SwirlSwitch } from "./swirl-switch";

describe("swirl-switch", () => {
  it("renders all props", async () => {
    const page = await newSpecPage({
      components: [SwirlSwitch],
      html: `<swirl-switch checked="true" disabled="true" input-id="switch" input-name="switch" label="Label" value="Value"></swirl-switch>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-switch checked="true" disabled="true" input-id="switch" input-name="switch" label="Label" value="Value">
        <label class="switch switch--disabled switch--label-position-end switch--on" htmlfor="switch">
          <span class="switch__control">
            <swirl-visually-hidden>
              <input aria-checked="true" checked="" class="switch__input" disabled="" id="switch" name="switch" role="switch" type="checkbox" value="Value">
            </swirl-visually-hidden>
            <span aria-hidden="true" class="switch__thumb"></span>
          </span>
          <swirl-stack class="switch__content">
            <span class="switch__label">
              Label
            </span>
          </swirl-stack>
        </label>
      </swirl-switch>
    `);
  });

  it("can be deselected", async () => {
    const page = await newSpecPage({
      components: [SwirlSwitch],
      html: `<swirl-switch checked="true" input-id="switch" input-name="switch" label="Label"></swirl-switch>`,
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
      components: [SwirlSwitch],
      html: `<swirl-switch checked="false" input-id="switch" input-name="switch" label="Label"></swirl-switch>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);
    page.root.querySelector("input").dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe(true);
  });

  it("can be toggled programmatically", async () => {
    const page = await newSpecPage({
      components: [SwirlSwitch],
      html: `<swirl-switch checked="false" input-id="switch" input-name="switch" label="Label"></swirl-switch>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    await page.root.toggle();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe(true);

    await page.root.toggle();
    expect(spy.mock.calls[1][0].detail).toBe(false);
  });
});
