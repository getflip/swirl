import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";
import { SwirlIconSize } from "../swirl-icon/swirl-icon.types";

export type SwirlInlineStatusIntent =
  | "critical"
  | "info"
  | "success"
  | "warning";

export type SwirlInlineStatusSize = "s" | "m";

@Component({
  shadow: true,
  styleUrl: "swirl-inline-status.css",
  tag: "swirl-inline-status",
})
export class SwirlInlineStatus {
  @Prop() icon?: string;
  @Prop() intent!: SwirlInlineStatusIntent;
  @Prop() message!: string;
  @Prop() size?: SwirlInlineStatusSize = "m";

  @State() iconSize: SwirlIconSize = 20;

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

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    if (!Boolean(icon)) {
      return;
    }

    let iconSize = "24";

    if (this.size === "s") {
      iconSize = "16";
    } else if (smallIcon) {
      iconSize = "20";
    }

    icon.setAttribute("size", iconSize);
  }

  render() {
    const className = classnames(
      "inline-status",
      `inline-status--intent-${this.intent}`,
      `inline-status--size-${this.size}`
    );

    return (
      <Host>
        <span class={className} part="inline-status">
          {this.icon && (
            <span
              class="inline-status__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          <span class="inline-status__message">{this.message}</span>
        </span>
      </Host>
    );
  }
}
