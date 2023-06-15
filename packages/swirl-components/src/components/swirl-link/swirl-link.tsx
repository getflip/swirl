import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlLinkColor = "default" | "subdued";

export type SwirlLinkTarget = "_self" | "_blank" | "_parent" | "_top";

@Component({
  shadow: true,
  styleUrl: "swirl-link.css",
  tag: "swirl-link",
})
export class SwirlLink {
  @Prop() color?: SwirlLinkColor = "default";
  @Prop() href!: string;
  @Prop() label!: string;
  @Prop() target?: SwirlLinkTarget;

  render() {
    const className = classnames("link", `link--color-${this.color}`);

    return (
      <Host>
        <a class={className} href={this.href} part="link" target={this.target}>
          {this.label}
        </a>
      </Host>
    );
  }
}
