import { Component, h, Host, Prop } from "@stencil/core";
import { SwirlSymbolSize } from "./swirl-symbol.types";

@Component({
  shadow: true,
  styleUrl: "swirl-symbol.css",
  tag: "swirl-symbol",
})
export class SwirlHeading {
  @Prop() glyph!: string;
  @Prop() size: SwirlSymbolSize = 24;

  render() {
    const Tag = `swirl-symbol-${this.glyph}`;

    return (
      <Host>
        <Tag size={this.size}></Tag>
      </Host>
    );
  }
}
