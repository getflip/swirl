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

export type SwirlBannerAriaRole = "alert" | "status";

export type SwirlBannerIntent =
  | "default"
  | "critical"
  | "success"
  | "warning"
  | "info";

export type SwirlBannerSize = "s" | "m";

const swirlBannerIconMapping: { [key in SwirlBannerIntent]: string } = {
  default: undefined,
  critical: "<swirl-icon-error></swirl-icon-error>",
  success: "<swirl-icon-check-circle></swirl-icon-check-circle>",
  warning: "<swirl-icon-warning></swirl-icon-warning>",
  info: "<swirl-icon-info></swirl-icon-info>",
};

@Component({
  shadow: true,
  styleUrl: "swirl-banner.css",
  tag: "swirl-banner",
})
export class SwirlBanner {
  @Element() element: HTMLElement;

  @Prop() actionLabel?: string;
  @Prop() content!: string;
  @Prop() dismissable?: boolean = false;
  @Prop() dismissLabel?: string = "Dismiss";
  @Prop() importance?: SwirlBannerAriaRole = "status";
  @Prop() intent?: SwirlBannerIntent = "default";
  @Prop() showIcon?: boolean = false;
  @Prop() icon?: string;
  @Prop() size?: SwirlBannerSize = "m";

  @Event() action?: EventEmitter<MouseEvent>;
  @Event() dismiss?: EventEmitter<MouseEvent>;

  private dismissButtonEl: HTMLElement;
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
    const icon = this.iconEl?.children[0];
    const dismissButtonIcon = this.dismissButtonEl?.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
    dismissButtonIcon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  private determineIcon() {
    return this.icon ? this.icon : swirlBannerIconMapping[this.intent];
  }

  onAction = (event: MouseEvent) => {
    this.action.emit(event);
  };

  onDismiss = (event: MouseEvent) => {
    this.dismiss.emit(event);
  };

  render() {
    const icon = this.determineIcon();
    const showControls = Boolean(this.actionLabel) || this.dismissable;
    const showIcon = this.icon || (this.showIcon && Boolean(icon));

    const className = classnames(
      "banner",
      `banner--intent-${this.intent}`,
      `banner--size-${this.size}`,
      {
        "banner--has-icon": showIcon,
      }
    );

    return (
      <Host>
        <div
          aria-describedby="content"
          class={className}
          role={this.importance}
          tabIndex={0}
        >
          <div class="banner__content" id="content" part="banner__content">
            {showIcon && (
              <span
                aria-hidden="true"
                class="banner__icon"
                innerHTML={icon}
                ref={(el) => (this.iconEl = el)}
              ></span>
            )}
            <span class="banner__text">{this.content}</span>
          </div>
          {showControls && (
            <div class="banner__controls">
              {this.actionLabel && (
                <button
                  class="banner__action-button"
                  onClick={this.onAction}
                  part="banner__action-button"
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
                  part="banner__dismiss-button"
                  ref={(el) => (this.dismissButtonEl = el)}
                  type="button"
                >
                  <swirl-icon-close></swirl-icon-close>
                </button>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
