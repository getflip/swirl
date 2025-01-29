import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

export type SwirlActionListItemIntent = "default" | "critical";

export type SwirlActionListItemSize = "m" | "l";

/**
 * @slot suffix - Used to add custom content to the end of the action list item.
 */
@Component({
  shadow: true,
  styleUrl: "swirl-action-list-item.css",
  tag: "swirl-action-list-item",
})
export class SwirlActionListItem {
  @Element() el: HTMLElement;

  @Prop() badge?: string;
  @Prop() disabled?: boolean;
  @Prop() description?: string;
  @Prop() icon?: string;
  @Prop() iconBadge?: string;
  @Prop() intent?: SwirlActionListItemIntent = "default";
  @Prop() label!: string;
  @Prop() size?: SwirlActionListItemSize = "m";
  @Prop() swirlAriaExpanded?: string;
  @Prop() swirlAriaHaspopup?: string;
  @Prop() suffix?: string;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;
  private iconBadgeEl: HTMLElement;
  private suffixEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
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

    const iconBadge = this.iconBadgeEl?.children[0];
    iconBadge.setAttribute("size", "xs");
    iconBadge.setAttribute("variant", "dot");

    if (suffix?.tagName === "SWIRL-TAG") return;

    suffix?.setAttribute("size", smallIcon ? "20" : "24");
  }

  render() {
    const showBadge = Boolean(this.badge);
    const showIconBadge = Boolean(this.iconBadge);
    const showSuffixSlot = Boolean(this.el.querySelector('[slot="suffix"]'));
    const showSuffix =
      (Boolean(this.suffix) || showSuffixSlot) && !this.disabled;

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
            >
              {showIconBadge && (
                <span
                  class="action-list-item__icon__badge"
                  innerHTML={this.iconBadge}
                  ref={(el) => (this.iconBadgeEl = el)}
                ></span>
              )}
            </span>
          )}

          <span class="action-list-item__label-container">
            <span class="action-list-item__label">{this.label}</span>
            {this.description && (
              <span class="action-list-item__description">
                {this.description}
              </span>
            )}
          </span>
          {showBadge && (
            <span class="action-list-item__badge" innerHTML={this.badge}></span>
          )}
          {showSuffix && (
            <span
              class="action-list-item__suffix"
              innerHTML={!showSuffixSlot ? this.suffix : undefined}
              ref={(el) => (this.suffixEl = el)}
            >
              <slot name="suffix"></slot>
            </span>
          )}
        </button>
      </Host>
    );
  }
}
