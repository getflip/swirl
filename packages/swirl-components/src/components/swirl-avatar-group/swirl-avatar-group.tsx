import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

export type SwirlAvatarGroupLayout = "diagonal" | "horizontal";

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
  @Prop() layout?: SwirlAvatarGroupLayout = "diagonal";

  @State() avatars: HTMLSwirlAvatarElement[] = [];

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

  private onSlotChange = (event: Event) => {
    this.avatars = (event.target as HTMLSlotElement)
      .assignedElements()
      .filter(
        (el) => el.tagName.toLowerCase() === "swirl-avatar"
      ) as HTMLSwirlAvatarElement[];

    this.layOutAvatars();
  };

  private layOutAvatars() {
    if (this.avatars.length <= 2) {
      this.avatars.forEach((avatar) => {
        avatar.style.zIndex = "";
      });
    } else {
      this.avatars.forEach((avatar, index) => {
        avatar.style.zIndex = String(this.avatars.length - index);
      });
    }
  }

  render() {
    const className = classnames(
      "avatar-group",
      `avatar-group--${this.layout}-stack`,
      {
        "avatar-group--has-badge": Boolean(this.badge),
      }
    );

    const badgeClassName = classnames("avatar-group__badge");

    return (
      <Host>
        <div class={className} role="group">
          <slot onSlotchange={this.onSlotChange}></slot>
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
