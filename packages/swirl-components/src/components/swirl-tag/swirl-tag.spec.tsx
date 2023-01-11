import { newSpecPage } from "@stencil/core/testing";

import { FlipTag } from "./swirl-tag";

describe("flip-tag", () => {
  it("renders the label", async () => {
    const page = await newSpecPage({
      components: [FlipTag],
      html: `<flip-tag intent="info" label="Label"></flip-tag>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-tag intent="info" label="Label">
        <mock:shadow-root>
          <span class="tag tag--intent-info">
            Label
          </span>
        </mock:shadow-root>
      </flip-tag>
    `);
  });

  it("can be removed", async () => {
    const page = await newSpecPage({
      components: [FlipTag],
      html: `<flip-tag label="Label" removable="true" removal-button-label="Remove this one"></flip-tag>`,
    });

    const removalButton = page.root.shadowRoot.querySelector("button");
    const spy = jest.fn();

    page.root.addEventListener("remove", spy);
    removalButton.click();

    expect(removalButton.getAttribute("aria-label")).toBe("Remove this one");
    expect(spy).toHaveBeenCalled();
  });
});
