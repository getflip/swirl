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

export type SwirlToastIntent = "default" | "critical" | "success";

@Component({
  shadow: true,
  styleUrl: "swirl-toast.css",
  tag: "swirl-toast",
})
export class SwirlToast {
  @Prop() accessibleDismissLabel?: string = "Dismiss";
  @Prop() content?: string;
  @Prop() dismissLabel?: string;
  @Prop() duration?: number;
  @Prop() icon?: string;
  @Prop() intent?: SwirlToastIntent = "default";
  @Prop() toastId!: string;

  @Event() dismiss: EventEmitter<string>;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private dismissIconEl: HTMLElement;
  private iconEl: HTMLElement;
  private timeout: NodeJS.Timeout;

  @Watch("duration")
  watchDuration() {
    this.startTimer();
  }

  componentDidLoad() {
    this.startTimer();

    this.forceIconProps(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
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
          <span
            class="toast__content"
            innerHTML={this.content}
            part="toast__content"
          >
            <slot></slot>
          </span>
          <button
            aria-label={this.dismissLabel || this.accessibleDismissLabel}
            class="toast__dismiss-button"
            onClick={this.onDismiss}
            type="button"
          >
            {this.dismissLabel}
            {!Boolean(this.dismissLabel) && (
              <swirl-icon-close
                ref={(el) => (this.dismissIconEl = el)}
              ></swirl-icon-close>
            )}
          </button>
        </div>
      </Host>
    );
  }
}
