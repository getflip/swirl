import { Component, h, Host, Prop } from "@stencil/core";
import { FlipStackOrientation } from "../flip-stack/flip-stack";

export type FlipButtonGroupOrientation = FlipStackOrientation;

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-button-group.css",
  tag: "flip-button-group",
})
export class FlipButtonGroup {
  @Prop() orientation: FlipButtonGroupOrientation = "horizontal";
  @Prop() wrap: boolean;

  render() {
    return (
      <Host>
        <flip-stack
          class="button-group"
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
