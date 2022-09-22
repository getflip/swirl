import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipThumbnailFormat = "portrait" | "landscape" | "square";

export type FlipThumbnailSize = "s" | "m" | "l";

@Component({
  shadow: true,
  styleUrl: "flip-thumbnail.css",
  tag: "flip-thumbnail",
})
export class FlipThumbnail {
  @Prop() alt!: string;
  @Prop() format?: FlipThumbnailFormat = "landscape";
  @Prop() size: FlipThumbnailSize = "m";
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
