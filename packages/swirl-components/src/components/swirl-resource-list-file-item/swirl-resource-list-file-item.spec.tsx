import { newSpecPage } from "@stencil/core/testing";

import { SwirlResourceListFileItem } from "./swirl-resource-list-file-item";

describe("swirl-resource-list-file-item", () => {
  it("renders label, description and spinner", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListFileItem],
      html: `
        <swirl-resource-list-file-item
          description="Description"
          label="Label"
          loading="true"
        ></swirl-resource-list-file-item>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-resource-list-file-item description="Description" label="Label" loading="true" role="row">
        <mock:shadow-root>
          <div class="resource-list-file-item resource-list-file-item--has-control" role="gridcell">
            <span class="resource-list-file-item__icon">
              <swirl-icon-file></swirl-icon-file>
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
              <swirl-spinner size="s"></swirl-spinner>
            </span>
          </div>
        </mock:shadow-root>
      </swirl-resource-list-file-item>
    `);
  });

  it("renders its error message", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListFileItem],
      html: `<swirl-resource-list-file-item label="Label" error-message="Error"></swirl-resource-list-file-item>`,
    });

    expect(
      page.root.shadowRoot
        .querySelector<HTMLSwirlInlineErrorElement>(
          '[aria-live="polite"] > swirl-inline-error'
        )
        .getAttribute("message")
    ).toBe("Error");
  });

  it("fires close events", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListFileItem],
      html: `<swirl-resource-list-file-item label="Label" removable="true"></swirl-resource-list-file-item>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("remove", spy);
    page.root.shadowRoot
      .querySelector<HTMLSwirlButtonElement>(
        ".resource-list-file-item__remove-button > swirl-button"
      )
      .click();

    expect(spy).toHaveBeenCalled();
  });
});
