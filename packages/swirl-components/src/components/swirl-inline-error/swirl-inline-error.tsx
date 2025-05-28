import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { DesktopMediaQuery } from "../../services/media-query.service";

export type SwirlInlineErrorSize = "s" | "m";

@Component({
  shadow: true,
  styleUrl: "swirl-inline-error.css",
  tag: "swirl-inline-error",
})
export class SwirlInlineError {
  @Prop() message!: string;
  @Prop() size?: SwirlInlineErrorSize = "m";

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
    let iconSize = "24";

    if (this.size === "s") {
      iconSize = "16";
    } else if (smallIcon) {
      iconSize = "20";
    }

    icon?.setAttribute("size", iconSize);
  }

  render() {
    const className = classnames(
      "inline-error",
      `inline-error--size-${this.size}`
    );

    return (
      <Host>
        <span class={className} part="inline-error">
          <span class="inline-error__icon" ref={(el) => (this.iconEl = el)}>
            <swirl-icon-error></swirl-icon-error>
          </span>
          <span class="inline-error__message">{this.message}</span>
        </span>
      </Host>
    );
  }
}
