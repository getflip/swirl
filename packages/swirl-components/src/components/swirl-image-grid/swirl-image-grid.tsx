import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-image-grid.css",
  tag: "swirl-image-grid",
})
export class SwirlImageGrid {
  @Element() el: HTMLSwirlImageGridElement;

  @Prop() aspectRatio?: string = "1/1";
  @Prop() label?: string;

  @State() items: HTMLSwirlImageGridItemElement[] = [];

  componentWillLoad() {
    this.updateItems();
  }

  private updateItems = () => {
    this.items = Array.from(
      this.el.children
    ) as HTMLSwirlImageGridItemElement[];

    if (this.items.length > 4) {
      this.items[3].overlay = `+${this.items.length - 4}`;
    }
  };

  render() {
    const className = classnames(
      "image-grid",
      `image-grid--item-count-${Math.min(4, this.items.length)}`
    );

    return (
      <Host>
        <div
          aria-label={this.label}
          class={className}
          role="list"
          style={{ aspectRatio: this.aspectRatio }}
        >
          <slot onSlotchange={this.updateItems}></slot>
        </div>
      </Host>
    );
  }
}
