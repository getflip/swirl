import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @slot slot - The action list item components
 */
@Component({
  shadow: true,
  styleUrl: "flip-action-list-section.css",
  tag: "flip-action-list-section",
})
export class FlipActionListSection {
  @Prop() label!: string;

  render() {
    return (
      <Host>
        <div aria-labelledby="label" class="action-list-section" role="group">
          <span class="action-list-section__label" id="label">
            {this.label}
          </span>
          <div class="action-list-section__items">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
