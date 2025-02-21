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
import A11yDialog from "a11y-dialog";
import classnames from "classnames";

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
  @Prop() secondaryActionLabel?: string;

  @Event() dialogClose: EventEmitter<void>;
  @Event() dialogOpen: EventEmitter<void>;
  @Event() primaryAction: EventEmitter<MouseEvent>;
  @Event() secondaryAction: EventEmitter<MouseEvent>;

  @State() closing = false;

  private controlsContainerEl: HTMLElement;
  private dialog: A11yDialog;
  private dialogEl: HTMLDivElement;

  componentDidLoad() {
    this.dialog = new A11yDialog(this.dialogEl);

    this.dialog.on("show", () => {
      this.controlsContainerEl
        .querySelector<HTMLButtonElement>("swirl-button button")
        ?.focus();
    });
  }

  disconnectedCallback() {
    this.dialog?.destroy();
  }

  /**
   * Open the dialog.
   */
  @Method()
  async open() {
    this.dialog.show();
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
      this.dialog.hide();
      this.dialogClose.emit();
      this.closing = false;
    }, 150);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      event.stopImmediatePropagation();
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

  render() {
    const className = classnames("dialog", { "dialog--closing": this.closing });
    const hasLeftControls = Boolean(this.el.querySelector('[slot="left-controls"]'));

    return (
      <Host>
        <div
          aria-describedby="content"
          aria-hidden="true"
          aria-labelledby={this.hideLabel ? undefined : "label"}
          aria-label={this.hideLabel ? this.label : undefined}
          aria-modal="true"
          class={className}
          onKeyDown={this.onKeyDown}
          ref={(el) => (this.dialogEl = el)}
          role="alertdialog"
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
            <div
              class="dialog__controls"
              ref={(el) => (this.controlsContainerEl = el)}
            >
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
        </div>
      </Host>
    );
  }
}
