import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";
import classnames from "classnames";

export type SwirlToastIntent = "default" | "critical" | "success";

@Component({
  shadow: true,
  styleUrl: "swirl-toast.css",
  tag: "swirl-toast",
})
export class SwirlToast {
  @Prop() accessibleDismissLabel?: string = "Dismiss";
  @Prop() content!: string;
  @Prop() dismissLabel?: string;
  @Prop() duration?: number;
  @Prop() icon?: string;
  @Prop() intent?: SwirlToastIntent = "default";
  @Prop() toastId!: string;

  @Event() dismiss: EventEmitter<string>;

  private timeout: NodeJS.Timeout;

  @Watch("duration")
  watchDuration() {
    this.startTimer();
  }

  componentDidLoad() {
    this.startTimer();
  }

  private startTimer() {
    this.clearTimer();

    if (this.duration === undefined) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.dismiss.emit(this.toastId);
    }, this.duration);
  }

  private clearTimer() {
    if (!Boolean(this.timeout)) {
      return;
    }

    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  private onDismiss = () => {
    this.dismiss.emit(this.toastId);
  };

  render() {
    const className = classnames("toast", `toast--intent-${this.intent}`);

    return (
      <Host>
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
            {!Boolean(this.dismissLabel) && (
              <swirl-icon-close></swirl-icon-close>
            )}
          </button>
        </div>
      </Host>
    );
  }
}
