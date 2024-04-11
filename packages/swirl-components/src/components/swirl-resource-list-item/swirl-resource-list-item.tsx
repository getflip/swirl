import classnames from 'classnames';
import { v4 as uuid } from 'uuid';

import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

import { getDesktopMediaQuery } from '../../utils';

export type SwirlResourceListItemLabelWeight = "medium" | "regular";

/**
 * @slot control - Used to add a menu button to the item
 * @slot badges - Badges displayed inside the item
 * @slot media - Media displayed inside the item (e.g. swirl-avatar)
 */
@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-resource-list-item.css",
  tag: "swirl-resource-list-item",
})
export class SwirlResourceListItem {
  @Element() el: HTMLSwirlResourceListItemElement;

  @Prop() active?: boolean;
  @Prop() allowDrag?: boolean;
  @Prop() allowHtml?: boolean = true;
  @Prop({ mutable: true }) checked?: boolean = false;
  @Prop() compact?: boolean;
  @Prop() description?: string;
  @Prop() descriptionWrap?: boolean;
  @Prop() disabled?: boolean;
  @Prop() dragging?: boolean;
  @Prop() dragHandleDescription?: string = "Press spacebar to toggle grab";
  @Prop() dragHandleLabel?: string = "Move item";
  @Prop() hideDivider?: boolean;
  @Prop() href?: string;
  @Prop() interactive?: boolean = true;
  @Prop() label!: string;
  @Prop() labelWeight?: SwirlResourceListItemLabelWeight = "medium";
  @Prop() labelWrap?: boolean;
  @Prop() menuTriggerId?: string;
  @Prop() menuTriggerLabel?: string = "Options";
  @Prop() meta?: string;
  @Prop() selectable?: boolean;
  @Prop() value?: string;

  @State() hasMedia: boolean = false;
  @State() iconSize: 20 | 24 = 24;

  @Event() toggleDrag: EventEmitter<HTMLSwirlResourceListItemElement>;
  @Event() valueChange: EventEmitter<boolean>;

  private controlContainer: HTMLElement;
  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;
  private id = uuid();

