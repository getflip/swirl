import { Component, h, Host, Prop } from "@stencil/core";
import { SwirlSeparatorSpacing } from "../swirl-separator/swirl-separator";
import { SwirlStackSpacing } from "../swirl-stack/swirl-stack";

/**
 * @slot slot - The action list item components
 */
@Component({
  shadow: true,
  styleUrl: "swirl-action-list-section.css",
  tag: "swirl-action-list-section",
})
export class SwirlActionListSection {
  @Prop() label!: string;
  @Prop() separatorSpacing?: SwirlSeparatorSpacing = "4";
  @Prop() spacing?: SwirlStackSpacing = "0";
  @Prop() hasSeparator?: boolean = false;

  render() {
    return (
      <Host>
        {this.hasSeparator && (
          <swirl-separator spacing={this.separatorSpacing}></swirl-separator>
        )}
        <div aria-labelledby="label" class="action-list-section" role="group">
          <span
            class="action-list-section__label"
            id="label"
            part="action-list-section__label"
          >
            {this.label}
          </span>
          <swirl-stack spacing={this.spacing} align="stretch">
            <slot></slot>
          </swirl-stack>
        </div>
      </Host>
    );
  }
}
