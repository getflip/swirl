import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-resource-list.css",
  tag: "flip-resource-list",
})
export class FlipResourceList {
  @Element() el: HTMLElement;

  @Prop() label?: string;

  private focusedIndex = 0;
  private items: HTMLFlipResourceListItemElement[];

  componentDidLoad() {
    this.collectItems();
    this.removeItemsFromTabOrder();
  }

  private collectItems() {
    this.items = Array.from(
      this.el.querySelectorAll("flip-resource-list-item")
    );
  }

  private removeItemsFromTabOrder() {
    this.items.forEach((item) =>
      item.shadowRoot
        ?.querySelector(".resource-list-item__content")
        ?.setAttribute("tabIndex", "-1")
    );
  }

  private focusItemAtIndex(index: number) {
    this.removeItemsFromTabOrder();

    const item = this.items[index];

    if (!Boolean(item)) {
      return;
    }

    const interactiveElement = item.shadowRoot.querySelector<HTMLElement>(
      ".resource-list-item__content"
    );

    interactiveElement.setAttribute("tabIndex", "0");
    interactiveElement.focus();

    this.focusedIndex = index;
  }

  private onFocus = () => {
    this.focusItemAtIndex(this.focusedIndex);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.focusItemAtIndex((this.focusedIndex + 1) % this.items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      const prevIndex =
        this.focusedIndex === 0 ? this.items.length - 1 : this.focusedIndex - 1;

      this.focusItemAtIndex(prevIndex);
    } else if (event.key === "Home") {
      event.preventDefault();

      this.focusItemAtIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();

      this.focusItemAtIndex(this.items.length - 1);
    }
  };

  render() {
    return (
      <Host onKeyDown={this.onKeyDown}>
        <flip-stack
          aria-label={this.label}
          onFocus={this.onFocus}
          role="grid"
          tabIndex={0}
        >
          <slot></slot>
        </flip-stack>
      </Host>
    );
  }
}
