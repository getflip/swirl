import { Component, Element, h, Host, Prop, State, Watch } from "@stencil/core";
import classnames from "classnames";

export type SwirlAvatarBadgePosition = "bottom" | "top";

export type SwirlAvatarToolPosition = "bottom" | "top";

export type SwirlAvatarColor =
  | "banana"
  | "blueberry"
  | "chilli"
  | "grape"
  | "kiwi"
  | "pumpkin"
  | "radish";
export type SwirlAvatarSize = "xs" | "s" | "m" | "l" | "xl" | "2xl";
export type SwirlAvatarVariant = "round" | "square";

const swirlAvatarSizeMappings: { [key in SwirlAvatarSize]: number } = {
  xs: 28,
  s: 32,
  m: 40,
  l: 48,
  xl: 64,
  "2xl": 144,
};

/**
 * @slot tool - Used to show a badge or (icon) button on the avatar.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-avatar.css",
  tag: "swirl-avatar",
})
export class SwirlAvatar {
  @Element() element: HTMLElement;

  @Prop() badge?: string;
  @Prop() badgePosition?: SwirlAvatarBadgePosition = "bottom";
  @Prop() color?: SwirlAvatarColor = "kiwi";
  @Prop() icon?: string;
  @Prop() initials?: string;
  @Prop() interactive?: boolean = false;
  @Prop() label!: string;
  @Prop() showLabel?: boolean = false;
  @Prop() size?: SwirlAvatarSize = "m";
  @Prop() src?: string;
  @Prop() toolPosition?: SwirlAvatarToolPosition = "bottom";
  @Prop() variant?: SwirlAvatarVariant = "round";

  @State() imageAvailable: boolean | undefined;

  @Watch("src")
  watchSrcProp() {
    this.imageAvailable = undefined;
  }

  private setImageAvailable = () => {
    this.imageAvailable = true;
  };

  private setImageUnavailable = () => {
    this.imageAvailable = false;
  };

  private onKeydown = (event: KeyboardEvent) => {
    // The interactive avatar is activated by the space key on the keyup event,
    // but the default action for space is already triggered on keydown. It
    // needs to be prevented to stop scrolling the page before activating the
    // avatar.
    if (event.code === "Space") {
      event.preventDefault();
    } else if (event.code === "Enter") {
      event.preventDefault();

      this.element.click();
    }
  };

  private onKeyup = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();

      this.element.click();
    }
  };

  render() {
    const showImage =
      Boolean(this.src) &&
      (this.imageAvailable || this.imageAvailable === undefined);

    const showInitials = !showImage && Boolean(this.initials);
    const showIcon = !showImage && !showInitials && Boolean(this.icon);
    const showFallbackIcon = !showImage && !showInitials && !showIcon;
    const showBadge = Boolean(this.badge) && this.size === "m";

    const role = this.interactive ? "button" : "img";

    const className = classnames(
      "avatar",
      `avatar--color-${this.color}`,
      `avatar--size-${this.size}`,
      `avatar--variant-${this.variant}`,
      {
        "avatar--has-icon": showIcon || showFallbackIcon,
        "avatar--has-initials": showInitials,
        "avatar--interactive": this.interactive,
      }
    );

    const badgeClassName = classnames(
      "avatar__badge",
      `avatar__badge--position-${this.badgePosition}`
    );

    const toolClassName = classnames(
      "avatar__tool",
      `avatar__tool--position-${this.toolPosition}`
    );

    return (
      <Host
        aria-label={this.label}
        onKeydown={this.interactive ? this.onKeydown : undefined}
        onKeyup={this.interactive ? this.onKeyup : undefined}
        role={role}
        tabIndex={this.interactive ? 0 : undefined}
      >
        <span class={className} part="avatar">
          {showImage && (
            <span class="avatar__image">
              <img
                alt=""
                height={swirlAvatarSizeMappings[this.size]}
                onError={this.setImageUnavailable}
                onLoad={this.setImageAvailable}
                src={this.src}
                width={swirlAvatarSizeMappings[this.size]}
              />
            </span>
          )}
          {showInitials && (
            <span class="avatar__initials">
              <span>{this.initials}</span>
            </span>
          )}
          {showIcon && <span class="avatar__icon" innerHTML={this.icon}></span>}
          {showFallbackIcon && (
            <span class="avatar__icon">
              <swirl-icon-person></swirl-icon-person>
            </span>
          )}
          {showBadge && (
            <span class={badgeClassName} innerHTML={this.badge}></span>
          )}
          <span class={toolClassName}>
            <slot name="tool"></slot>
          </span>
        </span>
        {this.showLabel && (
          <span aria-hidden class="avatar__label">
            {this.label}
          </span>
        )}
      </Host>
    );
  }
}
