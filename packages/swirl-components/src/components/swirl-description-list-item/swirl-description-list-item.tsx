import { Component, Element, h, Host, Prop } from "@stencil/core";
import classNames from "classnames";

/**
 * @slot slot - The description
 * @slot tools - Optional tools to be displayed on the right side of the item
 * @slot additional-content - Optional additional content displayed at the bottom of the item
 */
@Component({
  shadow: true,
  styleUrl: "swirl-description-list-item.css",
  tag: "swirl-description-list-item",
})
export class SwirlDescriptionListItem {
  @Element() el: HTMLElement;

  @Prop() bordered?: boolean = true;
  @Prop() maxWidth?: string;
  @Prop() term!: string;
  @Prop() tooltip?: string;

  render() {
    const hasTools = Boolean(this.el.querySelector('[slot="tools"]'));

    const hasAdditionalContent = Boolean(
      this.el.querySelector('[slot="additional-content"]')
    );

    const className = classNames("description-list-item", {
      "description-list-item--bordered": this.bordered,
      "description-list-item--has-additional-content": hasAdditionalContent,
      "description-list-item--has-tools": hasTools,
    });

    return (
      <Host role="listitem">
        <div class={className} part="description-list-item" role="group">
          <div class="description-list-item__inner">
            <div class="description-list-item__text-container">
              <div
                class="description-list-item__term"
                part="description-list-item__term"
                role="term"
              >
                {this.term}
                {this.tooltip && (
                  <span class="description-list-item__tooltip">
                    <swirl-tooltip content={this.tooltip} position="right">
                      <swirl-icon-info size={16} tabIndex={0}></swirl-icon-info>
                    </swirl-tooltip>
                  </span>
                )}
              </div>
              <div
                style={{ maxWidth: this.maxWidth }}
                class="description-list-item__description"
                role="definition"
              >
                <slot></slot>
              </div>
            </div>
            <div class="description-list-item__tools">
              <slot name="tools"></slot>
            </div>
          </div>
          <div class="description-list-item__additional-content">
            <slot name="additional-content"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
