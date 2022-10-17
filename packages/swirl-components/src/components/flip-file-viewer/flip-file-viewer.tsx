import { Component, h, Host, Prop } from "@stencil/core";
import { FlipFileViewerPdfZoom } from "./viewers/flip-file-viewer-pdf/flip-file-viewer-pdf";

@Component({
  shadow: true,
  styleUrl: "flip-file-viewer.css",
  tag: "flip-file-viewer",
})
export class FlipFileViewer {
  @Prop() description?: string;
  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;
  @Prop() type!: string;
  @Prop() typeUnsupportedMessage?: string = "File type is not supported.";
  @Prop() zoom?: FlipFileViewerPdfZoom = 1;

  render() {
    const unsupportedType =
      !Boolean(this.type) ||
      (!this.type.startsWith("image/") &&
        !this.type.startsWith("text/") &&
        !this.type.startsWith("video/") &&
        !this.type.startsWith("audio/") &&
        this.type !== "application/pdf");

    return (
      <Host>
        <div class="file-viewer">
          {this.type && (
            <div class="file-viewer__file">
              {/* images */}
              {this.type.startsWith("image/") && (
                <flip-file-viewer-image
                  description={this.description}
                  file={this.file}
                ></flip-file-viewer-image>
              )}

              {/* text files */}
              {this.type.startsWith("text/") && (
                <flip-file-viewer-text file={this.file}></flip-file-viewer-text>
              )}

              {/* pdf files */}
              {this.type === "application/pdf" && (
                <flip-file-viewer-pdf
                  file={this.file}
                  zoom={this.zoom}
                ></flip-file-viewer-pdf>
              )}

              {/* video files */}
              {this.type.startsWith("video/") && (
                <flip-file-viewer-video
                  file={this.file}
                  type={this.type}
                ></flip-file-viewer-video>
              )}

              {/* audio files */}
              {this.type.startsWith("audio/") && (
                <flip-file-viewer-video
                  file={this.file}
                  type={this.type}
                ></flip-file-viewer-video>
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
