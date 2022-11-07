import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { FlipStackOrientation } from "../flip-stack/flip-stack";

export type FlipButtonGroupOrientation = FlipStackOrientation;

@Component({
  shadow: true,
  styleUrl: "flip-button-group.css",
  tag: "flip-button-group",
})
export class FlipButtonGroup {
  @Prop() orientation?: FlipButtonGroupOrientation = "horizontal";
  @Prop() segmented?: boolean;
  @Prop() stretch?: boolean;
  @Prop() wrap?: boolean;

  render() {
    const spacing = this.segmented ? "0" : "8";

    const className = classnames("button-group", {
      "button-group--segmented": this.segmented,
    });

    return (
      <Host>
        <flip-stack
          align={
            this.orientation === "vertical" && this.stretch
              ? "stretch"
              : "start"
          }
          class={className}
          justify={
            this.orientation === "horizontal" && this.stretch
              ? "stretch"
              : "start"
          }
          orientation={this.orientation}
          role="group"
          spacing={spacing}
          wrap={this.wrap}
        >
          <slot></slot>
        </flip-stack>
      </Host>
    );
  }
}
