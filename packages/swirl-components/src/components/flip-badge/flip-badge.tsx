import classnames from "classnames";

import { Component, h, Host, Prop } from "@stencil/core";

export type FlipBadgeIntent =
  | "critical"
  | "decorative-1"
  | "decorative-2"
  | "decorative-3"
  | "decorative-4"
  | "decorative-5"
  | "decorative-6"
  | "decorative-7";

export type FlipBadgeSize = "s" | "m";

export type FlipBadgeVariant = "default" | "dot";

@Component({
  shadow: true,
  styleUrl: "flip-badge.css",
  tag: "flip-badge",
})
export class FlipBadge {
  @Prop() icon?: string;
  @Prop() intent?: FlipBadgeIntent = "critical";
  @Prop() label!: string;
  @Prop() size?: FlipBadgeSize = "m";
  @Prop() variant?: FlipBadgeVariant = "default";

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
      <Host role="status" tabIndex="0">
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
