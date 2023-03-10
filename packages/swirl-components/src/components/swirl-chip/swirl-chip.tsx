import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

export type SwirlChipIntent = "default" | "critical" | "success";

/**
 * @slot avatar - Optional avatar displayed inside the chip. Should have size "xs".
 */
@Component({
  shadow: true,
  styleUrl: "swirl-chip.css",
  tag: "swirl-chip",
})
export class SwirlChip {
  @Element() el: HTMLElement;

  @Prop() icon?: string;
  @Prop() intent?: SwirlChipIntent = "default";
  @Prop() interactive?: boolean = false;
  @Prop() label!: string;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  render() {
    const Tag = this.interactive ? "button" : "span";

    const showAvatar = Boolean(this.el.querySelector('[slot="avatar"]'));
    const showIcon = !showAvatar && Boolean(this.icon);

    const className = classnames("chip", `chip--intent-${this.intent}`, {
      "chip--interactive": this.interactive,
    });

    return (
      <Host>
        <Tag class={className} type={this.interactive ? "button" : undefined}>
          {showAvatar && (
            <span class="chip__avatar">
              <slot name="avatar"></slot>
            </span>
          )}
          {showIcon && (
            <span
              class="chip__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          <span class="chip__label">{this.label}</span>
        </Tag>
      </Host>
    );
  }
}
