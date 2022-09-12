import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipButtonIntent = "default" | "primary" | "critical";

export type FlipButtonSize = "m" | "l";

export type FlipButtonType = "button" | "submit";

export type FlipButtonVariant =
  | "flat"
  | "ghost"
  | "plain"
  | "floating"
  | "on-image";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  tag: "flip-button",
  styleUrl: "flip-button.css",
})
export class FlipButton {
  @Prop() disabled?: boolean;
  @Prop() download?: string;
  @Prop() form?: string;
  @Prop() fullWidth?: boolean;
  @Prop() hideLabel?: boolean;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() intent?: FlipButtonIntent = "default";
  @Prop() label!: string;
  @Prop() name?: string;
  @Prop() size?: FlipButtonSize = "m";
  @Prop() target?: string;
  @Prop() type?: FlipButtonType = "button";
  @Prop() value?: string;
  @Prop() variant?: FlipButtonVariant = "ghost";

  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps();
  }

  private forceIconProps() {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", "24");
  }

  render() {
    const hideLabel =
      (this.hideLabel && Boolean(this.icon)) ||
      (this.variant === "floating" && this.intent === "default");

    const isLink = Boolean(this.href);

    const className = classnames(
      "button",
      `button--intent-${this.intent}`,
      `button--size-${this.size}`,
      `button--variant-${this.variant}`,
      {
        "button--full-width": this.fullWidth,
        "button--icon-only": hideLabel,
      }
    );

    const Tag = isLink ? "a" : "button";

    return (
      <Host
        style={{
          display: this.fullWidth ? "block" : undefined,
          width: this.fullWidth ? "100%" : undefined,
        }}
      >
        <Tag
          aria-disabled={this.disabled && !isLink ? "true" : undefined}
          aria-label={hideLabel ? this.label : undefined}
          class={className}
          disabled={isLink ? undefined : this.disabled}
          download={isLink ? undefined : this.download}
          form={isLink ? undefined : this.form}
          href={this.href}
          name={isLink ? undefined : this.name}
          target={isLink ? this.target : undefined}
          type={isLink ? undefined : this.type}
          value={isLink ? undefined : this.value}
        >
          {this.icon && (
            <span
              class="button__left-icon"
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
