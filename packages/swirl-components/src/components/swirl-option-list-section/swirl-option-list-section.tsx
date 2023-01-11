import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @slot slot - The option list item components
 */
@Component({
  shadow: true,
  styleUrl: "swirl-option-list-section.css",
  tag: "swirl-option-list-section",
})
export class SwirlOptionListSection {
  @Prop() label!: string;

  render() {
    return (
      <Host>
        <div aria-labelledby="label" class="option-list-section" role="group">
          <span
            class="option-list-section__label"
            id="label"
            part="option-list-section__label"
          >
            {this.label}
          </span>
          <div class="option-list-section__items">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
