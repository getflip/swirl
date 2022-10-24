import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-file-viewer-video.css",
  tag: "flip-file-viewer-video",
})
export class FlipFileViewerVideo {
  @Prop() file!: string;
  @Prop() type!: string;

  render() {
    return (
      <Host class="file-viewer-video">
        <video class="file-viewer-video__video" controls>
          <source src={this.file} type={this.type}></source>
        </video>
      </Host>
    );
  }
}
