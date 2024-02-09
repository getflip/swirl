import { Component, h, Host, Prop } from "@stencil/core";
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

@Component({
  shadow: true,
  styleUrl: "swirl-icon.css",
  tag: "swirl-icon",
})
export class SwirlIcon {
  @Prop() color?: SwirlIconColor;
  @Prop() glyph!: string;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const Tag = `swirl-icon-${this.glyph}`;

    return (
      <Host>
        <Tag color={this.color} size={this.size}></Tag>
      </Host>
    );
  }
}
