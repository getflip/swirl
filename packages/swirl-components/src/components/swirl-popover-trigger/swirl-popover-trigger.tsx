import { Component, Element, h, Host, Prop, State, Watch } from "@stencil/core";

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
  @Prop() triggerOnHover?: boolean = false;

  @State() mouseX = 0;
  @State() mouseY = 0;

  @State() svgWidth = 0;
  @State() svgHeight = 0;

  @State() popoverWidth = 0;
  @State() popoverHeight = 0;

  @State() popoverX = 0;
  @State() popoverY = 0;

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

      if (this.triggerOnHover) {
        window.addEventListener("mousemove", this.onMousemove);
      }

      this.intersectionObserver.observe(firstChild);
    }
  }

  disconnectedCallback() {
    window.removeEventListener("mousemove", this.onMousemove);
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

  private onMouseenter = () => {
    if (!this.triggerOnHover) return;

    const popoverEl = this.getPopoverEl();
    const triggerEl = this.getTriggerEl();
    console.log("mouseenter");

    popoverEl.open(triggerEl, true);
    this.popoverWidth = popoverEl.clientWidth;
    this.popoverWidth = popoverEl.clientHeight;
    const popoverContent =
      popoverEl.shadowRoot.querySelector(".popover__content");

    popoverEl.addEventListener(
      "popoverOpen",
      () => {
        this.popoverHeight = popoverContent.clientHeight;
        this.popoverWidth = popoverContent.clientWidth;

        this.svgWidth = this.popoverWidth;

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

  private onMousemove = (event: MouseEvent) => {
    const popoverEl = this.getPopoverEl();
    const popoverContent =
      popoverEl.shadowRoot.querySelector(".popover__content");
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.svgHeight =
      popoverContent.getBoundingClientRect().y - (this.mouseY + 4);
  };

  private onMouseleave = () => {
    if (!this.triggerOnHover) return;

    const popoverEl = this.getPopoverEl();

    popoverEl.close(true);
    window.removeEventListener("mousemove", this.onMousemove);
  };

  private onClick = () => {
    const popoverEl = this.getPopoverEl();
    const triggerEl = this.getTriggerEl();

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
      <Host
        onClick={this.onClick}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
      >
        <slot></slot>

        <svg
          style={{
            position: "fixed",
            width: this.svgWidth.toString(),
            height: this.svgHeight.toString(),
            pointerEvents: "none",
            zIndex: "2",
            top: (this.mouseY - 2).toString(),
            left: this.popoverX.toString(),
          }}
          id="svg-safe-area"
        >
          <path
            pointer-3vents="auto"
            stroke="red"
            stroke-width="0.4"
            fill="rgba(114,140,89,0.3)"
            // prettier-ignore
            d={`M${this.mouseX - this.popoverY}, 0
                L ${this.svgWidth}, ${this.svgHeight}
                L ${this.popoverX}, ${this.svgHeight} z`}
          ></path>
        </svg>
      </Host>
    );
  }
}
