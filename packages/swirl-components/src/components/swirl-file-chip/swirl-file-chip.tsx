import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from "@stencil/core";
import { saveAs } from "file-saver";
import classnames from "classnames";
import {
  isAudioMimeType,
  isCompressedArchiveMimeType,
  isImageMimeType,
  isPdfMimeType,
  isVideoMimeType,
} from "../../utils";

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
  @Prop() loadingLabel?: string;
  @Prop() skipNativeDownload?: boolean;
  @Prop() showDownloadButton?: boolean;
  @Prop() showPreviewButton?: boolean;
  @Prop() downloadButtonLabel?: string;
  @Prop() previewButtonLabel?: string;

  @Event() preview: EventEmitter<void>;
  @Event() download: EventEmitter<void>;

  @State() isHovered: boolean = false;

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

    if (isImageMimeType(this.type)) {
      return <swirl-icon-image></swirl-icon-image>;
    } else if (isVideoMimeType(this.type)) {
      return <swirl-icon-video-player></swirl-icon-video-player>;
    } else if (isAudioMimeType(this.type)) {
      return <swirl-icon-audio-file></swirl-icon-audio-file>;
    } else if (isPdfMimeType(this.type)) {
      return <swirl-icon-picture-as-pdf></swirl-icon-picture-as-pdf>;
    } else if (isCompressedArchiveMimeType(this.type)) {
      return <swirl-icon-folder></swirl-icon-folder>;
    } else {
      return <swirl-icon-attachment></swirl-icon-attachment>;
    }
  }

  render() {
    const actionCount = +this.showPreviewButton + +this.showDownloadButton;

    const className = classnames("file-chip", {
      "file-chip--loading": this.loading,
      "file-chip--one-action": actionCount === 1,
      "file-chip--two-actions": actionCount === 2,
    });

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
                label={this.downloadButtonLabel}
                hideLabel
              ></swirl-button>
            )}
            {this.showDownloadButton && (
              <swirl-button
                variant="flat"

                icon="<swirl-icon-download></swirl-icon-download>"
                onClick={this.handleDownloadClick}
                label={this.previewButtonLabel}
                hideLabel
              ></swirl-button>
            )}
          </swirl-button-group>
        </span>
      </Host>
    );
  }
}
