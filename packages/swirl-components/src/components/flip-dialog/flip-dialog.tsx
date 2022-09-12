import { Component, h, Host, Method, Prop } from "@stencil/core";
import A11yDialog from "a11y-dialog";

export type FlipDialogIntent = "primary" | "critical";

/**
 * @slot slot - The dialog content
 */
@Component({
  shadow: true,
  styleUrl: "flip-dialog.css",
  tag: "flip-dialog",
})
export class FlipDialog {
  @Prop() hideLabel?: boolean;
  @Prop() intent?: FlipDialogIntent = "primary";
  @Prop() label!: string;

  private dialog: A11yDialog;
  private dialogEl: HTMLDivElement;

  componentDidLoad() {
    this.dialog = new A11yDialog(this.dialogEl);
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
  }

  /**
   * Close the dialog.
   */
  @Method()
  async close() {
    this.dialog.hide();
  }

  render() {
    return (
      <Host>
        <div
          aria-describedby="content"
          aria-hidden="true"
          aria-labelledby={this.hideLabel ? undefined : "label"}
          aria-label={this.hideLabel ? this.label : undefined}
          aria-modal="true"
          class="dialog"
          ref={(el) => (this.dialogEl = el)}
          role="alertdialog"
        >
          <div class="dialog__backdrop" data-a11y-dialog-hide></div>
          <div class="dialog__body" role="document">
            {!this.hideLabel && (
              <h2 class="dialog__heading" id="label">
                {this.label}
              </h2>
            )}
            <div class="dialog__content" id="content">
              <slot></slot>
            </div>
            <flip-button-group class="dialog__controls" stretch wrap>
              <flip-button data-a11y-dialog-hide label="Action 1"></flip-button>
              <flip-button
                data-a11y-dialog-hide
                intent={this.intent}
                label="Action 2"
                variant="flat"
              ></flip-button>
            </flip-button-group>
          </div>
        </div>
      </Host>
    );
  }
}
