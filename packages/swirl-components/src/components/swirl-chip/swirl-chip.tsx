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
import { getDesktopMediaQuery } from "../../utils";

export type SwirlChipBorderRadius = "pill" | "sm";

export type SwirlChipIconColor = "default" | "highlight";

export type SwirlChipIntent = "default" | "critical" | "success";

export type SwirlChipVariant = "outline" | "plain";

/**
 * @slot avatar - Optional avatar displayed inside the chip. Should have size "xs".
 */
@Component({
  shadow: true,
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
  @Prop() progressBarLabel?: string = "Loading progress";
  @Prop() removable?: boolean;
  @Prop() removeButtonLabel?: string = "Remove";
  @Prop() variant?: SwirlChipVariant = "outline";

  @Event() remove: EventEmitter<MouseEvent>;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  render() {
    const Tag = this.interactive ? "button" : "span";

    const showAvatar = Boolean(this.el.querySelector('[slot="avatar"]'));
    const showIcon = !showAvatar && Boolean(this.icon);

    const className = classnames(
      "chip",
      `chip--border-radius-${this.borderRadius}`,
      `chip--icon-color-${this.iconColor}`,
      `chip--intent-${this.intent}`,
      `chip--variant-${this.variant}`,
      {
        "chip--has-progress": this.progress !== undefined,
        "chip--interactive": this.interactive,
        "chip--removable": this.removable,
      }
    );

    return (
      <Host>
        <Tag class={className} type={this.interactive ? "button" : undefined}>
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
            onClick={this.remove.emit}
          >
            <swirl-icon-close size={20}></swirl-icon-close>
          </button>
        )}
      </Host>
    );
  }
}
