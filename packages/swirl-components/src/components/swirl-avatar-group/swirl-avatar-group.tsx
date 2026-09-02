import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

export type SwirlAvatarGroupLayout = "centered" | "diagonal" | "horizontal";
export type SwirlAvatarGroupSemantics = "list" | "group";

const centeredLayoutArrangements = [1, 2, 3, 5];

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
  @Prop() label?: string;
  @Prop() layout?: SwirlAvatarGroupLayout = "diagonal";
  @Prop() semantics?: SwirlAvatarGroupSemantics = "group";

  @State() avatars: HTMLElement[] = [];

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
    this.avatars = (
      event.target as HTMLSlotElement
    ).assignedElements() as HTMLElement[];

    this.layOutAvatars();
  };

  private layOutAvatars() {
    if (this.layout === "horizontal") {
      this.avatars.forEach((avatar, index) => {
        avatar.style.position = "relative";
        avatar.style.zIndex = String(this.avatars.length - index);
      });
    } else {
      this.avatars.forEach((avatar) => {
        avatar.style.position = "";
        avatar.style.zIndex = "";
      });
    }
  }

  private getCenteredArrangement(): number {
    const fittingArrangements = centeredLayoutArrangements.filter(
      (arrangement) => arrangement <= this.avatars.length
    );

    return fittingArrangements.length > 0
      ? fittingArrangements[fittingArrangements.length - 1]
      : centeredLayoutArrangements[0];
  }

  render() {
    const className = classnames(
      "avatar-group",
      `avatar-group--${this.layout}-stack`,
      {
        "avatar-group--has-badge": Boolean(this.badge),
        [`avatar-group--centered-${this.getCenteredArrangement()}`]:
          this.layout === "centered",
      }
    );

    const badgeClassName = classnames("avatar-group__badge");

    return (
      <Host>
        <div aria-label={this.label} class={className} role={this.semantics}>
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
