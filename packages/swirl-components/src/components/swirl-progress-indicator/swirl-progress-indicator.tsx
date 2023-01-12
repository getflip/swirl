import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlProgressIndicatorSize = "s" | "m";

export type SwirlProgressIndicatorVariant = "bar" | "circle";

@Component({
  shadow: true,
  styleUrl: "swirl-progress-indicator.css",
  tag: "swirl-progress-indicator",
})
export class SwirlProgressIndicator {
  @Prop() label!: string;
  @Prop() size?: SwirlProgressIndicatorSize = "m";
  @Prop() value?: number = 0;
  @Prop() variant?: SwirlProgressIndicatorVariant = "bar";

  render() {
    const className = classnames(
      "progress-indicator",
      `progress-indicator--size-${this.size}`,
      `progress-indicator--variant-${this.variant}`
    );

    const strokeWidth = this.size === "m" ? 4 : 2;
    const radius = this.size === "m" ? 20 : 10;
    const circumference = Math.round(radius * 2 * Math.PI);
    const dashOffset = Math.round(circumference * ((100 - this.value) / 100));

    return (
      <Host class={this.variant}>
        {this.variant === "bar" && (
          <progress
            aria-label={this.label}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={this.value}
            class={className}
            max={100}
            value={this.value}
          ></progress>
        )}
        {this.variant === "circle" && (
          <span
            role="progressbar"
            aria-label={this.label}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={this.value}
            class={className}
          >
            <svg
              class="progress-indicator__circle"
              focusable="false"
              viewBox={`0 0 ${(radius + strokeWidth) * 2} ${
                (radius + strokeWidth) * 2
              }`}
            >
              <circle
                class="progress-indicator__circle-background"
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                fill="none"
                stroke-width={strokeWidth}
              />
              <circle
                class="progress-indicator__circle-value"
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                fill="none"
                stroke-width={strokeWidth}
                stroke-dasharray={circumference}
                stroke-dashoffset={dashOffset}
              />
            </svg>
          </span>
        )}
      </Host>
    );
  }
}
