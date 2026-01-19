import { MockElement } from "@stencil/core/mock-doc";
import { newSpecPage } from "@stencil/core/testing";
import { SwirlResourceListItem } from "../swirl-resource-list-item/swirl-resource-list-item";
import { SwirlResourceList } from "./swirl-resource-list";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

(MockElement.prototype as any).after = function () {
  var argArr = Array.prototype.slice.call(arguments);
  var docFrag = document.createDocumentFragment();

  for (var n = 0; n < argArr.length; n++) {
    docFrag.appendChild(argArr[n]);
  }

  this.parentNode.insertBefore(docFrag, this.nextSibling);
};

(MockElement.prototype as any).before = function () {
  var argArr = Array.prototype.slice.call(arguments);
  var docFrag = document.createDocumentFragment();

  for (var n = 0; n < argArr.length; n++) {
    docFrag.appendChild(argArr[n]);
  }

  this.parentNode.insertBefore(docFrag, this.previousSibling);
};

describe("swirl-resource-list", () => {
  const template = `
    <swirl-resource-list label="Label">
      <swirl-resource-list-item
        description="With a description"
        label="This is a resource item"
        media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></swirl-avatar>"
      ></swirl-resource-list-item>
      <swirl-resource-list-item
        description="With a description"
        label="This is a resource item"
        media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></swirl-avatar>"
      ></swirl-resource-list-item>
    </swirl-resource-list>
  `;

  it("renders its items", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceList],
      html: template,
    });

    const id = page.root.querySelector(".resource-list")?.id;

    expect(page.root).toEqualHtml(`
      <swirl-resource-list label="Label">
        <swirl-visually-hidden role="alert"></swirl-visually-hidden>
        <swirl-box paddinginlineend="8" paddinginlinestart="8">
          <swirl-stack aria-label="Label" class="resource-list" id="${id}" role="grid" spacing="0">
            <swirl-resource-list-item description="With a description" label="This is a resource item" media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></swirl-avatar>"></swirl-resource-list-item>
            <swirl-resource-list-item description="With a description" label="This is a resource item" media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></swirl-avatar>"></swirl-resource-list-item>
          </swirl-stack>
        </swirl-box>
      </swirl-resource-list>
    `);
  });

  it("renders with list semantics", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceList, SwirlResourceListItem],
      html: `
        <swirl-resource-list label="Label" semantics="list">
          <swirl-resource-list-item label="This is a resource item"></swirl-resource-list-item>
          <swirl-resource-list-item label="This is a resource item"></swirl-resource-list-item>
        </swirl-resource-list>
      `,
    });

    expect(page.root.querySelector('[role="list"]')).toBeDefined();
    expect(page.root.querySelectorAll('[role="listitem"]')).toHaveLength(2);
    expect(
      page.root.querySelectorAll('[role="row"], [role="gridcell"]')
    ).toHaveLength(0);
  });

  it("manages focus via keyboard events", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceList, SwirlResourceListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("swirl-resource-list-item")
    );

    const interactiveElements = items.map((item) =>
      item.querySelector<HTMLElement>(".resource-list-item__content")
    );

    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("0");

    // Down arrow focuses the next element
    page.root.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowDown" })
    );
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("-1");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("0");

    // Up arrow focues the next element
    page.root.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowUp" }));
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("0");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("-1");

    // End key focues the first element
    page.root.dispatchEvent(new KeyboardEvent("keydown", { code: "End" }));
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("-1");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("0");

    // Home key focues the first element
    page.root.dispatchEvent(new KeyboardEvent("keydown", { code: "Home" }));
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("0");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("-1");
  });

  it("makes items draggable", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceList, SwirlResourceListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("swirl-resource-list-item")
    );

    const assistiveText =
      page.root.querySelector<HTMLElement>('[role="alert"]');

    const resourceList =
      page.root.querySelector<HTMLElement>(".resource-list").parentElement
        .parentElement;

    for (const item of items) {
      expect(item.getAttribute("allow-drag")).toBeNull();
    }

    page.root.setAttribute("allow-drag", "true");
    await page.waitForChanges();

    for (const item of items) {
      expect(item.getAttribute("allow-drag")).toBe("true");
    }

    items[0]
      .querySelector<HTMLButtonElement>(".resource-list-item__drag-handle")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    await page.waitForChanges();

    expect(assistiveText.innerHTML).toBe(
      "Item grabbed. Use arrow keys to move item up or down. Use spacebar to save position."
    );

    await page.waitForChanges();
    resourceList.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowDown" })
    );
    await page.waitForChanges();

    expect(assistiveText.innerHTML).toBe("Current position: 2");

    resourceList.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowUp" })
    );
    await page.waitForChanges();

    expect(assistiveText.innerHTML).toBe("Current position: 1");
  });

  it("resets focus to the first item", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceList, SwirlResourceListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("swirl-resource-list-item")
    );

    const interactiveElements = items.map((item) =>
      item.querySelector<HTMLElement>(".resource-list-item__content")
    );

    // update focused index with arrow down key
    page.root.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowDown" })
    );
    await page.waitForChanges();

    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("-1");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("0");

    const component: SwirlResourceList = page.rootInstance;

    expect(component["focusedIndex"]).toBe(1);

    await component.resetFocus();
    await page.waitForChanges();

    expect(component["focusedIndex"]).toBe(0);

    // trigger an arrow down and up to verify the reset works in practice
    page.root.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowDown" })
    );
    await page.waitForChanges();

    // after arrow down from reset position, second item should be focused
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("0");
  });
});
