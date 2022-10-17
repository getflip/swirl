import { Component, h, Host, Prop, State, Watch } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-file-viewer-text.css",
  tag: "flip-file-viewer-text",
})
export class FlipFileViewerText {
  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;

  @State() error: boolean;
  @State() loading: boolean;
  @State() text: string;

  componentWillLoad() {
    this.updateText();
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
        {this.loading && (
          <flip-spinner class="file-viewer-text__spinner"></flip-spinner>
        )}
        {this.error && (
          <flip-inline-error
            class="file-viewer-text__error"
            message={this.errorMessage}
          ></flip-inline-error>
        )}
        <pre class="file-viewer-text__text" tabIndex={0}>
          {this.text}
        </pre>
      </Host>
    );
  }
}
