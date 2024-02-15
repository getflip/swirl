import { Component, Element, h, Host, Prop, State } from "@stencil/core";

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
  @Prop() collapsable?: boolean = false;

  @State() isVisible: boolean = true;

  private toggleShowItems = () => {
    const rowsContainer = this.el.shadowRoot.querySelector(
      ".rows-container"
    ) as HTMLElement;
    if (this.isVisible) {
      rowsContainer.style.height = "0";
    } else {
      rowsContainer.style.height = "auto";
      const height = rowsContainer.clientHeight + "px";
      rowsContainer.style.height = "0";
      setTimeout(() => (rowsContainer.style.height = height), 0);
    }
    this.isVisible = !this.isVisible;
  };

  render() {
    const rowspan = this.el.querySelectorAll("swirl-table-row").length;
    const Icon = this.isVisible
      ? "swirl-icon-expand-less"
      : "swirl-icon-expand-more";

    return (
      <Host class="table-row-group" role="rowgroup">
        <div class="table-row-group__header-row" role="row">
          {this.collapsable && (
            <Icon
              class="table-row-group__collapse-icon"
              onClick={this.toggleShowItems}
            ></Icon>
          )}
          <span
            aria-rowspan={rowspan}
            class="table-row-group__label"
            role="rowheader"
          >
            {this.label}
            {this.tooltip && (
              <span class="table-row-group__tooltip">
                <swirl-tooltip
                  content={this.tooltip}
                  position="top"
                  positioning="fixed"
                >
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
        <div class={{ "rows-container": true, "is-hidden": !this.isVisible }}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
