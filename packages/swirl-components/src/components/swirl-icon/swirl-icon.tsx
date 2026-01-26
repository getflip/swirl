import { Component, h, Host, Prop } from "@stencil/core";
import classNames from "classnames";
import { SwirlIconSize } from "./swirl-icon.types";

export type SwirlIconColor =
  | "critical"
  | "default"
  | "disabled"
  | "highlight"
  | "info"
  | "on-action-primary"
  | "on-image"
  | "on-status"
  | "on-surface-highlight-subdued"
  | "on-surface-highlight"
  | "strong"
  | "success"
  | "warning";

export type SwirlIconWrapperColor =
  | "banana"
  | "blueberry"
  | "chilli"
  | "grape"
  | "kiwi"
  | "neutral"
  | "pumpkin"
  | "radish";

export type SwirlIconWrapperSize = "xs" | "s" | "m" | "l" | "xl";

@Component({
  shadow: true,
  styleUrl: "swirl-icon.css",
  tag: "swirl-icon",
})
export class SwirlIcon {
  @Prop() color?: SwirlIconColor;
  @Prop() glyph!: string;
  @Prop() size: SwirlIconSize = 24;
  @Prop() wrapperColor: SwirlIconWrapperColor;
  @Prop() wrapperSize?: SwirlIconWrapperSize = "m";

  render() {
    const Tag = `swirl-icon-${this.glyph}`;

    const iconWrapperClassname = classNames(
      "icon-wrapper",
      `icon-wrapper--size-${this.wrapperSize}`,
      `icon-wrapper--background-color-${this.wrapperColor}`
    );

    const renderIcon = () => {
      if (this.wrapperColor) {
        return (
          <div class={iconWrapperClassname}>
            <Tag color={this.color} size={this.size}></Tag>
          </div>
        );
      } else {
        return <Tag color={this.color} size={this.size}></Tag>;
      }
    };

    return <Host>{renderIcon()}</Host>;
  }
}
