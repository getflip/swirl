import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlStackAlign = "start" | "center" | "end" | "stretch";

export type SwirlStackJustify =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";

export type SwirlStackOrientation =
  | "horizontal"
  | "horizontal-reverse"
  | "vertical"
  | "vertical-reverse";

export type SwirlStackSpacing =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "24"
  | "32"
  | "40"
  | "48"
  | "64";

@Component({
  shadow: true,
  styleUrl: "swirl-stack.css",
  tag: "swirl-stack",
})
export class SwirlStack {
  @Prop() align?: SwirlStackAlign = "start";
  @Prop() as?: string = "div";
  @Prop() height?: string;
  @Prop() justify?: SwirlStackJustify = "start";
  @Prop() orientation?: SwirlStackOrientation = "vertical";
  @Prop() columnSpacing?: SwirlStackSpacing;
  @Prop() rowSpacing?: SwirlStackSpacing;
  @Prop() spacing?: SwirlStackSpacing = "0";
  @Prop() swirlAriaRole?: string;
  @Prop() wrap?: boolean = false;

  render() {
    const Tag = this.as;
    const styles = {
      columnGap: `var(--s-space-${this.columnSpacing || this.spacing})`,
      rowGap: `var(--s-space-${this.rowSpacing || this.spacing})`,
      height: this.height,
    };
    const className = classnames(
      "stack",
      `stack--align-${this.align}`,
      `stack--justify-${this.justify}`,
      `stack--orientation-${this.orientation}`,
      { "stack--wrap": this.wrap }
    );

    return (
      <Host style={{ height: this.height }}>
        <Tag class={className} role={this.swirlAriaRole} style={styles}>
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
