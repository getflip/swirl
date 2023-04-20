import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Element,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import * as focusTrap from "focus-trap";
import classnames from "classnames";

export type SwirlModalVariant = "default" | "drawer";

/**
 * slot - Modal contents
 * custom-header - Optional custom header; should be used hidden label
 */
@Component({
  shadow: false,
  styleUrl: "swirl-modal.css",
  tag: "swirl-modal",
})
export class SwirlModal {
  @Element() el: HTMLElement;

  @Prop() closeButtonLabel?: string = "Close modal";
  @Prop() hideCloseButton?: boolean;
  @Prop() hideLabel?: boolean;
  @Prop() label!: string;
  @Prop() maxWidth?: string;
  @Prop() padded?: boolean = true;
  @Prop() primaryActionLabel?: string;
  @Prop() secondaryActionLabel?: string;
  @Prop() variant?: SwirlModalVariant = "default";

  @Event() modalClose: EventEmitter<void>;
  @Event() modalOpen: EventEmitter<void>;
  @Event() primaryAction: EventEmitter<MouseEvent>;
  @Event() secondaryAction: EventEmitter<MouseEvent>;

  @State() isOpen = false;
  @State() closing = false;
  @State() hasCustomHeader: boolean;
  @State() scrollable = false;
  @State() scrolled = false;
  @State() scrolledDown = false;

  private customHeaderSlot: HTMLSlotElement;
  private focusTrap: focusTrap.FocusTrap;
  private modalEl: HTMLElement;
  private scrollContainer: HTMLElement;

  componentDidLoad() {
    this.focusTrap = focusTrap.createFocusTrap(this.modalEl, {
      allowOutsideClick: true,
      tabbableOptions: {
        getShadowRoot: (node) => {
          return node.shadowRoot;
        },
      },
    });

    this.determineScrollStatus();
  }

  disconnectedCallback() {
    this.focusTrap.deactivate();
    this.unlockBodyScroll();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.determineScrollStatus();
  }

  @Watch("isOpen")
  watchIsOpen() {
    if (this.isOpen) {
      // wait for animation
      setTimeout(() => {
        this.focusTrap.activate();
      }, 200);
    } else {
      this.focusTrap.deactivate();
    }
  }

  /**
   * Open the modal.
   */
  @Method()
  async open() {
    this.isOpen = true;
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
      this.isOpen = false;
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

    const className = classnames("modal", `modal--variant-${this.variant}`, {
      "modal--closing": this.closing,
      "modal--has-custom-header": this.hasCustomHeader,
      "modal--hide-label": this.hideLabel,
      "modal--padded": this.padded,
      "modal--scrollable": this.scrollable,
      "modal--scrolled": this.scrolled,
      "modal--scrolled-down": this.scrolledDown,
    });

    return (
      <Host>
        <section
          aria-hidden={String(!this.isOpen)}
          aria-label={this.label}
          aria-modal="true"
          class={className}
          onKeyDown={this.onKeyDown}
          role="dialog"
          ref={(el) => (this.modalEl = el)}
        >
          <div class="modal__backdrop" onClick={this.onBackdropClick}></div>
          <div class="modal__body" style={{ maxWidth: this.maxWidth }}>
            {!this.hideCloseButton && (
              <swirl-button
                class="modal__close-button"
                hideLabel
                icon={
                  this.variant === "default"
                    ? "<swirl-icon-close></swirl-icon-close>"
                    : "<swirl-icon-double-arrow-right></swirl-icon-double-arrow-right>"
                }
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
