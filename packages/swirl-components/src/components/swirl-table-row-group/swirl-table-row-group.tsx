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
  @Prop() collapsible?: boolean = true;
  @Prop() collapseButtonLabel?: string = "Previous slide";

  @State() isVisible: boolean = true;

  private tableRowElements: HTMLElement;
  private headerRowElement: HTMLElement;

  private toggleShowItems = () => {
    console.log("is visible?", this.isVisible);
    this.headerRowElement.focus();

    if (!this.tableRowElements) return;
    const naturalHeight = this.tableRowElements.scrollHeight + "px";

    if (this.isVisible) {
      requestAnimationFrame(() => {
        this.tableRowElements.style.height = naturalHeight;
        this.tableRowElements.setAttribute("aria-hidden", "true");
        requestAnimationFrame(() => {
          this.tableRowElements.style.height = "0";
        });
      });
    } else {
      requestAnimationFrame(() => {
        this.tableRowElements.style.height = naturalHeight;
        this.tableRowElements.removeAttribute("aria-hidden");
        setTimeout(() => {
          this.tableRowElements.style.height = "auto";
        }, 300);
      });
    }

    //this.tableRowElements.classList.toggle("expanded");
    //this.isVisible = this.tableRowElements.classList.contains("expanded");

    this.isVisible = !this.isVisible;
  };

  private handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.toggleShowItems();
    }
  };

  render() {
    const rowspan = this.el.querySelectorAll("swirl-table-row").length;
    const iconType = this.isVisible
      ? "<swirl-icon-expand-less></swirl-icon-expand-less"
      : "<swirl-icon-expand-more></swirl-icon-expand-more";

    return (
      <Host class="table-row-group" role="rowgroup">
        <div
          class="table-row-group__header-row"
          role="row"
          ref={(el) => (this.headerRowElement = el as HTMLElement)}
        >
          {this.collapsible && (
            <swirl-button
              tabIndex={0}
              class="table-row-group__collapse-icon"
              hideLabel
              icon={iconType}
              label={this.collapseButtonLabel}
              variant="plain"
              onClick={this.toggleShowItems}
              onKeyPress={this.handleKeyPress}
              iconPosition="end"
              role="button"
              aria-expanded={this.isVisible}
            ></swirl-button>
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
        <div
          class={{
            "table-row-group__rows-container": true,
            "table-row-group__rows-container--is-hidden": this.isVisible,
          }}
          aria-hidden={!this.isVisible}
          ref={(el) => (this.tableRowElements = el as HTMLElement)}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
