import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";
import { FlipFormInput } from "../../utils";

export type FlipTextInputType =
  | "date"
  | "datetime-local"
  | "email"
  | "number"
  | "password"
  | "reset"
  | "tel"
  | "text"
  | "url";

export type FlipTextInputMode =
  | "decimal"
  | "email"
  | "numeric"
  | "search"
  | "tel"
  | "text"
  | "url";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-text-input.css",
  tag: "flip-text-input",
})
export class FlipTextInput implements FlipFormInput {
  @Prop() autoFocus?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() clearable?: boolean;
  @Prop() clearButtonLabel?: string = "Clear input";
  @Prop() disabled?: boolean;
  @Prop() flipAriaDescribedby?: string;
  @Prop() invalid?: boolean;
  @Prop() mode?: FlipTextInputMode;
  @Prop() prefixLabel?: string;
  @Prop() required?: boolean;
  @Prop() rows?: number = 1;
  @Prop() spellCheck?: boolean;
  @Prop() suffixLabel?: string;
  @Prop() type?: FlipTextInputType = "text";
  @Prop({ mutable: true, reflect: true }) value?: string;

  @Event() valueChange: EventEmitter<string>;

  private inputEl: HTMLInputElement;

  componentDidRender() {
    this.adjustInputSize();
  }

  private adjustInputSize() {
    if (this.rows > 1) {
      this.inputEl.style.width = "";
      this.inputEl.style.height = "";
      this.inputEl.style.height = this.inputEl.scrollHeight / 16 + "rem";
    }

    if (this.rows === 1) {
      this.inputEl.style.height = "";
      this.inputEl.style.width = "";
      this.inputEl.style.width = this.inputEl.scrollWidth / 16 + "rem";
    }
  }

  private clear = () => {
    this.inputEl.value = "";
    this.value = "";
    this.valueChange.emit("");
  };

  private onChange = (event: Event) => {
    const el = event.target as HTMLInputElement;

    this.value = el.value;
    this.valueChange.emit(el.value);
  };

  private onFocus = (event: FocusEvent) => {
    this.handleAutoSelect(event);
  };

  private onInput = (event: InputEvent) => {
    this.onChange(event);
  };

  private handleAutoSelect(event: FocusEvent) {
    if (!this.autoSelect) {
      return;
    }

    (event.target as HTMLInputElement).select();
  }

  render() {
    const Tag = this.rows === 1 ? "input" : "textarea";

    const ariaInvalid =
      this.invalid === true
        ? "true"
        : this.invalid === false
        ? "false"
        : undefined;

    const showClearButton =
      this.clearable && !this.disabled && Boolean(this.value);

    const className = classnames("text-input", {
      "text-input--clearable": this.clearable,
    });

    return (
      <Host>
        <div class={className}>
          {this.prefixLabel && (
            <span class="text-input__prefix">{this.prefixLabel}</span>
          )}
          <Tag
            aria-describedby={this.flipAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-invalid={ariaInvalid}
            autoFocus={this.autoFocus}
            class="text-input__input"
            disabled={this.disabled}
            inputMode={this.mode}
            onFocus={this.onFocus}
            onInput={this.onInput}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            rows={this.rows > 1 ? this.rows : undefined}
            spellcheck={this.spellCheck}
            type={this.type}
            value={this.rows === 1 ? this.value : undefined}
          >
            {this.rows > 1 && this.value}
          </Tag>
          {this.suffixLabel && (
            <span class="text-input__suffix">{this.suffixLabel}</span>
          )}
          {showClearButton && (
            <button
              aria-label={this.clearButtonLabel}
              class="text-input__clear-button"
              onClick={this.clear}
              type="button"
            >
              <flip-icon-cancel></flip-icon-cancel>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
