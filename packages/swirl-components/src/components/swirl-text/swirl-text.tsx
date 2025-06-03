import { Component, Element, h, Host, Listen, Prop } from "@stencil/core";
import balanceText from "balance-text";
import classnames from "classnames";
import shave from "shave";

export type SwirlTextAlign = "start" | "center" | "end";

export type SwirlTextColor =
  | "critical"
  | "default"
  | "highlight"
  | "on-action-primary"
  | "on-image"
  | "on-status"
  | "on-surface-highlight"
  | "on-surface-highlight-subdued"
  | "subdued"
  | "success"
  | "warning";

export type SwirlTextFontFamily = "code" | "text";

export type SwirlTextFontStyle = "normal" | "italic";

export type SwirlTextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";

export type SwirlTextTruncateDirection = "end" | "start";

export type SwirlTextWeight = "normal" | "medium" | "semibold" | "bold";

export type SwirlTextWhiteSpace =
  | "inherit"
  | "normal"
  | "nowrap"
  | "pre"
  | "pre-line"
  | "pre-wrap"
  | "break-spaces";

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
  @Prop() fontFamily?: SwirlTextFontFamily = "text";
  @Prop() fontStyle?: SwirlTextFontStyle = "normal";
  @Prop() lines?: number;
  @Prop() responsive?: boolean = true;
  @Prop() size?: SwirlTextSize = "base";
  @Prop() truncate?: boolean;
  @Prop() truncateDirection?: SwirlTextTruncateDirection = "end";
  @Prop() weight?: SwirlTextWeight = "normal";
  @Prop() whiteSpace?: SwirlTextWhiteSpace = "normal";

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

    const truncate =
      this.truncate && (!Boolean(this.lines) || this.lines === 1);

    const className = classnames(
      "text",
      `text--align-${this.align}`,
      `text--color-${this.color}`,
      `text--font-family-${this.fontFamily}`,
      `text--font-style-${this.fontStyle}`,
      `text--size-${this.size}`,
      `text--truncate-direction-${this.truncateDirection}`,
      `text--weight-${this.weight}`,
      {
        "text--truncate": truncate,
        "text--responsive": this.responsive,
      }
    );

    const styles = {
      whiteSpace: truncate ? "nowrap" : this.whiteSpace,
    };

    return (
      <Host>
        <Tag
          class={className}
          ref={(el: HTMLElement) => (this.textEl = el)}
          style={styles}
        >
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
