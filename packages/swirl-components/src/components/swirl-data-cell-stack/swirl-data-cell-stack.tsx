import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot cta - Optional call-to-action (e.g., button)
 * @slot - The data cell items
 */
@Component({
  shadow: true,
  styleUrl: "swirl-data-cell-stack.css",
  tag: "swirl-data-cell-stack",
})
export class SwirlDataCellStack {
  @Element() el: HTMLElement;

  @Prop() description?: string;
  @Prop() hideLabel?: boolean = false;
  @Prop() label?: string;

  render() {
    const hasCta = Boolean(this.el.querySelector('[slot="cta"]'));
    const showLabel = Boolean(this.label) && !this.hideLabel;

    const className = classnames("data-cell-stack", {
      "data-cell-stack--has-cta": hasCta,
    });

    return (
      <Host>
        <div class={className} part="data-cell-stack">
          {(showLabel || this.description || hasCta) && (
            <div class="data-cell-stack__header">
              <div class="data-cell-stack__header-content">
                {showLabel && (
                  <div class="data-cell-stack__label">{this.label}</div>
                )}
                {this.description && (
                  <div class="data-cell-stack__description">
                    {this.description}
                  </div>
                )}
              </div>
              {hasCta && (
                <div class="data-cell-stack__cta">
                  <slot name="cta"></slot>
                </div>
              )}
            </div>
          )}
          <div class="data-cell-stack__cells">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
