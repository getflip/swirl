import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlInlineErrorSize = "s" | "m";

@Component({
  shadow: true,
  styleUrl: "swirl-inline-error.css",
  tag: "swirl-inline-error",
})
export class SwirlInlineError {
  @Prop() message!: string;
  @Prop() size?: SwirlInlineErrorSize = "m";

  render() {
    const iconSize = this.size === "m" ? 24 : 16;

    const className = classnames(
      "inline-error",
      `inline-error--size-${this.size}`
    );

    return (
      <Host>
        <span class={className}>
          <span class="inline-error__icon">
            <swirl-icon-error size={iconSize}></swirl-icon-error>
          </span>
          <span class="inline-error__message">{this.message}</span>
        </span>
      </Host>
    );
  }
}
