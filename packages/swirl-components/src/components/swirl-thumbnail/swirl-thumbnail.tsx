import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlThumbnailFormat = "portrait" | "landscape" | "square";

export type SwirlThumbnailSize = "s" | "m" | "l" | "xl" | "2xl";

@Component({
  shadow: true,
  styleUrl: "swirl-thumbnail.css",
  tag: "swirl-thumbnail",
})
export class SwirlThumbnail {
  @Prop() alt!: string;
  @Prop() editButtonIcon?: string = "<swirl-icon-edit></swirl-icon-edit>";
  @Prop() editButtonLabel?: string = "Edit";
  @Prop() format?: SwirlThumbnailFormat = "landscape";
  @Prop() interactive?: boolean;
  @Prop() progress?: number;
  @Prop() progressLabel?: string = "Loading progress";
  @Prop() removeButtonLabel?: string = "Remove";
  @Prop() showEditButton?: boolean;
  @Prop() showRemoveButton?: boolean;
  @Prop() size?: SwirlThumbnailSize = "m";
  @Prop() src!: string;
  @Prop() timestamp?: string;

  @Event() edit: EventEmitter<MouseEvent>;
  @Event() remove: EventEmitter<MouseEvent>;

  render() {
    const isLargeSize = this.size === "xl" || this.size === "2xl";

    const showRemoveButton =
      this.showRemoveButton && isLargeSize && this.format === "square";

    const showEditButton =
      this.showEditButton && isLargeSize && this.format === "square";

    const showTimestamp =
      Boolean(this.timestamp) &&
      !showEditButton &&
      isLargeSize &&
      this.format === "square";

    const ImageWrapper = this.interactive ? "button" : "span";

    const className = classnames(
      "thumbnail",
      `thumbnail--format-${this.format}`,
      `thumbnail--size-${this.size}`,
      {
        "thumbnail--interactive": this.interactive,
        "thumbnail--has-progress": this.progress !== undefined,
      }
    );

    return (
      <Host>
        <span class={className} role="group">
          <ImageWrapper
            class="thumbnail__image-wrapper"
            type={this.interactive ? "button" : undefined}
          >
            <img
              alt={this.alt}
              class="thumbnail__image"
              loading="lazy"
              src={this.src}
            />
          </ImageWrapper>
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
          {showEditButton && (
            <span class="thumbnail__edit-button">
              <swirl-button
                hideLabel
                icon={this.editButtonIcon}
                label={this.editButtonLabel}
                onClick={this.edit.emit}
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
