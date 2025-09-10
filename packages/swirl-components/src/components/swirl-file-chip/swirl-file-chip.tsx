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
  @Prop() url!: string;
  @Prop() name!: string;
  @Prop() type!: string;
  @Prop() description?: string;
  @Prop() loading?: boolean;
  @Prop() loadingLabel?: string = "Loading";
  @Prop() skipNativeDownload?: boolean;
  @Prop() showDownloadButton?: boolean;
  @Prop() showPreviewButton?: boolean;
  @Prop() downloadButtonLabel?: string = "Download";
  @Prop() previewButtonLabel?: string = "Preview";

  @Event() preview: EventEmitter<void>;
  @Event() download: EventEmitter<void>;

  @State() isHovered: boolean = false;
  @State() fileType: SwirlFileChipFileType = "unknown";

  private readonly fileIconMap: Record<SwirlFileChipFileType, JSX.Element> = {
    image: <swirl-icon-image></swirl-icon-image>,
    video: <swirl-icon-video-player></swirl-icon-video-player>,
    audio: <swirl-icon-audio-file></swirl-icon-audio-file>,
    pdf: <swirl-icon-picture-as-pdf></swirl-icon-picture-as-pdf>,
    compressed: <swirl-icon-folder></swirl-icon-folder>,
    document: <swirl-icon-file></swirl-icon-file>,
    unknown: <swirl-icon-attachment></swirl-icon-attachment>,
  };

  componentWillLoad() {
    this.setFileType();
  }

  @Watch("type")
  watchType() {
    this.setFileType();
  }

  private handleDownloadClick = () => {
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

  private handlePreviewClick = () => {
    this.preview.emit();
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
    const actionCount = +this.showPreviewButton + +this.showDownloadButton;

    const className = classnames(
      "file-chip",
      `file-chip--type-${this.fileType}`,
      {
        "file-chip--loading": this.loading,
        "file-chip--one-action": actionCount === 1,
        "file-chip--two-actions": actionCount === 2,
      }
    );

    return (
      <Host>
        <span role="group" class={className}>
          <span class="file-chip__icon">{this.getFileIcon()}</span>
          <span class="file-chip__info">
            <span class="file-chip__name" title={this.name}>
              {this.name}
            </span>
            {this.description && (
              <span class="file-chip__description">{this.description}</span>
            )}
          </span>
          <swirl-button-group class="file-chip__actions">
            {this.showPreviewButton && (
              <swirl-button
                variant="flat"
                icon="<swirl-icon-preview></swirl-icon-preview>"
                onClick={this.handlePreviewClick}
                label={this.previewButtonLabel}
                hideLabel
                part="file-chip__preview"
              ></swirl-button>
            )}
            {this.showDownloadButton && (
              <swirl-button
                variant="flat"
                icon="<swirl-icon-download></swirl-icon-download>"
                onClick={this.handleDownloadClick}
                label={this.downloadButtonLabel}
                hideLabel
                part="file-chip__download"
              ></swirl-button>
            )}
          </swirl-button-group>
        </span>
      </Host>
    );
  }
}
