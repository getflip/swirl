import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipTextAlign = "start" | "center" | "end";

export type FlipTextColor =
  | "default"
  | "subdued"
  | "critical"
  | "success"
  | "warning";

export type FlipTextFontStyle = "normal" | "italic";

export type FlipTextSize = "sm" | "base" | "lg";

export type FlipTextWeight = "normal" | "medium" | "semibold" | "bold";

@Component({
  shadow: true,
  styleUrl: "flip-text.css",
  tag: "flip-text",
})
export class FlipText {
  @Prop() align?: FlipTextAlign = "start";
  @Prop() as?: string = "p";
  @Prop() color?: FlipTextColor = "default";
  @Prop() fontStyle?: FlipTextFontStyle = "normal";
  @Prop() size?: FlipTextSize = "base";
  @Prop() weight?: FlipTextWeight = "normal";

  render() {
    const Tag = this.as;

    const className = classnames(
      "text",
      `text--align-${this.align}`,
      `text--color-${this.color}`,
      `text--font-style-${this.fontStyle}`,
      `text--size-${this.size}`,
      `text--weight-${this.weight}`
    );

    return (
      <Host>
        <Tag class={className} part="text">
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
