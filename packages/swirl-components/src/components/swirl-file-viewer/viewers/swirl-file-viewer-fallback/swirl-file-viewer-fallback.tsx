import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import { saveAs } from "file-saver";

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-fallback.css",
  tag: "swirl-file-viewer-fallback",
})
export class SwirlFileViewerFallback {
  @Element() el: HTMLElement;

  @Prop() disableDownload?: boolean;
  @Prop() downloadButtonLabel?: string = "Download";
  @Prop() fileName?: string;
  @Prop() file!: string;

  @Event() activate: EventEmitter<HTMLElement>;

  componentDidLoad() {
    this.activate.emit(this.el);
  }

  download = async (event: Event) => {
    event.preventDefault();

    const fileName = this.fileName || this.file.split("/").pop();
    const file = await fetch(this.file);

    saveAs(await file.blob(), fileName);
  };

  render() {
    return (
      <Host class="file-viewer-fallback">
        <swirl-stack align="center" height="100%" justify="center" spacing="16">
          <swirl-icon-file
            class="file-viewer-fallback__icon"
            color="on-image"
            size={28}
          ></swirl-icon-file>
          {this.fileName && (
            <swirl-text color="on-image" size="lg" weight="medium">
              {this.fileName}
            </swirl-text>
          )}
          {!this.disableDownload && (
            <swirl-button
              download={this.fileName}
              href={this.file}
              icon="<swirl-icon-download></swirl-icon-download>"
              label={this.downloadButtonLabel}
              onClick={this.download}
              variant="on-image"
            ></swirl-button>
          )}
        </swirl-stack>
      </Host>
    );
  }
}
