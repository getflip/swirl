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
  styleUrl: "swirl-file-viewer-audio.css",
  tag: "swirl-file-viewer-audio",
})
export class SwirlFileViewerAudio {
  @Element() el: HTMLElement;

  @Prop() autoplay?: boolean;
  @Prop() file!: string;

  @Event() activate: EventEmitter<HTMLElement>;

  componentDidLoad() {
    this.activate.emit(this.el);
  }

  render() {
    return (
      <Host class="file-viewer-audio">
        <audio
          autoplay={this.autoplay}
          class="file-viewer-audio__audio"
          src={this.file}
          controls
        ></audio>
      </Host>
    );
  }
}
