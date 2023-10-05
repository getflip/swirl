import { Component, Element, h, Host } from "@stencil/core";

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
