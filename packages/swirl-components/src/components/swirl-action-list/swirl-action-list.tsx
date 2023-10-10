import { Component, Element, h, Host } from "@stencil/core";
import { getActiveElement, querySelectorAllDeep } from "../../utils";

/**
 * @slot slot - The action list items and sections
 */
@Component({
  shadow: true,
  styleUrl: "swirl-action-list.css",
  tag: "swirl-action-list",
})
export class SwirlActionList {
  @Element() el: HTMLElement;

  private getItems() {
    return querySelectorAllDeep(this.el, '[role="menuitem"]');
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
    const items = this.getItems();
    const activeItemIndex = this.getActiveItemIndex();
    const newIndex = (activeItemIndex + 1) % items.length;

    items[newIndex].focus();
  }

  private focusPreviousItem() {
    const items = this.getItems();
    const activeItemIndex = this.getActiveItemIndex();
    const newIndex =
      activeItemIndex === 0 ? items.length - 1 : activeItemIndex - 1;

    items[newIndex]?.focus();
  }

  private getActiveItemIndex(): number {
    const items = this.getItems();
    const activeElement = getActiveElement();

    return items.findIndex(
      (item) =>
        item === activeElement ||
        item === activeElement?.querySelector('[role="menuitem"]')
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
