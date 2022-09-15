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
 * @slot trigger - The trigger element. Has to be a single interactive element. E.g. `<flip-button label="Trigger" slot="trigger"></flip-button>`
 * @slot content - The popover content.
 */
@Component({
  shadow: true,
  styleUrl: "flip-popover.css",
  tag: "flip-popover",
})
export class FlipPopover {
  @Element() el: HTMLElement;

  @Prop() label!: string;

  @State() active = false;
  @State() closing = false;
  @State() position: ComputePositionReturn;

  private childMenuItems: HTMLElement[];
  private disableAutoUpdate: any;
  private contentContainer: HTMLDivElement;
  private triggerContainer: HTMLDivElement;

  componentDidLoad() {
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
        !this.childMenuItems.some((item) => target.shadowRoot.contains(item)));

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

    const trigger = this.getTriggerElement();
    trigger?.focus();
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
        this.triggerContainer,
        this.contentContainer,
        this.reposition
      );
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

  private reposition = async () => {
    const mobile = !window.matchMedia("(min-width: 768px)").matches;

    if (!Boolean(this.triggerContainer) || !Boolean(this.contentContainer)) {
      return;
    }

    if (mobile) {
      this.position = undefined;
      return;
    }

    this.position = await computePosition(
      this.triggerContainer,
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
            style={{
              top: this.position?.x ? `${this.position?.y}px` : "",
              left: this.position?.y ? `${this.position?.x}px` : "",
            }}
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
