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

/**
 * @slot media - Media displayed inside the item (e.g. swirl-avatar)
 */
@Component({
  shadow: true,
  styleUrl: "swirl-resource-list-item.css",
  tag: "swirl-resource-list-item",
})
export class SwirlResourceListItem {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) checked?: boolean = false;
  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() hideDivider?: boolean;
  @Prop() href?: string;
  @Prop() label!: string;
  @Prop() menuTriggerId?: string;
  @Prop() menuTriggerLabel?: string = "Options";
  @Prop() meta?: string;
  @Prop() selectable?: boolean;
  @Prop() value?: string;

  @State() hasMedia: boolean = false;

  @Event() valueChange: EventEmitter<boolean>;

  async componentWillLoad() {
    this.updateMediaState();
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

  render() {
    const Tag = Boolean(this.href) && !this.selectable ? "a" : "button";

    const disabled = this.disabled && !Boolean(this.href);
    const hasMenu = Boolean(this.menuTriggerId);
    const showMenu = hasMenu && !Boolean(this.meta) && !this.selectable;
    const showMeta = Boolean(this.meta) && !this.selectable;

    const ariaChecked = this.selectable ? String(this.checked) : undefined;
    const role = this.selectable ? "checkbox" : undefined;

    const className = classnames("resource-list-item", {
      "resource-list-item--checked": this.checked,
      "resource-list-item--has-menu": hasMenu,
      "resource-list-item--hide-divider": this.hideDivider,
      "resource-list-item--selectable": this.selectable,
    });

    return (
      <Host role="row">
        <div class={className} role="gridcell">
          <Tag
            aria-checked={ariaChecked}
            aria-disabled={disabled ? "true" : undefined}
            aria-labelledby="label"
            class="resource-list-item__content"
            href={this.href}
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
              <span class="resource-list-item__label" id="label">
                {this.label}
              </span>
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
          {showMenu && (
            <swirl-button
              aria-disabled={disabled ? "true" : undefined}
              class="resource-list-item__menu-trigger"
              disabled={disabled}
              hideLabel
              icon="<swirl-icon-more-horizontal></swirl-icon-more-horizontal>"
              id={this.menuTriggerId}
              intent="primary"
              label={this.menuTriggerLabel}
              onClick={this.onMenuTriggerClick}
            ></swirl-button>
          )}
        </div>
      </Host>
    );
  }
}
