import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlThumbnailFormat = "portrait" | "landscape" | "square";

export type SwirlThumbnailSize = "s" | "m" | "l" | "xl";

@Component({
  shadow: true,
  styleUrl: "swirl-thumbnail.css",
  tag: "swirl-thumbnail",
})
export class SwirlThumbnail {
  @Prop() alt!: string;
  @Prop() format?: SwirlThumbnailFormat = "landscape";
  @Prop() progress?: number;
  @Prop() progressLabel?: string = "Loading progress";
  @Prop() removeButtonLabel?: string = "Remove";
  @Prop() showRemoveButton?: boolean;
  @Prop() size?: SwirlThumbnailSize = "m";
  @Prop() src!: string;
  @Prop() timestamp?: string;

  @Event() remove: EventEmitter<MouseEvent>;

  render() {
    const showRemoveButton =
      this.showRemoveButton && this.size === "xl" && this.format === "square";

    const showTimestamp =
      Boolean(this.timestamp) && this.size === "xl" && this.format === "square";

    const className = classnames(
      "thumbnail",
      `thumbnail--format-${this.format}`,
      `thumbnail--size-${this.size}`,
      {
        "thumbnail--has-progress": this.progress !== undefined,
      }
    );

    return (
      <Host>
        <span class={className} role="group">
          <img
            alt={this.alt}
            class="thumbnail__image"
            loading="lazy"
            src={this.src}
          />
          {this.progress !== undefined && (
            <span class="thumbnail__progress-indicator">
              <swirl-progress-indicator
                label={this.progressLabel}
                value={this.progress}
              ></swirl-progress-indicator>
            </span>
          )}
          {showRemoveButton && (
            <span class="thumbnail__remove-button">
              <swirl-button
                hideLabel
                icon="<swirl-icon-close></swirl-icon-close>"
                label={this.removeButtonLabel}
                onClick={this.remove.emit}
                pill
                variant="on-image"
              ></swirl-button>
            </span>
          )}
          {showTimestamp && (
            <span class="thumbnail__timestamp">{this.timestamp}</span>
          )}
        </span>
      </Host>
    );
  }
}
