import { newSpecPage } from "@stencil/core/testing";

import { SwirlResourceListItem } from "./swirl-resource-list-item";

describe("swirl-resource-list-item", () => {
  it("renders label, description and media", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item
            description="Description"
            label="Label"
          >
            <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" slot="media"></swirl-avatar>
          </swirl-resource-list-item>
        </div>
      `,
    });

    const id = page.root.querySelector("[id]").id;

    expect(page.root).toEqualHtml(`
      <swirl-resource-list-item description="Description" label="Label" role="row">
        <div class="resource-list-item resource-list-item--interactive resource-list-item--label-weight-medium" role="gridcell">
          <button aria-label="Label" aria-labelledby="${id}" class="resource-list-item__content" part="resource-list-item__content" tabindex="0" type="button">
            <span class="resource-list-item__media">
              <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" slot="media"></swirl-avatar>
            </span>
            <span class="resource-list-item__label-container">
              <span class="resource-list-item__label" id="${id}">
                Label
              </span>
              <span class="resource-list-item__description">
                Description
              </span>
            </span>
          </button>
          <span class="resource-list-item__control"></span>
        </div>
      </swirl-resource-list-item>
    `);
  });

  it("renders as link", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item href="#" label="Label"></swirl-resource-list-item>
        </div>
      `,
    });

    const element = page.root.querySelector(".resource-list-item__content");

    expect(element.tagName).toBe("A");
    expect(element.getAttribute("href")).toBe("#");
  });

  it("renders as checkbox", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="Label" selectable="true"></swirl-resource-list-item>
        </div>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    const element = page.root.querySelector(
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
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="Label" meta="Meta"></swirl-resource-list-item>
        </div>
      `,
    });

    expect(page.root.querySelector(".resource-list-item__meta")).not.toBeNull();
  });

  it("renders a control", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="Label">
            <swirl-button label="Label" slot="control"></swirl-button>
          </swirl-resource-list-item>
        </div>
      `,
    });

    expect(
      page.root.querySelector(".resource-list-item__control").children.length
    ).toBe(1);
  });

  it("can be draggable", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item allow-drag="true" label="Resource List Item"></swirl-resource-list-item>
        </div>
      `,
    });

    const spy = jest.fn();

    const dragHandle = page.root.querySelector(
      ".resource-list-item__drag-handle"
    );

    page.root.addEventListener("toggleDrag", spy);

    dragHandle.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));

    expect(
      page.root
        .querySelector(".resource-list-item__drag-handle")
        .getAttribute("aria-label")
    ).toBe('Move item "Resource List Item"');

    expect(spy).toHaveBeenCalled();
  });

  it("renders a plain text", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="<button>Button</button>" allow-html="false" description="<button>Description</button>"></swirl-resource-list-item>
        </div>
      `,
    });

    expect(
      page.root.querySelector<HTMLElement>(".resource-list-item__label")
        .innerText
    ).toBe("<button>Button</button>");

    expect(
      page.root.querySelector<HTMLElement>(".resource-list-item__description")
        .innerText
    ).toBe("<button>Description</button>");
  });
});
