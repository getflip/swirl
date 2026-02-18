import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";
import { tabbable } from "tabbable";
import { SwirlDialogToggleEvent } from "../../utils";

export type SwirlDialogIntent = "primary" | "critical";

/**
 * @slot slot - The dialog content
 * @slot left-controls - Controls displayed on the left side of the default ones
 */
@Component({
  shadow: true,
  styleUrl: "swirl-dialog.css",
  tag: "swirl-dialog",
})
export class SwirlDialog {
  @Element() el: HTMLElement;

  @Prop() hideLabel?: boolean;
  @Prop() intent?: SwirlDialogIntent = "primary";
  @Prop() label!: string;
  @Prop() primaryActionLabel?: string;
  @Prop() returnFocusTo?: HTMLElement | string;
  @Prop() secondaryActionLabel?: string;

  @Event() dialogClose: EventEmitter<void>;
  @Event() dialogOpen: EventEmitter<void>;
  @Event() primaryAction: EventEmitter<MouseEvent>;
  @Event() secondaryAction: EventEmitter<MouseEvent>;
  @Event({ bubbles: true, composed: true })
  toggleDialog: EventEmitter<SwirlDialogToggleEvent>;

  @State() closing = false;
  @State() opening = false;

  private dialogEl: HTMLDialogElement;

  componentDidLoad() {
    this.ensureOpening();
    this.setDialogCustomProps();
  }

  disconnectedCallback() {
    if (this.dialogEl?.open) {
      this.dialogEl.close();
    }
  }

  private ensureOpening() {
    if (this.opening && !this.dialogEl?.open) {
      this.open();
    }
  }

  private setDialogCustomProps() {
    this.dialogEl.setAttribute("closedby", "none");
  }

  /**
   * Open the dialog.
   */
  @Method()
  async open() {
    this.opening = true;

    if (!this.dialogEl) {
      return;
    }

    this.dialogEl.showModal();
    this.dialogOpen.emit();
  }

  /**
   * Close the dialog.
   */
  @Method()
  async close() {
    if (this.closing) {
      return;
    }

    this.closing = true;

    setTimeout(() => {
      this.dialogEl.close();

      if (this.returnFocusTo) {
        this.customFocusReturn();
      }
    }, 150);
  }

  private onClose = () => {
    this.closing = false;
    this.dialogClose.emit();
  };

  onToggle = (event: ToggleEvent) => {
    this.toggleDialog.emit({
      newState: event.newState as SwirlDialogToggleEvent["newState"],
      dialog: this.dialogEl,
    });
  };

  onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.close();
    }
  };

  private onBackdropClick = () => {
    this.close();
  };

  private onPrimaryAction = (event: MouseEvent) => {
    this.primaryAction.emit(event);
    this.close();
  };

  private onSecondaryAction = (event: MouseEvent) => {
    this.secondaryAction.emit(event);
    this.close();
  };

  private customFocusReturn() {
    const element =
      typeof this.returnFocusTo === "string"
        ? document.querySelector<HTMLElement>(this.returnFocusTo)
        : this.returnFocusTo;

    const focusableElements = tabbable(element, {
      includeContainer: true,
      getShadowRoot: true,
    });

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  render() {
    const className = classnames("dialog", { "dialog--closing": this.closing });
    const hasLeftControls = Boolean(
      this.el.querySelector('[slot="left-controls"]')
    );

    return (
      <Host>
        <dialog
          aria-describedby="content"
          aria-labelledby={this.hideLabel ? undefined : "label"}
          aria-label={this.hideLabel ? this.label : undefined}
          class={className}
          onClose={this.onClose}
          onKeyDown={this.onKeyDown}
          onToggle={this.onToggle}
          role="alertdialog"
          ref={(el) => (this.dialogEl = el)}
        >
          <div class="dialog__backdrop" onClick={this.onBackdropClick}></div>
          <div class="dialog__body" part="dialog__body" role="document">
            {!this.hideLabel && (
              <h2 class="dialog__heading" part="dialog__heading" id="label">
                {this.label}
              </h2>
            )}
            <div class="dialog__content" part="dialog__content" id="content">
              <slot></slot>
            </div>
            <div class="dialog__controls">
              {hasLeftControls && (
                <div class="dialog__left_controls">
                  <slot name="left-controls"></slot>
                </div>
              )}
              {this.secondaryActionLabel && (
                <swirl-button
                  label={this.secondaryActionLabel}
                  onClick={this.onSecondaryAction}
                ></swirl-button>
              )}
              {this.primaryActionLabel && (
                <swirl-button
                  intent={this.intent}
                  label={this.primaryActionLabel}
                  onClick={this.onPrimaryAction}
                  variant="flat"
                ></swirl-button>
              )}
            </div>
          </div>
        </dialog>
      </Host>
    );
  }
}