  async componentWillLoad() {
    this.updateMediaState();
  }

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);
    this.updateIconSize(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
    this.makeControlUnfocusable();

    if (Boolean(this.menuTriggerId)) {
      console.warn(
        '[Swirl] The "menu-trigger-id" prop of swirl-resource-list-item is deprecated and will be removed with the next major release. Please use the "control" slot to add a menu button instead. https://swirl-storybook.flip-app.dev/?path=/docs/components-swirlresourcelistitem--docs'
      );
    }
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

  private updateMediaState() {
    const mediaContainer = this.el.querySelector('[slot="media"]');
    const hasMedia = Boolean(mediaContainer);

    if (hasMedia !== this.hasMedia) {
      this.hasMedia = hasMedia;
    }
  }

  private getControl() {
    return this.el.querySelector<HTMLButtonElement>('[slot="control"] button');
  }

  private makeControlFocusable() {
    const control = this.getControl();

    if (!Boolean(control)) {
      return;
    }

    control.tabIndex = 0;
  }

  private makeControlUnfocusable() {
    const control = this.getControl();

    if (!Boolean(control)) {
      return;
    }

    control.tabIndex = -1;
  }

  private onClick = () => {
    if (!this.selectable) {
      return;
    }

    this.checked = !this.checked;
    this.valueChange.emit(this.checked);
  };

  private onBlur = () => {
    this.makeControlUnfocusable();
  };

  private onFocus = () => {
    this.makeControlFocusable();
  };

  private onMenuTriggerClick = (event: MouseEvent) => {
    if (this.disabled && !Boolean(this.href)) {
      event.stopPropagation();
    }
  };

  private onDragHandleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      this.toggleDrag.emit(this.el);
    }
  };

  private onControlClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  render() {
    const Tag =
      !this.interactive && !this.selectable
        ? "div"
        : Boolean(this.href) && !this.selectable
        ? "a"
        : "button";

    const disabled = this.disabled && !Boolean(this.href);

    const hasBadges = Boolean(this.el.querySelector("[slot='badges']"));
    const hasControl = this.el.querySelector("[slot='control']");
    const hasMenu = Boolean(this.menuTriggerId) || hasControl;

    const href = this.interactive && Boolean(this.href) ? this.href : undefined;

    const showControlOnFocus = hasControl && (Boolean(this.meta) || hasBadges);
    const showMenu =
      Boolean(this.menuTriggerId) && !Boolean(this.meta) && !this.selectable;
    const showMeta = (Boolean(this.meta) || hasBadges) && !this.selectable;

    const ariaChecked = this.selectable ? String(this.checked) : undefined;
    const role = this.interactive && this.selectable ? "checkbox" : undefined;

    const labelContainerStyles =
      !showMeta && Boolean(this.controlContainer)
        ? {
            paddingRight: `calc(${
              this.controlContainer?.getBoundingClientRect().width
            }px + var(--s-space-16))`,
          }
        : undefined;

    const className = classnames(
      "resource-list-item",
      `resource-list-item--label-weight-${this.labelWeight}`,
      {
        "resource-list-item--active": this.active,
        "resource-list-item--checked": this.checked,
        "resource-list-item--compact": this.compact,
        "resource-list-item--disabled": this.disabled,
        "resource-list-item--draggable": this.allowDrag,
        "resource-list-item--dragging": this.dragging,
        "resource-list-item--has-menu": hasMenu,
        "resource-list-item--hide-divider": this.hideDivider,
        "resource-list-item--interactive": this.interactive || this.selectable,
        "resource-list-item--selectable": this.selectable,
        "resource-list-item--show-control-on-focus": showControlOnFocus,
        "resource-list-item--show-meta": showMeta,
        "resource-list-item--wrap-description": this.descriptionWrap,
        "resource-list-item--wrap-label": this.labelWrap,
      }
    );

    return (
      <Host role="row">
        <div class={className} role="gridcell">
          <Tag
            aria-checked={ariaChecked}
            aria-disabled={disabled ? "true" : undefined}
            aria-labelledby={this.id}
            class="resource-list-item__content"
            href={href}
            disabled={disabled}
            onClick={this.onClick}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            part="resource-list-item__content"
            role={role}
            tabIndex={0}
            type={Tag === "button" ? "button" : undefined}
          >
            {this.hasMedia && (
              <span class="resource-list-item__media">
                <slot name="media"></slot>
              </span>
            )}
            <span
              class="resource-list-item__label-container"
              style={labelContainerStyles}
            >
              <span
                class="resource-list-item__label"
                id={this.id}
                innerHTML={this.allowHtml ? this.label : undefined}
              >
                {!this.allowHtml && this.label}
              </span>
              {this.description && (
                <span
                  class="resource-list-item__description"
                  innerHTML={this.allowHtml ? this.description : undefined}
                >
                  {!this.allowHtml && this.description}
                </span>
              )}
            </span>
            {showMeta && (
              <span class="resource-list-item__meta">
                <span class="resource-list-item__meta-text">{this.meta}</span>
                <span class="resource-list-item__badges">
                  <slot name="badges"></slot>
                </span>
              </span>
            )}
          </Tag>
          {this.selectable && (
            <span aria-hidden="true" class="resource-list-item__checkbox">
              <span class="resource-list-item__checkbox-icon">
                {this.checked && (
                  <swirl-icon-check-strong></swirl-icon-check-strong>
                )}
              </span>
            </span>
          )}
          <span
            class="resource-list-item__control"
            onClick={this.onControlClick}
            ref={(el) => (this.controlContainer = el)}
          >
            <slot name="control"></slot>
          </span>
          {showMenu && (
            <swirl-popover-trigger popover={this.menuTriggerId}>
              <swirl-button
                aria-disabled={disabled ? "true" : undefined}
                class="resource-list-item__menu-trigger"
                disabled={disabled}
                hideLabel
                icon="<swirl-icon-more-horizontal></swirl-icon-more-horizontal>"
                intent="primary"
                label={this.menuTriggerLabel}
                onClick={this.onMenuTriggerClick}
              ></swirl-button>
            </swirl-popover-trigger>
          )}
        </div>

        {this.allowDrag && (
          <button
            aria-describedby={this.dragHandleDescription}
            aria-label={`${this.dragHandleLabel} "${this.label}"`}
            class="resource-list-item__drag-handle"
            onKeyDown={this.onDragHandleKeyDown}
            type="button"
          >
            <swirl-icon-drag-handle
              size={this.iconSize}
            ></swirl-icon-drag-handle>
          </button>
        )}
      </Host>
    );
  }
}
