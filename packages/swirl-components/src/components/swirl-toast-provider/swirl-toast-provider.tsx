import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { SwirlToastCustomEvent } from "../../components";
import { SwirlToastIntent } from "../swirl-toast/swirl-toast";
import { SwirlDialogToggleEvent } from "../../utils";

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
  @Element() el: HTMLSwirlToastProviderElement;

  @Prop() globalDuration?: number;

  @State() private toasts: SwirlToastMessage[] = [];

  private popoverEl: HTMLElement;
  private activeDialogStack: HTMLDialogElement[] = [];
  private originalParent: HTMLElement | null = null;

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

  componentWillLoad() {
    this.originalParent = this.el.parentElement;
  }

  disconnectedCallback() {
    // Recover the position of the element when it's disconnected from the DOM
    if (!this.el.isConnected) {
      // Remove any dialogs that are no longer in the DOM
      this.activeDialogStack = this.activeDialogStack.filter(
        (dialog) => dialog.isConnected
      );

      this.ensureCorrectPosition();
    }
  }

  @Listen("toggleDialog", { target: "document" })
  handleDialogToggle(event: CustomEvent<SwirlDialogToggleEvent>): void {
    const { newState, dialog } = event.detail;

    if (newState === "open") {
      this.onDialogOpen(dialog);
    } else {
      this.onDialogClose(dialog);
    }
  }

  @Watch("toasts")
  onToastsChange() {
    if (this.toasts.length > 0) {
      this.ensureCorrectPosition();
    } else {
      this.popoverEl.hidePopover();
    }
  }

  onDismiss = (event: SwirlToastCustomEvent<string>) => {
    this.toasts = [...this.toasts].filter(
      (toast) => toast.toastId !== event.detail
    );
  };

  private onDialogOpen(dialog: HTMLDialogElement) {
    if (!this.activeDialogStack.includes(dialog)) {
      this.activeDialogStack.push(dialog);
    }

    if (this.toasts.length > 0) {
      this.ensureCorrectPosition();
    }
  }

  private onDialogClose(dialog: HTMLDialogElement) {
    this.activeDialogStack = this.activeDialogStack.filter(
      (currentDialog) => currentDialog != dialog
    );

    if (this.toasts.length > 0) {
      this.ensureCorrectPosition();
    }
  }

  /**
   * Ensures that the toasts are positioned inside dialogs when they are open.
   *
   * This is necessary to allow toasts to be interactable when a dialog is open, otherwise the toasts would be inert.
   */
  private ensureCorrectPosition() {
    const parent =
      this.activeDialogStack[this.activeDialogStack.length - 1] ||
      this.originalParent;

    if (this.el.parentElement !== parent) {
      parent.appendChild(this.el);
    }

    this.popoverEl.hidePopover();
    this.popoverEl.showPopover();
  }

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
        </swirl-stack>
      </Host>
    );
  }
}
