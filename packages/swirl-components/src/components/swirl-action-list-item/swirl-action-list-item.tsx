import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlActionListItemIntent = "default" | "critical";

export type SwirlActionListItemSize = "m" | "l";

@Component({
  shadow: true,
  styleUrl: "swirl-action-list-item.css",
  tag: "swirl-action-list-item",
})
export class SwirlActionListItem {
  @Prop() disabled?: boolean;
  @Prop() description?: string;
  @Prop() icon?: string;
  @Prop() intent?: SwirlActionListItemIntent = "default";
  @Prop() label!: string;
  @Prop() size?: SwirlActionListItemSize = "m";
  @Prop() suffix?: string;

  render() {
    const showSuffix = Boolean(this.suffix) && !this.disabled;

    const className = classnames(
      "action-list-item",
      `action-list-item--intent-${this.intent}`,
      `action-list-item--size-${this.size}`
    );

    return (
      <Host>
        <button
          class={className}
          disabled={this.disabled}
          role="menuitem"
          tabIndex={-1}
          type="button"
        >
          {this.icon && (
            <span class="action-list-item__icon" innerHTML={this.icon}></span>
          )}
          <span class="action-list-item__label-container">
            <span class="action-list-item__label">{this.label}</span>
            {this.description && (
              <span class="action-list-item__description">
                {this.description}
              </span>
            )}
          </span>
          {showSuffix && (
            <span
              class="action-list-item__suffix"
              innerHTML={this.suffix}
            ></span>
          )}
        </button>
      </Host>
    );
  }
}
