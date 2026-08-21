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

export type SwirlChipIconColor = "default" | "highlight";

export type SwirlChipIntent = "default" | "critical" | "highlight";

/**
 * @slot avatar - Optional avatar displayed inside the chip. Should have size "xs".
 * @slot trailing-content - Optional content displayed at the end of the chip.
 */
@Component({
  shadow: false,
  scoped: true,
  styleUrl: "swirl-chip.css",
  tag: "swirl-chip",
})
export class SwirlChip {
  @Element() el: HTMLElement;

  @Prop() disabled?: boolean;
  @Prop() icon?: string;
  @Prop() iconColor?: SwirlChipIconColor = "default";
  @Prop() trailingIcon?: string;
  @Prop() intent?: SwirlChipIntent = "default";
  @Prop() interactive?: boolean = false;
  @Prop() label!: string;
  @Prop() pressed?: boolean;
  @Prop() removable?: boolean;
  @Prop() removeButtonLabel?: string = "Remove";
  @Prop() swirlAriaLabel?: string;

  @Event() chipClick: EventEmitter<MouseEvent>;
  @Event({ eventName: "remove" }) removeChip?: EventEmitter<MouseEvent>;

  private iconEl: HTMLElement;
  private trailingIconEl: HTMLElement;

  componentDidRender() {
    this.forceIconProps();
  }

  private forceIconProps() {
    if (!Boolean(this.iconEl) && !Boolean(this.trailingIconEl)) {
      return;
    }

    const iconSize = "20";

    if (this.iconEl) {
      const icon = this.iconEl.children[0];
      icon?.setAttribute("size", iconSize);
    }

    if (this.trailingIconEl) {
      const trailingIcon = this.trailingIconEl.children[0];
      trailingIcon?.setAttribute("size", iconSize);
    }
  }

  render() {
    const Tag =
      this.interactive || this.pressed !== undefined ? "button" : "span";

    const showAvatar = Boolean(this.el.querySelector('[slot="avatar"]'));
    const showIcon = !showAvatar && Boolean(this.icon);
    const showTrailingContent = Boolean(
      this.el.querySelector('[slot="trailing-content"]')
    );

    const className = classnames(
      "chip",
      `chip--icon-color-${this.iconColor}`,
      `chip--intent-${this.intent}`,
      {
        "chip--pressed": this.pressed,
        "chip--interactive": this.interactive || this.pressed !== undefined,
        "chip--removable": this.removable,
      }
    );

    return (
      <Host>
        <Tag
          aria-disabled={this.interactive && this.disabled ? "true" : undefined}
          aria-label={this.swirlAriaLabel}
          aria-pressed={
            this.pressed !== undefined ? String(this.pressed) : undefined
          }
          class={className}
          disabled={this.interactive ? this.disabled : undefined}
          onClick={this.chipClick.emit}
          type={this.interactive ? "button" : undefined}
        >
          <span class="chip__inner">
            {showAvatar && (
              <span class="chip__avatar">
                <slot name="avatar"></slot>
              </span>
            )}
            {showIcon && (
              <span
                class="chip__icon"
                innerHTML={this.icon}
                ref={(el) => (this.iconEl = el)}
              ></span>
            )}
            <span class="chip__label">{this.label}</span>
            {this.trailingIcon && (
              <span
                class="chip__trailing-icon"
                innerHTML={this.trailingIcon}
                ref={(el) => (this.trailingIconEl = el)}
              ></span>
            )}
            {showTrailingContent && (
              <span class="chip__trailing-content">
                <slot name="trailing-content"></slot>
              </span>
            )}
          </span>
        </Tag>
        {this.removable && (
          <button
            aria-disabled={this.disabled ? "true" : undefined}
            aria-label={this.removeButtonLabel}
            class="chip__remove-button"
            disabled={this.disabled}
            onClick={this.removeChip.emit}
            type="button"
          >
            <swirl-icon-close size={20}></swirl-icon-close>
          </button>
        )}
      </Host>
    );
  }
}
