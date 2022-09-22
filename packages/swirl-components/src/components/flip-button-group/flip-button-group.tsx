import { Component, h, Host, Prop } from "@stencil/core";
import { FlipStackOrientation } from "../flip-stack/flip-stack";

export type FlipButtonGroupOrientation = FlipStackOrientation;

@Component({
  shadow: true,
  styleUrl: "flip-button-group.css",
  tag: "flip-button-group",
})
export class FlipButtonGroup {
  @Prop() orientation: FlipButtonGroupOrientation = "horizontal";
  @Prop() stretch: boolean;
  @Prop() wrap: boolean;

  render() {
    return (
      <Host>
        <flip-stack
          align={
            this.orientation === "vertical" && this.stretch
              ? "stretch"
              : "start"
          }
          class="button-group"
          justify={
            this.orientation === "horizontal" && this.stretch
              ? "stretch"
              : "start"
          }
          orientation={this.orientation}
          role="group"
          spacing="8"
          wrap={this.wrap}
        >
          <slot></slot>
        </flip-stack>
      </Host>
    );
  }
}
