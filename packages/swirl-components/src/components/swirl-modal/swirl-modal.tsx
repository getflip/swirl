import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import A11yDialog from "a11y-dialog";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";

/**
 * slot - Modal contents
 * custom-header - Optional custom header; should be used hidden label
 */
@Component({
  shadow: true,
  styleUrl: "swirl-modal.css",
  tag: "swirl-modal",
})
export class SwirlModal {
  @Prop() closeButtonLabel?: string = "Close modal";
  @Prop() hideCloseButton?: boolean;
  @Prop() hideLabel?: boolean;
  @Prop() label!: string;
  @Prop() maxWidth?: string;
  @Prop() padded?: boolean = true;
  @Prop() primaryActionLabel?: string;
  @Prop() secondaryActionLabel?: string;

  @Event() modalClose: EventEmitter<void>;
  @Event() modalOpen: EventEmitter<void>;
  @Event() primaryAction: EventEmitter<MouseEvent>;
  @Event() secondaryAction: EventEmitter<MouseEvent>;

  @State() closing = false;
  @State() hasCustomHeader: boolean;
  @State() scrollable = false;
  @State() scrolled = false;
  @State() scrolledDown = false;

  private customHeaderSlot: HTMLSlotElement;
  private modal: A11yDialog;
  private modalEl: HTMLElement;
  private scrollContainer: HTMLElement;

  componentDidLoad() {
    this.modal = new A11yDialog(this.modalEl);
    this.determineScrollStatus();
  }

  disconnectedCallback() {
    this.modal?.destroy();
    this.unlockBodyScroll();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.determineScrollStatus();
  }

  /**
   * Open the modal.
   */
  @Method()
  async open() {
    this.modal.show();
    this.modalOpen.emit();
    this.lockBodyScroll();
    this.determineScrollStatus();
  }

  /**
   * Close the modal.
   */
  @Method()
  async close() {
    if (this.closing) {
      return;
    }

    this.closing = true;
    this.unlockBodyScroll();

    setTimeout(() => {
      this.modal.hide();
      this.modalClose.emit();
      this.closing = false;
    }, 150);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      this.close();
    }
  };

  private onBackdropClick = () => {
    this.close();
  };

  private onCloseButtonClick = () => {
    this.close();
  };

  private onPrimaryAction = (event: MouseEvent) => {
    this.primaryAction.emit(event);
  };

  private onSecondaryAction = (event: MouseEvent) => {
    this.secondaryAction.emit(event);
  };

  private onCustomHeaderSlotChange = () => {
    this.hasCustomHeader = this.customHeaderSlot.assignedElements().length > 0;
  };

  private determineScrollStatus = () => {
    const scrolled = this.scrollContainer?.scrollTop > 0;

    const scrolledDown =
      Math.ceil(
        this.scrollContainer?.scrollTop + this.scrollContainer?.offsetHeight
      ) >= this.scrollContainer?.scrollHeight;

    const scrollable =
      this.scrollContainer?.scrollHeight > this.scrollContainer?.offsetHeight;

    if (scrolled !== this.scrolled) {
      this.scrolled = scrolled;
    }

    if (scrolledDown !== this.scrolledDown) {
      this.scrolledDown = scrolledDown;
    }

    if (scrollable !== this.scrollable) {
      this.scrollable = scrollable;
    }
  };

  private lockBodyScroll() {
    disableBodyScroll(this.scrollContainer);
  }

  private unlockBodyScroll() {
    enableBodyScroll(this.scrollContainer);
  }

  render() {
    const showControls =
      Boolean(this.primaryActionLabel) || Boolean(this.secondaryActionLabel);

    const className = classnames("modal", {
      "modal--closing": this.closing,
      "modal--has-custom-header": this.hasCustomHeader,
      "modal--padded": this.padded,
      "modal--scrollable": this.scrollable,
      "modal--scrolled": this.scrolled,
      "modal--scrolled-down": this.scrolledDown,
    });

    return (
      <Host>
        <section
          aria-hidden="true"
          aria-label={this.label}
          class={className}
          id="modal"
          onKeyDown={this.onKeyDown}
          ref={(el) => (this.modalEl = el)}
        >
          <div class="modal__backdrop" onClick={this.onBackdropClick}></div>
          <div
            class="modal__body"
            role="document"
            style={{ maxWidth: this.maxWidth }}
          >
            {!this.hideCloseButton && (
              <swirl-button
                class="modal__close-button"
                hideLabel
                icon="<swirl-icon-close></swirl-icon-close>"
                label={this.closeButtonLabel}
                onClick={this.onCloseButtonClick}
              ></swirl-button>
            )}
            <header class="modal__custom-header">
              <slot
                name="custom-header"
                onSlotchange={this.onCustomHeaderSlotChange}
                ref={(el) => (this.customHeaderSlot = el as HTMLSlotElement)}
              ></slot>
            </header>
            {!this.hideLabel && (
              <header class="modal__header">
                <swirl-heading
                  as="h2"
                  class="modal__heading"
                  level={3}
                  text={this.label}
                ></swirl-heading>
              </header>
            )}
            <div
              class="modal__content"
              onScroll={this.determineScrollStatus}
              ref={(el) => (this.scrollContainer = el)}
            >
              <slot></slot>
            </div>
            {showControls && (
              <footer class="modal__controls">
                <swirl-button-group wrap>
                  {this.secondaryActionLabel && (
                    <swirl-button
                      label={this.secondaryActionLabel}
                      onClick={this.onSecondaryAction}
                    ></swirl-button>
                  )}
                  {this.primaryActionLabel && (
                    <swirl-button
                      intent="primary"
                      label={this.primaryActionLabel}
                      onClick={this.onPrimaryAction}
                      variant="flat"
                    ></swirl-button>
                  )}
                </swirl-button-group>
              </footer>
            )}
          </div>
        </section>
      </Host>
    );
  }
}
