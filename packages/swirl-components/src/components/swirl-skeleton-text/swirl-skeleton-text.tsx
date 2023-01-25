import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlSkeletonTextSize = "sm" | "base" | "lg" | "xl" | "2xl";

@Component({
  shadow: true,
  styleUrl: "swirl-skeleton-text.css",
  tag: "swirl-skeleton-text",
})
export class SwirlSkeletonText {
  @Prop() animated: boolean = true;
  @Prop() lines: number = 1;
  @Prop() size: SwirlSkeletonTextSize = "base";

  render() {
    const className = classnames(
      "skeleton-text",
      `skeleton-text--size-${this.size}`,
      { "skeleton-text--static": !this.animated }
    );

    const lineClassName = classnames(
      "skeleton-text__line",
      `skeleton-text__line--size-${this.size}`
    );

    return (
      <Host>
        <div class={className} part={className}>
          {new Array(this.lines).fill(undefined).map((_, index) => (
            <div class={lineClassName} key={index} part={lineClassName}></div>
          ))}
        </div>
      </Host>
    );
  }
}
