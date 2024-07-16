import { newSpecPage } from "@stencil/core/testing";

import { SwirlTag } from "./swirl-tag";

describe("swirl-tag", () => {
  it("renders the label", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag intent="info" label="Label"></swirl-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tag intent="info" label="Label">
        <mock:shadow-root>
          <span class="tag tag--intent-info tag--size-m" part="tag">
            <span class="tag__label">
              Label
            </span>
          </span>
        </mock:shadow-root>
      </swirl-tag>
    `);
  });

  it("renders the label with icon", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag intent="info" icon="<swirl-icon-mail></swirl-icon-mail>" label="Label"></swirl-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tag icon="<swirl-icon-mail></swirl-icon-mail>" intent="info" label="Label">
        <mock:shadow-root>
          <span class="tag tag--intent-info tag--size-m" part="tag">
            <span class="tag__icon">
              <swirl-icon-mail size="16"></swirl-icon-mail>
            </span>
            <span class="tag__label">
              Label
            </span>
          </span>
        </mock:shadow-root>
      </swirl-tag>
    `);
  });

  it("can be removed", async () => {
    const page = await newSpecPage({
      components: [SwirlTag],
      html: `<swirl-tag label="Label" removable="true" removal-button-label="Remove this one"></swirl-tag>`,
    });

    const removalButton = page.root.shadowRoot.querySelector("button");
    const spy = jest.fn();

    page.root.addEventListener("remove", spy);
    removalButton.click();

    expect(removalButton.getAttribute("aria-label")).toBe("Remove this one");
    expect(spy).toHaveBeenCalled();
  });
});
