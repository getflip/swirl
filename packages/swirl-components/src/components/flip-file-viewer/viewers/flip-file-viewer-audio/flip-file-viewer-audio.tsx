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
  styleUrl: "flip-file-viewer-audio.css",
  tag: "flip-file-viewer-audio",
})
export class FlipFileViewerAudio {
  @Element() el: HTMLElement;

  @Prop() file!: string;
  @Prop() type!: string;

  @Event() activate: EventEmitter<HTMLElement>;

  componentDidLoad() {
    this.activate.emit(this.el);
  }

  render() {
    return (
      <Host class="file-viewer-audio">
        <audio class="file-viewer-audio__audio" controls>
          <source src={this.file} type={this.type}></source>
        </audio>
      </Host>
    );
  }
}
