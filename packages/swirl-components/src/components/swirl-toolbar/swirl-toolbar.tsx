import { Component, Element, h, Host, Prop } from "@stencil/core";
import { getActiveElement } from "../../utils";

export type SwirlToolbarOrientation = "horizontal" | "vertical";

@Component({
  shadow: true,
  styleUrl: "swirl-toolbar.css",
  tag: "swirl-toolbar",
})
export class SwirlToolbar {
  @Element() el: HTMLElement;

  @Prop() label: string;
  @Prop() orientation?: SwirlToolbarOrientation = "horizontal";

  componentDidLoad() {
    const items = this.getItems();

    this.deactivateTabIndexes(items);

    const firstButton = items[0]?.querySelector("button");
    if (!Boolean(firstButton)) {
      return;
    }

    firstButton.tabIndex = 0;
  }

  private getItems() {
    return Array.from(
      this.el.querySelectorAll<HTMLSwirlButtonElement | HTMLSwirlChipElement>(
        "swirl-button, swirl-chip"
      )
    );
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
    const activeItemIndex = this.getActiveItemIndex(items);
    const newIndex = (activeItemIndex + 1) % items.length;

    this.focusItem(items[newIndex]);
  }

  private focusPreviousItem() {
    const items = this.getItems();
    const activeItemIndex = this.getActiveItemIndex(items);
    const newIndex =
      activeItemIndex === 0 ? items.length - 1 : activeItemIndex - 1;

    this.focusItem(items[newIndex]);
  }

  private getActiveItemIndex(items): number {
    const activeElement = getActiveElement();

    return items.findIndex(
      (item) => item === activeElement?.closest("swirl-button, swirl-chip")
    );
  }

  private focusItem(item: HTMLElement) {
    const items = this.getItems();

    this.deactivateTabIndexes(items);

    if (!Boolean(item)) {
      return;
    }

    const button = item.querySelector("button");
    if (!Boolean(button)) {
      return;
    }

    button.tabIndex = 0;
    button.focus();
  }

  private deactivateTabIndexes(items: Array<HTMLElement>) {
    items.forEach((item) => {
      const button = item.querySelector("button");

      if (!Boolean(button)) {
        return;
      }

      button.tabIndex = -1;
    });
  }

  render() {
    return (
      <Host>
        <swirl-stack
          align="center"
          aria-label={this.label}
          aria-orientation={this.orientation}
          role="toolbar"
          onKeyDown={this.onKeyDown}
          orientation={this.orientation}
          spacing="8"
          wrap
        >
          <slot></slot>
        </swirl-stack>
      </Host>
    );
  }
}
