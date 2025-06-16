import { newSpecPage } from "@stencil/core/testing";

import { SwirlFormControl } from "./swirl-form-control";

(global as any).DocumentFragment = class DocumentFragment extends Node {};
(global as any).ShadowRoot = class ShadowRoot extends DocumentFragment {};

describe("swirl-form-control", () => {
  it("renders its input with label", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control label="Label">
          <swirl-text-input></swirl-text-input>
        </swirl-form-control>
      `,
    });

    const labelId = page.root.querySelector(".form-control__label-text").id;

    expect(page.root).toEqualHtml(`
      <swirl-form-control label="Label">
        <div class="form-control form-control--font-size-default form-control--label-position-inside" role="group">
          <span class="form-control__controls">
            <span class="form-control__prefix"></span>
            <label class="form-control__label">
              <span class="form-control__label-text" id="${labelId}">
                Label
              </span>
              <span class="form-control__input">
                <swirl-text-input label="Label"></swirl-text-input>
              </span>
            </label>
          </span>
          <span aria-live="polite"></span>
        </div>
      </swirl-form-control>
    `);
  });

  it("renders its description associated with the input element", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control description="Description" label="Label">
          <swirl-text-input label="Label"></swirl-text-input>
        </swirl-form-control>
      `,
    });

    const descriptionEl = page.root.querySelector(".form-control__description");
    const descriptionElId = descriptionEl.id;

    expect(descriptionEl).not.toBeNull();
    expect(descriptionEl.innerHTML).toBe("Description");

    expect(
      page.root
        .querySelector(".form-control__input > *")
        .getAttribute("swirl-aria-describedby")
    ).toBe(descriptionElId);
  });

  it("can be disabled", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control disabled="true" label="Label">
          <swirl-text-input></swirl-text-input>
        </swirl-form-control>
      `,
    });

    expect(
      page.root
        .querySelector(".form-control__input > *")
        .getAttribute("disabled")
    ).toBe("true");
  });

  it("renders its error message", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control error-message="Error" label="Label">
          <swirl-text-input></swirl-text-input>
        </swirl-form-control>
      `,
    });

    expect(
      page.root
        .querySelector(".form-control__error-message > *")
        .getAttribute("message")
    ).toBe("Error");
  });

  it("keeps focus when Tab is pressed and the active element is descendent of the input", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control label="Label">
          <mock:shadow-root>
            <span id="active-element"></span>
          </mock:shadow-root>
        </swirl-form-control>
      `,
    });
    const activeElement = page.doc.querySelector("#active-element");
    const formControl = page.root.children[0];

    page.root.dispatchEvent(new FocusEvent("focusin"));
    (page.doc as any).activeElement = activeElement;

    page.root.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(
      formControl.classList.contains("form-control--has-focus")
    ).toBeTruthy();
  });

  it("doesn't keep focus when Tab is pressed and the active element is not descendent of the input", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control label="Label">
          <swirl-text-input></swirl-text-input>
        </swirl-form-control>
        <span id="active-element"></span>>
      `,
    });
    const activeElement = page.doc.querySelector("#active-element");
    const formControl = page.root.children[0];

    page.root.dispatchEvent(new FocusEvent("focusin"));

    (page.doc as any).activeElement = activeElement;

    page.root.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(
      formControl.classList.contains("form-control--has-focus")
    ).toBeFalsy();
  });

  it("renders a tooltip icon when tooltip is set an label position is outside", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control label="Label" label-position="outside" tooltip="This is a tooltip">
          <swirl-text-input></swirl-text-input>
        </swirl-form-control>
      `,
    });

    const tooltip = page.root.querySelector("swirl-tooltip");
    expect(tooltip).not.toBeNull();
  });
});
