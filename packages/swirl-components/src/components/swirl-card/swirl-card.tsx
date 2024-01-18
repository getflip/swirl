import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

const swirlCardBorderRadiusTokens = ["xs", "sm", "base", "l", "xl"] as const;

export type SwirlCardBorderRadius =
  | (typeof swirlCardBorderRadiusTokens)[number]
  | string;

export type SwirlCardElevationLevel = 1 | 2 | 3;

export type SwirlCardIntent =
  | "critical-subdued"
  | "default"
  | "default-subdued"
  | "info-subdued"
  | "success-subdued"
  | "warning-subdued";

export type SwirlCardJustifyContent = "start" | "center" | "end";

export type SwirlCardOverflow = "auto" | "hidden" | "visible";

export type SwirlCardPadding =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32";

/**
 * @slot slot - The card contents
 */
@Component({
  shadow: true,
  styleUrl: "swirl-card.css",
  tag: "swirl-card",
})
export class SwirlCard {
  @Element() el: HTMLElement;

  @Prop() as?: string = "div";
  @Prop() borderRadius?: SwirlCardBorderRadius = "base";
  @Prop() elevated?: boolean;
  @Prop() elevationLevel?: SwirlCardElevationLevel = 3;
  @Prop() height?: string;
  @Prop() highlighted?: boolean;
  @Prop() href?: string;
  @Prop() imageAspectRatio?: string;
  @Prop() intent?: SwirlCardIntent = "default";
  @Prop() isBorderless?: boolean;
  @Prop() interactive?: boolean;
  @Prop() justifyContent?: SwirlCardJustifyContent = "start";
  @Prop() linkTarget?: string;
  @Prop() overflow?: SwirlCardOverflow;
  @Prop() padding?: SwirlCardPadding;
  @Prop() paddingBlockEnd?: SwirlCardPadding;
  @Prop() paddingBlockStart?: SwirlCardPadding;
  @Prop() paddingInlineEnd?: SwirlCardPadding;
  @Prop() paddingInlineStart?: SwirlCardPadding;
  @Prop() swirlAriaLabel?: string;
  @Prop() swirlAriaLabelledby?: string;

  render() {
    const Tag = Boolean(this.href) ? "a" : this.as;

    const hasImage = Boolean(this.el.querySelector('[slot="image"]'));

    const styles = {
      borderRadius: swirlCardBorderRadiusTokens.includes(
        this.borderRadius as (typeof swirlCardBorderRadiusTokens)[number]
      )
        ? `var(--s-border-radius-${this.borderRadius})`
        : this.borderRadius,
      height: this.height,
      overflow: this.overflow,
    };

    const bodyStyles = {
      padding: Boolean(this.padding)
        ? `var(--s-space-${this.padding})`
        : undefined,
      paddingBlockEnd: Boolean(this.paddingBlockEnd)
        ? `var(--s-space-${this.paddingBlockEnd})`
        : undefined,
      paddingBlockStart: Boolean(this.paddingBlockStart)
        ? `var(--s-space-${this.paddingBlockStart})`
        : undefined,
      paddingInlineEnd: Boolean(this.paddingInlineEnd)
        ? `var(--s-space-${this.paddingInlineEnd})`
        : undefined,
      paddingInlineStart: Boolean(this.paddingInlineStart)
        ? `var(--s-space-${this.paddingInlineStart})`
        : undefined,
    };

    const className = classnames(
      "card",
      `card--elevation-level-${this.elevationLevel}`,
      `card--intent-${this.intent}`,
      `card--justify-content-${this.justifyContent}`,
      {
        "card--elevated": this.elevated,
        "card--has-image": hasImage,
        "card--highlighted": this.highlighted,
        "card--interactive": this.interactive || this.href,
        "card--is--borderless": this.isBorderless,
      }
    );

    return (
      <Host styles={{ height: this.height }}>
        <Tag
          aria-label={this.swirlAriaLabel}
          aria-labelledby={this.swirlAriaLabelledby}
          class={className}
          href={this.href}
          rel={
            Boolean(this.href) && this.linkTarget === "_blank"
              ? "noreferrer"
              : undefined
          }
          style={styles}
          target={this.linkTarget}
        >
          <div
            class="card__image"
            style={{ aspectRatio: this.imageAspectRatio }}
          >
            <slot name="image"></slot>
          </div>
          <div class="card__body" style={bodyStyles}>
            <div class="card__content">
              <slot name="content"></slot>
            </div>
          </div>
        </Tag>
      </Host>
    );
  }
}
