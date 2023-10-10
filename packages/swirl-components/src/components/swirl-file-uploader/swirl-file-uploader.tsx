import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
} from "@stencil/core";
import classnames from "classnames";
import { SwirlFormInput } from "../../utils";
import { SwirlButtonVariant } from "../swirl-button/swirl-button";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-file-uploader.css",
  tag: "swirl-file-uploader",
})
export class SwirlFileUploader implements SwirlFormInput<FileList> {
  @Prop() accept?: string;
  @Prop() ctaLabel?: string = "Click to upload";
  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() dragDropLabel?: string = "or drag and drop.";
  @Prop() inputId!: string;
  @Prop() inputName!: string;
  @Prop() label!: string;
  @Prop() multiple?: boolean;
  @Prop() showDropzone?: boolean = true;
  @Prop() uploadButtonIcon?: string;
  @Prop() uploadButtonLabel?: string = "Select file";
  @Prop() uploadButtonVariant?: SwirlButtonVariant = "flat";

  @Event() valueChange: EventEmitter<FileList>;

  private inputEl: HTMLInputElement;

  /**
   * Reset the file input.
   */
  @Method()
  public async reset() {
    this.inputEl.value = "";
  }

  private onChange = (event: Event) => {
    const fileList = (event.target as HTMLInputElement).files;

    this.valueChange.emit(fileList);
  };

  private onUploadButtonClick = () => {
    this.inputEl.click();
  };

  render() {
    const ariaDescribedby = Boolean(this.description)
      ? `${this.inputId}-description ${this.inputId}-additional-label`
      : `${this.inputId}-additional-label`;

    const tabIndex = this.showDropzone ? 0 : -1;

    const className = classnames("file-uploader", {
      "file-uploader--disabled": this.disabled,
      "file-uploader--show-dropzone": this.showDropzone,
    });

    return (
      <Host>
        <div class={className}>
          <label
            class="file-uploader__label"
            htmlFor={this.inputId}
            id={`${this.inputId}-label`}
          >
            {this.label}
          </label>

          {this.description && (
            <span
              class="file-uploader__description"
              id={`${this.inputId}-description`}
            >
              {this.description}
            </span>
          )}

          <div class="file-uploader__dropzone">
            {this.showDropzone ? (
              [
                <swirl-icon-cloud-upload class="file-uploader__dropzone-icon"></swirl-icon-cloud-upload>,
                <div
                  class="file-uploader__dropzone-label"
                  id={`${this.inputId}-additional-label`}
                >
                  <span class="file-uploader__dropzone-cta">
                    {this.ctaLabel}
                  </span>{" "}
                  <span class="file-uploader__drag-drop-label">
                    {this.dragDropLabel}
                  </span>
                </div>,
              ]
            ) : (
              <swirl-button
                class="file-uploader__upload-button"
                disabled={this.disabled}
                icon={this.uploadButtonIcon}
                intent="primary"
                label={this.uploadButtonLabel}
                onClick={this.onUploadButtonClick}
                swirlAriaDescribedby={ariaDescribedby}
                variant={this.uploadButtonVariant}
              ></swirl-button>
            )}

            <input
              accept={this.accept}
              aria-describedby={ariaDescribedby}
              aria-disabled={this.disabled}
              autoComplete="off"
              class="file-uploader__input"
              disabled={this.disabled}
              id={this.inputId}
              multiple={this.multiple}
              name={this.inputName}
              onChange={this.onChange}
              ref={(el) => (this.inputEl = el)}
              tabIndex={tabIndex}
              type="file"
            />
          </div>
        </div>
      </Host>
    );
  }
}
