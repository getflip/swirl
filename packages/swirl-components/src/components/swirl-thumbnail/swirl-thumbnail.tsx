import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlThumbnailFormat = "portrait" | "landscape" | "square";

export type SwirlThumbnailSize = "s" | "m" | "l";

@Component({
  shadow: true,
  styleUrl: "swirl-thumbnail.css",
  tag: "swirl-thumbnail",
})
export class SwirlThumbnail {
  @Prop() alt!: string;
  @Prop() format?: SwirlThumbnailFormat = "landscape";
  @Prop() size: SwirlThumbnailSize = "m";
  @Prop() src!: string;

  render() {
    const className = classnames(
      "thumbnail",
      `thumbnail--format-${this.format}`,
      `thumbnail--size-${this.size}`
    );

    return (
      <Host>
        <span class={className}>
          <img
            alt={this.alt}
            class="thumbnail__image"
            loading="lazy"
            src={this.src}
          />
        </span>
      </Host>
    );
  }
}
