import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-action-list-item.css",
  tag: "flip-action-list-item",
})
export class FlipActionListItem {
  @Prop() disabled?: boolean;
  @Prop() description?: string;
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop() suffix?: string;

  render() {
    return (
      <Host>
        <button
          class="action-list-item"
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
          {this.suffix && (
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
