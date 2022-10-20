import { newSpecPage } from "@stencil/core/testing";

import { FlipFormControl } from "./flip-form-control";

describe("flip-form-control", () => {
  it("renders its input with label", async () => {
    const page = await newSpecPage({
      components: [FlipFormControl],
      html: `
        <flip-form-control label="Label">
          <flip-text-input></flip-text-input>
        </flip-form-control>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-form-control label="Label">
        <div class="form-control" role="group">
          <label class="form-control__label">
            <span class="form-control__label-text">
              Label
            </span>
            <span class="form-control__input">
              <flip-text-input></flip-text-input>
            </span>
          </label>
        </div>
      </flip-form-control>
    `);
  });

  it("renders its description associated with the input element", async () => {
    const page = await newSpecPage({
      components: [FlipFormControl],
      html: `
        <flip-form-control description="Description" label="Label">
          <flip-text-input></flip-text-input>
        </flip-form-control>
      `,
    });

    const descriptionEl = page.root.querySelector(".form-control__description");
    const descriptionElId = descriptionEl.id;

    expect(descriptionEl).not.toBeNull();
    expect(descriptionEl.innerHTML).toBe("Description");

    expect(
      page.root
        .querySelector(".form-control__input > *")
        .getAttribute("flip-aria-describedby")
    ).toBe(descriptionElId);
  });

  it("can be disabled", async () => {
    const page = await newSpecPage({
      components: [FlipFormControl],
      html: `
        <flip-form-control disabled="true" label="Label">
          <flip-text-input></flip-text-input>
        </flip-form-control>
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
      components: [FlipFormControl],
      html: `
        <flip-form-control error-message="Error" label="Label">
          <flip-text-input></flip-text-input>
        </flip-form-control>
      `,
    });

    expect(
      page.root
        .querySelector(".form-control__error-message > *")
        .getAttribute("message")
    ).toBe("Error");
  });
});
