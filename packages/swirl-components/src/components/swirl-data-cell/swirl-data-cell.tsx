import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { v4 as uuid } from "uuid";

/**
 * @slot media - Optional media content (e.g., swirl-avatar, icons). Only swirl-avatar and icon elements are styled.
 * @slot input - Optional input element (e.g., swirl-text-input, swirl-select). When provided, the value prop is ignored.
 * @slot suffix - Optional suffix content (e.g., buttons, badges)
 */
@Component({
  shadow: true,
  styleUrl: "swirl-data-cell.css",
  tag: "swirl-data-cell",
})
export class SwirlDataCell {
  @Element() el: HTMLElement;

  @Prop() label?: string;
  @Prop() tooltip?: string;
  @Prop() value?: string;
  @Prop() vertical?: boolean = false;

  private elementId = `data-cell-${uuid()}`;

  render() {
    const hasMedia = Boolean(this.el.querySelector('[slot="media"]'));
    const hasSuffix = Boolean(this.el.querySelector('[slot="suffix"]'));
    const hasContent = Boolean(this.el.querySelector('[slot="content"]'));
    const hasLabel = Boolean(this.label);
    const isVertical = this.vertical;

    const className = classnames("data-cell", {
      "data-cell--vertical": this.vertical,
      "data-cell--has-media": hasMedia,
      "data-cell--has-suffix": hasSuffix,
      "data-cell--has-content": hasContent,
      "data-cell--no-label": !hasLabel,
    });

    const labelId = `${this.elementId}-label`;
    const valueId = `${this.elementId}-value`;

    const labelContent = (
      <span>
        <span class="data-cell__label" id={labelId} role="term">
          {this.label}
        </span>
        {this.tooltip && (
          <span class="data-cell__tooltip">
            <swirl-tooltip content={this.tooltip} position="right">
              <swirl-icon-info size={16} tabIndex={0}></swirl-icon-info>
            </swirl-tooltip>
          </span>
        )}
      </span>
    );

    return (
      <Host role="group">
        <div class={className} part="data-cell">
          {hasMedia && (
            <div class="data-cell__media" aria-hidden="true">
              <slot name="media"></slot>
            </div>
          )}
          <div class="data-cell__content">
            {hasLabel && <div class="data-cell__label-wrapper">{labelContent}</div>}
            {(hasContent || this.value || hasSuffix) && (
              <div
                class={classnames("data-cell__value-wrapper", {
                  "data-cell__value-wrapper--is-vertical": isVertical,
                })}
                role="definition"
                aria-labelledby={hasLabel ? labelId : undefined}
                id={valueId}
              >
                {hasContent ? (
                  <div class="data-cell__input">
                    <slot name="content"></slot>
                  </div>
                ) : (
                  this.value && <div class="data-cell__value">{this.value}</div>
                )}
              </div>
            )}
          </div>
            {hasSuffix && (
              <div class="data-cell__suffix">
                <slot name="suffix"></slot>
              </div>
            )}
        </div>
      </Host>
    );
  }
}
