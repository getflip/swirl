import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-text.css",
  tag: "swirl-file-viewer-text",
})
export class SwirlFileViewerText {
  @Element() el: HTMLElement;

  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;

  @State() error: boolean;
  @State() loading: boolean;
  @State() text: string;

  @Event() activate: EventEmitter<HTMLElement>;

  componentWillLoad() {
    this.updateText();
  }

  componentDidLoad() {
    this.activate.emit(this.el);
  }

  @Watch("file")
  async updateText() {
    this.error = false;
    this.loading = true;

    try {
      const response = await fetch(this.file);

      this.text = await response.text();
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.error = true;
    }
  }

  render() {
    return (
      <Host class="file-viewer-text">
        {this.error && (
          <swirl-inline-error
            class="file-viewer-text__error"
            message={this.errorMessage}
          ></swirl-inline-error>
        )}
        <pre class="file-viewer-text__text" tabIndex={0}>
          {this.text}
        </pre>
        {this.loading && (
          <div class="file-viewer-text__spinner">
            <swirl-spinner></swirl-spinner>
          </div>
        )}
      </Host>
    );
  }
}
