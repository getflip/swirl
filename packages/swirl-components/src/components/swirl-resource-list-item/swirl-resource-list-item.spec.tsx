import { newSpecPage } from "@stencil/core/testing";

import { FlipResourceListItem } from "./swirl-resource-list-item";

describe("flip-resource-list-item", () => {
  it("renders label, description and media", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListItem],
      html: `
        <flip-resource-list-item
          description="Description"
          label="Label"
          media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></flip-avatar>"
        ></flip-resource-list-item>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-resource-list-item description="Description" label="Label" media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></flip-avatar>" role="row">
        <mock:shadow-root>
          <div class="resource-list-item" role="gridcell">
            <button aria-labelledby="label" class="resource-list-item__content" tabindex="0">
              <span class="resource-list-item__media">
                <flip-avatar label="John Doe" src="https://picsum.photos/id/433/144/144"></flip-avatar>
              </span>
              <span class="resource-list-item__label-container">
                <span class="resource-list-item__label" id="label">
                  Label
                </span>
                <span class="resource-list-item__description">
                  Description
                </span>
              </span>
            </button>
          </div>
        </mock:shadow-root>
      </flip-resource-list-item>
    `);
  });

  it("renders as link", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListItem],
      html: `
        <flip-resource-list-item href="#" label="Label"></flip-resource-list-item>
      `,
    });

    const element = page.root.shadowRoot.querySelector(
      ".resource-list-item__content"
    );

    expect(element.tagName).toBe("A");
    expect(element.getAttribute("href")).toBe("#");
  });

  it("renders as checkbox", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListItem],
      html: `
        <flip-resource-list-item label="Label" selectable="true"></flip-resource-list-item>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    const element = page.root.shadowRoot.querySelector(
      ".resource-list-item__content"
    ) as HTMLElement;

    expect(element.getAttribute("role")).toBe("checkbox");
    expect(element.getAttribute("aria-checked")).toBe("false");

    element.click();
    await page.waitForChanges();
    expect(spy.mock.calls[0][0].detail).toBe(true);
    expect(element.getAttribute("aria-checked")).toBe("true");

    element.click();
    await page.waitForChanges();
    expect(spy.mock.calls[1][0].detail).toBe(false);
    expect(element.getAttribute("aria-checked")).toBe("false");
  });

  it("renders meta information", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListItem],
      html: `
        <flip-resource-list-item label="Label" meta="Meta"></flip-resource-list-item>
      `,
    });

    expect(
      page.root.shadowRoot.querySelector(".resource-list-item__meta")
    ).not.toBeNull();
  });

  it("renders a menu trigger", async () => {
    const page = await newSpecPage({
      components: [FlipResourceListItem],
      html: `
        <flip-resource-list-item label="Label" menu-trigger-id="trigger"></flip-resource-list-item>
      `,
    });

    expect(
      page.root.shadowRoot.querySelector(".resource-list-item__menu-trigger")
    ).not.toBeNull();
  });
});
