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
import { desktopMediaQuery } from "../../utils";

export type FlipBannerAriaRole = "alert" | "status";

export type FlipBannerIntent =
  | "default"
  | "critical"
  | "success"
  | "warning"
  | "info";

const flipBannerIconMapping: { [key in FlipBannerIntent]: string } = {
  default: undefined,
  critical: "<flip-icon-error></flip-icon-error>",
  success: "<flip-icon-check-circle></flip-icon-check-circle>",
  warning: "<flip-icon-warning></flip-icon-warning>",
  info: "<flip-icon-info></flip-icon-info>",
};

@Component({
  shadow: true,
  styleUrl: "flip-banner.css",
  tag: "flip-banner",
})
export class FlipBanner {
  @Element() element: HTMLElement;

  @Prop() actionLabel?: string;
  @Prop() content!: string;
  @Prop() dismissable?: boolean = false;
  @Prop() dismissLabel?: string = "Dismiss";
  @Prop() importance?: FlipBannerAriaRole = "status";
  @Prop() intent?: FlipBannerIntent = "default";
  @Prop() showIcon?: boolean = false;

  @Event() action?: EventEmitter<MouseEvent>;
  @Event() dismiss?: EventEmitter<MouseEvent>;

  private dismissButtonEl: HTMLElement;
  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps(desktopMediaQuery.matches);

    desktopMediaQuery.addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  disconnectedCallback() {
    desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.forceIconProps(event.matches);
  };

  private forceIconProps(smallIcon: boolean) {
    const icon = this.iconEl?.children[0];
    const dismissButtonIcon = this.dismissButtonEl?.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
    dismissButtonIcon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  onAction = (event: MouseEvent) => {
    this.action.emit(event);
  };

  onDismiss = (event: MouseEvent) => {
    this.dismiss.emit(event);
  };

  render() {
    const icon = flipBannerIconMapping[this.intent];
    const showControls = Boolean(this.actionLabel) || this.dismissable;
    const showIcon = this.showIcon && Boolean(icon);

    const className = classnames("banner", `banner--intent-${this.intent}`, {
      "banner--has-icon": showIcon,
    });

    return (
      <Host>
        <div
          aria-describedby="content"
          class={className}
          role={this.importance}
          tabIndex={0}
        >
          {showIcon && (
            <span
              aria-hidden="true"
              class="banner__icon"
              innerHTML={icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          <span class="banner__content" id="content">
            {this.content}
          </span>
          {showControls && (
            <span class="banner__controls">
              {this.actionLabel && (
                <button
                  class="banner__action-button"
                  onClick={this.onAction}
                  type="button"
                >
                  {this.actionLabel}
                </button>
              )}
              {this.dismissable && (
                <button
                  aria-label={this.dismissLabel}
                  class="banner__dismiss-button"
                  onClick={this.onDismiss}
                  ref={(el) => (this.dismissButtonEl = el)}
                  type="button"
                >
                  <flip-icon-close></flip-icon-close>
                </button>
              )}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
