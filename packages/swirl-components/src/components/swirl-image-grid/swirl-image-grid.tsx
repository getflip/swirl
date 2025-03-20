import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

const swirlImageGridBorderRadiusTokens = [
  "xs",
  "sm",
  "base",
  "l",
  "xl",
] as const;

export type SwirlImageGridBorderRadius =
  | (typeof swirlImageGridBorderRadiusTokens)[number]
  | string;

@Component({
  shadow: true,
  styleUrl: "swirl-image-grid.css",
  tag: "swirl-image-grid",
})
export class SwirlImageGrid {
  @Element() el: HTMLSwirlImageGridElement;

  @Prop() aspectRatio?: string;
  @Prop() borderRadius?: SwirlImageGridBorderRadius = "sm";
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
    if (this.aspectRatio) {
      return this.aspectRatio;
    }
    switch (this.items.length) {
      case 1:
        return "1";
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

    const styles = {
      aspectRatio: aspectRatio,
      borderRadius: swirlImageGridBorderRadiusTokens.includes(
        this.borderRadius as (typeof swirlImageGridBorderRadiusTokens)[number]
      )
        ? `var(--s-border-radius-${this.borderRadius})`
        : this.borderRadius,
    };

    return (
      <Host>
        <div
          aria-label={this.label}
          class={className}
          role="list"
          style={styles}
        >
          <slot onSlotchange={this.updateItems}></slot>
        </div>
      </Host>
    );
  }
}
