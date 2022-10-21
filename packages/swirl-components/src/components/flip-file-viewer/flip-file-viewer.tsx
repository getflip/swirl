import { Component, h, Host, Method, Prop } from "@stencil/core";
import { saveAs } from "file-saver";
import { FlipFileViewerPdfZoom } from "./viewers/flip-file-viewer-pdf/flip-file-viewer-pdf";

@Component({
  shadow: true,
  styleUrl: "flip-file-viewer.css",
  tag: "flip-file-viewer",
})
export class FlipFileViewer {
  @Prop() active?: boolean = true;
  @Prop() description?: string;
  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;
  @Prop() type!: string;
  @Prop() typeUnsupportedMessage?: string = "File type is not supported.";
  @Prop() zoom?: FlipFileViewerPdfZoom = 1;

  private viewer: HTMLElement;

  /**
   * Download the file.
   */
  @Method()
  async download() {
    const fileName = this.file.split("/").pop();

    saveAs(this.file, fileName);
  }

  /**
   * Print the file. Applicable to PDFs only.
   */
  @Method()
  async print() {
    if (this.type === "application/pdf") {
      (this.viewer as HTMLFlipFileViewerPdfElement).print();
    }
  }

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
                <flip-file-viewer-image
                  description={this.description}
                  errorMessage={this.errorMessage}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                ></flip-file-viewer-image>
              )}

              {/* text files */}
              {this.type === "text/plain" && (
                <flip-file-viewer-text
                  errorMessage={this.errorMessage}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                ></flip-file-viewer-text>
              )}

              {/* csv files */}
              {this.type === "text/csv" && (
                <flip-file-viewer-csv
                  errorMessage={this.errorMessage}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                ></flip-file-viewer-csv>
              )}

              {/* pdf files */}
              {this.type === "application/pdf" && (
                <flip-file-viewer-pdf
                  errorMessage={this.errorMessage}
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                  zoom={this.zoom}
                ></flip-file-viewer-pdf>
              )}

              {/* video files */}
              {this.type.startsWith("video/") && (
                <flip-file-viewer-video
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                  type={this.type}
                ></flip-file-viewer-video>
              )}

              {/* audio files */}
              {this.type.startsWith("audio/") && (
                <flip-file-viewer-audio
                  file={this.file}
                  ref={(el) => (this.viewer = el)}
                  type={this.type}
                ></flip-file-viewer-audio>
              )}

              {unsupportedType && (
                <flip-inline-error
                  message={this.typeUnsupportedMessage}
                ></flip-inline-error>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
