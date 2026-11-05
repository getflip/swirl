import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

/**
 * The `xl` size is only available for the `bar` variant. A `circle` with size
 * `xl` renders like size `l`.
 */
export type SwirlProgressIndicatorSize = "xs" | "s" | "m" | "l" | "xl";

export type SwirlProgressIndicatorVariant = "bar" | "circle";

const circleSizeConfig: Record<
  SwirlProgressIndicatorSize,
  { radius: number; strokeWidth: number }
> = {
  xs: { radius: 8, strokeWidth: 2 },
  s: { radius: 10, strokeWidth: 2 },
  m: { radius: 20, strokeWidth: 4 },
  l: { radius: 40, strokeWidth: 8 },
  xl: { radius: 40, strokeWidth: 8 },
};

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

  @State() private hasLoaded = false;

  componentDidLoad() {
    // Render the fill at 0 first and switch to the actual value a frame later,
    // so the CSS transition animates the fill in.
    requestAnimationFrame(() => {
      this.hasLoaded = true;
    });
  }

  render() {
    const className = classnames(
      "progress-indicator",
      `progress-indicator--size-${this.size}`,
      `progress-indicator--variant-${this.variant}`
    );

    const { radius, strokeWidth } = circleSizeConfig[this.size];
    const circumference = Math.round(radius * 2 * Math.PI);
    const displayedValue = this.hasLoaded ? this.value : 0;
    const dashOffset = Math.round(
      circumference * ((100 - displayedValue) / 100)
    );

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
            value={displayedValue}
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
