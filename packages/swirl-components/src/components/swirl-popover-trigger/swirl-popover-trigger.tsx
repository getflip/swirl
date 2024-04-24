import { Component, Element, h, Host, Prop, Watch } from "@stencil/core";

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
  @Prop() swirlPopover!: string | HTMLSwirlPopoverElement;

  private intersectionObserver: IntersectionObserver;

  componentDidLoad() {
    this.updateTriggerElAriaAttributes();

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
  }

  @Watch("swirlPopover")
  watchPopover() {
    this.updateTriggerElAriaAttributes();
  }

  private getPopoverEl() {
    return typeof this.swirlPopover === "string"
      ? document.querySelector<HTMLSwirlPopoverElement>(`#${this.swirlPopover}`)
      : this.swirlPopover;
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

  private onClick = () => {
    const popoverEl = this.getPopoverEl();

    if (!Boolean(popoverEl)) {
      return;
    }

    if (this.isPopoverOpen()) {
      popoverEl.close();
      return;
    }

    const triggerEl = this.getTriggerEl();

    if (!Boolean(triggerEl)) {
      return;
    }

    popoverEl.open(triggerEl);

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

    const popoverId =
      typeof this.swirlPopover === "string"
        ? this.swirlPopover
        : this.swirlPopover?.id;

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
      <Host onClick={this.onClick}>
        <slot></slot>
      </Host>
    );
  }
}
