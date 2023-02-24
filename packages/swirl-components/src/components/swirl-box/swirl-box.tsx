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
  @Prop() bordered?: boolean;
  @Prop() centerBlock?: boolean;
  @Prop() centerInline?: boolean;
  @Prop() cover?: boolean;
  @Prop() maxWidth?: string;
  @Prop() overflow?: SwirlBoxOverflow = "visible";
  @Prop() padding?: SwirlBoxPadding = "0";

  render() {
    const styles = {
      alignItems: this.centerBlock ? "center" : undefined,
      display: this.centerBlock || this.centerInline ? "flex" : undefined,
      height: this.cover ? "100%" : undefined,
      justifyContent: this.centerInline ? "center" : undefined,
      overflow: this.overflow,
      padding: `var(--s-space-${this.padding})`,
      position: Boolean(this.overflow) ? "relative" : "",
      maxWidth: this.maxWidth,
      width: this.cover ? "100%" : undefined,
    };

    const className = classnames("box", {
      "box--bordered": this.bordered,
      "box--cover": this.cover,
    });

    return (
      <Host class={className} style={styles}>
        <slot></slot>
      </Host>
    );
  }
}
