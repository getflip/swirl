import { Component, Element, h, Host, Prop, Watch } from "@stencil/core";

@Component({
  shadow: false,
  scoped: true,
  styleUrl: "swirl-popover-trigger.css",
  tag: "swirl-popover-trigger",
})
export class SwirlPopoverTrigger {
  @Element() el!: HTMLSwirlPopoverTriggerElement;

  @Prop() popover!: string | HTMLSwirlPopoverElement;
  @Prop() setAriaAttributes?: boolean = true;

  private popoverOpen: boolean = false;

  componentDidLoad() {
    this.updateTriggerElAriaAttributes();
  }

  @Watch("popover")
  watchPopover() {
    this.updateTriggerElAriaAttributes();
  }

  private getPopoverEl() {
    return typeof this.popover === "string"
      ? document.querySelector<HTMLSwirlPopoverElement>(`#${this.popover}`)
      : this.popover;
  }

  private getTriggerEl() {
    if (this.el.children.length !== 1) {
      console.warn(
        '[Swirl] The "swirl-popover-trigger" component expects exactly one child element.'
      );
    }

    return this.el.children[0] as HTMLElement;
  }

  private onClick = () => {
    const popoverEl = this.getPopoverEl();

    if (!Boolean(popoverEl)) {
      return;
    }

    if (this.popoverOpen) {
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
        this.popoverOpen = true;
        this.updateTriggerElAriaAttributes(true);
      },
      { once: true }
    );

    popoverEl.addEventListener(
      "popoverClose",
      () => {
        this.popoverOpen = false;
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

    const popoverId =
      typeof this.popover === "string" ? this.popover : this.popover?.id;

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

  render() {
    return (
      <Host onClick={this.onClick}>
        <slot></slot>
      </Host>
    );
  }
}
