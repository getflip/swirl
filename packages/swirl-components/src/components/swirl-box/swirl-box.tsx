import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlBoxBorderColor = "default" | "strong";

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
  @Prop() borderColor?: SwirlBoxBorderColor = "default";
  @Prop() bordered?: boolean;
  @Prop() borderedBlockEnd?: boolean;
  @Prop() borderedBlockEndWhenScrolled?: boolean;
  @Prop() borderedBlockStart?: boolean;
  @Prop() borderedBlockStartWhenScrolled?: boolean;
  @Prop() borderedInlineEnd?: boolean;
  @Prop() borderedInlineStart?: boolean;
  @Prop() bottom?: string;
  @Prop() centerBlock?: boolean;
  @Prop() centerInline?: boolean;
  @Prop() cover?: boolean;
  @Prop() height?: string;
  @Prop() left?: string;
  @Prop() maxHeight?: string;
  @Prop() minHeight?: string;
  @Prop() maxWidth?: string;
  @Prop() minWidth?: string;
  @Prop() overflow?: SwirlBoxOverflow = "visible";
  @Prop() padding?: SwirlBoxPadding = "0";
  @Prop() paddingBlockEnd?: SwirlBoxPadding;
  @Prop() paddingBlockStart?: SwirlBoxPadding;
  @Prop() paddingInlineEnd?: SwirlBoxPadding;
  @Prop() paddingInlineStart?: SwirlBoxPadding;
  @Prop() position?: SwirlBoxPosition;
  @Prop() right?: string;
  @Prop() basis?: string;
  @Prop() shrink?: string;
  @Prop() grow?: string;
  @Prop() top?: string;
  @Prop() width?: string;
  @Prop() zIndex?: string;

  render() {
    const styles = {
      alignItems: this.centerBlock ? "center" : undefined,
      borderColor:
        this.borderColor === "default"
          ? "var(--s-border-default)"
          : "var(--s-border-strong)",
      bottom: this.bottom,
      display: this.centerBlock || this.centerInline ? "flex" : undefined,
      flexBasis: this.basis,
      flexShrink: this.shrink,
      flexGrow: this.grow,
      height: this.cover ? "100%" : this.height,
      justifyContent: this.centerInline ? "center" : undefined,
      left: this.left,
      maxHeight: this.maxHeight,
      minHeight: this.minHeight,
      maxWidth: this.maxWidth,
      minWidth: this.minWidth,
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
      right: this.right,
      top: this.top,
      width: this.cover ? "100%" : this.width,
      zIndex: this.zIndex,
    };

    if (
      this.borderedBlockEndWhenScrolled &&
      this.borderedBlockStartWhenScrolled
    ) {
      console.warn(
        `[Swirl] swirl-box does not support both borderedBlockEndWhenScrolled and borderedBlockStartWhenScrolled properties to be active at the same time. Please use only one of them.`
      );
    }

    const className = classnames("box", {
      "box--bordered": this.bordered,
      "box--bordered-block-end": this.borderedBlockEnd,
      "box--bordered-block-end-when-scrolled":
        this.borderedBlockEndWhenScrolled,
      "box--bordered-block-start": this.borderedBlockStart,
      "box--bordered-block-start-when-scrolled":
        this.borderedBlockStartWhenScrolled &&
        !this.borderedBlockEndWhenScrolled,
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
