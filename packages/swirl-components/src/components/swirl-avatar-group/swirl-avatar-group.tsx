import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot slot - Your avatar components
 */
@Component({
  shadow: true,
  styleUrl: "swirl-avatar-group.css",
  tag: "swirl-avatar-group",
})
export class SwirlAvatarGroup {
  @Prop() badge?: string;

  private badgeEl: HTMLElement;

  componentDidLoad() {
    this.forceBadgeProps();
  }

  private forceBadgeProps() {
    if (!Boolean(this.badge)) {
      return;
    }

    const badge = this.badgeEl.querySelector("swirl-badge");
    const badgeSize = badge?.getAttribute("size");

    if (!Boolean(badgeSize)) {
      badge?.setAttribute("size", "s");
    }
  }

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
            <span
              class={badgeClassName}
              innerHTML={this.badge}
              ref={(el) => (this.badgeEl = el)}
            ></span>
          )}
        </div>
      </Host>
    );
  }
}
