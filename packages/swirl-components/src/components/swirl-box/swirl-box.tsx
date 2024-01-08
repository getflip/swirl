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

export type SwirlBoxPosition =
  | "absolute"
  | "fixed"
  | "relative"
  | "static"
  | "sticky";

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
  @Prop() borderedBlockEnd?: boolean;
  @Prop() borderedBlockStart?: boolean;
  @Prop() borderedInlineEnd?: boolean;
  @Prop() borderedInlineStart?: boolean;
  @Prop() bottom?: string;
  @Prop() centerBlock?: boolean;
  @Prop() centerInline?: boolean;
  @Prop() cover?: boolean;
  @Prop() left?: string;
  @Prop() maxWidth?: string;
  @Prop() overflow?: SwirlBoxOverflow = "visible";
  @Prop() padding?: SwirlBoxPadding = "0";
  @Prop() paddingBlockEnd?: SwirlBoxPadding;
  @Prop() paddingBlockStart?: SwirlBoxPadding;
  @Prop() paddingInlineEnd?: SwirlBoxPadding;
  @Prop() paddingInlineStart?: SwirlBoxPadding;
  @Prop() position?: SwirlBoxPosition;
  @Prop() right?: string;
  @Prop() top?: string;
  @Prop() zIndex?: string;

  render() {
    const styles = {
      alignItems: this.centerBlock ? "center" : undefined,
      bottom: this.bottom,
      display: this.centerBlock || this.centerInline ? "flex" : undefined,
      height: this.cover ? "100%" : undefined,
      justifyContent: this.centerInline ? "center" : undefined,
      left: this.left,
      overflow: this.overflow,
      padding: `var(--s-space-${this.padding})`,
      paddingBlockEnd: Boolean(this.paddingBlockEnd)
        ? `var(--s-space-${this.paddingBlockEnd})`
        : undefined,
      paddingBlockStart: Boolean(this.paddingBlockStart)
        ? `var(--s-space-${this.paddingBlockStart})`
        : undefined,
      paddingInlineEnd: Boolean(this.paddingInlineEnd)
        ? `var(--s-space-${this.paddingInlineEnd})`
        : undefined,
      paddingInlineStart: Boolean(this.paddingInlineStart)
        ? `var(--s-space-${this.paddingInlineStart})`
        : undefined,
      position: Boolean(this.overflow)
        ? this.position || "relative"
        : this.position,
      maxWidth: this.maxWidth,
      right: this.right,
      top: this.top,
      width: this.cover ? "100%" : undefined,
      zIndex: this.zIndex,
    };

    const className = classnames("box", {
      "box--bordered": this.bordered,
      "box--bordered-block-end": this.borderedBlockEnd,
      "box--bordered-block-start": this.borderedBlockStart,
      "box--bordered-inline-end": this.borderedInlineEnd,
      "box--bordered-inline-start": this.borderedInlineStart,
      "box--cover": this.cover,
    });

    return (
      <Host class={className} style={styles}>
        <slot></slot>
      </Host>
    );
  }
}
