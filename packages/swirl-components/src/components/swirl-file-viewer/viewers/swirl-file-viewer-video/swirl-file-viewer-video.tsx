import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-video.css",
  tag: "flip-file-viewer-video",
})
export class FlipFileViewerVideo {
  @Element() el: HTMLElement;

  @Prop() autoplay?: boolean;
  @Prop() file!: string;
  @Prop() type!: string;

  @Event() activate: EventEmitter<HTMLElement>;

  componentDidLoad() {
    this.activate.emit(this.el);
  }

  render() {
    return (
      <Host class="file-viewer-video">
        <video
          autoplay={this.autoplay}
          class="file-viewer-video__video"
          controls
        >
          <source src={this.file} type={this.type}></source>
        </video>
      </Host>
    );
  }
}
