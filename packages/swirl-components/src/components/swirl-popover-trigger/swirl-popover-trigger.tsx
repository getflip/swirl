import { Component, Element, h, Host, Prop, Watch } from "@stencil/core";
import { SwirlPopover } from "../swirl-popover/swirl-popover";

@Component({
  shadow: false,
  scoped: true,
  styleUrl: "swirl-popover-trigger.css",
  tag: "swirl-popover-trigger",
})
export class SwirlPopoverTrigger {
  @Element() el!: HTMLSwirlPopoverTriggerElement;

  @Prop() hidePopoverWhenInvisible?: boolean = true;
  @Prop() parentScrollContainer?: HTMLElement;
  @Prop() setAriaAttributes?: boolean = true;
  @Prop() swirlPopover!: string | HTMLSwirlPopoverElement | SwirlPopover;
  @Prop() triggerOnClick?: boolean = true;
  @Prop() triggerOnHover?: boolean = false;
  @Prop() hoverLingerDuration?: number;
  @Prop() hoverDelay?: number;

  private intersectionObserver: IntersectionObserver;
  private hoverLingerReference?: NodeJS.Timeout;
  private hoverDelayReference?: NodeJS.Timeout;
  private triggerIsActive: boolean = false;

  componentDidLoad() {
    this.updateTriggerElAriaAttributes();
    this.setupHoverListeners();

    if (this.hidePopoverWhenInvisible) {
      this.intersectionObserver = new IntersectionObserver(
        this.onVisibilityChange.bind(this),
        {
          root: this.parentScrollContainer,
          threshold: 1,
        }
      );

      const firstChild = this.el.querySelector("*");

      if (!Boolean(firstChild)) {
        return;
      }

      this.intersectionObserver.observe(firstChild);
    }
  }

  disconnectedCallback() {
    this.intersectionObserver?.disconnect();
    const popoverEl = this.getPopoverEl();

    if (Boolean(popoverEl)) {
      popoverEl.removeEventListener("mouseenter", this.popoverMouseEnter);
      popoverEl.removeEventListener("mouseleave", this.popoverMouseLeave);
    }
  }

  @Watch("swirlPopover")
  watchPopover() {
    this.updateTriggerElAriaAttributes();
  }

  @Watch("triggerOnHover")
  watchHover() {
    clearTimeout(this.hoverDelayReference);
    clearTimeout(this.hoverLingerReference);
  }

  private getPopoverEl(): HTMLSwirlPopoverElement | undefined {
    return typeof this.swirlPopover === "string"
      ? document.querySelector<HTMLSwirlPopoverElement>(`#${this.swirlPopover}`)
      : (this.swirlPopover as SwirlPopover)?.el ??
          (this.swirlPopover as HTMLSwirlPopoverElement);
  }

  private getTriggerEl() {
    if (this.el.children.length !== 1) {
      console.warn(
        '[Swirl] The "swirl-popover-trigger" component expects exactly one child element.'
      );
    }

    return this.el.children[0] as HTMLElement;
  }

  private onVisibilityChange(entries: IntersectionObserverEntry[]) {
    const triggerIsVisible = entries[0].isIntersecting;

    if (!triggerIsVisible && this.isPopoverOpen()) {
      this.getPopoverEl()?.close();
    }
  }

  private setupHoverListeners() {
    const popoverEl = this.getPopoverEl();

    if (Boolean(popoverEl)) {
      popoverEl.addEventListener("mouseenter", this.popoverMouseEnter);
      popoverEl.addEventListener("mouseleave", this.popoverMouseLeave);
    }
  }

  popoverMouseEnter = () => {
    this.stopHoverLingerTimer();
  };

  popoverMouseLeave = () => {
    if (this.triggerIsActive) {
      this.mouseleaveHandler();
    }
  };

  private onMouseenter = () => {
    if (!this.triggerOnHover) return;
    this.stopHoverLingerTimer();

    this.triggerIsActive = true;

    this.hoverDelayReference = setTimeout(() => {
      this.hoverDelayReference = undefined;
      if (this.triggerOnHover) {
        this.mouseenterHandler();
      }
    }, this.hoverDelay);
  };

  private mouseenterHandler = () => {
    const popoverEl = this.getPopoverEl();
    const triggerEl = this.getTriggerEl();

    popoverEl.open(triggerEl, true);

    popoverEl.addEventListener(
      "popoverOpen",
      () => {
        this.updateTriggerElAriaAttributes(true);
      },
      { once: true }
    );

    popoverEl.addEventListener(
      "popoverClose",
      () => {
        this.updateTriggerElAriaAttributes(false);
      },
      { once: true }
    );
  };

  private onMouseleave = () => {
    clearTimeout(this.hoverDelayReference);
    this.mouseleaveHandler();
  };

  private mouseleaveHandler = () => {
    if (!this.triggerOnHover) return;
    this.startHoverLingerTimer();
  };

  private startHoverLingerTimer() {
    clearTimeout(this.hoverLingerReference);
    this.hoverLingerReference = setTimeout(() => {
      if (this.triggerIsActive && this.isPopoverOpen()) {
        this.getPopoverEl().close(true);
      }
      this.triggerIsActive = false;
    }, this.hoverLingerDuration);
  }

  private stopHoverLingerTimer() {
    clearTimeout(this.hoverLingerReference);
  }

  private onClick = () => {
    if (!this.triggerOnClick) return;

    const popoverEl = this.getPopoverEl();
    const triggerEl = this.getTriggerEl();

    popoverEl.toggle(triggerEl);

    popoverEl.addEventListener(
      "popoverOpen",
      () => {
        this.updateTriggerElAriaAttributes(true);
      },
      { once: true }
    );

    popoverEl.addEventListener(
      "popoverClose",
      () => {
        this.updateTriggerElAriaAttributes(false);
      },
      { once: true }
    );
  };

  private updateTriggerElAriaAttributes = (open?: boolean) => {
    if (!this.setAriaAttributes) {
      return;
    }

    const triggerEl = this.getTriggerEl();

    if (!Boolean(triggerEl)) {
      return;
    }

    const popoverId = this.getPopoverEl()?.id;

    if (triggerEl.tagName.startsWith("SWIRL-")) {
      triggerEl.setAttribute("swirl-aria-controls", popoverId);
      triggerEl.setAttribute("swirl-aria-expanded", String(open || "false"));
      triggerEl.setAttribute("swirl-aria-haspopup", "dialog");
    } else {
      triggerEl.setAttribute("aria-controls", popoverId);
      triggerEl.setAttribute("aria-expanded", String(open || "false"));
      triggerEl.setAttribute("aria-haspopup", "dialog");
    }
  };

  private isPopoverOpen() {
    const popover = this.getPopoverEl();

    const isActive = (
      popover?.shadowRoot.firstChild as HTMLElement
    )?.classList.contains("popover--active");

    return isActive;
  }

  render() {
    return (
      <Host
        onClick={this.onClick}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
      >
        <slot></slot>
      </Host>
    );
  }
}
