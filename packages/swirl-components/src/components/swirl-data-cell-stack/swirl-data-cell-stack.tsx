import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { v4 as uuid } from "uuid";

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

  private headerId = `data-cell-stack-header-${uuid()}`;

  render() {
    const hasCta = Boolean(this.el.querySelector('[slot="cta"]'));
    const showLabel = Boolean(this.label) && !this.hideLabel;

    const className = classnames("data-cell-stack", {
      "data-cell-stack--has-cta": hasCta,
    });

    const labelId = showLabel ? `${this.headerId}-label` : undefined;
    const descriptionId = this.description
      ? `${this.headerId}-description`
      : undefined;

    return (
      <Host>
        <div class={className} part="data-cell-stack" role="group">
          {(showLabel || this.description || hasCta) && (
            <header class="data-cell-stack__header" id={this.headerId}>
              <div class="data-cell-stack__header-content">
                {showLabel && (
                  <h3 class="data-cell-stack__label" id={labelId}>
                    {this.label}
                  </h3>
                )}
                {this.description && (
                  <p class="data-cell-stack__description" id={descriptionId}>
                    {this.description}
                  </p>
                )}
              </div>
              {hasCta && (
                <div class="data-cell-stack__cta">
                  <slot name="cta"></slot>
                </div>
              )}
            </header>
          )}
          <div
            class="data-cell-stack__cells"
            role="list"
            aria-labelledby={labelId || undefined}
            aria-describedby={descriptionId || undefined}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
