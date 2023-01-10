import { newSpecPage } from "@stencil/core/testing";

import { FlipResourceListFileItem } from "./flip-resource-list-file-item";

describe("flip-resource-list-file-item", () => {
  it("renders label, description and spinner", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListFileItem],
      html: `
        <flip-resource-list-file-item
          description="Description"
          label="Label"
          loading="true"
        ></flip-resource-list-file-item>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-resource-list-file-item description="Description" label="Label" loading="true" role="row">
        <mock:shadow-root>
          <div class="resource-list-file-item resource-list-file-item--has-control" part="resource-list-file-item" role="gridcell">
            <span class="resource-list-file-item__icon">
              <flip-icon-file size="24"></flip-icon-file>
            </span>
            <span class="resource-list-file-item__label-container">
              <span class="resource-list-file-item__label" id="label">
                Label
              </span>
              <span class="resource-list-file-item__description">
                Description
              </span>
            </span>
            <span class="resource-list-file-item__spinner">
              <flip-spinner size="s"></flip-spinner>
            </span>
          </div>
        </mock:shadow-root>
      </flip-resource-list-file-item>
    `);
  });

  it("renders its error message", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListFileItem],
      html: `<flip-resource-list-file-item label="Label" error-message="Error"></flip-resource-list-file-item>`,
    });

    expect(
      page.root.shadowRoot
        .querySelector<HTMLFlipInlineErrorElement>(
          '[aria-live="polite"] > flip-inline-error'
        )
        .getAttribute("message")
    ).toBe("Error");
  });

  it("fires close events", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListFileItem],
      html: `<flip-resource-list-file-item label="Label" removable="true"></flip-resource-list-file-item>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("remove", spy);
    page.root.shadowRoot
      .querySelector<HTMLFlipButtonElement>(
        ".resource-list-file-item__remove-button > flip-button"
      )
      .click();

    expect(spy).toHaveBeenCalled();
  });
});
