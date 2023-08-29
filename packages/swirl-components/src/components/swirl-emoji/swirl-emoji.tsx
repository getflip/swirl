import { Component, h, Host, Prop } from "@stencil/core";
import { SwirlEmojiSize } from "./swirl-emoji.types";

@Component({
  shadow: true,
  styleUrl: "swirl-emoji.css",
  tag: "swirl-emoji",
})
export class SwirlEmoji {
  @Prop() label?: string = "";
  @Prop() name!: string;
  @Prop() size: SwirlEmojiSize = 24;

  render() {
    const Tag = `swirl-emoji-${this.name}`;

    return (
      <Host>
        <Tag label={this.label} size={this.size}></Tag>
      </Host>
    );
  }
}
