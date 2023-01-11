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
import { getDesktopMediaQuery } from "../../utils";

export type FlipToastIntent = "default" | "critical" | "success";

@Component({
  shadow: true,
  styleUrl: "flip-toast.css",
  tag: "flip-toast",
})
export class FlipToast {
  @Prop() accessibleDismissLabel?: string = "Dismiss";
  @Prop() content!: string;
  @Prop() dismissLabel?: string;
  @Prop() duration?: number;
  @Prop() icon?: string;
  @Prop() intent?: FlipToastIntent = "default";
  @Prop() toastId!: string;

  @Event() dismiss: EventEmitter<string>;

  private dismissIconEl: HTMLElement;
  private iconEl: HTMLElement;
  private timeout: NodeJS.Timeout;

  @Watch("duration")
  watchDuration() {
    this.startTimer();
  }

  componentDidLoad() {
    this.startTimer();

    this.forceIconProps(getDesktopMediaQuery().matches);

    getDesktopMediaQuery().addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  disconnectedCallback() {
    getDesktopMediaQuery().removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  private forceIconProps(smallIcon: boolean) {
    const icon = this.iconEl?.children[0];
    const dismissIcon = this.dismissIconEl;

    icon?.setAttribute("size", smallIcon ? "20" : "24");
    dismissIcon?.setAttribute("size", smallIcon ? "20" : "24");
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
          {this.icon && (
            <span
              class="toast__icon"
              innerHTML={this.icon}
              part="toast__icon"
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          <span class="toast__content" part="toast__content">
            {this.content}
          </span>
          <button
            aria-label={this.dismissLabel || this.accessibleDismissLabel}
            class="toast__dismiss-button"
            onClick={this.onDismiss}
            type="button"
          >
            {this.dismissLabel}
            {!Boolean(this.dismissLabel) && (
              <flip-icon-close
                ref={(el) => (this.dismissIconEl = el)}
              ></flip-icon-close>
            )}
          </button>
        </div>
      </Host>
    );
  }
}
