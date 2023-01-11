import { Component, h, Host, Prop } from "@stencil/core";

export type SwirlLinkTarget = "_self" | "_blank" | "_parent" | "_top";

@Component({
  shadow: true,
  styleUrl: "swirl-link.css",
  tag: "swirl-link",
})
export class SwirlLink {
  @Prop() href!: string;
  @Prop() label!: string;
  @Prop() target?: SwirlLinkTarget;

  render() {
    return (
      <Host>
        <a class="link" href={this.href} target={this.target}>
          {this.label}
        </a>
      </Host>
    );
  }
}
