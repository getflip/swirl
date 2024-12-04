import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlSeparatorBorderColor = "default" | "strong" | "highlight";
export type SwirlSeparatorOrientation = "horizontal" | "vertical";

export type SwirlSeparatorSpacing =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "24"
  | "32";

@Component({
  shadow: true,
  styleUrl: "swirl-separator.css",
  tag: "swirl-separator",
})
export class SwirlSeparator {
  @Prop() borderColor?: SwirlSeparatorBorderColor = "default";
  @Prop() orientation?: SwirlSeparatorOrientation = "horizontal";
  @Prop() spacing?: SwirlSeparatorSpacing = "8";

  render() {
    const styles =
      this.orientation === "horizontal"
        ? {
            paddingTop: `var(--s-space-${this.spacing})`,
            paddingBottom: `var(--s-space-${this.spacing})`,
          }
        : {
            paddingRight: `var(--s-space-${this.spacing})`,
            paddingLeft: `var(--s-space-${this.spacing})`,
          };

    const className = classnames(
      "separator",
      `separator--border-color-${this.borderColor}`,
      `separator--orientation-${this.orientation}`
    );

    return (
      <Host
        aria-orientation={this.orientation}
        class={className}
        role="separator"
        style={styles}
      >
        <span class="separator__line"></span>
      </Host>
    );
  }
}
