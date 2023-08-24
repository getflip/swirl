import { Component, Element, h, Host, Prop, Watch } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

export type SwirlButtonIconPosition = "start" | "end";

export type SwirlButtonIntent = "default" | "primary" | "critical" | "strong";

export type SwirlButtonSize = "m" | "l";

export type SwirlButtonType = "button" | "submit";

export type SwirlButtonVariant =
  | "flat"
  | "ghost"
  | "plain"
  | "floating"
  | "on-image"
  | "outline";

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

  @Prop() disabled?: boolean;
  @Prop() download?: string;
  @Prop() swirlAriaControls?: string;
  @Prop() swirlAriaDescribedby?: string;
  @Prop() swirlAriaExpanded?: string;
  @Prop() swirlAriaHaspopup?: string;
  @Prop() swirlAriaLabel?: string;
  @Prop() form?: string;
  @Prop() hideLabel?: boolean;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() iconPosition: SwirlButtonIconPosition = "start";
  @Prop() intent?: SwirlButtonIntent = "default";
  @Prop() label!: string;
  @Prop() name?: string;
  @Prop() pill?: boolean;
  @Prop() size?: SwirlButtonSize = "m";
  @Prop() target?: string;
  @Prop() type?: SwirlButtonType = "button";
  @Prop() value?: string;
  @Prop() variant?: SwirlButtonVariant = "ghost";

  private buttonEl: HTMLButtonElement;
  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);
    this.updateFormAttribute();

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
  }

  componentDidRender() {
    this.forceIconProps(this.desktopMediaQuery.matches);
  }

  @Watch("form")
  watchFormProp() {
    this.updateFormAttribute();
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
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

    const className = classnames(
      "button",
      `button--icon-position-${this.iconPosition}`,
      `button--intent-${this.intent}`,
      `button--size-${this.size}`,
      `button--variant-${this.variant}`,
      {
        "button--icon-only": hideLabel,
        "button--pill": this.pill,
      }
    );

    const Tag = isLink ? "a" : "button";

    return (
      <Host style={{ pointerEvents: this.disabled ? "none" : "" }}>
        <Tag
          aria-controls={this.swirlAriaControls}
          aria-describedby={this.swirlAriaDescribedby}
          aria-disabled={this.disabled && !isLink ? "true" : undefined}
          aria-expanded={this.swirlAriaExpanded}
          aria-haspopup={this.swirlAriaHaspopup}
          aria-label={ariaLabel}
          class={className}
          disabled={isLink ? undefined : this.disabled}
          download={isLink ? undefined : this.download}
          form={isLink ? undefined : this.form}
          href={this.href}
          name={isLink ? undefined : this.name}
          ref={(el) => (this.buttonEl = el)}
          target={isLink ? this.target : undefined}
          type={isLink ? undefined : this.type}
          value={isLink ? undefined : this.value}
        >
          {this.icon && (
            <span
              class="button__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          {!hideLabel && <span class="button__label">{this.label}</span>}
        </Tag>
      </Host>
    );
  }
}
