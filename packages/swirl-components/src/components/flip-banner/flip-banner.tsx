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

export type FlipBannerAriaRole = "alert" | "status";

export type FlipBannerIntent =
  | "default"
  | "neutral"
  | "critical"
  | "success"
  | "warning"
  | "info";

/**
 * @slot slot - Provide optional details.
 */
@Component({
  shadow: true,
  styleUrl: "flip-banner.css",
  tag: "flip-banner",
})
export class FlipBanner {
  @Element() element: HTMLElement;

  @Prop() actionLabel?: string;
  @Prop() heading!: string;
  @Prop() icon?: string;
  @Prop() importance?: FlipBannerAriaRole = "status";
  @Prop() intent?: FlipBannerIntent = "default";

  @State() hasBody: boolean = false;

  @Event() actionClick?: EventEmitter<MouseEvent>;

  componentWillLoad() {
    this.hasBody = Boolean(this.element.innerHTML);
  }

  onActionClick = (event: MouseEvent) => {
    this.actionClick.emit(event);
  };

  render() {
    const className = classnames("banner", `banner--intent-${this.intent}`, {
      "banner--has-body": this.hasBody,
    });

    return (
      <Host>
        <div
          aria-describedby={this.hasBody ? "body" : "heading"}
          class={className}
          role={this.importance}
          tabIndex={0}
        >
          <span class="banner__top">
            {this.icon && (
              <span
                aria-hidden="true"
                class="banner__icon"
                innerHTML={this.icon}
              ></span>
            )}
            <span class="banner__heading" id="heading">
              {this.heading}
            </span>
            {this.actionLabel && (
              <button
                class="banner__action"
                onClick={this.onActionClick}
                type="button"
              >
                {this.actionLabel}
              </button>
            )}
          </span>
          <span class="banner__body" id="body">
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
}
