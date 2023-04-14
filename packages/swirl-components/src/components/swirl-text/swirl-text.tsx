import { Component, Element, h, Host, Listen, Prop } from "@stencil/core";
import classnames from "classnames";
import balanceText from "balance-text";
import shave from "shave";

export type SwirlTextAlign = "start" | "center" | "end";

export type SwirlTextColor =
  | "default"
  | "subdued"
  | "critical"
  | "success"
  | "warning";

export type SwirlTextFontStyle = "normal" | "italic";

export type SwirlTextSize = "sm" | "base" | "lg";

export type SwirlTextWeight = "normal" | "medium" | "semibold" | "bold";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-text.css",
  tag: "swirl-text",
})
export class SwirlText {
  @Element() el: HTMLElement;

  @Prop() align?: SwirlTextAlign = "start";
  @Prop() as?: string = "p";
  @Prop() balance?: boolean;
  @Prop() color?: SwirlTextColor = "default";
  @Prop() fontStyle?: SwirlTextFontStyle = "normal";
  @Prop() lines?: number;
  @Prop() size?: SwirlTextSize = "base";
  @Prop() truncate?: boolean;
  @Prop() weight?: SwirlTextWeight = "normal";

  private textEl: HTMLElement;

  componentDidRender() {
    this.rebalance();
    this.handleTruncation();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.rebalance();
    this.handleTruncation();
  }

  private handleTruncation() {
    if (!this.truncate || !Boolean(this.lines) || this.lines === 1) {
      return;
    }

    const lineHeight = +window
      .getComputedStyle(this.textEl, null)
      .getPropertyValue("line-height")
      .replace("px", "");

    if (lineHeight > 0) {
      shave(this.textEl, lineHeight * this.lines);
    }
  }

  private rebalance() {
    if (!this.balance || !Boolean(this.textEl)) {
      return;
    }

    balanceText(this.textEl);
  }

  render() {
    const Tag = this.as;

    const className = classnames(
      "text",
      `text--align-${this.align}`,
      `text--color-${this.color}`,
      `text--font-style-${this.fontStyle}`,
      `text--size-${this.size}`,
      `text--weight-${this.weight}`,
      {
        "text--truncate":
          this.truncate && (!Boolean(this.lines) || this.lines === 1),
      }
    );

    return (
      <Host>
        <Tag class={className} ref={(el: HTMLElement) => (this.textEl = el)}>
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
