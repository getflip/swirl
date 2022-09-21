import {
  autoUpdate,
  computePosition,
  ComputePositionReturn,
  flip,
  shift,
} from "@floating-ui/dom";
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";
import { querySelectorAllDeep } from "../../utils";

/**
 * @slot slot - The popover content.
 */
@Component({
  shadow: true,
  styleUrl: "flip-popover.css",
  tag: "flip-popover",
})
export class FlipPopover {
  @Element() el: HTMLElement;

  @Prop() label!: string;
  @Prop() popoverId!: string;
  @Prop() trigger!: string;

  @State() active = false;
  @State() closing = false;
  @State() position: ComputePositionReturn;

  private childMenuItems: HTMLElement[];
  private disableAutoUpdate: any;
  private contentContainer: HTMLDivElement;
  private scrollContainer: HTMLDivElement;
  private triggerEl: HTMLElement;

  componentDidLoad() {
    this.connectTrigger();
    this.updateChildMenuItems();
    this.updateTriggerAttributes();
  }

  @Listen("focusout", { target: "window" })
  onWindowFocusout(event: FocusEvent) {
    if (!this.active) {
      return;
    }

    const target = event.relatedTarget as HTMLElement;

    const popoverLostFocus =
      target === null ||
      (!this.el.contains(target) &&
        !this.childMenuItems.some((item) => target.shadowRoot?.contains(item)));

    if (popoverLostFocus) {
      this.close();
    }
  }

  close = () => {
    if (this.closing) {
      return;
    }

    if (this.disableAutoUpdate) {
      this.disableAutoUpdate();
    }

    this.closing = true;

    setTimeout(() => {
      this.active = false;
      this.closing = false;
      this.updateTriggerAttributes();
    }, 150);

    this.triggerEl?.focus();
  };

  open = () => {
    this.active = true;

    this.updateChildMenuItems();
    this.updateTriggerAttributes();

    requestAnimationFrame(async () => {
      await this.reposition();

      if (this.childMenuItems.length > 0) {
        (this.childMenuItems[0] as HTMLElement).focus();
      } else {
        this.contentContainer.focus();
      }

      if (this.disableAutoUpdate) {
        this.disableAutoUpdate();
      }

      this.disableAutoUpdate = autoUpdate(
        this.triggerEl,
        this.contentContainer,
        this.reposition
      );

      this.scrollContainer.scrollTop = 0;
    });
  };

  toggle = () => {
    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  };

  private connectTrigger() {
    const triggerComponent = document.querySelector(`#${this.trigger}`);

    this.triggerEl = (triggerComponent?.children[0] ||
      triggerComponent?.shadowRoot?.children[0] ||
      triggerComponent) as HTMLElement;

    if (!Boolean(this.triggerEl)) {
      return;
    }

    this.triggerEl.addEventListener("click", this.toggle);
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && this.active) {
      this.close();
    }
  };

  private onContentClick = () => {
    if (!this.active) {
      return;
    }

    this.close();
  };

  private updateTriggerAttributes() {
    if (!Boolean(this.triggerEl)) {
      return;
    }

    this.triggerEl.setAttribute("aria-controls", this.popoverId);
    this.triggerEl.setAttribute("aria-expanded", String(this.active));
    this.triggerEl.setAttribute("aria-haspopup", "dialog");
  }

  private updateChildMenuItems() {
    this.childMenuItems = querySelectorAllDeep(this.el, '[role="menuitem"]');
  }

  private reposition = async () => {
    const mobile = !window.matchMedia("(min-width: 768px)").matches;

    if (!Boolean(this.triggerEl) || !Boolean(this.contentContainer)) {
      return;
    }

    if (mobile) {
      this.position = undefined;
      return;
    }

    this.position = await computePosition(
      this.triggerEl,
      this.contentContainer,
      {
        middleware: [shift(), flip()],
        placement: "bottom-start",
        strategy: "fixed",
      }
    );
  };

  render() {
    const className = classnames("popover", {
      "popover--closing": this.closing,
      "popover--active": this.active,
      "popover--inactive": !this.active,
    });

    return (
      <Host id={this.popoverId}>
        <div class={className} onKeyDown={this.onKeydown}>
          <div
            aria-hidden={!this.active ? "true" : "false"}
            aria-label={this.label}
            class="popover__content"
            onClick={this.onContentClick}
            role="dialog"
            tabindex="-1"
            ref={(el) => (this.contentContainer = el)}
            style={{
              top: Boolean(this.position) ? `${this.position?.y}px` : "",
              left: Boolean(this.position) ? `${this.position?.x}px` : "",
            }}
          >
            <span class="popover__handle"></span>
            <div
              class="popover__scroll-container"
              ref={(el) => (this.scrollContainer = el)}
            >
              <slot></slot>
            </div>
          </div>
          {this.active && (
            <div class="popover__backdrop" onClick={this.close}></div>
          )}
        </div>
      </Host>
    );
  }
}
