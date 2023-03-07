import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot slot - The card contents
 */
@Component({
  shadow: true,
  styleUrl: "swirl-card.css",
  tag: "swirl-card",
})
export class SwirlCard {
  @Prop() as?: string = "div";
  @Prop() elevated?: boolean;
  @Prop() interactive?: boolean;
  @Prop() href?: string;
  @Prop() linkTarget?: string;
  @Prop() highlightActive?: boolean;

  render() {
    const Tag = Boolean(this.href) ? "a" : this.as;

    const className = classnames("card", {
      "card--elevated": this.elevated,
      "card--interactive": this.interactive || this.href,
    });

    /**
     * Idea:
     * - media section above
     * - content section below
     * - use flex gap
     * - swirl stack
     * ::slotted(*:img)
     */

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
          <div class="media-section">
            <slot name="image"></slot>
            <slot name="heading"></slot>
          </div>
          <div>
            <slot name="content"></slot>
          </div>
        </Tag>
      </Host>
    );
  }
}
