import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot suffix - Optional suffix content (e.g., buttons, badges)
 */
@Component({
  shadow: true,
  styleUrl: "swirl-data-cell.css",
  tag: "swirl-data-cell",
})
export class SwirlDataCell {
  @Element() el: HTMLElement;

  @Prop() icon?: string;
  @Prop() image?: string;
  @Prop() label!: string;
  @Prop() tooltip?: string;
  @Prop() value?: string;
  @Prop() vertical?: boolean = false;

  render() {
    const showImage = Boolean(this.image);
    const showIcon = !showImage && Boolean(this.icon);
    const hasMedia = showImage || showIcon;

    const hasSuffix = Boolean(this.el.querySelector('[slot="suffix"]'));

    const className = classnames("data-cell", {
      "data-cell--vertical": this.vertical,
      "data-cell--has-media": hasMedia,
      "data-cell--has-suffix": hasSuffix,
    });

    const labelContent = (
      <span>
        <span class="data-cell__label">{this.label}</span>
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
            <div class="data-cell__media">
              {showImage && (
                <swirl-avatar
                  label={this.label}
                  src={this.image}
                  size="s"
                  part="data-cell__avatar"
                ></swirl-avatar>
              )}
              {showIcon && (
                <swirl-avatar
                  label={this.label}
                  icon={this.icon}
                  size="s"
                  part="data-cell__avatar"
                ></swirl-avatar>
              )}
            </div>
          )}
          <div class="data-cell__content">
            <div class="data-cell__label-wrapper">{labelContent}</div>
            {(this.value || hasSuffix) && (
              <div class="data-cell__value-wrapper">
                {this.value && <div class="data-cell__value">{this.value}</div>}
                {hasSuffix && (
                  <div class="data-cell__suffix">
                    <slot name="suffix"></slot>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
