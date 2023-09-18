import classnames from "classnames";

import { Component, h, Host, Prop } from "@stencil/core";

export type SwirlBadgeIntent =
  | "banana"
  | "blueberry"
  | "chilli"
  | "critical"
  | "grape"
  | "kiwi"
  | "neutral"
  | "pumpkin"
  | "radish";

export type SwirlBadgeSize = "s" | "m";

export type SwirlBadgeVariant = "default" | "dot";

@Component({
  shadow: true,
  styleUrl: "swirl-badge.css",
  tag: "swirl-badge",
})
export class SwirlBadge {
  @Prop() icon?: string;
  @Prop() intent?: SwirlBadgeIntent = "critical";
  @Prop() label!: string;
  @Prop() size?: SwirlBadgeSize = "m";
  @Prop() variant?: SwirlBadgeVariant = "default";

  render() {
    const className = classnames(
      "badge",
      `badge--intent-${this.intent}`,
      `badge--size-${this.size}`,
      `badge--variant-${this.variant}`,
      {
        "badge--has-icon": this.icon,
      }
    );

    return (
      <Host role="status">
        <span class={className}>
          {this.icon && <span class="badge__icon" innerHTML={this.icon}></span>}
          {this.icon === undefined && (
            <span class="badge__label">{this.label}</span>
          )}
        </span>
      </Host>
    );
  }
}
