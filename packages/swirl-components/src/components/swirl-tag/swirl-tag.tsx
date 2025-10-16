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

export type SwirlTagIntent =
  | "default"
  | "critical"
  | "warning"
  | "success"
  | "info"
  | "special"
  | "translucent";

export type SwirlTagSize = "s" | "m";

export type SwirlTagVariant = "default" | "outline" | "strong";

export type SwirlTagIconPosition = "start" | "end";

@Component({
  shadow: true,
  styleUrl: "swirl-tag.css",
  tag: "swirl-tag",
})
export class SwirlTag {
  @Element() el: HTMLElement;

  @Prop() hideLabel?: boolean;
  @Prop() icon?: string;
  @Prop() iconPosition: SwirlTagIconPosition = "start";
  @Prop() intent?: SwirlTagIntent = "default";
  @Prop() label!: string;
  @Prop() removable?: boolean;
  @Prop() bordered?: boolean;
  @Prop() size?: SwirlTagSize = "m";
  @Prop() removalButtonLabel?: string = "Remove";
  @Prop({ mutable: true }) variant?: SwirlTagVariant = "default";

  @Event({ eventName: "remove" }) removeTag?: EventEmitter<MouseEvent>;

  private iconEl: HTMLElement;

  componentDidLoad() {
    this.forceIconProps();
  }

  componentWillLoad() {
    this.forceVariant();
  }

  componentDidRender() {
    this.forceIconProps();
  }

  private forceIconProps() {
    const icon = this.iconEl?.children[0];

    icon?.setAttribute("size", "16");
  }

  private forceVariant() {
    if (Boolean(this.bordered)) {
      console.warn(
        '[Swirl] The "bordered" prop of swirl-tag is deprecated and will be removed with the next major release. Please use the "variant" prop as "outline" to achieve the same result.'
      );
      this.variant = "outline";
    }
  }

  private onRemove = (event: MouseEvent) => {
    this.removeTag?.emit(event);
  };

  render() {
    const className = classnames(
      "tag",
      `tag--icon-position-${this.iconPosition}`,
      `tag--intent-${this.intent}`,
      `tag--size-${this.size}`,
      `tag--variant-${this.variant}`,
      { "tag--hide-label": this.hideLabel }
    );

    return (
      <Host>
        <span class={className} part="tag">
          {this.icon && (
            <span
              class="tag__icon"
              innerHTML={this.icon}
              ref={(el) => (this.iconEl = el)}
            ></span>
          )}
          {!this.hideLabel ? (
            <span class="tag__label">{this.label}</span>
          ) : (
            <swirl-visually-hidden>{this.label}</swirl-visually-hidden>
          )}
          {this.removable && (
            <button
              aria-label={this.removalButtonLabel}
              class="tag__removal-button"
              onClick={this.onRemove}
              tabIndex={this.el.ariaHidden === "true" ? -1 : undefined}
              type="button"
            >
              <swirl-icon-close size={16}></swirl-icon-close>
            </button>
          )}
        </span>
      </Host>
    );
  }
}
