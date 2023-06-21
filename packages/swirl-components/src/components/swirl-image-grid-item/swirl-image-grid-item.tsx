import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "swirl-image-grid-item.css",
  tag: "swirl-image-grid-item",
})
export class SwirlImageGridItem {
  @Prop() alt!: string;
  @Prop() interactive?: boolean;
  @Prop() overlay?: string;
  @Prop() src!: string;

  render() {
    const Tag = this.interactive ? "button" : "div";

    const className = classnames("image-grid-item", {
      "image-grid-item--has-overlay": this.overlay,
    });

    return (
      <Host role="listitem">
        <Tag class={className} type={this.interactive ? "button" : undefined}>
          <div
            class="image-grid-item__background"
            style={{ backgroundImage: `url(${this.src})` }}
          ></div>
          <img alt={this.alt} class="image-grid-item__image" src={this.src} />
          {this.overlay && (
            <div class="image-grid-item__overlay">{this.overlay}</div>
          )}
        </Tag>
      </Host>
    );
  }
}
