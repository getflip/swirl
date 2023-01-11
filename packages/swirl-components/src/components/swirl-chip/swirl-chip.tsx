import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipChipIntent = "default" | "critical" | "success";

@Component({
  shadow: true,
  styleUrl: "swirl-chip.css",
  tag: "flip-chip",
})
export class FlipChip {
  @Prop() avatar?: string;
  @Prop() icon?: string;
  @Prop() intent?: FlipChipIntent = "default";
  @Prop() interactive?: boolean = false;
  @Prop() label!: string;

  private avatarEl: HTMLElement;
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceAvatarProps();
    this.forceIconProps();
  }

  private forceAvatarProps() {
    if (!Boolean(this.avatarEl)) {
      return;
    }

    const avatar = this.avatarEl.querySelector("flip-avatar");

    avatar?.removeAttribute("badge");
    avatar?.removeAttribute("interactive");
    avatar?.removeAttribute("show-label");
    avatar?.removeAttribute("variant");

    avatar?.setAttribute("size", "xs");
  }

  private forceIconProps() {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", "24");
  }

  render() {
    const Tag = this.interactive ? "button" : "span";

    const showAvatar = Boolean(this.avatar);
    const showIcon = !showAvatar && Boolean(this.icon);

    const className = classnames("chip", `chip--intent-${this.intent}`, {
      "chip--interactive": this.interactive,
    });

    return (
      <Host>
        <Tag class={className} type={this.interactive ? "button" : undefined}>
          {showAvatar && (
            <span
              class="chip__avatar"
              innerHTML={this.avatar}
              ref={(el) => (this.avatarEl = el)}
            ></span>
          )}
          {showIcon && (
            <span
              class="chip__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          <span class="chip__label">{this.label}</span>
        </Tag>
      </Host>
    );
  }
}
