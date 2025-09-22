import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlLabelColor = "default" | "light" | "dark";
export type SwirlShellNavigationItemVariant = "default" | "tiled" | "app-icon";

/**
 * @slot slot - image or icon to display
 */
@Component({
  shadow: true,
  styleUrl: "swirl-shell-navigation-item.css",
  tag: "swirl-shell-navigation-item",
})
export class SwirlShellNavigationItem {
  @Element() el: HTMLElement;

  @Prop() active?: boolean;
  @Prop() badgeLabel?: string;
  @Prop() boxed?: boolean;
  @Prop() description?: string;
  @Prop() filled?: boolean;
  @Prop() hideLabel: boolean = false;
  @Prop() href?: string;
  @Prop() inlineLabel?: boolean;
  @Prop() inlineLabelColor: SwirlLabelColor = "default";
  @Prop() label!: string;
  @Prop() markAsNew?: boolean;
  @Prop() markAsNewLabel?: string = "New";
  @Prop() target?: string;
  @Prop() variant: SwirlShellNavigationItemVariant = "default";
  @Prop() withGradient?: boolean;

  componentWillLoad() {
    this.forceIconProps();
  }

  componentDidRender() {
    this.forceIconProps();
  }

  private forceIconProps() {
    const iconEl = this.el.querySelector("[slot='icon']");
    const smallIcon =
      (this.hideLabel && this.variant === "app-icon") ||
      this.variant === "default";

    if (
      iconEl &&
      (iconEl.tagName.startsWith("SWIRL-ICON") ||
        iconEl.tagName.startsWith("SWIRL-EMOJI") ||
        iconEl.tagName.startsWith("SWIRL-SYMBOL"))
    ) {
      iconEl.setAttribute("size", smallIcon ? "20" : "32");
    }
  }

  render() {
    const hasSwirlAppIcon = Boolean(this.el.querySelector("swirl-app-icon"));
    const tagClassNames = classnames(
      "shell-navigation-item",
      `shell-navigation-item--${this.variant}`,
      {
        "shell-navigation-item--active": this.active,
        "shell-navigation-item--boxed": this.boxed,
        "shell-navigation-item--filled": this.filled,
        "shell-navigation-item--inline-label": this.inlineLabel,
        "shell-navigation-item--gradient": this.withGradient,
        "shell-navigation-item--hide-label": this.hideLabel,
        "shell-navigation-item--has-app-icon": hasSwirlAppIcon,
      }
    );

    const labelClassNames = classnames("shell-navigation-item__label", {
      "shell-navigation-item__label--light": this.inlineLabelColor === "light",
      "shell-navigation-item__label--dark": this.inlineLabelColor === "dark",
      "shell-navigation-item__label--inline": this.inlineLabel,
    });

    const hasBadge = this.badgeLabel !== undefined && this.badgeLabel !== null;
    const showIsNewTag =
      !hasBadge &&
      this.markAsNew &&
      !this.hideLabel &&
      this.variant === "default";
    const showIsNewBadge =
      !hasBadge &&
      this.markAsNew &&
      this.hideLabel &&
      this.variant === "default";
    const isLink = Boolean(this.href);
    const Tag = isLink ? "a" : "button";

    const tooltipContent = this.description
      ? `${this.label} ${this.description}`
      : this.label;

    return (
      <Host>
        <swirl-tooltip
          active={this.hideLabel}
          content={tooltipContent}
          delay={100}
          position="right"
          positioning="fixed"
        >
          <Tag
            class={tagClassNames}
            href={this.href}
            target={this.target}
            type={isLink ? undefined : "button"}
            title={!this.hideLabel ? this.label : undefined}
          >
            <span class="shell-navigation-item__icon">
              <slot name="icon"></slot>
            </span>
            {!this.hideLabel ? (
              this.variant !== "default" ? (
                <span class={labelClassNames}>{this.label}</span>
              ) : (
                <div class="shell-navigation-item__text-wrapper">
                  <span class={labelClassNames}>{this.label}</span>
                  {this.description && (
                    <span class="shell-navigation-item__description">
                      {this.description}
                    </span>
                  )}
                </div>
              )
            ) : (
              <swirl-visually-hidden>
                <span class={labelClassNames}>{this.label}</span>
              </swirl-visually-hidden>
            )}
            {hasBadge && (
              <span class="shell-navigation-item__badge-wrapper">
                <swirl-badge
                  aria-label={this.badgeLabel}
                  class={classnames("shell-navigation-item__badge", {
                    "shell-navigation-item__badge--dot": this.badgeLabel === "",
                  })}
                  label={this.badgeLabel}
                  size="xs"
                  variant={this.badgeLabel === "" ? "dot" : "default"}
                ></swirl-badge>
              </span>
            )}
            {showIsNewTag && (
              <swirl-tag
                class="shell-navigation-item__is-new-tag"
                intent="info"
                label={this.markAsNewLabel.toLocaleUpperCase()}
                size="s"
                variant="strong"
              ></swirl-tag>
            )}
            {showIsNewBadge && (
              <swirl-badge
                class="shell-navigation-item__is-new-badge"
                intent="info"
                label={this.markAsNewLabel.toLocaleUpperCase()}
                size="xs"
                variant="dot"
              ></swirl-badge>
            )}
          </Tag>
        </swirl-tooltip>
      </Host>
    );
  }
}
