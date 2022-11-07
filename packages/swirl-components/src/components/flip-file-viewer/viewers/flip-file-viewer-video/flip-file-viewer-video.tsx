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
  styleUrl: "flip-file-viewer-video.css",
  tag: "flip-file-viewer-video",
})
export class FlipFileViewerVideo {
  @Element() el: HTMLElement;

  @Prop() file!: string;
  @Prop() type!: string;

  @Event() activate: EventEmitter<HTMLElement>;

  componentDidLoad() {
    this.activate.emit(this.el);
  }

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
