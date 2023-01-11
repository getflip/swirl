import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipBoxOverflow = "visible" | "hidden" | "clip" | "scroll" | "auto";

export type FlipBoxPadding =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32";

/**
 * @slot slot - The box contents
 */
@Component({
  shadow: true,
  styleUrl: "swirl-box.css",
  tag: "flip-box",
})
export class FlipBox {
  @Prop() as?: string = "div";
  @Prop() bordered?: boolean;
  @Prop() centerBlock?: boolean;
  @Prop() centerInline?: boolean;
  @Prop() cover?: boolean;
  @Prop() overflow?: FlipBoxOverflow = "visible";
  @Prop() padding?: FlipBoxPadding = "0";

  render() {
    const Tag = this.as;

    const styles = {
      overflow: this.overflow,
      padding: `var(--s-space-${this.padding})`,
      position: Boolean(this.overflow) ? "relative" : "",
    };

    const className = classnames("box", {
      "box--bordered": this.bordered,
      "box--center-block": this.centerBlock,
      "box--center-inline": this.centerInline,
      "box--cover": this.cover,
    });

    return (
      <Host style={this.cover ? { width: "100%", height: "100%" } : undefined}>
        <Tag class={className} style={styles}>
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
