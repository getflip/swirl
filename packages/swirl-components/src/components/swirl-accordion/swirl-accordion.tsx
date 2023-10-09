import { Component, Element, h, Host, Method } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-accordion.css",
  tag: "swirl-accordion",
})
export class SwirlAccordion {
  @Element() el: HTMLElement;

  componentDidLoad() {
    this.el.addEventListener(
      "expansionChange",
      (event: CustomEvent<boolean>) => {
        if (event.detail) {
          this.collapseInactiveItems(
            event.target as HTMLSwirlAccordionItemElement
          );
        }
      }
    );
  }

  /**
   * Collapses an accordion item.
   */
  @Method()
  async collapseItem(itemId: string) {
    const item = Array.from(
      this.el.querySelectorAll("swirl-accordion-item")
    ).find((item) => item.itemId === itemId);

    if (!Boolean(item)) {
      return;
    }

    item.collapse();
  }

  /**
   * Expands an accordion item.
   */
  @Method()
  async expandItem(itemId: string) {
    const item = Array.from(
      this.el.querySelectorAll("swirl-accordion-item")
    ).find((item) => item.itemId === itemId);

    if (!Boolean(item)) {
      return;
    }

    item.expand();
  }

  private collapseInactiveItems(activeItem: HTMLSwirlAccordionItemElement) {
    Array.from(this.el.querySelectorAll("swirl-accordion-item")).forEach(
      (item) => {
        if (item !== activeItem) {
          item.collapse();
        }
      }
    );
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
