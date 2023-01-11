import { Component, h, Host, Prop } from "@stencil/core";

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

  render() {
    return (
      <Host>
        <div aria-labelledby="label" class="action-list-section" role="group">
          <span
            class="action-list-section__label"
            id="label"
            part="action-list-section__label"
          >
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
