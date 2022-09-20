import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipOptionListItemContext = "single-select" | "multi-select";

@Component({
  shadow: true,
  styleUrl: "flip-option-list-item.css",
  tag: "flip-option-list-item",
})
export class FlipOptionListItem {
  @Prop() context?: FlipOptionListItemContext = "single-select";
  @Prop() disabled?: boolean;
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop() selected?: boolean = false;

  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps();
  }

  private forceIconProps() {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", "24");
  }

  render() {
    const ariaDisabled = this.disabled ? "true" : undefined;

    const ariaChecked =
      this.context === "multi-select" ? String(this.selected) : undefined;

    const ariaSelected =
      this.context === "single-select" ? String(this.selected) : undefined;

    const showCheckbox = this.context === "multi-select";
    const showIcon = Boolean(this.icon) && this.context === "single-select";
    const showSelectionIcon = this.selected && this.context === "single-select";

    const className = classnames(
      "option-list-item",
      `option-list-item--context-${this.context}`,
      {
        "option-list-item--disabled": this.disabled,
        "option-list-item--selected": this.selected,
      }
    );

    return (
      <Host>
        <div
          aria-checked={ariaChecked}
          aria-disabled={ariaDisabled}
          aria-selected={ariaSelected}
          class={className}
          role="option"
        >
          {showIcon && (
            <span
              class="option-list-item__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          {showCheckbox && (
            <span class="option-list-item__checkbox">
              <span class="option-list-item__checkbox-box">
                {this.selected && (
                  <flip-icon-check-strong
                    class="option-list-item__checkbox-icon"
                    size={16}
                  ></flip-icon-check-strong>
                )}
              </span>
            </span>
          )}
          <span class="option-list-item__label">{this.label}</span>
          {showSelectionIcon && (
            <span class="option-list-item__selection-icon">
              <flip-icon-check-small></flip-icon-check-small>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
