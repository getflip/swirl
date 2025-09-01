import { Component, Fragment, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlSeparatorColor =
  | "critical"
  | "default"
  | "strong"
  | "highlight";
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
  @Prop() borderColor?: SwirlSeparatorColor = "default";
  @Prop({ mutable: true }) color?: SwirlSeparatorColor = "default";
  @Prop() label?: string;
  @Prop() orientation?: SwirlSeparatorOrientation = "horizontal";
  @Prop() spacing?: SwirlSeparatorSpacing = "8";

  componentWillLoad() {
    this.forceColor();
  }

  private forceColor() {
    if (this.borderColor !== "default") {
      console.warn(
        '[Swirl] The "borderColor" prop of swirl-separator is deprecated and will be removed with the next major release. Please use the "color" prop to achieve the same result.'
      );
      this.color = this.borderColor;
    }
  }

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
      `separator--color-${this.color}`,
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
        {this.label && (
          <Fragment>
            <span class="separator__label">{this.label}</span>
            <span class="separator__line"></span>
          </Fragment>
        )}
      </Host>
    );
  }
}
