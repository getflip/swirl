import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlInlineNotificationAriaRole = "alert" | "status";

export type SwirlInlineNotificationIntent =
  | "critical"
  | "success"
  | "warning"
  | "info";

@Component({
  shadow: true,
  styleUrl: "swirl-inline-notification.css",
  tag: "swirl-inline-notification",
})
export class SwirlInlineNotification {
  @Prop() heading!: string;
  @Prop() importance?: SwirlInlineNotificationAriaRole = "status";
  @Prop() intent?: SwirlInlineNotificationIntent = "info";

  render() {
    const className = classnames(
      "inline-notification",
      `inline-notification--intent-${this.intent}`
    );

    return (
      <Host>
        <div
          aria-describedby="content"
          class={className}
          role={this.importance}
          tabIndex={0}
        >
          <span aria-hidden="true" class="inline-notification__icon">
            {this.intent === "critical" && (
              <swirl-icon-error size={20}></swirl-icon-error>
            )}
            {this.intent === "success" && (
              <swirl-icon-check-circle size={20}></swirl-icon-check-circle>
            )}
            {this.intent === "warning" && (
              <swirl-icon-warning size={20}></swirl-icon-warning>
            )}
            {this.intent === "info" && (
              <swirl-icon-info size={20}></swirl-icon-info>
            )}
          </span>
          <span class="inline-notification__content" id="content">
            <swirl-text
              class="inline-notification__heading"
              size="sm"
              weight="semibold"
            >
              {this.heading}
            </swirl-text>
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
}
