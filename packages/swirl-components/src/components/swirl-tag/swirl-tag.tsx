import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipTagIntent =
  | "default"
  | "critical"
  | "warning"
  | "success"
  | "info";

@Component({
  shadow: true,
  styleUrl: "swirl-tag.css",
  tag: "flip-tag",
})
export class FlipTag {
  @Prop() intent?: FlipTagIntent = "default";
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
              <flip-icon-close size={16}></flip-icon-close>
            </button>
          )}
        </span>
      </Host>
    );
  }
}
