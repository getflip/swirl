import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import {
  SwirlStackOrientation,
  SwirlStackSpacing,
} from "../swirl-stack/swirl-stack";

export type SwirlButtonGroupOrientation = SwirlStackOrientation;

export type SwirlButtonGroupSpacing = SwirlStackSpacing;

@Component({
  shadow: true,
  styleUrl: "swirl-button-group.css",
  tag: "swirl-button-group",
})
export class SwirlButtonGroup {
  @Prop() orientation?: SwirlButtonGroupOrientation = "horizontal";
  @Prop() segmented?: boolean;
  @Prop() spacing?: SwirlButtonGroupSpacing = "8";
  @Prop() stretch?: boolean;
  @Prop() wrap?: boolean;

  render() {
    const spacing = this.segmented ? "0" : this.spacing;

    const className = classnames("button-group", {
      "button-group--segmented": this.segmented,
    });

    return (
      <Host>
        <swirl-stack
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
        </swirl-stack>
      </Host>
    );
  }
}
