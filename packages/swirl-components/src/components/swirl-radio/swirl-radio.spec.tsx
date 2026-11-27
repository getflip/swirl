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
        <label class="radio radio--checked radio--disabled radio--variant-default" for="radio">
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

  it("renders an icon on card variant", async () => {
    const page = await newSpecPage({
      components: [SwirlRadio],
      html: `<swirl-radio icon="<swirl-icon-groups></swirl-icon-groups>" input-id="radio" input-name="radio" label="Label" value="Value" variant="card"></swirl-radio>`,
    });

    const label = page.root.querySelector("label");
    const icon = page.root.querySelector(".radio__icon");

    expect(label.classList.contains("radio--has-icon")).toBe(true);
    expect(icon.getAttribute("aria-hidden")).toBe("true");
    expect(
      icon.previousElementSibling.classList.contains("radio__control")
    ).toBe(true);
    expect(
      icon.nextElementSibling.classList.contains("radio__label-container")
    ).toBe(true);

    const glyph = icon.querySelector(".radio__icon-glyph").children[0];

    expect(glyph.tagName).toBe("SWIRL-ICON-GROUPS");
    expect(glyph.getAttribute("size")).toBe("28");
  });

  it("does not render an icon on default variant", async () => {
    const page = await newSpecPage({
      components: [SwirlRadio],
      html: `<swirl-radio icon="<swirl-icon-groups></swirl-icon-groups>" input-id="radio" input-name="radio" label="Label" value="Value"></swirl-radio>`,
    });

    const label = page.root.querySelector("label");

    expect(label.classList.contains("radio--has-icon")).toBe(false);
    expect(page.root.querySelector(".radio__icon")).toBeNull();
  });

  it("generates a unique input id per instance and labels its own input", async () => {
    const page = await newSpecPage({
      components: [SwirlRadio],
      html: `<swirl-radio input-name="a" label="A" value="a"></swirl-radio><swirl-radio input-name="b" label="B" value="b"></swirl-radio>`,
    });

    const labels = Array.from(page.body.querySelectorAll("label"));
    const ids = labels.map((label) => label.querySelector("input").id);

    expect(ids[0]).toBeTruthy();
    expect(ids[0]).not.toBe(ids[1]);
    expect(labels.map((label) => label.htmlFor)).toEqual(ids);
  });
});
