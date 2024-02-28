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
  @Prop() href?: string;
  @Prop() label!: string;
  @Prop() target?: string;

  render() {
    const className = classnames("shell-navigation-item", {
      "shell-navigation-item--active": this.active,
    });

    const isLink = Boolean(this.href);
    const Tag = isLink ? "a" : "button";

    return (
      <Host>
        <Tag
          class={className}
          href={this.href}
          target={this.target}
          type={isLink ? undefined : "button"}
        >
          <span class="shell-navigation-item__icon">
            <slot name="icon"></slot>
          </span>
          <span class="shell-navigation-item__label">{this.label}</span>
          {this.badgeLabel !== undefined && this.badgeLabel !== null && (
            <swirl-badge
              aria-label={this.badgeLabel}
              class="shell-navigation-item__badge"
              label={this.badgeLabel}
              size="xs"
              variant={this.badgeLabel === "" ? "dot" : "default"}
            ></swirl-badge>
          )}
        </Tag>
      </Host>
    );
  }
}
