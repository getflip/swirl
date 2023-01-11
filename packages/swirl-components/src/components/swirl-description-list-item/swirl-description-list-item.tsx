import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @slot slot - The description
 */
@Component({
  shadow: true,
  styleUrl: "swirl-description-list-item.css",
  tag: "swirl-description-list-item",
})
export class SwirlDescriptionListItem {
  @Prop() term!: string;

  render() {
    return (
      <Host>
        <div class="description-list-item">
          <dt class="description-list-item__term">{this.term}</dt>
          <dd class="description-list-item__description">
            <slot></slot>
          </dd>
        </div>
      </Host>
    );
  }
}
