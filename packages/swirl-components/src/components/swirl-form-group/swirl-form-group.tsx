import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlFormGroupOrientation = "horizontal" | "vertical";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-form-group.css",
  tag: "swirl-form-group",
})
export class SwirlFormGroup {
  @Prop() orientation: SwirlFormGroupOrientation = "vertical";

  render() {
    const className = classnames(
      "form-group",
      `form-group--orientation-${this.orientation}`
    );

    return (
      <Host>
        <div class={className}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
