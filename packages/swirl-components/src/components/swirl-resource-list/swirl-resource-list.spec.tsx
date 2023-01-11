import { newSpecPage } from "@stencil/core/testing";
import { SwirlResourceListItem } from "../swirl-resource-list-item/swirl-resource-list-item";
import { SwirlResourceList } from "./swirl-resource-list";

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

    expect(page.root).toEqualHtml(`
      <swirl-resource-list label="Label">
        <mock:shadow-root>
          <swirl-stack aria-label="Label" role="grid" tabindex="0">
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
        <swirl-resource-list-item description="With a description" label="This is a resource item" media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></swirl-avatar>"></swirl-resource-list-item>
        <swirl-resource-list-item description="With a description" label="This is a resource item" media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></swirl-avatar>"></swirl-resource-list-item>
      </swirl-resource-list>
    `);
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
      item.shadowRoot.querySelector<HTMLElement>(".resource-list-item__content")
    );

    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("-1");

    // focuses the first element if list is focused
    (page.root.shadowRoot.children[0] as HTMLElement).focus();
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("0");

    // Down arrow focues the next element
    page.root.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("-1");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("0");

    // Up arrow focues the next element
    page.root.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("0");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("-1");

    // End key focues the first element
    page.root.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("-1");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("0");

    // Home key focues the first element
    page.root.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
    expect(interactiveElements[0].getAttribute("tabIndex")).toBe("0");
    expect(interactiveElements[1].getAttribute("tabIndex")).toBe("-1");
  });
});
