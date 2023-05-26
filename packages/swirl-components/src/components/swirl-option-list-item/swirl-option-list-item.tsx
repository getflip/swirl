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

export type SwirlOptionListItemContext = "single-select" | "multi-select";

export type SwirlOptionListItemRole = "option" | "menuitemradio";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-option-list-item.css",
  tag: "swirl-option-list-item",
})
export class SwirlOptionListItem {
  @Element() el: HTMLSwirlOptionListItemElement;

  @Prop() allowDrag?: boolean;
  @Prop({ mutable: true }) context?: SwirlOptionListItemContext =
    "single-select";
  @Prop() disabled?: boolean;
  @Prop() dragging?: boolean;
  @Prop() dragHandleDescription?: string = "Press spacebar to toggle grab";
  @Prop() dragHandleLabel?: string = "Move option";
  @Prop() icon?: string;
  @Prop() label!: string;
  @Prop({ mutable: true }) selected?: boolean = false;
  @Prop() swirlAriaRole?: SwirlOptionListItemRole = "option";
  @Prop() value!: string;

  @Event() toggleDrag: EventEmitter<HTMLSwirlOptionListItemElement>;

  @State() iconSize: 20 | 24 = 24;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);
    this.updateIconSize(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
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

  private onDragHandleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      this.toggleDrag.emit(this.el);
    }
  };

  render() {
    const ariaDisabled = this.disabled ? "true" : undefined;
    const ariaSelected = String(this.selected);

    const showCheckbox = this.context === "multi-select";
    const showIcon = Boolean(this.icon) && this.context === "single-select";
    const showSelectionIcon = this.selected && this.context === "single-select";

    const className = classnames(
      "option-list-item",
      `option-list-item--context-${this.context}`,
      {
        "option-list-item--disabled": this.disabled,
        "option-list-item--draggable": this.allowDrag,
        "option-list-item--dragging": this.dragging,
        "option-list-item--selected": this.selected,
      }
    );

    return (
      <Host>
        <div
          aria-checked={
            this.swirlAriaRole === "menuitemradio" ? ariaSelected : undefined
          }
          aria-disabled={ariaDisabled}
          aria-selected={
            this.swirlAriaRole === "option" ? ariaSelected : undefined
          }
          class={className}
          part="option-list-item"
          role={this.swirlAriaRole}
        >
          {showIcon && (
            <span
              class="option-list-item__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          {showCheckbox && (
            <span class="option-list-item__checkbox">
              <span class="option-list-item__checkbox-box">
                {this.selected && (
                  <swirl-icon-check-strong
                    class="option-list-item__checkbox-icon"
                    size={16}
                  ></swirl-icon-check-strong>
                )}
              </span>
            </span>
          )}
          <span class="option-list-item__label" part="option-list-item__label">
            {this.label}
          </span>
          {showSelectionIcon && (
            <span class="option-list-item__selection-icon">
              <swirl-icon-check-small
                size={this.iconSize}
              ></swirl-icon-check-small>
            </span>
          )}
        </div>
        {this.allowDrag && (
          <button
            aria-describedby={this.dragHandleDescription}
            aria-label={`${this.dragHandleLabel} "${this.label}"`}
            class="option-list-item__drag-handle"
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
