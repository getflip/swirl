import { Component, h, Host, Prop, State } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

export type SwirlOptionListItemContext = "single-select" | "multi-select";

@Component({
  shadow: true,
  styleUrl: "swirl-option-list-item.css",
  tag: "swirl-option-list-item",
})
export class SwirlOptionListItem {
  @Prop({ mutable: true }) context?: SwirlOptionListItemContext =
    "single-select";
  @Prop() disabled?: boolean;
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop({ mutable: true }) selected?: boolean = false;
  @Prop() value!: string;

  @State() iconSize: 20 | 24 = 24;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);
    this.updateIconSize(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
    this.updateIconSize(event.matches);
  };

  private forceIconProps(smallIcon: boolean) {
    const icon = this.iconEl?.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  private updateIconSize(smallIcon: boolean) {
    this.iconSize = smallIcon ? 20 : 24;
  }

  render() {
    const ariaDisabled = this.disabled ? "true" : undefined;
    const ariaSelected = String(this.selected);

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
          aria-disabled={ariaDisabled}
          aria-selected={ariaSelected}
          class={className}
          part="option-list-item"
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
                  <swirl-icon-check-strong
                    class="option-list-item__checkbox-icon"
                    size={16}
                  ></swirl-icon-check-strong>
                )}
              </span>
            </span>
          )}
          <span class="option-list-item__label" part="option-list-item__label">
            {this.label}
          </span>
          {showSelectionIcon && (
            <span class="option-list-item__selection-icon">
              <swirl-icon-check-small
                size={this.iconSize}
              ></swirl-icon-check-small>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
