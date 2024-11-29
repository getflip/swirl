import { Component, h, Host, Prop } from "@stencil/core";
import { SwirlStackSpacing } from "../swirl-stack/swirl-stack";

/**
 * @slot slot - The resource list item components
 */
@Component({
  shadow: true,
  styleUrl: "swirl-resource-list-section.css",
  tag: "swirl-resource-list-section",
})
export class SwirlResourceListSection {
  @Prop() label!: string;
  @Prop() spacing?: SwirlStackSpacing = "0";

  render() {
    return (
      <Host>
        <div
          aria-labelledby="label"
          class="resource-list-section"
          role="rowgroup"
        >
          <span
            class="resource-list-section__label"
            id="label"
            part="resource-list-section__label"
          >
            {this.label}
          </span>

          <swirl-stack spacing={this.spacing}>
            <slot></slot>
          </swirl-stack>
        </div>
      </Host>
    );
  }
}
