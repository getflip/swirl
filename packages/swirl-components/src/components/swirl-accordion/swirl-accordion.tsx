import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
} from "@stencil/core";

/**
 * @slot slot - The accordion items (e.g. swirl-accordion-item).
 */
@Component({
  shadow: true,
  styleUrl: "swirl-accordion.css",
  tag: "swirl-accordion",
})
export class SwirlAccordion {
  @Prop() multiExpand: boolean = false;

  @Element() el: HTMLElement;

  @Event() expandedItemChange: EventEmitter<string>;

  private componentLoaded = false;

  connectedCallback() {
    if (this.componentLoaded) {
      this.el.addEventListener("expansionChange", this.onExpansionChange);
    }
  }

  componentDidLoad() {
    this.el.addEventListener("expansionChange", this.onExpansionChange);
    this.componentLoaded = true;
  }

  disconnectedCallback() {
    this.el.removeEventListener("expansionChange", this.onExpansionChange);
  }

  private onExpansionChange = (event: CustomEvent<boolean>) => {
    if (event.detail) {
      this.expandedItemChange.emit(
        (event.target as HTMLSwirlAccordionItemElement).itemId
      );

      this.collapseInactiveItems(event.target as HTMLSwirlAccordionItemElement);
    }
  };

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
    if (this.multiExpand) {
      return;
    }

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
