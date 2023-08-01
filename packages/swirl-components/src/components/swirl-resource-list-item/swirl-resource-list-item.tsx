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
import classnames from "classnames";
import { getDesktopMediaQuery } from "../../utils";

export type SwirlResourceListItemLabelWeight = "medium" | "regular";

/**
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

  @Prop() allowDrag?: boolean;
  @Prop({ mutable: true }) checked?: boolean = false;
  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() dragging?: boolean;
  @Prop() dragHandleDescription?: string = "Press spacebar to toggle grab";
  @Prop() dragHandleLabel?: string = "Move item";
  @Prop() hideDivider?: boolean;
  @Prop() href?: string;
  @Prop() interactive?: boolean = true;
  @Prop() label!: string;
  @Prop() labelWeight?: SwirlResourceListItemLabelWeight = "medium";
  @Prop() menuTriggerId?: string;
  @Prop() menuTriggerLabel?: string = "Options";
  @Prop() meta?: string;
  @Prop() selectable?: boolean;
  @Prop() value?: string;

  @State() hasMedia: boolean = false;
  @State() iconSize: 20 | 24 = 24;

  @Event() toggleDrag: EventEmitter<HTMLSwirlResourceListItemElement>;
  @Event() valueChange: EventEmitter<boolean>;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  async componentWillLoad() {
    this.updateMediaState();
  }

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);
    this.updateIconSize(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
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

  private onClick = () => {
    if (!this.selectable) {
      return;
    }

    this.checked = !this.checked;
    this.valueChange.emit(this.checked);
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

  render() {
    const Tag =
      !this.interactive && !this.selectable
        ? "div"
        : Boolean(this.href) && !this.selectable
        ? "a"
        : "button";

    const disabled = this.disabled && !Boolean(this.href);
    const hasMenu =
      Boolean(this.menuTriggerId) || this.el.querySelector("[slot='control']");
    const href = this.interactive && Boolean(this.href) ? this.href : undefined;
    const showMenu =
      Boolean(this.menuTriggerId) && !Boolean(this.meta) && !this.selectable;
    const showMeta = Boolean(this.meta) && !this.selectable;

    const ariaChecked = this.selectable ? String(this.checked) : undefined;
    const role = this.interactive && this.selectable ? "checkbox" : undefined;

    const className = classnames(
      "resource-list-item",
      `resource-list-item--label-weight-${this.labelWeight}`,
      {
        "resource-list-item--checked": this.checked,
        "resource-list-item--disabled": this.disabled,
        "resource-list-item--draggable": this.allowDrag,
        "resource-list-item--dragging": this.dragging,
        "resource-list-item--has-menu": hasMenu,
        "resource-list-item--hide-divider": this.hideDivider,
        "resource-list-item--interactive": this.interactive || this.selectable,
        "resource-list-item--selectable": this.selectable,
      }
    );

    return (
      <Host role="row">
        <div class={className} role="gridcell">
          <Tag
            aria-checked={ariaChecked}
            aria-disabled={disabled ? "true" : undefined}
            aria-labelledby="label"
            class="resource-list-item__content"
            href={href}
            disabled={disabled}
            onClick={this.onClick}
            part="resource-list-item__content"
            role={role}
            tabIndex={0}
          >
            {this.hasMedia && (
              <span class="resource-list-item__media">
                <slot name="media"></slot>
              </span>
            )}
            <span class="resource-list-item__label-container">
              <span
                class="resource-list-item__label"
                id="label"
                innerHTML={this.label}
              ></span>
              {this.description && (
                <span class="resource-list-item__description">
                  {this.description}
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
            <span class="resource-list-item__meta">{this.meta}</span>
          )}
          <span class="resource-list-item__control">
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
