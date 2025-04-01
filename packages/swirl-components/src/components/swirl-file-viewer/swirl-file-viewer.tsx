import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
} from "@stencil/core";
import { saveAs } from "file-saver";
import {
  SwirlFileViewerPdfViewMode,
  SwirlFileViewerPdfZoom,
} from "./viewers/swirl-file-viewer-pdf/swirl-file-viewer-pdf";

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer.css",
  tag: "swirl-file-viewer",
})
export class SwirlFileViewer {
  @Prop() active?: boolean = true;
  @Prop() autoplay?: boolean;
  @Prop() description?: string;
  @Prop() disableDownload?: boolean;
  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;
  @Prop() fileName?: string;
  @Prop() pdfWorkerSrc?: string;
  @Prop() thumbnailUrl?: string;
  @Prop() type!: string;
  @Prop() typeUnsupportedMessage?: string = "File type is not supported.";
  @Prop() viewMode?: SwirlFileViewerPdfViewMode = "single";
  @Prop() zoom?: SwirlFileViewerPdfZoom = 1;
  @Prop() skipNativeDownload?: boolean = false;

  @Event() activate: EventEmitter<HTMLElement>;
  @Event() visiblePagesChange: EventEmitter<number[]>;
  @Event() downloadStart: EventEmitter<void>;

  private viewer: HTMLElement;

  /**
   * Download the file.
   */
  @Method()
  async download() {
    this.downloadStart.emit();
    if (this.skipNativeDownload) return;

    const fileName = this.fileName || this.file.split("/").pop();

    const file = await fetch(this.file);

    saveAs(await file.blob(), fileName);
  }

  /**
   * Print the file. Applicable to PDFs only.
   */
  @Method()
  async print() {
    if (this.type === "application/pdf") {
      (this.viewer as HTMLSwirlFileViewerPdfElement).print();
    }
  }

  private onActivate = (event: CustomEvent<HTMLElement>) => {
    this.activate.emit(event.detail);
  };

  private onVisiblePagesChange = (event: CustomEvent<number[]>) => {
    this.visiblePagesChange.emit(event.detail);
  };

  render() {
    const unsupportedType =
      !Boolean(this.type) ||
      (!this.type.startsWith("image/") &&
        !this.type.startsWith("video/") &&
        !this.type.startsWith("audio/") &&
        this.type !== "text/plain" &&
        this.type !== "text/csv" &&
        this.type !== "application/pdf");

    return (
      <Host>
        <div class="file-viewer">
          {this.type && this.active && (
            <div class="file-viewer__file">
              {/* images */}
              {this.type.startsWith("image/") && (
                <swirl-file-viewer-image
                  description={this.description}
                  errorMessage={this.errorMessage}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                ></swirl-file-viewer-image>
              )}

              {/* text files */}
              {this.type === "text/plain" && (
                <swirl-file-viewer-text
                  errorMessage={this.errorMessage}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                ></swirl-file-viewer-text>
              )}

              {/* csv files */}
              {this.type === "text/csv" && (
                <swirl-file-viewer-csv
                  errorMessage={this.errorMessage}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                ></swirl-file-viewer-csv>
              )}

              {/* pdf files */}
              {this.type === "application/pdf" && (
                <swirl-file-viewer-pdf
                  errorMessage={this.errorMessage}
                  file={this.file}
                  onActivate={this.onActivate}
                  onVisiblePagesChange={this.onVisiblePagesChange}
                  ref={(el) => (this.viewer = el)}
                  viewMode={this.viewMode}
                  workerSrc={this.pdfWorkerSrc}
                  zoom={this.zoom}
                ></swirl-file-viewer-pdf>
              )}

              {/* video files */}
              {this.type.startsWith("video/") && (
                <swirl-file-viewer-video
                  autoplay={this.autoplay}
                  disableDownload={this.disableDownload}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                  type={this.type}
                ></swirl-file-viewer-video>
              )}

              {/* audio files */}
              {this.type.startsWith("audio/") && (
                <swirl-file-viewer-audio
                  autoplay={this.autoplay}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                  type={this.type}
                ></swirl-file-viewer-audio>
              )}

              {/* fallback */}
              {unsupportedType && (
                <swirl-file-viewer-fallback
                  disableDownload={this.disableDownload}
                  file={this.file}
                  fileName={this.fileName}
                ></swirl-file-viewer-fallback>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
