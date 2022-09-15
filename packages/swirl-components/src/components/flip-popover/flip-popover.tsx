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
import { PositionMatch, reposition } from "nanopop";
import { querySelectorAllDeep } from "../../utils";

/**
 * @slot trigger - The trigger element. Has to be a single interactive element. E.g. `<flip-button label="Trigger" slot="trigger"></flip-button>`
 * @slot content - The popover content.
 */
@Component({
  scoped: true,
  shadow: false,
  styleUrl: "flip-popover.css",
  tag: "flip-popover",
})
export class FlipPopover {
  @Element() el: HTMLElement;

  @Prop() label!: string;

  @State() active = false;
  @State() closing = false;
  @State() position: PositionMatch;

  private childMenuItems: HTMLElement[];
  private contentContainer: HTMLDivElement;
  private triggerContainer: HTMLDivElement;

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.reposition();
  }

  @Listen("scroll", { target: "window" })
  onWindowScroll() {
    this.reposition();
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
        !this.childMenuItems.some((item) => target.shadowRoot.contains(item)));

    if (popoverLostFocus) {
      this.close();
    }
  }

  componentDidLoad() {
    this.updateChildMenuItems();
    this.updateTriggerAttributes();
  }

  close = () => {
    if (this.closing) {
      return;
    }

    this.closing = true;

    setTimeout(() => {
      this.active = false;
      this.closing = false;
      this.updateTriggerAttributes();
    }, 150);

    const trigger = this.getTriggerElement();
    trigger?.focus();
  };

  open = () => {
    this.active = true;
    this.updateChildMenuItems();
    this.updateTriggerAttributes();

    requestAnimationFrame(() => {
      this.reposition();

      if (this.childMenuItems.length > 0) {
        (this.childMenuItems[0] as HTMLElement).focus();
      } else {
        this.contentContainer.focus();
      }
    });
  };

  toggle = () => {
    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  };

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

  private getTriggerElement(): HTMLElement | undefined {
    const triggerComponent = this.el.querySelector('[slot="trigger"]');
    const trigger =
      triggerComponent?.children[0] ||
      triggerComponent?.shadowRoot?.children[0];

    return trigger as HTMLElement | undefined;
  }

  private updateTriggerAttributes() {
    const trigger = this.getTriggerElement();

    if (!Boolean(trigger)) {
      return;
    }

    trigger.setAttribute("aria-controls", "popover");
    trigger.setAttribute("aria-expanded", String(this.active));
    trigger.setAttribute("aria-haspopup", "dialog");
  }

  private updateChildMenuItems() {
    this.childMenuItems = querySelectorAllDeep(this.el, '[role="menuitem"]');
  }

  private reposition = () => {
    const mobile = !window.matchMedia("(min-width: 768px)").matches;

    if (!Boolean(this.triggerContainer) || !Boolean(this.contentContainer)) {
      return;
    }

    if (mobile) {
      this.contentContainer.style.top = "";
      this.contentContainer.style.left = "";

      return;
    }

    this.position = reposition(this.triggerContainer, this.contentContainer, {
      position: "bottom-start",
    });
  };

  render() {
    const className = classnames("popover", {
      "popover--closing": this.closing,
      "popover--active": this.active,
      "popover--inactive": !this.active,
    });

    return (
      <Host>
        <div class={className} onKeyDown={this.onKeydown}>
          <div
            class="popover__trigger"
            onClick={this.toggle}
            ref={(el) => (this.triggerContainer = el)}
          >
            <slot name="trigger"></slot>
          </div>
          <div
            aria-hidden={!this.active ? "true" : "false"}
            aria-label={this.label}
            class="popover__content"
            id="popover"
            onClick={this.onContentClick}
            role="dialog"
            tabindex="-1"
            ref={(el) => (this.contentContainer = el)}
          >
            <span class="popover__handle"></span>
            <div class="popover__scroll-container">
              <slot name="content"></slot>
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
