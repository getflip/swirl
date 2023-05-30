import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlStatusIndicatorIntent =
  | "critical"
  | "info"
  | "success"
  | "warning";

@Component({
  shadow: true,
  styleUrl: "swirl-status-indicator.css",
  tag: "swirl-status-indicator",
})
export class SwirlStatusIndicator {
  @Prop() intent!: SwirlStatusIndicatorIntent;
  @Prop() label!: string;

  render() {
    const className = classnames(
      "status-indicator",
      `status-indicator--intent-${this.intent}`
    );

    return (
      <Host>
        <div class={className}>
          <span class="status-indicator__dot"></span>
          <span class="status-indicator__label">{this.label}</span>
        </div>
      </Host>
    );
  }
}
