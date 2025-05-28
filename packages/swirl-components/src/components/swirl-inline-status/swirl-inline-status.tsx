import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";
import { DesktopMediaQuery } from "../../services/media-query.service";
import { SwirlIconSize } from "../swirl-icon/swirl-icon.types";

export type SwirlInlineStatusIntent =
  | "critical"
  | "info"
  | "neutral"
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

  private iconEl: HTMLElement;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentDidLoad() {
    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.forceIconProps(isDesktop);
    });
  }

  disconnectedCallback() {
    this.mediaQueryUnsubscribe();
  }

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
