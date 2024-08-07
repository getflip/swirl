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
import { parse } from "papaparse";

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-csv.css",
  tag: "swirl-file-viewer-csv",
})
export class SwirlFileViewerCsv {
  @Element() el: HTMLElement;

  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;

  @State() data: (boolean | number | string)[][];
  @State() error: boolean;
  @State() loading: boolean;

  @Event() activate: EventEmitter<HTMLElement>;

  componentWillLoad() {
    this.updateTable();
  }

  componentDidLoad() {
    this.activate.emit(this.el);
  }

  @Watch("file")
  async updateTable() {
    this.error = false;
    this.loading = true;

    try {
      const response = await fetch(this.file);

      const parsed = parse<string[]>(await response.text(), {
        dynamicTyping: true,
        fastMode: false,
        skipEmptyLines: true,
      });

      if (parsed.errors?.length > 0) {
        this.error = true;
        this.loading = false;
        return;
      }

      this.data = parsed.data;

      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.error = true;
    }
  }

  render() {
    return (
      <Host class="file-viewer-csv" exportparts="file-viewer-csv__table">
        {this.error && (
          <swirl-inline-error
            class="file-viewer-csv__error"
            message={this.errorMessage}
          ></swirl-inline-error>
        )}
        <div class="file-viewer-csv__csv" tabIndex={0}>
          <table class="file-viewer-csv__table" part="file-viewer-csv__table">
            <tbody>
              {this.data?.map((row, index) => (
                <tr class="file-viewer-csv__row" key={`row-${index}`}>
                  {row.map((cell, i) => (
                    <td
                      class="file-viewer-csv__cell"
                      key={`cell-${index}-${i}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {this.loading && (
          <div class="file-viewer-csv__spinner">
            <swirl-spinner></swirl-spinner>
          </div>
        )}
      </Host>
    );
  }
}
