import classnames from "classnames";
import { v4 as uuid } from "uuid";

import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from "@stencil/core";
import { DesktopMediaQuery } from "../../services/media-query.service";
import { SwirlResourceListSemantics } from "../swirl-resource-list/swirl-resource-list";
import { SwirlTooltipPosition } from "../swirl-tooltip/swirl-tooltip";

export type SwirlResourceListItemLabelWeight =
  | "medium"
  | "regular"
  | "semibold"
  | "bold";

export type SwirlResourceListItemAriaCurrent =
  | "page"
  | "step"
  | "location"
  | "date"
  | "time"
  | "true";

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
  @Prop() allowHtml?: boolean;
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
  @Prop() labelMinHeight?: string;
  @Prop() labelTooltip?: string;
  @Prop() labelTooltipPosition?: SwirlTooltipPosition = "top";
  @Prop() menuTriggerId?: string;
  @Prop() menuTriggerLabel?: string = "Options";
  @Prop() meta?: string;
  @Prop() selectable?: boolean;
  @Prop() swirlAriaCurrent?: SwirlResourceListItemAriaCurrent;
  @Prop() swirlAriaLabel?: string;
  @Prop() value?: string;
  @Prop() alignItems?: string;

  @State() hasMedia: boolean = false;
  @State() iconSize: 20 | 24 = 24;

  @Event() toggleDrag: EventEmitter<HTMLSwirlResourceListItemElement>;
  @Event() valueChange: EventEmitter<boolean>;

  private elementId = uuid();
  private iconEl: HTMLElement;
  private mediaQueryUnsubscribe: () => void = () => {};
  private parentSemantics: SwirlResourceListSemantics | undefined;

  componentWillLoad() {
    this.updateMediaState();
  }

  componentDidLoad() {
    this.parentSemantics = this.el.closest("swirl-resource-list")?.semantics;

    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.forceIconProps(isDesktop);
      this.updateIconSize(isDesktop);
    });

    this.makeControlUnfocusable();

    if (Boolean(this.menuTriggerId)) {
      console.warn(
        '[Swirl] The "menu-trigger-id" prop of swirl-resource-list-item is deprecated and will be removed with the next major release. Please use the "control" slot to add a menu button instead. https://swirl-storybook.flip-app.dev/?path=/docs/components-swirlresourcelistitem--docs'
      );
    }
  }

  disconnectedCallback() {
    this.mediaQueryUnsubscribe();
  }

  private get hasBadges() {
    return Boolean(this.el.querySelector("[slot='badges']"));
  }

  private get showMeta() {
    return (Boolean(this.meta) || this.hasBadges) && !this.selectable;
  }

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
    if (this.parentSemantics !== "grid") {
      return;
    }

    const control = this.getControl();

    if (!Boolean(control)) {
      return;
    }

    control.tabIndex = 0;
  }

  private makeControlUnfocusable() {
    if (this.parentSemantics !== "grid") {
      return;
    }

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
    event.preventDefault();
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

    const hasBadges = this.hasBadges;
    const hasControl = this.el.querySelector("[slot='control']");
    const hasMenu = Boolean(this.menuTriggerId) || hasControl;

    const href = this.interactive && Boolean(this.href) ? this.href : undefined;

    const showControlOnFocus = hasControl && (Boolean(this.meta) || hasBadges);
    const showMenu =
      Boolean(this.menuTriggerId) && !Boolean(this.meta) && !this.selectable;
    const showMeta = this.showMeta;

    const ariaLabel = Boolean(this.swirlAriaLabel)
      ? this.swirlAriaLabel
      : this.label;
    const ariaChecked = this.selectable ? String(this.checked) : undefined;
    const role = this.interactive && this.selectable ? "checkbox" : undefined;
    const hostRole = !!this.el.closest('[role="grid"]') ? "row" : "listitem";
    const containerRole = hostRole === "row" ? "gridcell" : undefined;

    const labelContainerStyles = {
      minHeight: this.labelMinHeight ?? undefined,
    };

    const renderLabel = () => (
      <span
        class="resource-list-item__label"
        id={this.elementId}
        innerHTML={this.allowHtml ? this.label : undefined}
      >
        {!this.allowHtml && this.label}
      </span>
    );

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
      <Host role={hostRole}>
        <div class={className} role={containerRole} onClick={this.onClick}>
          <Tag
            aria-checked={ariaChecked}
            aria-current={this.swirlAriaCurrent}
            aria-disabled={disabled ? "true" : undefined}
            aria-label={ariaLabel}
            aria-labelledby={
              Boolean(this.swirlAriaLabel) ? undefined : this.elementId
            }
            class="resource-list-item__content"
            style={{ alignItems: this.alignItems }}
            href={href}
            disabled={disabled}
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
              {this.labelTooltip ? (
                <swirl-tooltip
                  content={this.labelTooltip}
                  position={this.labelTooltipPosition}
                  positioning="fixed"
                >
                  {renderLabel()}
                </swirl-tooltip>
              ) : (
                renderLabel()
              )}
              {this.description && (
                <span
                  class="resource-list-item__description"
                  innerHTML={this.allowHtml ? this.description : undefined}
                >
                  {!this.allowHtml && this.description}
                </span>
              )}
            </span>
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
          {showMeta && (
            <span class="resource-list-item__meta">
              {this.meta && (
                <span class="resource-list-item__meta-text">{this.meta}</span>
              )}
              <span class="resource-list-item__badges">
                <slot name="badges"></slot>
              </span>
            </span>
          )}
          <span
            class="resource-list-item__control"
            onClick={this.onControlClick}
          >
            <slot name="control"></slot>
          </span>
          {showMenu && (
            <swirl-popover-trigger swirlPopover={this.menuTriggerId}>
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
