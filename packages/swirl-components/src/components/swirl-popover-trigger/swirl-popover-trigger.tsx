import { Component, Element, h, Host, Prop, Watch } from "@stencil/core";
import { SwirlPopover } from "../swirl-popover/swirl-popover";

export type SwirlPopoverTriggerMethod = "click" | "hover" | "focus";

const swirlPopoverTriggerMethods: SwirlPopoverTriggerMethod[] = [
  "click",
  "hover",
  "focus",
];

/**
 * @slot slot - The trigger element (e.g. a button) that opens the popover.
 */
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
  @Prop() trigger?: SwirlPopoverTriggerMethod[] | string;
  /** @deprecated Please use the "trigger" prop instead, e.g. trigger="click". */
  @Prop() triggerOnClick?: boolean = true;
  /** @deprecated Please use the "trigger" prop instead, e.g. trigger="hover focus". */
  @Prop() triggerOnHover?: boolean = false;
  @Prop() hoverLingerDuration?: number;
  @Prop() hoverDelay?: number;

  private componentLoaded = false;
  private intersectionObserver: IntersectionObserver;
  private hoverLingerReference?: NodeJS.Timeout;
  private hoverDelayReference?: NodeJS.Timeout;
  private popoverElRef?: HTMLSwirlPopoverElement;
  private triggerIsActive: boolean = false;
  private triggerMethods: SwirlPopoverTriggerMethod[] = [];

  connectedCallback() {
    if (this.componentLoaded) {
      this.setupHoverListeners();
      this.setupIntersectionObserver();
    }
  }

  componentWillLoad() {
    this.warnAboutDeprecatedProps();
    this.resolveTriggerMethods();
  }

  componentDidLoad() {
    this.updateTriggerElAriaAttributes();
    this.setupHoverListeners();
    this.setupIntersectionObserver();
    this.componentLoaded = true;
  }

  disconnectedCallback() {
    this.intersectionObserver?.disconnect();

    this.removeHoverListeners();
    this.removeAriaSyncListeners();

    clearTimeout(this.hoverDelayReference);
    clearTimeout(this.hoverLingerReference);
  }

  @Watch("swirlPopover")
  watchPopover() {
    this.updateTriggerElAriaAttributes();
  }

  @Watch("trigger")
  @Watch("triggerOnClick")
  @Watch("triggerOnHover")
  watchTrigger() {
    this.resolveTriggerMethods();

    if (this.componentLoaded) {
      this.updateTriggerElAriaAttributes();
    }

    clearTimeout(this.hoverDelayReference);
    clearTimeout(this.hoverLingerReference);
  }

  private warnAboutDeprecatedProps() {
    if (this.triggerOnHover === true) {
      console.warn(
        '[Swirl] The "triggerOnHover" prop of swirl-popover-trigger is deprecated and will be removed with the next major release. Please use the "trigger" prop instead, e.g. trigger="hover focus".'
      );
    }

    if (this.triggerOnClick === false) {
      console.warn(
        '[Swirl] The "triggerOnClick" prop of swirl-popover-trigger is deprecated and will be removed with the next major release. Please use the "trigger" prop instead, e.g. trigger="hover focus".'
      );
    }

    if (
      Boolean(this.trigger) &&
      (this.triggerOnHover === true || this.triggerOnClick === false)
    ) {
      console.warn(
        '[Swirl] swirl-popover-trigger: the "trigger" prop takes precedence over "triggerOnClick"/"triggerOnHover", which are ignored.'
      );
    }
  }

  private resolveTriggerMethods() {
    if (Boolean(this.trigger)) {
      const rawValues = Array.isArray(this.trigger)
        ? this.trigger
        : String(this.trigger).split(/[\s,]+/);

      const normalized = rawValues
        .map((value) => String(value).trim().toLowerCase())
        .filter((value) => value.length > 0);

      const unsupported = normalized.filter(
        (value) =>
          !swirlPopoverTriggerMethods.includes(
            value as SwirlPopoverTriggerMethod
          )
      );

      if (unsupported.length > 0) {
        console.warn(
          `[Swirl] Unsupported "trigger" value(s) for swirl-popover-trigger: ${unsupported.join(
            ", "
          )}. Supported values: ${swirlPopoverTriggerMethods.join(", ")}.`
        );
      }

      this.triggerMethods = normalized.filter((value): value is SwirlPopoverTriggerMethod =>
        swirlPopoverTriggerMethods.includes(value as SwirlPopoverTriggerMethod)
      );

      return;
    }

    const methods: SwirlPopoverTriggerMethod[] = [];

    if (this.triggerOnClick) {
      methods.push("click");
    }

    if (this.triggerOnHover) {
      methods.push("hover", "focus");
    }

    this.triggerMethods = methods;
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

  private setupIntersectionObserver() {
    this.intersectionObserver?.disconnect();

    if (this.hidePopoverWhenInvisible) {
      this.intersectionObserver = new IntersectionObserver(
        this.onVisibilityChange.bind(this),
        {
          root: this.parentScrollContainer,
          threshold: 0,
        }
      );

      const firstChild = this.el.querySelector("*");

      if (!Boolean(firstChild)) {
        return;
      }

      this.intersectionObserver.observe(firstChild);
    }
  }

  private onVisibilityChange(entries: IntersectionObserverEntry[]) {
    const triggerIsVisible = entries[0].isIntersecting;

    if (!triggerIsVisible && this.isPopoverOpen()) {
      this.getPopoverEl()?.close();
    }
  }

  private setupHoverListeners() {
    this.popoverElRef = this.getPopoverEl();

    if (Boolean(this.popoverElRef)) {
      this.popoverElRef.addEventListener("mouseenter", this.popoverMouseEnter);
      this.popoverElRef.addEventListener("mouseleave", this.popoverMouseLeave);
    }
  }

  private removeHoverListeners() {
    if (Boolean(this.popoverElRef)) {
      this.popoverElRef.removeEventListener(
        "mouseenter",
        this.popoverMouseEnter
      );
      this.popoverElRef.removeEventListener(
        "mouseleave",
        this.popoverMouseLeave
      );
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
    if (!this.triggerMethods.includes("hover")) return;
    this.stopHoverLingerTimer();

    this.triggerIsActive = true;

    this.hoverDelayReference = setTimeout(() => {
      this.hoverDelayReference = undefined;
      if (this.triggerMethods.includes("hover")) {
        this.openPopover("hover", true);
      }
    }, this.hoverDelay);
  };

  private onMouseleave = () => {
    clearTimeout(this.hoverDelayReference);
    this.mouseleaveHandler();
  };

  private mouseleaveHandler = () => {
    if (!this.triggerMethods.includes("hover")) return;
    this.startHoverLingerTimer();
  };

  private startHoverLingerTimer() {
    clearTimeout(this.hoverLingerReference);
    this.hoverLingerReference = setTimeout(() => {
      if (
        this.triggerIsActive &&
        this.isPopoverOpen() &&
        !this.focusStaysWithin(this.getActiveElement())
      ) {
        this.closePopover(true);
      }
      this.triggerIsActive = false;
    }, this.hoverLingerDuration);
  }

  private stopHoverLingerTimer() {
    clearTimeout(this.hoverLingerReference);
  }

  private onClick = () => {
    if (!this.triggerMethods.includes("click")) return;

    const popoverEl = this.getPopoverEl();
    const triggerEl = this.getTriggerEl();

    if (!Boolean(popoverEl)) {
      return;
    }

    this.syncAriaOnNextTransition(popoverEl);
    popoverEl.toggle(triggerEl, "click");
  };

  private onFocusin = () => {
    if (!this.triggerMethods.includes("focus")) return;

    // Dead-click guard: with "click" active and "hover" not, focusin would
    // open the popover and the click that follows would immediately toggle
    // it shut again, making the click appear to do nothing.
    if (
      this.triggerMethods.includes("click") &&
      !this.triggerMethods.includes("hover")
    ) {
      return;
    }

    this.openPopover("focus", true);
  };

  private onFocusout = (event: FocusEvent) => {
    if (!this.triggerMethods.includes("focus")) return;

    if (this.focusStaysWithin(event.relatedTarget as Node | null)) {
      return;
    }

    this.closePopover(true);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code !== "Escape") return;
    if (!this.isPopoverOpen()) return;

    event.stopPropagation();
    this.closePopover(true);
  };

  private focusStaysWithin(node: Node | null) {
    if (!Boolean(node)) {
      return false;
    }

    const popoverEl = this.getPopoverEl();

    return (
      this.el.contains(node) ||
      popoverEl === (node as unknown as HTMLElement) ||
      Boolean(popoverEl?.contains(node))
    );
  }

  private getActiveElement(): Node | null {
    return document.activeElement;
  }

  private ariaOpenHandler = () => {
    this.updateTriggerElAriaAttributes(true);
  };

  private ariaCloseHandler = () => {
    this.updateTriggerElAriaAttributes(false);
  };

  private removeAriaSyncListeners() {
    const popoverEl = this.getPopoverEl();

    popoverEl?.removeEventListener("popoverOpen", this.ariaOpenHandler);
    popoverEl?.removeEventListener("popoverClose", this.ariaCloseHandler);
  }

  private syncAriaOnNextTransition(popoverEl: HTMLSwirlPopoverElement) {
    this.removeAriaSyncListeners();
    popoverEl.addEventListener("popoverOpen", this.ariaOpenHandler, {
      once: true,
    });
    popoverEl.addEventListener("popoverClose", this.ariaCloseHandler, {
      once: true,
    });
  }

  private openPopover(
    via: SwirlPopoverTriggerMethod,
    disableFocus?: boolean
  ) {
    const popoverEl = this.getPopoverEl();
    const triggerEl = this.getTriggerEl();

    if (!Boolean(popoverEl)) {
      return;
    }

    this.syncAriaOnNextTransition(popoverEl);
    popoverEl.open(triggerEl, disableFocus, via);
  }

  private closePopover(disableFocus?: boolean) {
    const popoverEl = this.getPopoverEl();

    if (!Boolean(popoverEl)) {
      return;
    }

    this.syncAriaOnNextTransition(popoverEl);
    popoverEl.close(disableFocus);
  }

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
      if (!this.opensWithoutActivation) {
        triggerEl.setAttribute("swirl-aria-controls", popoverId);
        triggerEl.setAttribute("swirl-aria-expanded", String(open || "false"));
      } else {
        triggerEl.removeAttribute("swirl-aria-controls");
        triggerEl.removeAttribute("swirl-aria-expanded");
      }

      triggerEl.setAttribute("swirl-aria-haspopup", "dialog");
    } else {
      if (!this.opensWithoutActivation) {
        triggerEl.setAttribute("aria-controls", popoverId);
        triggerEl.setAttribute("aria-expanded", String(open || "false"));
      } else {
        triggerEl.removeAttribute("aria-controls");
        triggerEl.removeAttribute("aria-expanded");
      }

      triggerEl.setAttribute("aria-haspopup", "dialog");
    }
  };

  private get opensWithoutActivation() {
    return (
      this.triggerMethods.includes("hover") ||
      this.triggerMethods.includes("focus")
    );
  }

  private isPopoverOpen() {
    const popover = this.getPopoverEl();

    const isActive = (
      popover?.shadowRoot?.firstElementChild as HTMLElement
    )?.classList.contains("popover--active");

    const isClosing = (
      popover?.shadowRoot?.firstElementChild as HTMLElement
    )?.classList.contains("popover--closing");

    return Boolean(isActive) && !isClosing;
  }

  render() {
    return (
      <Host
        onClick={this.onClick}
        onFocusin={this.onFocusin}
        onFocusout={this.onFocusout}
        onKeyDown={this.onKeyDown}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
      >
        <slot></slot>
      </Host>
    );
  }
}
