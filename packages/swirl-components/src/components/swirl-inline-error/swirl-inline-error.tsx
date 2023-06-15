import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

export type SwirlInlineErrorSize = "s" | "m";

@Component({
  shadow: true,
  styleUrl: "swirl-inline-error.css",
  tag: "swirl-inline-error",
})
export class SwirlInlineError {
  @Prop() message!: string;
  @Prop() size?: SwirlInlineErrorSize = "m";

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
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
