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
import { DesktopMediaQuery } from "../../services/media-query.service";

export type SwirlChipBorderRadius = "pill" | "sm";

export type SwirlChipIconColor = "default" | "highlight";

export type SwirlChipIntent = "default" | "critical" | "success";

export type SwirlChipSize = "s" | "m";

export type SwirlChipVariant = "outline" | "plain";

/**
 * @slot avatar - Optional avatar displayed inside the chip. Should have size "xs".
 */
@Component({
  shadow: false,
  scoped: true,
  styleUrl: "swirl-chip.css",
  tag: "swirl-chip",
})
export class SwirlChip {
  @Element() el: HTMLElement;

  @Prop() borderRadius?: SwirlChipBorderRadius = "pill";
  @Prop() icon?: string;
  @Prop() iconColor?: SwirlChipIconColor = "default";
  @Prop() intent?: SwirlChipIntent = "default";
  @Prop() interactive?: boolean = false;
  @Prop() label!: string;
  @Prop() progress?: number;
  @Prop() pressed?: boolean;
  @Prop() progressBarLabel?: string = "Loading progress";
  @Prop() removable?: boolean;
  @Prop() removeButtonLabel?: string = "Remove";
  @Prop() size?: SwirlChipSize = "m";
  @Prop() variant?: SwirlChipVariant = "outline";

  @Event() chipClick: EventEmitter<MouseEvent>;
  @Event({ eventName: "remove" }) removeChip?: EventEmitter<MouseEvent>;

  private iconEl: HTMLElement;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentDidLoad() {
    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.forceIconProps(isDesktop);
    });
  }

  disconnectedCallback() {
    this.mediaQueryUnsubscribe();
  }

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];
    const iconSize = this.size === "s" ? "16" : smallIcon ? "20" : "24";

    icon?.setAttribute("size", iconSize);
  }

  render() {
    const Tag =
      this.interactive || this.pressed !== undefined ? "button" : "span";

    const showAvatar = Boolean(this.el.querySelector('[slot="avatar"]'));
    const showIcon = !showAvatar && Boolean(this.icon);

    const className = classnames(
      "chip",
      `chip--border-radius-${this.borderRadius}`,
      `chip--icon-color-${this.iconColor}`,
      `chip--intent-${this.intent}`,
      `chip--size-${this.size}`,
      `chip--variant-${this.variant}`,
      {
        "chip--pressed": this.pressed,
        "chip--has-progress": this.progress !== undefined,
        "chip--interactive": this.interactive || this.pressed !== undefined,
        "chip--removable": this.removable,
      }
    );

    return (
      <Host>
        <Tag
          aria-pressed={
            this.pressed !== undefined ? String(this.pressed) : undefined
          }
          class={className}
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
          </span>
          {this.progress !== undefined && (
            <span class="chip__progress-indicator">
              <swirl-progress-indicator
                label={this.progressBarLabel}
                value={this.progress}
              ></swirl-progress-indicator>
            </span>
          )}
        </Tag>
        {this.removable && (
          <button
            aria-label={this.removeButtonLabel}
            class="chip__remove-button"
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
