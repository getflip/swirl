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

export type SwirlBannerAriaRole = "alert" | "status";

export type SwirlBannerIntent =
  | "default"
  | "critical"
  | "success"
  | "warning"
  | "info";

const flipBannerIconMapping: { [key in SwirlBannerIntent]: string } = {
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

  @Event() action?: EventEmitter<MouseEvent>;
  @Event() dismiss?: EventEmitter<MouseEvent>;

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
                  type="button"
                >
                  <swirl-icon-close></swirl-icon-close>
                </button>
              )}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
