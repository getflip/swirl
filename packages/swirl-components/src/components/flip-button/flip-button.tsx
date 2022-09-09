import { Component, h, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipButtonIntent = "default" | "primary" | "critical";

export type FlipButtonSize = "m" | "l";

export type FlipButtonType = "button" | "submit";

export type FlipButtonVariant = "flat" | "ghost" | "plain" | "on-image";

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
  @Prop() hideLabel?: boolean;
  @Prop() icon?: string;
  @Prop() intent?: FlipButtonIntent = "default";
  @Prop() label!: string;
  @Prop() size?: FlipButtonSize = "m";
  @Prop() type?: FlipButtonType = "button";
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
    const hideLabel = this.hideLabel && Boolean(this.icon);

    const className = classnames(
      "button",
      `button--intent-${this.intent}`,
      `button--size-${this.size}`,
      `button--variant-${this.variant}`,
      {
        "button--icon-only": hideLabel,
      }
    );

    return (
      <button
        aria-disabled={this.disabled ? "true" : undefined}
        aria-label={hideLabel ? this.label : undefined}
        class={className}
        disabled={this.disabled}
        type={this.type}
      >
        {this.icon && (
          <span
            class="button__left-icon"
            innerHTML={this.icon}
            ref={(el) => (this.iconEl = el)}
          ></span>
        )}
        {!hideLabel && <span class="button__label">{this.label}</span>}
      </button>
    );
  }
}
