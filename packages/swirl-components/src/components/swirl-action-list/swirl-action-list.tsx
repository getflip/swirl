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

  private items: HTMLElement[];
  private observer: MutationObserver;

  componentDidLoad() {
    this.updateItems();
    this.observeSlotChanges();
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  private observeSlotChanges() {
    this.observer = new MutationObserver(() => {
      this.updateItems();
    });

    this.observer.observe(this.el, { childList: true });
  }

  private updateItems() {
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

    this.items[newIndex]?.focus();
  }

  private getActiveItemIndex(): number {
    const activeElement = getActiveElement();

    return this.items.findIndex(
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
