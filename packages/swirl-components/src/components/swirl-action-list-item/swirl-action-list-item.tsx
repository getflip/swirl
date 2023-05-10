import { Component, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

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
  @Prop() swirlAriaExpanded?: string;
  @Prop() swirlAriaHaspopup?: string;
  @Prop() suffix?: string;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;
  private suffixEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  componentDidRender() {
    this.forceIconProps(this.desktopMediaQuery.matches);
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  private forceIconProps(smallIcon: boolean) {
    const icon = this.iconEl?.children[0];
    const suffix = this.suffixEl?.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
    suffix?.setAttribute("size", smallIcon ? "20" : "24");
  }

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
          aria-expanded={this.swirlAriaExpanded}
          aria-haspopup={this.swirlAriaHaspopup}
          class={className}
          disabled={this.disabled}
          part="action-list-item"
          role="menuitem"
          tabIndex={-1}
          type="button"
        >
          {this.icon && (
            <span
              class="action-list-item__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
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
              ref={(el) => (this.suffixEl = el)}
            ></span>
          )}
        </button>
      </Host>
    );
  }
}
