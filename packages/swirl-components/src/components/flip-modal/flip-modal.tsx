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
import classnames from "classnames";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

@Component({
  shadow: true,
  styleUrl: "flip-modal.css",
  tag: "flip-modal",
})
export class FlipModal {
  @Prop() closeButtonLabel?: string = "Close modal";
  @Prop() label!: string;
  @Prop() primaryActionLabel?: string;
  @Prop() secondaryActionLabel?: string;

  @Event() primaryAction: EventEmitter<MouseEvent>;
  @Event() secondaryAction: EventEmitter<MouseEvent>;

  @State() closing = false;
  @State() scrollable = false;
  @State() scrolled = false;

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
    this.close();
  };

  private onSecondaryAction = (event: MouseEvent) => {
    this.secondaryAction.emit(event);
    this.close();
  };

  private determineScrollStatus = () => {
    const scrollable =
      this.scrollContainer?.scrollHeight > this.scrollContainer?.clientHeight;

    if (scrollable !== this.scrollable) {
      this.scrollable = scrollable;
    }

    const scrolled = this.scrollContainer?.scrollTop > 0;

    if (scrolled !== this.scrolled) {
      this.scrolled = scrolled;
    }
  };

  private lockBodyScroll() {
    disableBodyScroll(this.scrollContainer);
  }

  private unlockBodyScroll() {
    enableBodyScroll(this.scrollContainer);
  }

  render() {
    const className = classnames("modal", {
      "modal--closing": this.closing,
      "modal--scrollable": this.scrollable,
      "modal--scrolled": this.scrolled,
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
          <div class="modal__body" role="document">
            <flip-button
              class="modal__close-button"
              hideLabel
              icon="<flip-icon-close></flip-icon-close>"
              label={this.closeButtonLabel}
              onClick={this.onCloseButtonClick}
            ></flip-button>
            <header class="modal__header">
              <flip-heading
                as="h2"
                class="modal__heading"
                level={3}
                text={this.label}
              ></flip-heading>
              {this.primaryActionLabel && (
                <flip-button
                  class="modal__mobile-primary-action"
                  intent="primary"
                  label={this.primaryActionLabel}
                  onClick={this.onPrimaryAction}
                  variant="flat"
                ></flip-button>
              )}
            </header>
            <div
              class="modal__content"
              onScroll={this.determineScrollStatus}
              ref={(el) => (this.scrollContainer = el)}
            >
              <slot></slot>
            </div>
            <footer class="modal__controls">
              <flip-button-group wrap>
                {this.secondaryActionLabel && (
                  <flip-button
                    label={this.secondaryActionLabel}
                    onClick={this.onSecondaryAction}
                  ></flip-button>
                )}
                {this.primaryActionLabel && (
                  <flip-button
                    intent="primary"
                    label={this.primaryActionLabel}
                    onClick={this.onPrimaryAction}
                    variant="flat"
                  ></flip-button>
                )}
              </flip-button-group>
            </footer>
          </div>
        </section>
      </Host>
    );
  }
}
