import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

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
  @Prop() hideLabel?: boolean;
  @Prop() href?: string;
  @Prop() label!: string;
  @Prop() target?: string;
  @Prop() tiled?: boolean;

  render() {
    const className = classnames("shell-navigation-item", {
      "shell-navigation-item--active": this.active,
      "shell-navigation-item--boxed": this.boxed,
      "shell-navigation-item--tiled": this.tiled,
    });

    const isLink = Boolean(this.href);
    const Tag = isLink ? "a" : "button";

    return (
      <Host>
        <swirl-tooltip
          active={this.hideLabel}
          content={this.label}
          delay={200}
          position="right"
          positioning="fixed"
        >
          <Tag
            class={className}
            href={this.href}
            target={this.target}
            type={isLink ? undefined : "button"}
          >
            <span class="shell-navigation-item__icon">
              <slot name="icon"></slot>
            </span>
            {!this.hideLabel ? (
              <span class="shell-navigation-item__label">{this.label}</span>
            ) : (
              <swirl-visually-hidden>
                <span class="shell-navigation-item__label">{this.label}</span>
              </swirl-visually-hidden>
            )}
            {this.badgeLabel !== undefined && this.badgeLabel !== null && (
              <swirl-badge
                aria-label={this.badgeLabel}
                class={classnames("shell-navigation-item__badge", {
                  "shell-navigation-item__badge--dot": this.badgeLabel === "",
                })}
                label={this.badgeLabel}
                size="xs"
                variant={this.badgeLabel === "" ? "dot" : "default"}
              ></swirl-badge>
            )}
          </Tag>
        </swirl-tooltip>
      </Host>
    );
  }
}
