import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @slot slot - The description
 */
@Component({
  shadow: true,
  styleUrl: "flip-description-list-item.css",
  tag: "flip-description-list-item",
})
export class FlipDescriptionListItem {
  @Prop() term!: string;

  render() {
    return (
      <Host>
        <div class="description-list-item" part="description-list-item">
          <dt
            class="description-list-item__term"
            part="description-list-item__term"
          >
            {this.term}
          </dt>
          <dd class="description-list-item__description">
            <slot></slot>
          </dd>
        </div>
      </Host>
    );
  }
}
