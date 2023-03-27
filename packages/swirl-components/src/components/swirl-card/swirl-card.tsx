import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

const swirlCardBorderRadiusTokens = ["xs", "sm", "base", "l", "xl"] as const;

export type SwirlCardBorderRadius =
  | typeof swirlCardBorderRadiusTokens[number]
  | string;

export type SwirlCardJustifyContent = "start" | "center" | "end";

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
  @Prop() height?: string;
  @Prop() highlighted?: boolean;
  @Prop() href?: string;
  @Prop() imageAspectRatio?: string;
  @Prop() isBorderless?: boolean;
  @Prop() interactive?: boolean;
  @Prop() justifyContent?: SwirlCardJustifyContent = "start";
  @Prop() linkTarget?: string;
  @Prop() swirlAriaLabel?: string;

  render() {
    const Tag = Boolean(this.href) ? "a" : this.as;

    const hasImage = Boolean(this.el.querySelector('[slot="image"]'));

    const styles = {
      borderRadius: swirlCardBorderRadiusTokens.includes(
        this.borderRadius as typeof swirlCardBorderRadiusTokens[number]
      )
        ? `var(--s-border-radius-${this.borderRadius})`
        : this.borderRadius,
      height: this.height,
    };

    const className = classnames(
      "card",
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
          <div class="card__body">
            <div class="card__content">
              <slot name="content"></slot>
            </div>
          </div>
        </Tag>
      </Host>
    );
  }
}
