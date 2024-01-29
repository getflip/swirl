import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";

export type SwirlImageGridItemLoading = "lazy" | "auto" | "eager";

@Component({
  shadow: true,
  styleUrl: "swirl-image-grid-item.css",
  tag: "swirl-image-grid-item",
})
export class SwirlImageGridItem {
  @Prop() alt!: string;
  @Prop() icon?: string;
  @Prop() interactive?: boolean;
  @Prop() loading?: SwirlImageGridItemLoading;
  @Prop() overlay?: string;
  @Prop() src!: string;

  @State() loaded = false;

  private onLoad = () => {
    this.loaded = true;
  };

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
            style={{
              backgroundImage:
                !Boolean(this.loading) ||
                this.loading === "eager" ||
                this.loaded
                  ? `url(${this.src})`
                  : undefined,
            }}
          ></div>
          <img
            alt={this.alt}
            class="image-grid-item__image"
            loading={this.loading}
            onLoad={this.onLoad}
            src={this.src}
          />
          {this.icon && !Boolean(this.overlay) && (
            <div class="image-grid-item__icon" innerHTML={this.icon}></div>
          )}
          {this.overlay && (
            <div class="image-grid-item__overlay">{this.overlay}</div>
          )}
        </Tag>
      </Host>
    );
  }
}
