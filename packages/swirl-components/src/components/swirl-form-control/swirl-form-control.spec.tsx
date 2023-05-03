import { newSpecPage } from "@stencil/core/testing";

import { SwirlFormControl } from "./swirl-form-control";

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

    expect(page.root).toEqualHtml(`
      <swirl-form-control label="Label">
        <div class="form-control form-control--label-position-inside" role="group">
          <label class="form-control__label">
            <span class="form-control__label-text">
              Label
            </span>
            <span class="form-control__input">
              <swirl-text-input label="Label"></swirl-text-input>
            </span>
          </label>
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
});
