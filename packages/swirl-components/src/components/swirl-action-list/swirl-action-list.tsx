import { Component, Element, h, Host, State } from "@stencil/core";
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

  @State() isInsidePopover: boolean;

  private container: HTMLElement;

  componentDidLoad() {
    queueMicrotask(() => {
      this.isInsidePopover = this.el.closest("swirl-popover") !== null;

      if (!this.isInsidePopover) {
        this.container.setAttribute("tabindex", "0");
      }
    });
  }

  private getItems() {
    return querySelectorAllDeep(this.el, '[role="menuitem"]');
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (
      event.code === "ArrowDown" ||
      event.code === "ArrowRight" ||
      event.code === "KeyJ"
    ) {
      event.preventDefault();
      this.focusNextItem();
    } else if (
      event.code === "ArrowUp" ||
      event.code === "ArrowLeft" ||
      event.code === "KeyK"
    ) {
      event.preventDefault();
      this.focusPreviousItem();
    }
  };

  private onFocusOut = (event: FocusEvent) => {
    if (this.isInsidePopover) {
      return;
    }

    const elementReceivingFocus = event.relatedTarget as HTMLElement;
    const elementLosingFocus = event.target as HTMLElement;

    const losingElementIsListItem =
      elementLosingFocus?.tagName === "SWIRL-ACTION-LIST-ITEM";

    const receivingElementIsOutsideActionList =
      elementReceivingFocus === null ||
      !this.el.contains(elementReceivingFocus);

    if (
      !this.isInsidePopover &&
      receivingElementIsOutsideActionList &&
      losingElementIsListItem
    ) {
      this.container.setAttribute("tabindex", "0");
    }
  };

  private onFocus = () => {
    if (this.isInsidePopover) {
      return;
    }

    this.container.removeAttribute("tabindex");

    const items = this.getItems();
    const activeItemIndex = this.getActiveItemIndex();

    if (activeItemIndex > -1) {
      items[activeItemIndex]?.focus();
    } else {
      items[0]?.focus();
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
          onFocusout={this.isInsidePopover ? undefined : this.onFocusOut}
          onFocus={this.isInsidePopover ? undefined : this.onFocus}
          onKeyDown={this.onKeyDown}
          part="action-list"
          ref={(el) => (this.container = el)}
          role="menu"
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
