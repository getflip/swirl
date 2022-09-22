import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipSpinnerSize = "s" | "m";

@Component({
  shadow: true,
  styleUrl: "flip-spinner.css",
  tag: "flip-spinner",
})
export class FlipSpinner {
  @Prop() label?: string;
  @Prop() size?: FlipSpinnerSize = "m";

  render() {
    const className = classnames("spinner", `spinner--size-${this.size}`);

    return (
      <Host>
        <span
          class={className}
          role={Boolean(this.label) ? "status" : undefined}
        >
          <svg
            aria-hidden="true"
            class="spinner__indicator"
            focusable="false"
            viewBox="0 0 50 50"
          >
            <circle
              class="spinner__background"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="4"
            />
            <circle
              class="spinner__circle"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="4"
            />
          </svg>
          {this.label && (
            <flip-visually-hidden>
              <span class="spinner__label">{this.label}</span>
            </flip-visually-hidden>
          )}
        </span>
      </Host>
    );
  }
}
