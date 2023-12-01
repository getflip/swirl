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
  @Prop() borderedBlockEnd?: boolean;
  @Prop() borderedBlockStart?: boolean;
  @Prop() borderedInlineEnd?: boolean;
  @Prop() borderedInlineStart?: boolean;
  @Prop() centerBlock?: boolean;
  @Prop() centerInline?: boolean;
  @Prop() cover?: boolean;
  @Prop() maxWidth?: string;
  @Prop() overflow?: SwirlBoxOverflow = "visible";
  @Prop() padding?: SwirlBoxPadding = "0";
  @Prop() paddingBlockEnd?: SwirlBoxPadding;
  @Prop() paddingBlockStart?: SwirlBoxPadding;
  @Prop() paddingInlineEnd?: SwirlBoxPadding;
  @Prop() paddingInlineStart?: SwirlBoxPadding;

  render() {
    const styles = {
      alignItems: this.centerBlock ? "center" : undefined,
      display: this.centerBlock || this.centerInline ? "flex" : undefined,
      height: this.cover ? "100%" : undefined,
      justifyContent: this.centerInline ? "center" : undefined,
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
      position: Boolean(this.overflow) ? "relative" : "",
      maxWidth: this.maxWidth,
      width: this.cover ? "100%" : undefined,
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
