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
  | "info";

@Component({
  shadow: true,
  styleUrl: "swirl-tag.css",
  tag: "swirl-tag",
})
export class SwirlTag {
  @Element() el: HTMLElement;

  @Prop() intent?: SwirlTagIntent = "default";
  @Prop() label!: string;
  @Prop() removable?: boolean;
  @Prop() bordered?: boolean;
  @Prop() removalButtonLabel?: string = "Remove";

  @Event() remove?: EventEmitter<MouseEvent>;

  private onRemove = (event: MouseEvent) => {
    this.remove?.emit(event);
  };

  render() {
    const className = classnames("tag", `tag--intent-${this.intent}`, {
      "tag--bordered": this.bordered,
    });

    return (
      <Host>
        <span class={className} part="tag">
          <span class="tag__label">{this.label}</span>
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
