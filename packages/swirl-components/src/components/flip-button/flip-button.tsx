import { Component, h, Prop } from "@stencil/core";

export type FlipButtonType = "button" | "submit";

@Component({
  tag: "flip-button",
  shadow: true,
  styleUrl: "flip-button.css",
})
export class FlipButton {
  @Prop() disabled?: boolean;
  @Prop() label!: string;
  @Prop() type?: FlipButtonType = "button";

  render() {
    return (
      <button
        aria-disabled={this.disabled ? "true" : undefined}
        class="button"
        disabled={this.disabled}
        type={this.type}
      >
        {this.label}
      </button>
    );
  }
}
