import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

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
  shadow: true,
  styleUrl: "swirl-text.css",
  tag: "swirl-text",
})
export class SwirlText {
  @Prop() align?: SwirlTextAlign = "start";
  @Prop() as?: string = "p";
  @Prop() color?: SwirlTextColor = "default";
  @Prop() fontStyle?: SwirlTextFontStyle = "normal";
  @Prop() size?: SwirlTextSize = "base";
  @Prop() truncate?: boolean;
  @Prop() weight?: SwirlTextWeight = "normal";

  render() {
    const Tag = this.as;

    const className = classnames(
      "text",
      `text--align-${this.align}`,
      `text--color-${this.color}`,
      `text--font-style-${this.fontStyle}`,
      `text--size-${this.size}`,
      `text--weight-${this.weight}`,
      { "text--truncate": this.truncate }
    );

    return (
      <Host>
        <Tag class={className} part={className}>
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
