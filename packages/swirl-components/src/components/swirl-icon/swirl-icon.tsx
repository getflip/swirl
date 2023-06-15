import { Component, h, Host, Prop } from "@stencil/core";
import { SwirlIconSize } from "./swirl-icon.types";

@Component({
  shadow: true,
  styleUrl: "swirl-icon.css",
  tag: "swirl-icon",
})
export class SwirlHeading {
  @Prop() glyph!: string;
  @Prop() size: SwirlIconSize = 24;

  render() {
    const Tag = `swirl-icon-${this.glyph}`;

    return (
      <Host>
        <Tag size={this.size}></Tag>
      </Host>
    );
  }
}
