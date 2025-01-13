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

    this.items.forEach((item) => {
      item.overlay = undefined;
    });

    if (this.items.length > 4) {
      this.items[3].overlay = `+${this.items.length - 3}`;
    }
  };

  caculateAspectRatio = () => {
    switch (this.items.length) {
      case 1:
        return this.aspectRatio;
      case 2:
        return "2/1";
      case 3:
        return "3/2";
      case 4:
        return "1";
      default:
        return "1";
    }
  };

  render() {
    const className = classnames(
      "image-grid",
      `image-grid--item-count-${Math.min(4, this.items.length)}`
    );

    const aspectRatio = this.caculateAspectRatio();

    return (
      <Host>
        <div
          aria-label={this.label}
          class={className}
          role="list"
          style={{ aspectRatio: aspectRatio }}
        >
          <slot onSlotchange={this.updateItems}></slot>
        </div>
      </Host>
    );
  }
}
