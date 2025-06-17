import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-video.css",
  tag: "swirl-file-viewer-video",
})
export class SwirlFileViewerVideo {
  @Element() el: HTMLElement;

  @Prop() autoplay?: boolean;
  @Prop() disableDownload?: boolean;
  @Prop() file!: string;

  @Event() activate: EventEmitter<HTMLElement>;

  private videoEl: HTMLVideoElement;

  componentDidLoad() {
    this.activate.emit(this.el);

    if (this.disableDownload) {
      this.videoEl.setAttribute("controlsList", "nodownload");
    }
  }

  @Watch("disableDownload")
  watchDisableDownload() {
    if (this.disableDownload) {
      this.videoEl.setAttribute("controlsList", "nodownload");
    } else {
      this.videoEl.removeAttribute("controlsList");
    }
  }

  render() {
    return (
      <Host class="file-viewer-video">
        <video
          autoplay={this.autoplay}
          class="file-viewer-video__video"
          src={this.file}
          controls
          ref={(el) => (this.videoEl = el)}
        ></video>
      </Host>
    );
  }
}
