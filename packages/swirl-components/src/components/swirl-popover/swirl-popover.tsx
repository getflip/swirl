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
import {
  getActiveElement,
  isMobileViewport,
  querySelectorAllDeep,
} from "../../utils";

export type SwirlPopoverAnimation = "fade-in" | "scale-in-xy" | "scale-in-y";

/**
 * @slot slot - The popover content.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-popover.css",
  tag: "swirl-popover",
})
export class SwirlPopover {
  @Element() el: HTMLSwirlPopoverElement;

  @Prop() animation?: SwirlPopoverAnimation = "scale-in-xy";
  @Prop() disableScrollLock?: boolean;
  @Prop() enableFlip?: boolean = true;
  @Prop() fullscreenBottomSheet?: boolean;
  @Prop() label!: string;
  @Prop() maxHeight?: string = "22rem";
  @Prop() offset?: number | number[] = 8;
  @Prop() padded?: boolean = true;
  @Prop() popoverId?: string;
  @Prop() placement?: Placement = "bottom-start";
  @Prop() returnFocusToTrigger?: boolean = true;
  @Prop() transparent?: boolean;
  @Prop() trigger?: string | HTMLElement;
  @Prop() triggerContainer?: HTMLElement;
  @Prop() useContainerWidth?: boolean | string;

  @State() active = false;
  @State() closing = false;
  @State() position: ComputePositionReturn;

  @Event() popoverClose: EventEmitter<void>;
  @Event() popoverOpen: EventEmitter<{ position: ComputePositionReturn }>;

  private contentContainer: HTMLDivElement;
  private disableAutoUpdate: any;
  private scrollContainer: HTMLDivElement;
  private triggerEl: HTMLElement | undefined;

  componentDidLoad() {
    this.connectTrigger();
    this.updateTriggerAttributes();

    if (Boolean(this.trigger)) {
      console.warn(
        '[Swirl] The "trigger" prop of swirl-popover is deprecated and will be removed with the next major release. Please use the swirl-popover-trigger component instead. https://swirl-storybook.flip-app.dev/?path=/docs/components-swirlpopovertrigger--docs'
      );
    }
  }

  disconnectedCallback() {
    this.unlockBodyScroll();
  }

  @Listen("focusin", { target: "window" })
  onWindowFocusIn(event: FocusEvent) {
    if (!this.active) {
      return;
    }

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isWKWebView = "webkit" in window;
    const isSafariOrWKWebView = isSafari || isWKWebView;

    const target = event.target as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;
    const activeElement = getActiveElement();

    const swirlComponentsExcludedFromAutoClosing = ["SWIRL-TAB"];

    // Check if the focus has moved outside the popover or its trigger.
    const focusIsOutsidePopover =
      !this.el.contains(target) && !this.el.contains(activeElement);
    const focusIsNotOnTrigger =
      target !== this.triggerEl && !this.triggerEl?.contains(target);
    const extraCheckForSafariOrWKWebView =
      isSafariOrWKWebView &&
      !this.el.contains(relatedTarget || target) &&
      relatedTarget !== this.el;

    // Close the popover if the focus is outside and additional checks for Safari or WKWebView pass.
    if (
      !swirlComponentsExcludedFromAutoClosing.includes(target.tagName) &&
      focusIsOutsidePopover &&
      focusIsNotOnTrigger &&
      (!isSafariOrWKWebView || extraCheckForSafariOrWKWebView)
    ) {
      this.close();
    }
  }

  @Listen("click", { target: "window" })
  onWindowClick(event: MouseEvent) {
    if (!this.active || this.closing) {
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

    const clickedTrigger =
      target === this.triggerEl ||
      this.triggerEl.contains(target) ||
      event.composedPath().includes(this.triggerEl);

    if (!clickedChild && !clickedShadowChild && !clickedTrigger) {
      this.close();
    }
  }

  /**
   * Close the popover.
   * @returns
   */
  @Method()
  public async close(disableFocus?: boolean) {
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

    if (this.returnFocusToTrigger && !disableFocus) {
      this.getNativeTriggerElement()?.focus();
    }
  }

  /**
   * Open the popover.
   * @returns
   */
  @Method()
  public async open(triggerEl?: HTMLElement, disableFocus?: boolean) {
    this.triggerEl = triggerEl || this.triggerEl;

    if (this.active || !Boolean(this.triggerEl)) {
      return;
    }

    this.adjustWidth();

    this.active = true;

    this.updateTriggerAttributes();

    const focusableChildren = this.getFocusableChildren();

    requestAnimationFrame(async () => {
      await this.reposition();

      this.popoverOpen.emit({ position: this.position });

      if (focusableChildren.length > 0 && !disableFocus) {
        focusableChildren[0].focus();
      } else if (!disableFocus) {
        this.contentContainer.focus();
      }

      if (this.disableAutoUpdate) {
        this.disableAutoUpdate();
      }

      this.disableAutoUpdate = autoUpdate(
        this.triggerEl,
        this.contentContainer,
        () => this.reposition()
      );

      this.scrollContainer.scrollTop = 0;
      this.lockBodyScroll();
    });
  }

  /**
   * Return whether the popover is open.
   * @returns Promise<boolean>
   */
  @Method()
  public async isOpen() {
    return this.active && !this.closing;
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
    if (!Boolean(this.trigger)) {
      this.triggerEl = undefined;
      return;
    }

    this.triggerEl =
      typeof this.trigger === "string"
        ? querySelectorAllDeep(
            this.triggerContainer || document.body,
            `#${this.trigger}`
          )[0]
        : this.trigger;

    if (!Boolean(this.triggerEl)) {
      return;
    }

    this.triggerEl.addEventListener("click", (event) => {
      this.toggle(event);
    });
  }

  private getNativeTriggerElement() {
    return this.triggerEl?.tagName.startsWith("SWIRL-")
      ? ((this.triggerEl?.children[0] ||
          this.triggerEl?.shadowRoot?.children[0] ||
          this.triggerEl) as HTMLElement)
      : this.triggerEl;
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && this.active) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      this.close();
    }
  };

  private updateTriggerAttributes() {
    if (!Boolean(this.triggerEl)) {
      return;
    }

    const nativeTriggerEl = this.getNativeTriggerElement();

    nativeTriggerEl.setAttribute("aria-controls", this.el.id);
    nativeTriggerEl.setAttribute("aria-expanded", String(this.active));
    nativeTriggerEl.setAttribute("aria-haspopup", "dialog");
  }

  private getFocusableChildren() {
    return querySelectorAllDeep(this.el, '[role="menuitem"], [role="listbox"]');
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

    if (!mobile || this.disableScrollLock || !Boolean(this.scrollContainer)) {
      return;
    }

    disableBodyScroll(this.scrollContainer);
  }

  private unlockBodyScroll() {
    const mobile = isMobileViewport();

    if (!mobile || this.disableScrollLock || !Boolean(this.scrollContainer)) {
      return;
    }

    enableBodyScroll(this.scrollContainer);
  }

  private onCloseButtonClick = () => {
    this.close();
  };

  render() {
    const mobile = !window.matchMedia("(min-width: 768px)").matches;

    const className = classnames(
      "popover",
      `popover--animation-${this.animation}`,
      `popover--placement-${this.position?.placement}`,
      {
        "popover--active": this.active,
        "popover--closing": this.closing,
        "popover--fullscreen-bottom-sheet": this.fullscreenBottomSheet,
        "popover--inactive": !this.active,
        "popover--transparent": this.transparent,
        "popover--padded": this.padded,
      }
    );

    return (
      <Host style={{ display: this.active ? "inline-flex" : "none" }}>
        <div class={className} onKeyDown={this.onKeydown}>
          <div
            aria-hidden={!this.active ? "true" : "false"}
            aria-label={this.label}
            class="popover__content"
            id={this.popoverId}
            part="popover__content"
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
              part="popover__scroll-container"
              ref={(el) => (this.scrollContainer = el)}
              style={{
                maxHeight:
                  !mobile && Boolean(this.maxHeight)
                    ? this.maxHeight
                    : undefined,
              }}
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
