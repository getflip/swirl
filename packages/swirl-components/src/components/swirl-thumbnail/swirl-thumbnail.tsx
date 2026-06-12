import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";
import { SwirlCursor } from "../../utils";

export type SwirlThumbnailFormat = "portrait" | "landscape" | "square";

export type SwirlThumbnailSize = "s" | "m" | "l" | "xl" | "2xl";

const COMPACT_SIZES: SwirlThumbnailSize[] = ["s", "m", "l"];

@Component({
  shadow: true,
  styleUrl: "swirl-thumbnail.css",
  tag: "swirl-thumbnail",
})
export class SwirlThumbnail {
  @Prop() alt!: string;
  @Prop() cursor?: SwirlCursor = "pointer";
  @Prop() editButtonIcon?: string = "<swirl-icon-crop></swirl-icon-crop>";
  @Prop() editButtonLabel?: string = "Edit";
  @Prop() error?: boolean;
  @Prop() format?: SwirlThumbnailFormat = "landscape";
  @Prop() interactive?: boolean;
  @Prop() menuButtonLabel?: string = "More actions";
  @Prop() openButtonIcon?: string =
    "<swirl-icon-visibility></swirl-icon-visibility>";
  @Prop() openButtonLabel?: string = "Open";
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
  @Event({ eventName: "remove" }) removeThumbnail?: EventEmitter<MouseEvent>;
  @Event() thumbnailClick: EventEmitter<MouseEvent>;

  @State() hasHover: boolean = true;

  private hoverMediaQuery?: MediaQueryList;
  private popoverEl?: HTMLSwirlPopoverElement;
  private popoverTriggerEl?: HTMLSwirlPopoverTriggerElement;

  connectedCallback() {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    this.hoverMediaQuery = window.matchMedia("(hover: hover)");
    this.hasHover = this.hoverMediaQuery.matches;
    this.hoverMediaQuery.addEventListener?.("change", this.onHoverChange);
  }

  disconnectedCallback() {
    this.hoverMediaQuery?.removeEventListener?.("change", this.onHoverChange);
    this.hoverMediaQuery = undefined;
  }

  componentDidRender() {
    if (this.popoverTriggerEl && this.popoverEl) {
      this.popoverTriggerEl.swirlPopover = this.popoverEl;
    }
  }

  private onEditClick = (event: MouseEvent) => {
    this.edit.emit(event);
    this.popoverEl?.close();
  };

  private onOpenClick = (event: MouseEvent) => {
    this.thumbnailClick.emit(event);
    this.popoverEl?.close();
  };

  private onRemoveClick = (event: MouseEvent) => {
    this.removeThumbnail.emit(event);
    this.popoverEl?.close();
  };

  private onHoverChange = (event: MediaQueryListEvent) => {
    this.hasHover = event.matches;
  };

  render() {
    const isCompact = COMPACT_SIZES.includes(this.size);
    const isUploading = this.progress !== undefined;
    const showError = Boolean(this.error);
    const showUploadingOverlay = isUploading && !showError;

    const showEditButton = Boolean(this.showEditButton);
    const showRemoveButton = Boolean(this.showRemoveButton);
    const hasAnyAction = showEditButton || showRemoveButton;

    const useThumbnailAsPopoverTrigger = !this.hasHover && hasAnyAction;

    const showCompactMenu =
      isCompact && this.hasHover && showEditButton && showRemoveButton;
    const showCompactEditButton =
      isCompact && this.hasHover && showEditButton && !showRemoveButton;
    const showCompactRemoveButton =
      isCompact && this.hasHover && showRemoveButton && !showEditButton;
    const showSegmentedGroup = !isCompact && this.hasHover && hasAnyAction;
    const showPopover = showCompactMenu || useThumbnailAsPopoverTrigger;
    const showOpenAction = useThumbnailAsPopoverTrigger && this.interactive;

    const showTimestamp = Boolean(this.timestamp) && this.size !== "s";
    const hideTimestampForUploading = isUploading && isCompact;

    const isImageWrapperButton =
      this.interactive || useThumbnailAsPopoverTrigger;
    const ImageWrapper = isImageWrapperButton ? "button" : "span";

    const className = classnames(
      "thumbnail",
      `thumbnail--format-${this.format}`,
      `thumbnail--size-${this.size}`,
      {
        "thumbnail--interactive": this.interactive,
        "thumbnail--uploading-bar": isUploading && !isCompact,
      }
    );

    const imageWrapper = (
      <ImageWrapper
        class="thumbnail__image-wrapper"
        onClick={
          useThumbnailAsPopoverTrigger ? undefined : this.thumbnailClick.emit
        }
        style={
          isImageWrapperButton && this.cursor !== "pointer"
            ? { cursor: this.cursor }
            : undefined
        }
        type={isImageWrapperButton ? "button" : undefined}
      >
        <img
          alt={this.alt}
          class="thumbnail__image"
          loading="lazy"
          src={this.src}
        />
      </ImageWrapper>
    );

    return (
      <Host>
        <span class={className} role="group">
          {useThumbnailAsPopoverTrigger ? (
            <swirl-popover-trigger
              ref={(el) => (this.popoverTriggerEl = el)}
              swirlPopover={this.popoverEl}
            >
              {imageWrapper}
            </swirl-popover-trigger>
          ) : (
            imageWrapper
          )}

          {showUploadingOverlay && (
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

          {showError && (
            <span class="thumbnail__error">
              <swirl-icon-error color="critical"></swirl-icon-error>
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
                    onClick={this.removeThumbnail.emit}
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
                  showCompactEditButton ? this.edit.emit : this.removeThumbnail.emit
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
            </span>
          )}

          {showPopover && (
            <swirl-popover
              label={this.menuButtonLabel}
              placement="bottom-end"
              padded={false}
              ref={(el) => (this.popoverEl = el)}
            >
              <swirl-action-list>
                {showOpenAction && (
                  <swirl-action-list-item
                    icon={this.openButtonIcon}
                    label={this.openButtonLabel}
                    onClick={this.onOpenClick}
                  ></swirl-action-list-item>
                )}
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
          )}

          {showTimestamp && !hideTimestampForUploading && (
            <span class="thumbnail__timestamp">{this.timestamp}</span>
          )}
        </span>
      </Host>
    );
  }
}
