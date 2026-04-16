import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import { saveAs } from "file-saver";
import {
  isAudioMimeType,
  isCompressedArchiveMimeType,
  isDocumentMimeType,
  isPdfMimeType,
  isSupportedImageMimeType,
  isVideoMimeType,
} from "../../utils";

type SwirlFileChipFileType =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "compressed"
  | "document"
  | "unknown";

@Component({
  shadow: true,
  styleUrl: "swirl-file-chip.css",
  tag: "swirl-file-chip",
})
export class SwirlFileChip {
  @Prop() description?: string;
  @Prop() downloadButtonLabel?: string = "Download";
  @Prop() loading?: boolean;
  @Prop() loadingLabel?: string = "Loading …";
  @Prop() name!: string;
  @Prop() previewButtonLabel?: string = "Preview";
  @Prop() removeButtonLabel?: string = "Remove";
  @Prop() showDownloadButton?: boolean;
  @Prop() showPreviewButton?: boolean;
  @Prop() showRemoveButton?: boolean;
  @Prop() skipNativeDownload?: boolean;
  @Prop() type!: string;
  @Prop() url!: string;

  @Event() download: EventEmitter<void>;
  @Event() preview: EventEmitter<void>;
  @Event() remove: EventEmitter<void>;

  @State() fileType: SwirlFileChipFileType = "unknown";
  @State() isHovered: boolean = false;

  private readonly fileIconMap: Record<SwirlFileChipFileType, JSX.Element> = {
    image: <swirl-icon-image size={20}></swirl-icon-image>,
    video: <swirl-icon-video-player size={20}></swirl-icon-video-player>,
    audio: <swirl-icon-audio-file size={20}></swirl-icon-audio-file>,
    pdf: <swirl-icon-picture-as-pdf size={20}></swirl-icon-picture-as-pdf>,
    compressed: <swirl-icon-folder size={20}></swirl-icon-folder>,
    document: <swirl-icon-file size={20}></swirl-icon-file>,
    unknown: <swirl-icon-attachment size={20}></swirl-icon-attachment>,
  };

  componentWillLoad() {
    this.setFileType();
  }

  @Watch("type")
  watchType() {
    this.setFileType();
  }

  private handleClick = () => {
    if (this.loading) {
      return;
    }

    if (this.showPreviewButton) {
      this.handlePreviewClick();
    } else if (this.showDownloadButton) {
      this.handleDownloadClick();
    }
  };

  private handleDownloadClick = (event?: Event) => {
    event?.stopPropagation();
    this.download.emit();

    if (this.skipNativeDownload) {
      return;
    }

    const fileName = this.name || this.url.split("/").pop();

    fetch(this.url)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      });
  };

  private handlePreviewClick = (event?: Event) => {
    event?.stopPropagation();
    this.preview.emit();
  };

  private handleRemoveClick = (event?: Event) => {
    event?.stopPropagation();
    this.remove.emit();
  };

  private getFileIcon() {
    if (this.loading) {
      return <swirl-spinner size="s" label={this.loadingLabel}></swirl-spinner>;
    }

    return this.fileIconMap[this.fileType];
  }

  private setFileType() {
    if (isSupportedImageMimeType(this.type)) {
      this.fileType = "image";
    } else if (isVideoMimeType(this.type)) {
      this.fileType = "video";
    } else if (isAudioMimeType(this.type)) {
      this.fileType = "audio";
    } else if (isPdfMimeType(this.type)) {
      this.fileType = "pdf";
    } else if (isCompressedArchiveMimeType(this.type)) {
      this.fileType = "compressed";
    } else if (isDocumentMimeType(this.type)) {
      this.fileType = "document";
    } else {
      this.fileType = "unknown";
    }
  }

  render() {
    const hasAction =
      this.showPreviewButton ||
      this.showDownloadButton ||
      this.showRemoveButton;

    const noSuffix =
      !this.description &&
      !this.showPreviewButton &&
      !this.showDownloadButton &&
      !this.showRemoveButton;

    const hasDescription = this.description || this.loading;

    const className = classnames(
      "file-chip",
      `file-chip--type-${this.fileType}`,
      {
        "file-chip--loading": this.loading,
        "file-chip--has-description": hasDescription,
        "file-chip--has-download-action": this.showDownloadButton,
        "file-chip--has-preview-action": this.showPreviewButton,
        "file-chip--no-actions": !hasAction,
        "file-chip--no-suffix": noSuffix,
      }
    );

    return (
      <Host>
        <span
          aria-label={this.name}
          class={className}
          onClick={this.handleClick}
          role="group"
        >
          <span class="file-chip__icon">{this.getFileIcon()}</span>
          <span class="file-chip__info">
            <span class="file-chip__name" title={this.name}>
              {this.name}
            </span>
            <span class="file-chip__suffix">
              {(this.description || this.loading) && (
                <span class="file-chip__description">
                  {this.loading ? this.loadingLabel : this.description}
                </span>
              )}
              {hasAction && !this.loading && (
                <span class="file-chip__actions">
                  {this.showPreviewButton && (
                    <swirl-button
                      disabled={this.loading}
                      hideLabel
                      icon="<swirl-icon-preview></swirl-icon-preview>"
                      label={this.previewButtonLabel}
                      onClick={this.handlePreviewClick}
                      part="file-chip__preview"
                      variant="plain"
                    ></swirl-button>
                  )}
                  {this.showDownloadButton && (
                    <swirl-button
                      disabled={this.loading}
                      hideLabel
                      icon="<swirl-icon-download></swirl-icon-download>"
                      label={this.downloadButtonLabel}
                      onClick={this.handleDownloadClick}
                      part="file-chip__download"
                      variant="plain"
                    ></swirl-button>
                  )}
                  {this.showRemoveButton && (
                    <swirl-button
                      disabled={this.loading}
                      hideLabel
                      icon="<swirl-icon-close></swirl-icon-close>"
                      label={this.removeButtonLabel}
                      onClick={this.handleRemoveClick}
                      part="file-chip__remove"
                      variant="plain"
                    ></swirl-button>
                  )}
                </span>
              )}
            </span>
          </span>
        </span>
      </Host>
    );
  }
}
