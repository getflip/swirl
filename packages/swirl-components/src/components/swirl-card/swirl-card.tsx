import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
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
  | "highlight"
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
 * @slot content - The card contents
 * @slot image - Optional image or image grid
 * @slot floating-controls - Optional controls displayed on hover in the top right corner
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
  @Prop() customBackgroundColor?: string;
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
  @Prop() minHeight?: string;
  @Prop() overflow?: SwirlCardOverflow;
  @Prop() padding?: SwirlCardPadding;
  @Prop() paddingBlockEnd?: SwirlCardPadding;
  @Prop() paddingBlockStart?: SwirlCardPadding;
  @Prop() paddingInlineEnd?: SwirlCardPadding;
  @Prop() paddingInlineStart?: SwirlCardPadding;
  @Prop() swirlAriaLabel?: string;
  @Prop() swirlAriaLabelledby?: string;

  @Event() componentLoad: EventEmitter<void>;

  @State() flashing = false;

  private flashingTimeout?: NodeJS.Timeout;

  /**
   * Flashes the card to draw focus.
   */
  @Method()
  async flash(duration = 5000) {
    if (Boolean(this.flashingTimeout)) {
      clearTimeout(this.flashingTimeout);
      this.flashingTimeout = undefined;
    }

    this.flashing = true;

    this.flashingTimeout = setTimeout(() => {
      this.flashing = false;
    }, duration);
  }

  componentDidLoad() {
    this.componentLoad.emit();
  }

  render() {
    const Tag = Boolean(this.href) ? "a" : this.as;

    const hasFloatingControls = Boolean(
      this.el.querySelector('[slot="floating-controls"]')
    );
    const hasImage = Boolean(this.el.querySelector('[slot="image"]'));

    const styles = {
      borderRadius: swirlCardBorderRadiusTokens.includes(
        this.borderRadius as (typeof swirlCardBorderRadiusTokens)[number]
      )
        ? `var(--s-border-radius-${this.borderRadius})`
        : this.borderRadius,
      height: this.height,
      minHeight: this.minHeight,
      overflow: this.overflow,
    };

    const bodyStyles = {
      backgroundColor: this.customBackgroundColor,
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
        "card--flashing": this.flashing,
        "card--has-floating-controls": hasFloatingControls,
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
          <div class="card__floating-controls">
            <slot name="floating-controls"></slot>
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
