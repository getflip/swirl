import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipToastIntent =
  | "default"
  | "critical"
  | "success"
  | "warning"
  | "info";

@Component({
  shadow: true,
  styleUrl: "flip-toast.css",
  tag: "flip-toast",
})
export class FlipToast {
  @Prop() accessibleDismissLabel?: string = "Dismiss";
  @Prop() content!: string;
  @Prop() dismissLabel?: string;
  @Prop() icon?: string;
  @Prop() intent?: FlipToastIntent = "default";

  @Event() dismiss: EventEmitter<MouseEvent>;

  private onDismiss = (event: MouseEvent) => {
    this.dismiss.emit(event);
  };

  render() {
    const className = classnames("toast", `toast--intent-${this.intent}`);

    return (
      <Host role="status">
        <div class={className}>
          {this.icon && <span class="toast__icon" innerHTML={this.icon}></span>}
          <span class="toast__content">{this.content}</span>
          <button
            aria-label={this.dismissLabel || this.accessibleDismissLabel}
            class="toast__dismiss-button"
            onClick={this.onDismiss}
            type="button"
          >
            {this.dismissLabel}
            {!Boolean(this.dismissLabel) && <flip-icon-close></flip-icon-close>}
          </button>
        </div>
      </Host>
    );
  }
}
