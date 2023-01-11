import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipInlineErrorSize = "s" | "m";

@Component({
  shadow: true,
  styleUrl: "swirl-inline-error.css",
  tag: "flip-inline-error",
})
export class FlipInlineError {
  @Prop() message!: string;
  @Prop() size?: FlipInlineErrorSize = "m";

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
            <flip-icon-error size={iconSize}></flip-icon-error>
          </span>
          <span class="inline-error__message">{this.message}</span>
        </span>
      </Host>
    );
  }
}
