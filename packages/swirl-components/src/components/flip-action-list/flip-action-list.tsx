import { Component, Element, h, Host } from "@stencil/core";
import { querySelectorAllDeep } from "../../utils";

@Component({
  shadow: true,
  styleUrl: "flip-action-list.css",
  tag: "flip-action-list",
})
export class FlipActionList {
  @Element() el: HTMLElement;

  private items: HTMLElement[];

  componentDidLoad() {
    this.items = querySelectorAllDeep(this.el, '[role="menuitem"]');
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
    const activeItemIndex = this.getActiveItemIndex();
    const newIndex = (activeItemIndex + 1) % this.items.length;

    this.items[newIndex].focus();
  }

  private focusPreviousItem() {
    const activeItemIndex = this.getActiveItemIndex();
    const newIndex =
      activeItemIndex === 0 ? this.items.length - 1 : activeItemIndex - 1;

    this.items[newIndex].focus();
  }

  private getActiveItemIndex(): number {
    return this.items.findIndex(
      (item) =>
        item === document.activeElement ||
        item ===
          document.activeElement?.shadowRoot?.querySelector('[role="menuitem"]')
    );
  }

  render() {
    return (
      <Host>
        <div
          aria-orientation="vertical"
          class="action-list"
          onKeyDown={this.onKeyDown}
          role="menu"
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
