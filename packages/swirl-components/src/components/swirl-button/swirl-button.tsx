import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { DesktopMediaQuery } from "../../services/media-query.service";

export type SwirlButtonIconPosition = "start" | "end";

export type SwirlButtonIntent = "default" | "primary" | "critical" | "strong";

export type SwirlButtonSize = "m" | "l";

export type SwirlButtonTextAlign = "start" | "center" | "end";

export type SwirlButtonType = "button" | "submit";

export type SwirlButtonVariant =
  | "flat"
  | "ghost"
  | "plain"
  | "floating"
  | "on-image"
  | "outline"
  | "translucent";

export type SwirlButtonCursor =
  | "auto"
  | "default"
  | "none"
  | "context-menu"
  | "help"
  | "pointer"
  | "progress"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "e-resize"
  | "n-resize"
  | "ne-resize"
  | "nw-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "w-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "col-resize"
  | "row-resize"
  | "all-scroll"
  | "zoom-in"
  | "zoom-out";

/**
 * @slot icon - Icon to be displayed inside the button.
 * @slot tag - Tag to be displayed inside the button.
 * @slot trailing - Trailing slot for content to be displayed at the end.
 */
@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  tag: "swirl-button",
  styleUrl: "swirl-button.css",
})
export class SwirlButton {
  @Element() el: HTMLElement;

  @Prop() cursor?: SwirlButtonCursor = "pointer";
  @Prop() disabled?: boolean;
  @Prop() download?: string;
  @Prop() elevated?: boolean;
  @Prop() form?: string;
  @Prop() hideLabel?: boolean;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() iconPosition: SwirlButtonIconPosition = "start";
  @Prop() intent?: SwirlButtonIntent = "default";
  @Prop() inheritFontSize?: boolean;
  @Prop() label!: string;
  @Prop() name?: string;
  @Prop() pill?: boolean;
  @Prop() pressed?: boolean;
  @Prop() size?: SwirlButtonSize = "m";
  @Prop() swirlAriaControls?: string;
  @Prop() swirlAriaCurrent?: string;
  @Prop() swirlAriaDescribedby?: string;
  @Prop() swirlAriaExpanded?: string;
  @Prop() swirlAriaHaspopup?: string;
  @Prop() swirlAriaLabel?: string;
  @Prop() target?: string;
  @Prop() textAlign?: SwirlButtonTextAlign = "center";
  @Prop() type?: SwirlButtonType = "button";
  @Prop() value?: string;
  @Prop() variant?: SwirlButtonVariant = "ghost";

  private buttonEl: HTMLElement;
  private iconEl: HTMLElement;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentDidLoad() {
    this.updateFormAttribute();

    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.forceIconProps(isDesktop);
    });
  }

  componentDidRender() {
    this.updateFormAttribute();
  }

  disconnectedCallback() {
    this.mediaQueryUnsubscribe();
  }

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    if (
      icon?.tagName.startsWith("SWIRL-ICON") ||
      icon?.tagName.startsWith("SWIRL-EMOJI") ||
      icon?.tagName.startsWith("SWIRL-SYMBOL")
    ) {
      icon?.setAttribute("size", smallIcon ? "20" : "24");
    }
  }

  private getAriaLabel(hideLabel: boolean) {
    if (Boolean(this.swirlAriaLabel)) {
      return this.swirlAriaLabel;
    } else if (hideLabel) {
      return this.label;
    }

    return undefined;
  }

  private updateFormAttribute() {
    // Workaround: form attribute cannot be set via Stencil JSX
    // https://github.com/ionic-team/stencil/issues/2703
    const isLink = Boolean(this.href);

    if (isLink || !Boolean(this.form)) {
      this.buttonEl?.removeAttribute("form");
    } else {
      this.buttonEl?.setAttribute("form", this.form);
    }
  }

  render() {
    const hideLabel =
      (this.hideLabel && Boolean(this.icon)) ||
      (this.variant === "floating" && this.intent === "default");

    const isLink = Boolean(this.href);
    const ariaLabel = this.getAriaLabel(hideLabel);

    const hasIcon =
      this.icon || Boolean(this.el.querySelector("[slot='icon']"));

    const hasTag = Boolean(this.el.querySelector("[slot='tag']"));

    const hasTrailingSlot = Boolean(this.el.querySelector("[slot='trailing']"));

    const className = classnames(
      "button",
      `button--icon-position-${this.iconPosition}`,
      `button--intent-${this.intent}`,
      `button--size-${this.size}`,
      `button--text-align-${this.textAlign}`,
      `button--variant-${this.variant}`,
      {
        "button--elevated": this.elevated,
        "button--disabled": this.disabled,
        "button--has-icon": hasIcon,
        "button--icon-only": hideLabel,
        "button--pill": this.pill,
        "button--pressed": this.pressed,
      }
    );

    const Tag = isLink ? "a" : "button";

    return (
      <Host style={{ pointerEvents: this.disabled ? "none" : "" }}>
        <Tag
          aria-controls={this.swirlAriaControls}
          aria-current={this.swirlAriaCurrent}
          aria-describedby={this.swirlAriaDescribedby}
          aria-disabled={this.disabled && !isLink ? "true" : undefined}
          aria-expanded={this.swirlAriaExpanded}
          aria-haspopup={this.swirlAriaHaspopup}
          aria-label={ariaLabel}
          aria-pressed={this.pressed ? "true" : undefined}
          class={className}
          disabled={isLink ? undefined : this.disabled}
          download={isLink ? undefined : this.download}
          form={isLink ? undefined : this.form}
          href={this.href}
          name={isLink ? undefined : this.name}
          ref={(el: HTMLElement) => (this.buttonEl = el)}
          target={isLink ? this.target : undefined}
          type={isLink ? undefined : this.type}
          value={isLink ? undefined : this.value}
          style={{
            cursor:
              !this.disabled && this.cursor !== "pointer"
                ? this.cursor
                : undefined,
            fontSize: this.inheritFontSize ? "inherit" : undefined,
            lineHeight: this.inheritFontSize ? "inherit" : undefined,
          }}
        >
          {Boolean(this.icon) && (
            <span
              class="button__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          {!Boolean(this.icon) && (
            <span class="button__icon" ref={(el) => (this.iconEl = el)}>
              <slot name="icon"></slot>
            </span>
          )}
          {!hideLabel && <span class="button__label">{this.label}</span>}
          {hasTag && (
            <span class="button__tag">
              <slot name="tag"></slot>
            </span>
          )}
          {hasTrailingSlot && (
            <div class="button__trailing-slot">
              <slot name="trailing"></slot>
            </div>
          )}
        </Tag>
      </Host>
    );
  }
}
