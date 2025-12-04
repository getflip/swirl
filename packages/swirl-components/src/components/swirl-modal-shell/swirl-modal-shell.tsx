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
  private modalEl: HTMLElement;

  componentDidLoad() {
    requestAnimationFrame(() => {
      this.setupFocusTrap();
      disableBodyScroll(this.modalEl);
      this.isClosing = false;
    });
  }

  disconnectedCallback() {
    this.focusTrap?.deactivate();
    enableBodyScroll(this.modalEl);
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

  private onContentClick = (event: Event) => {
    event.stopPropagation();
  };

  private setupFocusTrap() {
    this.focusTrap = focusTrap.createFocusTrap(this.modalEl, {
      allowOutsideClick: true,
      setReturnFocus: getActiveElement() as HTMLElement,
      escapeDeactivates: false,
    });

    this.focusTrap.activate();
  }

  private onClose = () => {
    this.close();
  };

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
          ref={(el) => (this.modalEl = el)}
        >
          <div class="modal-shell__backdrop"></div>

          <div class="modal-shell__scroll-container" onClick={this.onClose}>
            <div
              class="modal-shell__scroll-container__content"
              onClick={this.onContentClick}
            >
              <slot></slot>
            </div>
          </div>

          <swirl-button
            class="modal-shell__close-button"
            icon="<swirl-icon-close color='strong'></swirl-icon-close>"
            label={this.closeButtonLabel}
            hideLabel
            variant="translucent"
            onClick={this.onClose}
          ></swirl-button>
        </section>
      </Host>
    );
  }
}
