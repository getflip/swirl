import { Component, Element, h, Host, Prop } from "@stencil/core";
import { SwirlSeparatorSpacing } from "../swirl-separator/swirl-separator";
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
  @Element() el: HTMLSwirlResourceListSectionElement;

  @Prop() label!: string;
  @Prop() separatorSpacing?: SwirlSeparatorSpacing = "4";
  @Prop() spacing?: SwirlStackSpacing = "0";
  @Prop() hasSeparator?: boolean = false;

  render() {
    const role = !!this.el.closest('[role="grid"]') ? "rowgroup" : "listitem";
    const childrenListRole = role === "listitem" ? "list" : undefined;

    return (
      <Host>
        {this.hasSeparator && (
          <swirl-separator spacing={this.separatorSpacing}></swirl-separator>
        )}
        <div aria-labelledby="label" role={role}>
          <span
            id="label"
            class="resource-list-section-label"
            part="resource-list-section-label"
          >
            {this.label}
          </span>

          <swirl-stack spacing={this.spacing} swirlAriaRole={childrenListRole}>
            <slot></slot>
          </swirl-stack>
        </div>
      </Host>
    );
  }
}
