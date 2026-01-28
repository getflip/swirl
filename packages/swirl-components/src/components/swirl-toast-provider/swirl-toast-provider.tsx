import { Component, h, Host, Method, Prop, State, Watch } from "@stencil/core";
import { SwirlToastCustomEvent } from "../../components";
import { SwirlToastIntent } from "../swirl-toast/swirl-toast";

export type SwirlToastConfig = {
  accessibleDismissLabel?: string;
  content: string;
  dismissLabel?: string;
  duration?: number;
  icon?: string;
  intent?: SwirlToastIntent;
  toastId?: string;
};

export type SwirlToastMessage = SwirlToastConfig & {
  createdAt: Date;
  toastId: string;
};

@Component({
  shadow: true,
  styleUrl: "swirl-toast-provider.css",
  tag: "swirl-toast-provider",
})
export class SwirlToastProvider {
  @Prop() globalDuration?: number;

  @State() private toasts: SwirlToastMessage[] = [];

  private popoverEl: HTMLElement;
  private slotEl: HTMLSlotElement;

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

  @Watch("toasts")
  onToastsChange() {
    this.togglePopover();
  }

  onDismiss = (event: SwirlToastCustomEvent<string>) => {
    this.toasts = [...this.toasts].filter(
      (toast) => toast.toastId !== event.detail
    );
  };

  togglePopover = () => {
    const internalToasts = this.toasts.length;
    const slottedToasts = this.slotEl.assignedElements().length;

    if (internalToasts + slottedToasts > 0) {
      this.popoverEl.hidePopover();
      this.popoverEl.showPopover();
    } else {
      this.popoverEl.hidePopover();
    }
  };

  render() {
    return (
      <Host role="status">
        <swirl-stack
          class="toast-provider__stack"
          part="toast-provider__stack"
          popover="manual"
          spacing="12"
          align="center"
          ref={(el) => (this.popoverEl = el)}
        >
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
          <slot
            onSlotchange={this.togglePopover}
            ref={(el: HTMLSlotElement) => (this.slotEl = el)}
          ></slot>
        </swirl-stack>
      </Host>
    );
  }
}
