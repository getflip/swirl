import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-illustration.css",
  tag: "swirl-illustration",
})
export class SwirlHeading {
  @Prop() svg!: string;

  render() {
    const Tag = `swirl-illustration-${this.svg}`;

    return (
      <Host>
        <Tag></Tag>
      </Host>
    );
  }
}
