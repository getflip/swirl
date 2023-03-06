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
  @Prop() imageUrl?: string;
  @Prop() header?: string;
  @Prop() subHeader?: string;
  @Prop() highlightActive?: boolean;

  render() {
    const Tag = Boolean(this.href) ? "a" : this.as;

    const className = classnames("card", {
      "card--elevated": this.elevated,
      "card--interactive": this.interactive || this.href,
    });

    const cardImageClassName = classnames("card-image", {
      "card-image--small": this.imageUrl,
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
          {this.imageUrl && (
            <img class={cardImageClassName} alt="" src={this.imageUrl} />
          )}
          <section class="content-section">
            {this.subHeader && (
              <header class="subheader">{this.subHeader}</header>
            )}
            {this.header && <header class="header">{this.header}</header>}
          </section>
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
