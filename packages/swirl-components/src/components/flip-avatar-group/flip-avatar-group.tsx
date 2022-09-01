import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot slot - Your avatar components
 */
@Component({
  shadow: true,
  styleUrl: "flip-avatar-group.css",
  tag: "flip-avatar-group",
})
export class FlipAvatarGroup {
  @Prop() badge?: string;

  render() {
    const className = classnames("avatar-group", {
      "avatar-group--has-badge": Boolean(this.badge),
    });

    const badgeClassName = classnames("avatar-group__badge");

    return (
      <Host>
        <div class={className} role="group">
          <slot></slot>
          {this.badge && (
            <span class={badgeClassName} innerHTML={this.badge}></span>
          )}
        </div>
      </Host>
    );
  }
}
