import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot slot - The card contents
 */
@Component({
  shadow: true,
  styleUrl: "flip-card.css",
  tag: "flip-card",
})
export class FlipCard {
  @Prop() as?: string = "div";
  @Prop() elevated?: boolean;
  @Prop() interactive?: boolean;
  @Prop() href?: string;
  @Prop() linkTarget?: string;

  render() {
    const Tag = Boolean(this.href) ? "a" : this.as;

    const className = classnames("card", {
      "card--elevated": this.elevated,
      "card--interactive": this.interactive || this.href,
    });

    return (
      <Host>
        <Tag
          class={className}
          href={this.href}
          rel={
            Boolean(this.href) && this.linkTarget === "_blank"
              ? "noreferrer"
              : undefined
          }
          target={this.linkTarget}
        >
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
