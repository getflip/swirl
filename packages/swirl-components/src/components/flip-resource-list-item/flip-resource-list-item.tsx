import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import classnames from "classnames";

@Component({
  shadow: true,
  styleUrl: "flip-resource-list-item.css",
  tag: "flip-resource-list-item",
})
export class FlipResourceListItem {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) checked?: boolean = false;
  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() hideDivider?: boolean;
  @Prop() href?: string;
  @Prop() label!: string;
  @Prop() media?: string;
  @Prop() menuTriggerId?: string;
  @Prop() menuTriggerLabel?: string = "Options";
  @Prop() meta?: string;
  @Prop() selectable?: boolean;
  @Prop() value?: string;

  @Event() valueChange: EventEmitter<boolean>;

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

  private onChange = (event: CustomEvent<boolean>) => {
    if (!this.selectable) {
      return;
    }

    this.checked = event.detail;
    this.valueChange.emit(event.detail);
  };

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
      "resource-list-item--has-menu": hasMenu,
      "resource-list-item--hide-divider": this.hideDivider,
    });

    return (
      <Host>
        <div class={className}>
          <Tag
            aria-checked={ariaChecked}
            aria-disabled={disabled ? "true" : undefined}
            aria-labelledby="label"
            class="resource-list-item__content"
            href={this.href}
            disabled={disabled}
            onClick={this.onClick}
            role={role}
            tabIndex={0}
          >
            {Boolean(this.media) && (
              <span
                class="resource-list-item__media"
                innerHTML={this.media}
              ></span>
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
            <span class="resource-list-item__checkbox">
              <flip-checkbox
                ariaLabelledBy="label"
                checked={this.checked}
                disabled={this.disabled}
                inputId="checkbox"
                inputName="checkbox"
                onValueChange={this.onChange}
                role="presentation"
                value={this.value}
              ></flip-checkbox>
            </span>
          )}
          {showMeta && (
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
