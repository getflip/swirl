import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";
import { v4 as uuid } from "uuid";

/**
 * @slot media - Optional media content (e.g., swirl-avatar, icons). Only swirl-avatar and icon elements are styled.
 * @slot suffix - Optional suffix content (e.g., buttons, badges)
 */
@Component({
  shadow: true,
  styleUrl: "swirl-data-cell.css",
  tag: "swirl-data-cell",
})
export class SwirlDataCell {
  @Element() el: HTMLElement;

  @Prop() label!: string;
  @Prop() tooltip?: string;
  @Prop() value?: string;
  @Prop() vertical?: boolean = false;

  @State() isValueTruncated: boolean = false;

  private elementId = `data-cell-${uuid()}`;
  private valueElement: HTMLElement;
  private resizeObserver: ResizeObserver;

  componentDidLoad() {
    this.initResizeObserver();
  }

  componentDidUpdate() {
    requestAnimationFrame(() => {
      this.checkValueTruncation();
    });
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  private initResizeObserver() {
    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.checkValueTruncation();
      });
    }

    requestAnimationFrame(() => {
      if (this.valueElement) {
        this.checkValueTruncation();
        this.resizeObserver.observe(this.valueElement);
      }
    });
  }

  private setValueElementRef = (el: HTMLElement) => {
    this.valueElement = el;
    if (el && !this.resizeObserver) {
      this.initResizeObserver();
    }
  };

  private checkValueTruncation() {
    if (!this.valueElement || this.vertical || !this.value) {
      this.isValueTruncated = false;
      return;
    }

    this.isValueTruncated =
      this.valueElement.scrollWidth > this.valueElement.clientWidth;
  }

  render() {
    const hasMedia = Boolean(this.el.querySelector('[slot="media"]'));

    const hasSuffix = Boolean(this.el.querySelector('[slot="suffix"]'));

    const className = classnames("data-cell", {
      "data-cell--vertical": this.vertical,
      "data-cell--has-media": hasMedia,
      "data-cell--has-suffix": hasSuffix,
    });

    const labelId = `${this.elementId}-label`;
    const valueId = `${this.elementId}-value`;

    const labelContent = (
      <swirl-stack orientation="horizontal" align="center" spacing="4">
        <span class="data-cell__label" id={labelId} role="term">
          {this.label}
        </span>
        {this.tooltip && (
          <swirl-tooltip
            class="data-cell__tooltip"
            content={this.tooltip}
            position="right"
          >
            <swirl-icon-info size={16} tabIndex={0}></swirl-icon-info>
          </swirl-tooltip>
        )}
      </swirl-stack>
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
            <div class="data-cell__label-wrapper">{labelContent}</div>
            {(this.value || hasSuffix) && (
              <div
                class="data-cell__value-wrapper"
                role="definition"
                aria-labelledby={labelId}
                id={valueId}
              >
                {this.value &&
                  (this.isValueTruncated && !this.vertical ? (
                    <swirl-tooltip content={this.value} position="top">
                      <div
                        class="data-cell__value"
                        ref={this.setValueElementRef}
                      >
                        {this.value}
                      </div>
                    </swirl-tooltip>
                  ) : (
                    <div class="data-cell__value" ref={this.setValueElementRef}>
                      {this.value}
                    </div>
                  ))}
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
