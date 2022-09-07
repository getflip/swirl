import { Component, Element, h, Host } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-action-list.css",
  tag: "flip-action-list",
})
export class FlipActionList {
  @Element() el: HTMLElement;

  private items: HTMLElement[];

  componentDidLoad() {
    this.items = Array.from(this.el.querySelectorAll("[role='menuitem']"));
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowDown" || event.code === "ArrowRight") {
      event.preventDefault();
      this.focusNextItem();
    } else if (event.code === "ArrowUp" || event.code === "ArrowLeft") {
      event.preventDefault();
      this.focusPreviousItem();
    }
  };

  private focusNextItem() {
    const activeItemIndex = this.items.findIndex(
      (item) => item === document.activeElement
    );

    const newIndex = (activeItemIndex + 1) % this.items.length;

    this.items[newIndex].focus();
  }

  private focusPreviousItem() {
    const activeItemIndex = this.items.findIndex(
      (item) => item === document.activeElement
    );

    const newIndex =
      activeItemIndex === 0 ? this.items.length - 1 : activeItemIndex - 1;

    this.items[newIndex].focus();
  }

  render() {
    return (
      <Host>
        <ul
          aria-orientation="vertical"
          class="action-list"
          onKeyDown={this.onKeyDown}
          role="menu"
        >
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
