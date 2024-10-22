import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlLabelColor = "light" | "dark";

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
  @Prop() inlineLabel?: boolean;
  @Prop() inlineLabelColor: SwirlLabelColor = "dark";
  @Prop() label!: string;
  @Prop() target?: string;
  @Prop() tiled?: boolean;
  @Prop() withGradient?: boolean;

  render() {
    const tagClassNames = classnames("shell-navigation-item", {
      "shell-navigation-item--active": this.active,
      "shell-navigation-item--boxed": this.boxed,
      "shell-navigation-item--tiled": this.tiled,
      "shell-navigation-item--gradient": this.withGradient,
    });

    const labelClassNames = classnames("shell-navigation-item__label", {
      "shell-navigation-item__label--light": this.inlineLabelColor === "light",
      "shell-navigation-item__label--dark": this.inlineLabelColor === "dark",
      "shell-navigation-item__label--inline": this.inlineLabel,
    });

    const isLink = Boolean(this.href);
    const Tag = isLink ? "a" : "button";

    return (
      <Host>
        <swirl-tooltip
          active={this.hideLabel}
          content={this.label}
          delay={100}
          position="right"
          positioning="fixed"
        >
          <Tag
            class={tagClassNames}
            href={this.href}
            target={this.target}
            type={isLink ? undefined : "button"}
          >
            <span class="shell-navigation-item__icon">
              <slot name="icon"></slot>
            </span>
            {!this.hideLabel ? (
              <span class={labelClassNames}>{this.label}</span>
            ) : (
              <swirl-visually-hidden>
                <span class={labelClassNames}>{this.label}</span>
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
