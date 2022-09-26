import { newSpecPage } from "@stencil/core/testing";
import { FlipResourceListItem } from "../flip-resource-list-item/flip-resource-list-item";
import { FlipResourceList } from "./flip-resource-list";

describe("flip-resource-list", () => {
  const template = `
    <flip-resource-list label="Label">
      <flip-resource-list-item
        description="With a description"
        label="This is a resource item"
        media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></flip-avatar>"
      ></flip-resource-list-item>
      <flip-resource-list-item
        description="With a description"
        label="This is a resource item"
        media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></flip-avatar>"
      ></flip-resource-list-item>
    </flip-resource-list>
  `;

  it("renders its items", async () => {
    const page = await newSpecPage({
      components: [FlipResourceList],
      html: template,
    });

    expect(page.root).toEqualHtml(`
      <flip-resource-list label="Label">
        <mock:shadow-root>
          <flip-stack aria-label="Label" role="grid" tabindex="0">
            <slot></slot>
          </flip-stack>
        </mock:shadow-root>
        <flip-resource-list-item description="With a description" label="This is a resource item" media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></flip-avatar>"></flip-resource-list-item>
        <flip-resource-list-item description="With a description" label="This is a resource item" media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></flip-avatar>"></flip-resource-list-item>
      </flip-resource-list>
    `);
  });

  it("manages focus via keyboard events", async () => {
    const page = await newSpecPage({
      components: [FlipResourceList, FlipResourceListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("flip-resource-list-item")
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
