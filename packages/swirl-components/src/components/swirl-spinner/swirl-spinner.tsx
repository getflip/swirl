import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlSpinnerSize = "xs" | "s" | "m" | 20 | 24 | 36;

@Component({
  shadow: true,
  styleUrl: "swirl-spinner.css",
  tag: "swirl-spinner",
})
export class SwirlSpinner {
  @Prop() label?: string;
  @Prop() size?: SwirlSpinnerSize = "m";

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
            <swirl-visually-hidden>
              <span class="spinner__label">{this.label}</span>
            </swirl-visually-hidden>
          )}
        </span>
      </Host>
    );
  }
}
