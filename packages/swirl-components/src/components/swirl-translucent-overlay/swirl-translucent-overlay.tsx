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
 * @slot slot - Overlay content
 */
@Component({
  shadow: false,
  styleUrl: "swirl-translucent-overlay.css",
  tag: "swirl-translucent-overlay",
})
export class SwirlTranslucentOverlay {
  @Prop() overlayAriaLabel!: string;
  @Prop() closeButtonAriaLabel!: string;

  @Event() closeOverlay: EventEmitter<void>;

  @State() isClosing = true;

  private focusTrap: focusTrap.FocusTrap | undefined;
  private overlayContentEl: HTMLElement;

  componentDidLoad() {
    requestAnimationFrame(() => {
      this.setupFocusTrap();
      disableBodyScroll(this.overlayContentEl);
      this.isClosing = false;
    });
  }

  disconnectedCallback() {
    this.focusTrap?.deactivate();
    enableBodyScroll(this.overlayContentEl);
  }

  @Method()
  async close() {
    this.isClosing = true;

    setTimeout(() => {
      this.closeOverlay.emit();
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
    this.focusTrap = focusTrap.createFocusTrap(this.overlayContentEl, {
      allowOutsideClick: true,
      setReturnFocus: getActiveElement() as HTMLElement,
      escapeDeactivates: false,
    });

    this.focusTrap.activate();
  }

  render() {
    const className = classnames("overlay", {
      "overlay--closing": this.isClosing,
    });

    return (
      <Host>
        <section
          aria-label={this.overlayAriaLabel}
          role="dialog"
          aria-modal="true"
          class={className}
          onKeyDown={this.onKeyDown}
        >
          <div class="overlay__backdrop" onClick={this.onBackdropClick}></div>
          <div
            class="overlay__content"
            ref={(el) => (this.overlayContentEl = el)}
          >
            <swirl-box paddingBlockStart="16" paddingBlockEnd="16">
              <swirl-button
                icon="<swirl-icon-close color='strong'></swirl-icon-close>"
                label={this.closeButtonAriaLabel}
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
