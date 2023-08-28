import { Component, h, Host, Prop } from "@stencil/core";
import classNames from "classnames";

export type SwirlDescriptionListItemOrientation = "vertical" | "horizontal";

/**
 * @slot slot - The description
 */
@Component({
  shadow: true,
  styleUrl: "swirl-description-list-item.css",
  tag: "swirl-description-list-item",
})
export class SwirlDescriptionListItem {
  @Prop() bordered?: boolean = true;
  @Prop() orientation?: SwirlDescriptionListItemOrientation = "horizontal";
  @Prop() term!: string;

  render() {
    const className = classNames(
      "description-list-item",
      `description-list-item--orientation-${this.orientation}`,
      { "description-list-item--bordered": this.bordered }
    );

    return (
      <Host role="listitem">
        <div class={className} part="description-list-item" role="group">
          <div
            class="description-list-item__term"
            part="description-list-item__term"
            role="term"
          >
            {this.term}
          </div>
          <div class="description-list-item__description" role="definition">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
