import { Component, Element, h, Host, Prop } from "@stencil/core";

/**
 * @slot slot - The rows of this group.
 */
@Component({
  shadow: true,
  styleUrl: "flip-table-row-group.css",
  tag: "flip-table-row-group",
})
export class FlipTableRowGroup {
  @Element() el: HTMLElement;

  @Prop() label!: string;

  render() {
    const rowspan = this.el.querySelectorAll("flip-table-row").length;

    return (
      <Host class="table-row-group" role="rowgroup">
        <div class="table-row-group__header-row" role="row">
          <span
            aria-rowspan={rowspan}
            class="table-row-group__label"
            role="rowheader"
          >
            {this.label}
          </span>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
