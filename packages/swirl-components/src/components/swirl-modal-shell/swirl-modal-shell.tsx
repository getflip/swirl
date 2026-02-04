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

const ANIMATION_DURATION_MS = 300;

/**
 * @slot slot - Modal content
 */
@Component({
  shadow: false,
  scoped: true,
  styleUrl: "swirl-modal-shell.css",
  tag: "swirl-modal-shell",
})
export class SwirlModalShell {
  @Prop() label!: string;
  @Prop() closeButtonLabel!: string;

  @Event() closeModal: EventEmitter<void>;

  @State() isClosing = true;

  private modalEl: HTMLDialogElement;

  componentDidLoad() {
    this.setDialogCustomProps();

    requestAnimationFrame(() => {
      this.modalEl.showModal();
      disableBodyScroll(this.modalEl);
      this.isClosing = false;
    });
  }

  disconnectedCallback() {
    if (this.modalEl?.open) {
      this.modalEl.close();
    }
    enableBodyScroll(this.modalEl);
  }

  @Method()
  async close() {
    this.isClosing = true;

    setTimeout(() => {
      this.modalEl.close();
    }, ANIMATION_DURATION_MS);
  }

  private onDialogClose = () => {
    this.closeModal.emit();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.close();
    }
  };

  private onContentClick = (event: Event) => {
    event.stopPropagation();
  };

  private onClose = () => {
    this.close();
  };

  private setDialogCustomProps() {
    this.modalEl.setAttribute("closedby", "none");
  }

  render() {
    const className = classnames("modal-shell", {
      "modal-shell--closing": this.isClosing,
    });

    return (
      <Host>
        <dialog
          aria-label={this.label}
          class={className}
          onClose={this.onDialogClose}
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
        </dialog>
      </Host>
    );
  }
}
