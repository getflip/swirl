import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlBoxOverflow =
  | "visible"
  | "hidden"
  | "clip"
  | "scroll"
  | "auto";

export type SwirlBoxPadding =
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
  tag: "swirl-box",
})
export class SwirlBox {
  @Prop() as?: string = "div";
  @Prop() bordered?: boolean;
  @Prop() centerBlock?: boolean;
  @Prop() centerInline?: boolean;
  @Prop() cover?: boolean;
  @Prop() maxWidth?: string;
  @Prop() overflow?: SwirlBoxOverflow = "visible";
  @Prop() padding?: SwirlBoxPadding = "0";

  render() {
    const Tag = this.as;

    const styles = {
      maxWidth: this.maxWidth,
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
