import { Component, Element, h, Host, Prop } from "@stencil/core";

/**
 * @slot slot - The rows of this group.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-table-row-group.css",
  tag: "swirl-table-row-group",
})
export class SwirlTableRowGroup {
  @Element() el: HTMLElement;

  @Prop() label!: string;
  @Prop() tooltip?: string;

  render() {
    const rowspan = this.el.querySelectorAll("swirl-table-row").length;

    return (
      <Host class="table-row-group" role="rowgroup">
        <div class="table-row-group__header-row" role="row">
          <span
            aria-rowspan={rowspan}
            class="table-row-group__label"
            role="rowheader"
          >
            {this.label}
            {this.tooltip && (
              <span class="table-row-group__tooltip">
                <swirl-tooltip content={this.tooltip} position="right">
                  <swirl-icon-info
                    size={16}
                    tabIndex={0}
                    class="table-row-group__tooltip-icon"
                  ></swirl-icon-info>
                </swirl-tooltip>
              </span>
            )}
          </span>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
