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
  @Prop() hasSeparator?: boolean = false;

  render() {
    return (
      <Host>
        {this.hasSeparator && <swirl-separator spacing="4"></swirl-separator>}
        <div aria-labelledby="label" role="rowgroup">
          <span
            id="label"
            class="resource-list-section-label"
            part="resource-list-section-label"
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
