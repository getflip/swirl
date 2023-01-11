import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

export type FlipInlineErrorSize = "s" | "m";

@Component({
  shadow: true,
  styleUrl: "flip-inline-error.css",
  tag: "flip-inline-error",
})
export class FlipInlineError {
  @Prop() message!: string;
  @Prop() size?: FlipInlineErrorSize = "m";

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
            <flip-icon-error></flip-icon-error>
          </span>
          <span class="inline-error__message">{this.message}</span>
        </span>
      </Host>
    );
  }
}
