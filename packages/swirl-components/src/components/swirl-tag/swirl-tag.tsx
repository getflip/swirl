import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
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
  @Prop() intent?: SwirlTagIntent = "default";
  @Prop() label!: string;
  @Prop() removable?: boolean;
  @Prop() removalButtonLabel?: string = "Remove";

  @Event() remove?: EventEmitter<MouseEvent>;

  private onRemove = (event: MouseEvent) => {
    this.remove?.emit(event);
  };

  render() {
    const className = classnames("tag", `tag--intent-${this.intent}`);

    return (
      <Host>
        <span class={className}>
          {this.label}
          {this.removable && (
            <button
              aria-label={this.removalButtonLabel}
              class="tag__removal-button"
              onClick={this.onRemove}
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
