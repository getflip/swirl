import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipStackAlign = "start" | "center" | "end" | "stretch";

export type FlipStackJustify =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";

export type FlipStackOrientation = "horizontal" | "vertical";

export type FlipStackSpacing =
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
  styleUrl: "swirl-stack.css",
  tag: "flip-stack",
})
export class FlipStack {
  @Prop() align?: FlipStackAlign = "start";
  @Prop() as?: string = "div";
  @Prop() justify?: FlipStackJustify = "start";
  @Prop() orientation?: FlipStackOrientation = "vertical";
  @Prop() spacing?: FlipStackSpacing = "0";
  @Prop() wrap?: boolean = false;

  render() {
    const Tag = this.as;

    const className = classnames(
      "stack",
      `stack--align-${this.align}`,
      `stack--justify-${this.justify}`,
      `stack--orientation-${this.orientation}`,
      { "stack--wrap": this.wrap }
    );

    return (
      <Host>
        <Tag
          class={className}
          style={{ gap: `var(--s-space-${this.spacing})` }}
        >
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
