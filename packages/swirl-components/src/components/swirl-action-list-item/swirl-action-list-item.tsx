import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipActionListItemIntent = "default" | "critical";

export type FlipActionListItemSize = "m" | "l";

@Component({
  shadow: true,
  styleUrl: "swirl-action-list-item.css",
  tag: "flip-action-list-item",
})
export class FlipActionListItem {
  @Prop() disabled?: boolean;
  @Prop() description?: string;
  @Prop() icon?: string;
  @Prop() intent?: FlipActionListItemIntent = "default";
  @Prop() label!: string;
  @Prop() size?: FlipActionListItemSize = "m";
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
