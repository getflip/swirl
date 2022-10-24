import { Component, h, Host, Prop, State, Watch } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "flip-file-viewer-image.css",
  tag: "flip-file-viewer-image",
})
export class FlipFileViewerImage {
  @Prop() description?: string = "";
  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;

  @State() error: boolean;
  @State() loading: boolean = true;

  @Watch("file")
  watchFile() {
    this.error = false;
    this.loading = true;
  }

  private onError = () => {
    this.error = true;
    this.loading = false;
  };

  private onLoad = () => {
    this.error = false;
    this.loading = false;
  };

  render() {
    return (
      <Host class="file-viewer-image">
        {this.error && (
          <flip-inline-error
            class="file-viewer-image__error"
            message={this.errorMessage}
          ></flip-inline-error>
        )}
        <img
          alt={this.description}
          class="file-viewer-image__image"
          onError={this.onError}
          onLoad={this.onLoad}
          src={this.file}
        />
        {this.loading && (
          <div class="file-viewer-image__spinner">
            <flip-spinner></flip-spinner>
          </div>
        )}
      </Host>
    );
  }
}
