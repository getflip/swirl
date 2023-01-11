import {
  autoUpdate,
  computePosition,
  ComputePositionReturn,
  flip,
  offset,
  Placement,
  shift,
} from "@floating-ui/dom";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classnames from "classnames";
import { isMobileViewport, querySelectorAllDeep } from "../../utils";

export type FlipPopoverAnimation = "scale-in-xy" | "scale-in-y";

/**
 * @slot slot - The popover content.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-popover.css",
  tag: "flip-popover",
})
export class FlipPopover {
  @Element() el: HTMLElement;

  @Prop() animation?: FlipPopoverAnimation = "scale-in-xy";
  @Prop() enableFlip?: boolean = true;
  @Prop() label!: string;
  @Prop() offset?: number | number[] = 8;
  @Prop() placement?: Placement = "bottom-start";
  @Prop() popoverId!: string;
  @Prop() trigger!: string;
  @Prop() useContainerWidth?: boolean | string;

  @State() active = false;
  @State() closing = false;
  @State() position: ComputePositionReturn;

  @Event() popoverClose: EventEmitter<void>;
  @Event() popoverOpen: EventEmitter<void>;

  private contentContainer: HTMLDivElement;
  private disableAutoUpdate: any;
  private focusableChildren: HTMLElement[];
  private scrollContainer: HTMLDivElement;
  private triggerEl: HTMLElement;

  componentDidLoad() {
    this.connectTrigger();
    this.updateFocusableChildren();
    this.updateTriggerAttributes();
  }

  disconnectedCallback() {
    enableBodyScroll(this.scrollContainer);
  }

  @Listen("focusin", { target: "window" })
  onWindowFocusIn(event: FocusEvent) {
    if (!this.active) {
      return;
    }

    const target = event.target as HTMLElement;

    const popoverLostFocus = !this.el.contains(target);

    if (popoverLostFocus) {
      this.close();
    }
  }

  @Listen("click", { target: "window" })
  onWindowClick(event: MouseEvent) {
    if (!this.active) {
      return;
    }

    const target = event.target as HTMLElement;

    const clickedChild = this.el.contains(target);

    const clickedShadowChild = event
      .composedPath()
      .some((el) =>
        Boolean(el) && el instanceof Node
          ? this.el.contains(el as HTMLElement)
          : false
      );

    const clickedTrigger = event.target === this.triggerEl;

    if (!clickedChild && !clickedShadowChild && !clickedTrigger) {
      this.close();
    }
  }

  /**
   * Close the popover.
   * @returns
   */
  @Method()
  public async close() {
    if (this.closing || !this.active) {
      return;
    }

    this.popoverClose.emit();

    if (this.disableAutoUpdate) {
      this.disableAutoUpdate();
    }

    this.closing = true;

    setTimeout(() => {
      this.active = false;
      this.closing = false;
      this.updateTriggerAttributes();
    }, 150);

    this.unlockBodyScroll();

    this.getNativeTriggerElement()?.focus();
  }

  /**
   * Open the popover.
   * @returns
   */
  @Method()
  public async open() {
    if (this.active) {
      return;
    }

    this.adjustWidth();

    this.active = true;
    this.popoverOpen.emit();

    this.updateFocusableChildren();
    this.updateTriggerAttributes();

    requestAnimationFrame(async () => {
      await this.reposition();

      if (this.focusableChildren.length > 0) {
        this.focusableChildren[0].focus();
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
      this.lockBodyScroll();
    });
  }

  toggle = (event: Event) => {
    event.stopPropagation();

    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  };

  private connectTrigger() {
    this.triggerEl = querySelectorAllDeep(document.body, `#${this.trigger}`)[0];

    if (!Boolean(this.triggerEl)) {
      return;
    }

    this.triggerEl.addEventListener("click", (event) => {
      this.toggle(event);
    });
  }

  private getNativeTriggerElement() {
    return this.triggerEl.tagName.startsWith("FLIP-")
      ? ((this.triggerEl?.children[0] ||
          this.triggerEl?.shadowRoot?.children[0] ||
          this.triggerEl) as HTMLElement)
      : this.triggerEl;
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && this.active) {
      event.stopPropagation();
      this.close();
    }
  };

  private updateTriggerAttributes() {
    if (!Boolean(this.triggerEl)) {
      return;
    }

    const nativeTriggerEl = this.getNativeTriggerElement();

    nativeTriggerEl.setAttribute("aria-controls", this.popoverId);
    nativeTriggerEl.setAttribute("aria-expanded", String(this.active));
    nativeTriggerEl.setAttribute("aria-haspopup", "dialog");
  }

  private updateFocusableChildren() {
    this.focusableChildren = querySelectorAllDeep(
      this.el,
      '[role="menuitem"], [role="listbox"]'
    );
  }

  private adjustWidth() {
    let useContainerWidth = this.useContainerWidth;

    if ([true, "true"].includes(this.useContainerWidth)) {
      useContainerWidth = true;
    } else if ([false, "false"].includes(this.useContainerWidth)) {
      useContainerWidth = false;
    }

    const mobile = !window.matchMedia("(min-width: 768px)").matches;

    if (Boolean(useContainerWidth) && !mobile) {
      const container =
        typeof useContainerWidth === "string"
          ? this.el.closest(useContainerWidth) || this.el.parentElement
          : this.el.parentElement;

      this.contentContainer.style.maxWidth = "none";
      this.contentContainer.style.width =
        container.getBoundingClientRect().width + "px";
    } else {
      this.contentContainer.style.maxWidth = "";
      this.contentContainer.style.width = "";
    }
  }

  private reposition = async () => {
    const mobile = isMobileViewport();

    if (!Boolean(this.triggerEl) || !Boolean(this.contentContainer)) {
      return;
    }

    if (mobile) {
      this.position = undefined;
      return;
    }

    const offsetOptions =
      typeof this.offset === "number"
        ? { mainAxis: this.offset, crossAxis: 0 }
        : { mainAxis: this.offset[0], crossAxis: this.offset[1] };

    const middleware = this.enableFlip
      ? [offset(offsetOptions), shift(), flip()]
      : [offset(offsetOptions), shift()];

    this.position = await computePosition(
      this.triggerEl,
      this.contentContainer,
      {
        middleware,
        placement: this.placement,
        strategy: "fixed",
      }
    );
  };

  private lockBodyScroll() {
    const mobile = isMobileViewport();

    if (!mobile) {
      return;
    }

    disableBodyScroll(this.scrollContainer);
  }

  private unlockBodyScroll() {
    enableBodyScroll(this.scrollContainer);
  }

  private onCloseButtonClick = () => {
    this.close();
  };

  render() {
    const className = classnames(
      "popover",
      `popover--animation-${this.animation}`,
      {
        "popover--closing": this.closing,
        "popover--active": this.active,
        "popover--inactive": !this.active,
      }
    );

    return (
      <Host id={this.popoverId}>
        <div class={className} onKeyDown={this.onKeydown}>
          <div
            aria-hidden={!this.active ? "true" : "false"}
            aria-label={this.label}
            class="popover__content"
            role="dialog"
            ref={(el) => (this.contentContainer = el)}
            style={{
              top: Boolean(this.position) ? `${this.position?.y}px` : "",
              left: Boolean(this.position) ? `${this.position?.x}px` : "",
            }}
            tabindex="-1"
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
            <div
              class="popover__backdrop"
              onClick={this.onCloseButtonClick}
            ></div>
          )}
        </div>
      </Host>
    );
  }
}
