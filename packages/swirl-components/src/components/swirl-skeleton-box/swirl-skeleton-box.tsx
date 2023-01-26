import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlSkeletonBoxBorderRadius = "s" | "sm" | "base" | "pill";

@Component({
  shadow: true,
  styleUrl: "swirl-skeleton-box.css",
  tag: "swirl-skeleton-box",
})
export class SwirlSkeletonBox {
  @Prop() animated?: boolean = true;
  @Prop() aspectRatio?: string;
  @Prop() borderRadius?: SwirlSkeletonBoxBorderRadius = "base";
  @Prop() height?: string;
  @Prop() width?: string;

  render() {
    const className = classnames(
      "skeleton-box",
      `skeleton-box--border-radius-${this.borderRadius}`,
      { "skeleton-box--static": !this.animated }
    );

    return (
      <Host>
        <div
          class={className}
          style={{
            aspectRatio: this.aspectRatio,
            borderRadius:
              this.borderRadius !== "pill"
                ? `var(--s-border-radius-${this.borderRadius})`
                : undefined,
            height: this.height,
            width: this.width,
          }}
        ></div>
      </Host>
    );
  }
}
