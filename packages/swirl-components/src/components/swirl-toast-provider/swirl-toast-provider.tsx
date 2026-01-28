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
  private slotEl: HTMLSlotElement;
  private activeDialogStack: HTMLDialogElement[] = [];
  private originalParent: HTMLElement | null = null;
  private originalNextSibling: Node | null = null;

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

  @Listen("swirlDialogToggle", { target: "document" })
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

  private onDialogOpen(dialog: HTMLDialogElement) {
    if (this.activeDialogStack.length === 0) {
      this.originalParent = this.el.parentElement;
      this.originalNextSibling = this.el.nextSibling;
    }

    if (!this.activeDialogStack.includes(dialog)) {
      this.activeDialogStack.push(dialog);
    }

    this.moveToDialog(dialog);
  }

  private onDialogClose(dialog: HTMLDialogElement) {
    const index = this.activeDialogStack.indexOf(dialog);

    if (index > -1) {
      this.activeDialogStack.splice(index, 1);
    }

    if (this.activeDialogStack.length > 0) {
      const topDialog =
        this.activeDialogStack[this.activeDialogStack.length - 1];

      this.moveToDialog(topDialog);
    } else {
      this.restoreToOriginalPosition();
    }
  }

  private moveToDialog(dialog: HTMLDialogElement) {
    this.moveElement(this.el, dialog, null);
    this.refreshPopover();
  }

  private restoreToOriginalPosition() {
    if (!this.originalParent) return;

    if (document.contains(this.originalParent)) {
      this.moveElement(this.el, this.originalParent, this.originalNextSibling);
    } else {
      this.moveElement(this.el, document.body, null);
    }
    this.refreshPopover();

    this.originalParent = null;
    this.originalNextSibling = null;
  }

  private moveElement(
    element: HTMLElement,
    target: HTMLElement,
    reference: Node | null
  ) {
    if ("moveBefore" in HTMLElement.prototype) {
      (target as any).moveBefore(element, reference);
    } else {
      target.insertBefore(element, reference);
    }
  }

  private refreshPopover() {
    if (this.popoverEl?.matches(":popover-open")) {
      this.popoverEl.hidePopover();
      this.popoverEl.showPopover();
    }
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
          <slot
            onSlotchange={this.togglePopover}
            ref={(el: HTMLSlotElement) => (this.slotEl = el)}
          ></slot>
        </swirl-stack>
      </Host>
    );
  }
}
