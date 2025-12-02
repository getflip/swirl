import {
  Component,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";
import * as focusTrap from "focus-trap";
import { getActiveElement } from "../../utils";

const ANIMATION_DURATION_MS = 300;

/**
 * @slot slot - Modal content
 */
@Component({
  shadow: false,
  styleUrl: "swirl-modal-shell.css",
  tag: "swirl-modal-shell",
})
export class SwirlModalShell {
  @Prop() label!: string;
  @Prop() closeButtonLabel!: string;

  @Event() closeModal: EventEmitter<void>;

  @State() isClosing = true;

  private focusTrap: focusTrap.FocusTrap | undefined;
  private modalContentEl: HTMLElement;

  componentDidLoad() {
    requestAnimationFrame(() => {
      this.setupFocusTrap();
      disableBodyScroll(this.modalContentEl);
      this.isClosing = false;
    });
  }

  disconnectedCallback() {
    this.focusTrap?.deactivate();
    enableBodyScroll(this.modalContentEl);
  }

  @Method()
  async close() {
    this.isClosing = true;

    setTimeout(() => {
      this.closeModal.emit();
    }, ANIMATION_DURATION_MS);
  }

  private onKeyDown = (event: KeyboardEvent) => {
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

  private setupFocusTrap() {
    this.focusTrap = focusTrap.createFocusTrap(this.modalContentEl, {
      allowOutsideClick: true,
      setReturnFocus: getActiveElement() as HTMLElement,
      escapeDeactivates: false,
    });

    this.focusTrap.activate();
  }

  render() {
    const className = classnames("modal-shell", {
      "modal-shell--closing": this.isClosing,
    });

    return (
      <Host>
        <section
          aria-label={this.label}
          role="dialog"
          aria-modal="true"
          class={className}
          onKeyDown={this.onKeyDown}
        >
          <div
            class="modal-shell__backdrop"
            onClick={this.onBackdropClick}
          ></div>
          <div
            class="modal-shell__content"
            ref={(el) => (this.modalContentEl = el)}
          >
            <swirl-box paddingBlockStart="16" paddingBlockEnd="16">
              <swirl-button
                icon="<swirl-icon-close color='strong'></swirl-icon-close>"
                label={this.closeButtonLabel}
                hideLabel
                variant="plain"
                onClick={this.onCloseButtonClick}
              ></swirl-button>
            </swirl-box>

            <slot></slot>
          </div>
        </section>
      </Host>
    );
  }
}
