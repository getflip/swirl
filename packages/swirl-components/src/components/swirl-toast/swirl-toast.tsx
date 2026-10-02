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
import { DesktopMediaQuery } from "../../services/media-query.service";

export type SwirlToastActionPosition = "bottom" | "inline";

export type SwirlToastIntent = "default" | "critical" | "success";

/**
 * @slot slot - The toast content. When provided, overrides the `content` prop.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-toast.css",
  tag: "swirl-toast",
})
export class SwirlToast {
  @Prop() accessibleDismissLabel?: string = "Dismiss";
  @Prop() actionLabel?: string;
  @Prop() actionPosition?: SwirlToastActionPosition = "inline";
  @Prop() content?: string;
  @Prop() dismissLabel?: string;
  /**
   * When set to Infinity, the toast will remain visible until explicitly dismissed
   */
  @Prop() duration?: number;
  @Prop() icon?: string;
  @Prop() intent?: SwirlToastIntent = "default";
  @Prop() toastId!: string;

  @Event() action: EventEmitter<string>;
  @Event() dismiss: EventEmitter<string>;

  private dismissIconEl: HTMLElement;
  private iconEl: HTMLElement;
  private dismissAt: number;
  private loaded = false;
  private timeout: NodeJS.Timeout;
  private mediaQueryUnsubscribe: () => void = () => {};

  @Watch("duration")
  watchDuration() {
    this.startTimer();
  }

  connectedCallback() {
    // moving toasts in the DOM disconnects and reconnects them,
    // this restores what disconnectedCallback cleaned up. (e.g. provider moving into a dialog)
    if (!this.loaded) {
      return;
    }

    this.scheduleDismiss();
    this.subscribeToMediaQuery();
  }

  componentDidLoad() {
    this.loaded = true;
    this.startTimer();
    this.subscribeToMediaQuery();
  }

  disconnectedCallback() {
    this.cancelScheduledDismiss();
    this.mediaQueryUnsubscribe();
  }

  private subscribeToMediaQuery() {
    this.mediaQueryUnsubscribe();

    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.forceIconProps(isDesktop);
    });
  }

  private forceIconProps(smallIcon: boolean) {
    const icon = this.iconEl?.children[0];
    const dismissIcon = this.dismissIconEl;

    icon?.setAttribute("size", smallIcon ? "20" : "24");
    dismissIcon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  private startTimer() {
    this.clearTimer();

    if (this.duration === undefined || this.duration === Infinity) {
      return;
    }

    this.dismissAt = Date.now() + this.duration;
    this.scheduleDismiss();
  }

  private scheduleDismiss() {
    if (this.dismissAt === undefined) {
      return;
    }

    this.cancelScheduledDismiss();

    this.timeout = setTimeout(() => {
      this.clearTimer();
      this.dismiss.emit(this.toastId);
    }, Math.max(0, this.dismissAt - Date.now()));
  }

  private cancelScheduledDismiss() {
    if (!Boolean(this.timeout)) {
      return;
    }

    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  private clearTimer() {
    this.cancelScheduledDismiss();
    this.dismissAt = undefined;
  }

  private onAction = () => {
    this.action.emit(this.toastId);
  };

  private onDismiss = () => {
    this.clearTimer();
    this.dismiss.emit(this.toastId);
  };

  render() {
    const className = classnames(
      "toast",
      `toast--intent-${this.intent}`,
      `toast--action-position-${this.actionPosition}`
    );

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
          <span class="toast__content-container">
            <span
              class="toast__content"
              innerHTML={this.content}
              part="toast__content"
            >
              <slot></slot>
            </span>
            {this.actionLabel && (
              <swirl-button
                class="toast__action-button"
                label={this.actionLabel}
                onClick={this.onAction}
                variant="plain"
              ></swirl-button>
            )}
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
