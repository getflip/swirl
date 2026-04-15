import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlThumbnailFormat = "portrait" | "landscape" | "square";

export type SwirlThumbnailSize = "s" | "m" | "l" | "xl" | "2xl";

const COMPACT_SIZES: Record<SwirlThumbnailFormat, SwirlThumbnailSize[]> = {
  landscape: ["s", "m"],
  square: ["s", "m"],
  portrait: ["s", "m", "l", "xl"],
};

@Component({
  shadow: true,
  styleUrl: "swirl-thumbnail.css",
  tag: "swirl-thumbnail",
})
export class SwirlThumbnail {
  @Prop() alt!: string;
  @Prop() editButtonIcon?: string = "<swirl-icon-crop></swirl-icon-crop>";
  @Prop() editButtonLabel?: string = "Edit";
  @Prop() format?: SwirlThumbnailFormat = "landscape";
  @Prop() interactive?: boolean;
  @Prop() menuButtonLabel?: string = "More actions";
  @Prop() progress?: number;
  @Prop() progressLabel?: string = "Loading progress";
  @Prop() removeButtonIcon?: string = "<swirl-icon-delete></swirl-icon-delete>";
  @Prop() removeButtonLabel?: string = "Remove";
  @Prop() showEditButton?: boolean;
  @Prop() showRemoveButton?: boolean;
  @Prop() size?: SwirlThumbnailSize = "m";
  @Prop() src!: string;
  @Prop() timestamp?: string;

  @Event() edit: EventEmitter<MouseEvent>;
  @Event() remove: EventEmitter<MouseEvent>;
  @Event() thumbnailClick: EventEmitter<MouseEvent>;

  private popoverEl?: HTMLSwirlPopoverElement;
  private popoverTriggerEl?: HTMLSwirlPopoverTriggerElement;

  componentDidLoad() {
    if (this.popoverTriggerEl && this.popoverEl) {
      this.popoverTriggerEl.swirlPopover = this.popoverEl;
    }
  }

  private onEditClick = (event: MouseEvent) => {
    this.edit.emit(event);
    this.popoverEl?.close();
  };

  private onRemoveClick = (event: MouseEvent) => {
    this.remove.emit(event);
    this.popoverEl?.close();
  };

  render() {
    const isCompact = COMPACT_SIZES[this.format].includes(this.size);
    const isUploading = this.progress !== undefined;

    const showEditButton = Boolean(this.showEditButton);
    const showRemoveButton = Boolean(this.showRemoveButton);
    const hasAnyAction = showEditButton || showRemoveButton;

    const showCompactMenu = isCompact && showEditButton && showRemoveButton;
    const showCompactEditButton =
      isCompact && showEditButton && !showRemoveButton;
    const showCompactRemoveButton =
      isCompact && showRemoveButton && !showEditButton;
    const showSegmentedGroup = !isCompact && hasAnyAction;

    const showTimestamp = Boolean(this.timestamp) && this.size !== "s";
    const hideTimestampForUploading = isUploading && isCompact;

    const ImageWrapper = this.interactive ? "button" : "span";

    const className = classnames(
      "thumbnail",
      `thumbnail--format-${this.format}`,
      `thumbnail--size-${this.size}`,
      {
        "thumbnail--interactive": this.interactive,
        "thumbnail--uploading-bar": isUploading && !isCompact,
      }
    );

    return (
      <Host>
        <span class={className} role="group">
          <ImageWrapper
            class="thumbnail__image-wrapper"
            onClick={this.thumbnailClick.emit}
            type={this.interactive ? "button" : undefined}
          >
            <img
              alt={this.alt}
              class="thumbnail__image"
              loading="lazy"
              src={this.src}
            />
          </ImageWrapper>

          {isUploading && (
            <span
              class={
                isCompact
                  ? "thumbnail__uploading-overlay"
                  : "thumbnail__progress-indicator"
              }
            >
              <swirl-progress-indicator
                label={this.progressLabel}
                size={isCompact ? "s" : undefined}
                value={this.progress}
                variant={isCompact ? "circle" : undefined}
              ></swirl-progress-indicator>
            </span>
          )}

          {showSegmentedGroup && (
            <swirl-button-group
              class="thumbnail__buttons"
              segmented={showEditButton && showRemoveButton}
            >
              {showEditButton && (
                <span>
                  <swirl-button
                    hideLabel
                    icon={this.editButtonIcon}
                    label={this.editButtonLabel}
                    onClick={this.edit.emit}
                    variant="on-image"
                  ></swirl-button>
                </span>
              )}
              {showRemoveButton && (
                <span>
                  <swirl-button
                    hideLabel
                    icon={this.removeButtonIcon}
                    label={this.removeButtonLabel}
                    onClick={this.remove.emit}
                    variant="on-image"
                  ></swirl-button>
                </span>
              )}
            </swirl-button-group>
          )}

          {(showCompactEditButton || showCompactRemoveButton) && (
            <span class="thumbnail__compact-action">
              <button
                aria-label={
                  showCompactEditButton
                    ? this.editButtonLabel
                    : this.removeButtonLabel
                }
                class="thumbnail__compact-button"
                onClick={
                  showCompactEditButton ? this.edit.emit : this.remove.emit
                }
                type="button"
              >
                <span
                  innerHTML={
                    showCompactEditButton
                      ? this.editButtonIcon
                      : this.removeButtonIcon
                  }
                  ref={(el) => el?.children[0]?.setAttribute("size", "20")}
                ></span>
              </button>
            </span>
          )}

          {showCompactMenu && (
            <span class="thumbnail__compact-action">
              <swirl-popover-trigger
                ref={(el) => (this.popoverTriggerEl = el)}
                swirlPopover={this.popoverEl}
              >
                <button
                  aria-label={this.menuButtonLabel}
                  class="thumbnail__compact-button"
                  type="button"
                >
                  <swirl-icon-more-horizontal
                    size={20}
                  ></swirl-icon-more-horizontal>
                </button>
              </swirl-popover-trigger>
              <swirl-popover
                label={this.menuButtonLabel}
                placement="bottom-end"
                padded={false}
                ref={(el) => (this.popoverEl = el)}
              >
                <swirl-action-list>
                  {showEditButton && (
                    <swirl-action-list-item
                      icon={this.editButtonIcon}
                      label={this.editButtonLabel}
                      onClick={this.onEditClick}
                    ></swirl-action-list-item>
                  )}
                  {showRemoveButton && (
                    <swirl-action-list-item
                      icon={this.removeButtonIcon}
                      intent="critical"
                      label={this.removeButtonLabel}
                      onClick={this.onRemoveClick}
                    ></swirl-action-list-item>
                  )}
                </swirl-action-list>
              </swirl-popover>
            </span>
          )}

          {showTimestamp && !hideTimestampForUploading && (
            <span class="thumbnail__timestamp">{this.timestamp}</span>
          )}
        </span>
      </Host>
    );
  }
}
