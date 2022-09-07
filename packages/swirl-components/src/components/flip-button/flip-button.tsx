import { Component, h, Prop } from "@stencil/core";

export type FlipButtonType = "button" | "submit";

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
  @Prop() label!: string;
  @Prop() leftIcon?: string;
  @Prop() type?: FlipButtonType = "button";

  render() {
    return (
      <button
        aria-disabled={this.disabled ? "true" : undefined}
        class="button"
        disabled={this.disabled}
        type={this.type}
      >
        {this.leftIcon && (
          <span class="button__left-icon" innerHTML={this.leftIcon}></span>
        )}
        <span class="button__label">{this.label}</span>
      </button>
    );
  }
}
