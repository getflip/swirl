import { Component, h, Host, Method, Prop, State } from "@stencil/core";
import { SwirlToastCustomEvent } from "../../components";
import { SwirlToastIntent } from "../swirl-toast/swirl-toast";

export type SwirlToastConfig = {
  accessibleDismissLabel?: string;
  content: string;
  dismissLabel?: string;
  duration?: number;
  icon?: string;
  intent?: SwirlToastIntent;
  persistent?: boolean;
  toastId?: string;
};

export type SwirlToastMessage = SwirlToastConfig & {
  createdAt: Date;
  toastId: string;
};

@Component({
  shadow: true,
  tag: "swirl-toast-provider",
})
export class SwirlToastProvider {
  @Prop() globalDuration?: number;

  @State() private toasts: SwirlToastMessage[] = [];

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
  async toast(newToast: SwirlToastConfig): Promise<SwirlToastMessage> {
    if (this.toasts.some((toast) => toast.toastId === newToast.toastId)) {
      return;
    }

    const newToastWithId: SwirlToastMessage = {
      ...newToast,
      createdAt: new Date(),
      duration: newToast.duration || this.globalDuration || undefined,
      toastId: newToast.toastId || String(Math.round(Math.random() * 10000)),
    };

    this.toasts = [...this.toasts, newToastWithId];

    return newToastWithId;
  }

  onDismiss = (event: SwirlToastCustomEvent<string>) => {
    this.toasts = [...this.toasts].filter(
      (toast) => toast.toastId !== event.detail
    );
  };

  render() {
    return (
      <Host role="status">
        <swirl-stack spacing="12">
          {this.toasts.map((toast) => {
            const props = { ...toast, content: undefined };

            return (
              <swirl-toast
                key={toast.toastId}
                onDismiss={this.onDismiss}
                {...props}
              >
                {toast.content}
              </swirl-toast>
            );
          })}
        </swirl-stack>
      </Host>
    );
  }
}
