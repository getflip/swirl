import { Component, h, Host, Method, Prop, State } from "@stencil/core";
import { FlipToastCustomEvent } from "../../components";
import { FlipToastIntent } from "../flip-toast/flip-toast";

export type FlipToastConfig = {
  accessibleDismissLabel?: string;
  content: string;
  dismissLabel?: string;
  duration?: number;
  icon?: string;
  intent?: FlipToastIntent;
  toastId?: string;
};

export type FlipToastMessage = FlipToastConfig & {
  createdAt: Date;
  toastId: string;
};

@Component({
  shadow: true,
  tag: "flip-toast-provider",
})
export class FlipToastProvider {
  /**
   * Optional global duration for all toasts. Overrides any durations set via
   * the `toast` method. Set to 0 to disable automatic closing of toasts.
   */
  @Prop() globalDuration?: number;

  @State() private toasts: FlipToastMessage[] = [];

  /**
   * Clear all toasts
   * @param newToast
   * @returns
   */
  @Method()
  async clearAll() {
    this.toasts = [];
  }

  /**
   * Dismiss a toast
   * @param toastId
   * @returns
   */
  @Method()
  async dismiss(toastId: string) {
    this.toasts = [...this.toasts].filter((toast) => toast.toastId !== toastId);
  }

  /**
   * Create a new toast
   * @param newToast
   * @returns
   */
  @Method()
  async toast(newToast: FlipToastConfig): Promise<FlipToastMessage> {
    if (this.toasts.some((toast) => toast.toastId === newToast.toastId)) {
      return;
    }

    let duration = this.globalDuration;

    if (this.globalDuration === undefined) {
      duration = newToast.duration;
    } else if (this.globalDuration === 0) {
      duration = undefined;
    }

    const newToastWithId: FlipToastMessage = {
      ...newToast,
      createdAt: new Date(),
      duration,
      toastId: newToast.toastId || String(Math.round(Math.random() * 10000)),
    };

    this.toasts = [...this.toasts, newToastWithId];

    return newToastWithId;
  }

  onDismiss = (event: FlipToastCustomEvent<string>) => {
    this.toasts = [...this.toasts].filter(
      (toast) => toast.toastId !== event.detail
    );
  };

  render() {
    return (
      <Host role="status">
        <flip-stack spacing="12">
          {this.toasts.map((toast) => (
            <flip-toast
              key={toast.toastId}
              onDismiss={this.onDismiss}
              {...toast}
            ></flip-toast>
          ))}
        </flip-stack>
      </Host>
    );
  }
}
