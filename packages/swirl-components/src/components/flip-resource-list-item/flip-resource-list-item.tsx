import { Component, Element, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot media - Optional media; a FlipAvatar, FlipAvatarGroup or FlipThumbnail.
 */
@Component({
  shadow: true,
  styleUrl: "flip-resource-list-item.css",
  tag: "flip-resource-list-item",
})
export class FlipResourceListItem {
  @Element() el: HTMLElement;

  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() hideDivider?: boolean;
  @Prop() href?: string;
  @Prop() label!: string;
  @Prop() menuTriggerId?: string;
  @Prop() menuTriggerLabel?: string = "Options";
  @Prop() meta?: string;
  @Prop() selectable?: boolean;

  componentDidLoad() {
    this.forceAvatarProps();
    this.forceThumbnailProps();
  }

  private forceAvatarProps() {
    const avatarEl = this.el.querySelector("flip-avatar");

    if (!Boolean(avatarEl)) {
      return;
    }

    avatarEl.removeAttribute("interactive");
    avatarEl.removeAttribute("show-label");
    avatarEl.removeAttribute("variant");

    avatarEl.setAttribute("size", "l");
  }

  private forceThumbnailProps() {
    const thumbnailEl = this.el.querySelector("flip-thumbnail");

    if (!Boolean(thumbnailEl)) {
      return;
    }

    thumbnailEl.setAttribute("format", "landscape");

    if (!["s", "m"].includes(thumbnailEl.getAttribute("size"))) {
      thumbnailEl.setAttribute("size", "m");
    }
  }

  private onMenuTriggerClick = (event: MouseEvent) => {
    if (this.disabled && !Boolean(this.href)) {
      event.stopPropagation();
    }
  };

  render() {
    const Tag = Boolean(this.href) ? "a" : this.selectable ? "label" : "button";

    const disabled = this.disabled && !Boolean(this.href);
    const hasMenu = Boolean(this.menuTriggerId);
    const showMenu = hasMenu && !Boolean(this.meta);

    const className = classnames("resource-list-item", {
      "resource-list-item--has-menu": hasMenu,
      "resource-list-item--hide-divider": this.hideDivider,
    });

    return (
      <Host>
        <div class={className}>
          <Tag
            aria-disabled={disabled ? "true" : undefined}
            class="resource-list-item__content"
            href={this.href}
            disabled={disabled}
            tabIndex={0}
          >
            <span class="resource-list-item__media">
              <slot name="media"></slot>
            </span>
            <span class="resource-list-item__label-container">
              <span class="resource-list-item__label">{this.label}</span>
              {this.description && (
                <span class="resource-list-item__description">
                  {this.description}
                </span>
              )}
            </span>
          </Tag>
          {this.meta && (
            <span class="resource-list-item__meta">{this.meta}</span>
          )}
          {showMenu && (
            <flip-button
              aria-disabled={disabled ? "true" : undefined}
              class="resource-list-item__menu-trigger"
              disabled={disabled}
              hideLabel
              icon="<flip-icon-more-horizontal></flip-icon-more-horizontal>"
              id={this.menuTriggerId}
              intent="primary"
              label={this.menuTriggerLabel}
              onClick={this.onMenuTriggerClick}
            ></flip-button>
          )}
        </div>
      </Host>
    );
  }
}
