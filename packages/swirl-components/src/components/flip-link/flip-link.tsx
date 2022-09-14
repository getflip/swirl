import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-link.css",
  tag: "flip-link",
})
export class FlipLink {
  @Prop() href!: string;
  @Prop() label!: string;

  render() {
    return (
      <Host>
        <a class="link" href={this.href}>
          {this.label}
        </a>
      </Host>
    );
  }
}
