import { Component, h, Host, Prop } from "@stencil/core";

export type FlipLinkTarget = "_self" | "_blank" | "_parent" | "_top";

@Component({
  shadow: true,
  styleUrl: "swirl-link.css",
  tag: "flip-link",
})
export class FlipLink {
  @Prop() href!: string;
  @Prop() label!: string;
  @Prop() target?: FlipLinkTarget;

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
