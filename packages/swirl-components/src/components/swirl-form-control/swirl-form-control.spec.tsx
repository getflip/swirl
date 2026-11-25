import { newSpecPage } from "@stencil/core/testing";

import { SwirlDateInput } from "../swirl-date-input/swirl-date-input";
import { SwirlTextInput } from "../swirl-text-input/swirl-text-input";
import { SwirlTimeInput } from "../swirl-time-input/swirl-time-input";
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
                <span class="form-control__bottom"></span>
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

  it("disables editing of contenteditable controls when readonly", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control label="Label" readonly="true">
          <div contenteditable="plaintext-only" role="textbox"></div>
        </swirl-form-control>
      `,
    });

    const input = page.root.querySelector<HTMLElement>('[role="textbox"]');

    expect(input.getAttribute("contenteditable")).toBe("false");
    expect(input.getAttribute("aria-readonly")).toBe("true");

    page.root.readonly = false;
    await page.waitForChanges();

    expect(input.getAttribute("contenteditable")).toBe("plaintext-only");
    expect(input.hasAttribute("aria-readonly")).toBeFalsy();

    page.root.readonly = true;
    await page.waitForChanges();

    expect(input.getAttribute("contenteditable")).toBe("false");
  });

  it("disables editing of contenteditable controls when disabled", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control label="Label" disabled="true">
          <div contenteditable="true" role="textbox"></div>
        </swirl-form-control>
      `,
    });

    const input = page.root.querySelector<HTMLElement>('[role="textbox"]');

    expect(input.getAttribute("contenteditable")).toBe("false");
    expect(input.getAttribute("aria-disabled")).toBe("true");

    page.root.readonly = true;
    await page.waitForChanges();
    page.root.disabled = false;
    await page.waitForChanges();

    expect(input.getAttribute("contenteditable")).toBe("false");

    page.root.readonly = false;
    await page.waitForChanges();

    expect(input.getAttribute("contenteditable")).toBe("true");
    expect(input.hasAttribute("aria-disabled")).toBeFalsy();
  });

  it("restores an empty contenteditable attribute", async () => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `
        <swirl-form-control label="Label" readonly="true">
          <div contenteditable role="textbox"></div>
        </swirl-form-control>
      `,
    });

    const input = page.root.querySelector<HTMLElement>('[role="textbox"]');

    expect(input.getAttribute("contenteditable")).toBe("false");

    page.root.readonly = false;
    await page.waitForChanges();

    expect(input.getAttribute("contenteditable")).toBe("");
    expect(input.hasAttribute("aria-readonly")).toBeFalsy();
  });

  describe("format hint placeholders of date and time inputs", () => {
    const cases = [
      { component: SwirlDateInput, tag: "swirl-date-input" },
      { component: SwirlTimeInput, tag: "swirl-time-input" },
    ];

    it.each(cases)(
      "does not treat the default placeholder of $tag as placeholder",
      async ({ component, tag }) => {
        const page = await newSpecPage({
          components: [SwirlFormControl, component],
          html: `
            <swirl-form-control label="Label">
              <${tag}></${tag}>
            </swirl-form-control>
          `,
        });

        const formControl = page.root.querySelector(".form-control");

        expect(formControl).not.toHaveClass("form-control--has-placeholder");

        page.root.dispatchEvent(new Event("focusin"));
        await page.waitForChanges();
        page.root.dispatchEvent(new Event("focusout"));
        await page.waitForChanges();

        expect(formControl).not.toHaveClass("form-control--has-focus");
        expect(formControl).not.toHaveClass("form-control--has-placeholder");
        expect(formControl).not.toHaveClass("form-control--has-value");
      }
    );

    it.each(cases)(
      "does not treat an explicit placeholder of $tag as placeholder",
      async ({ component, tag }) => {
        const page = await newSpecPage({
          components: [SwirlFormControl, component],
          html: `
            <swirl-form-control label="Label">
              <${tag} placeholder="Format"></${tag}>
            </swirl-form-control>
          `,
        });

        expect(page.root.querySelector(".form-control")).not.toHaveClass(
          "form-control--has-placeholder"
        );
      }
    );

    it("marks a date input with a value as having a value", async () => {
      const page = await newSpecPage({
        components: [SwirlFormControl, SwirlDateInput],
        html: `
          <swirl-form-control label="Label">
            <swirl-date-input value="2026-11-20"></swirl-date-input>
          </swirl-form-control>
        `,
      });

      expect(page.root.querySelector(".form-control")).toHaveClass(
        "form-control--has-value"
      );
    });

    it("still treats the placeholder of other inputs as placeholder", async () => {
      const page = await newSpecPage({
        components: [SwirlFormControl, SwirlTextInput],
        html: `
          <swirl-form-control label="Label">
            <swirl-text-input placeholder="Placeholder"></swirl-text-input>
          </swirl-form-control>
        `,
      });

      expect(page.root.querySelector(".form-control")).toHaveClass(
        "form-control--has-placeholder"
      );
    });
  });

  it.each([
    [
      "inputs with multiple rows",
      true,
      `<swirl-text-input rows="5"></swirl-text-input>`,
    ],
    ["textareas with multiple rows", true, `<textarea rows="4"></textarea>`],
    ["single-line inputs", false, `<swirl-text-input></swirl-text-input>`],
    [
      "inputs with one row",
      false,
      `<swirl-text-input rows="1"></swirl-text-input>`,
    ],
    [
      "auto-growing inputs",
      false,
      `<swirl-text-input auto-grow="true"></swirl-text-input>`,
    ],
  ])("treats %s as multi-line: %s", async (_, isMultiline, input) => {
    const page = await newSpecPage({
      components: [SwirlFormControl],
      html: `<swirl-form-control label="Label">${input}</swirl-form-control>`,
    });

    const formControl = page.root.querySelector(".form-control");

    expect(formControl.classList.contains("form-control--is-multiline")).toBe(
      isMultiline
    );
  });
});
