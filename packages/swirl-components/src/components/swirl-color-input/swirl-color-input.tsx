import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";
import classnames from "classnames";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-color-input.css",
  tag: "swirl-color-input",
})
export class SwirlColorInput {
  @Prop() autoFocus?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() disabled?: boolean;
  @Prop() swirlAriaDescribedby?: string;
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() placeholder?: string;
  @Prop() required?: boolean;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @Event() inputBlur: EventEmitter<FocusEvent>;
  @Event() inputFocus: EventEmitter<FocusEvent>;
  @Event() valueChange: EventEmitter<string>;

  private inputEl: HTMLInputElement;

  componentDidLoad() {
    // see https://stackoverflow.com/a/27314017
    if (this.autoFocus) {
      setTimeout(() => {
        this.inputEl.focus();
      });
    }
  }

  @Watch("value")
  watchValue(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.valueChange.emit(newValue);
    }
  }

  private onChange = (event: Event) => {
    const el = event.target as HTMLInputElement;

    this.value = el.value;
  };

  private onBlur = (event: FocusEvent) => {
    this.inputBlur.emit(event);
  };

  private onFocus = (event: FocusEvent) => {
    this.inputFocus.emit(event);
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
    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const className = classnames("color-input", {
      "color-input--inline": this.inline,
    });

    return (
      <Host>
        <div class={className}>
          <input
            aria-describedby={this.swirlAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-invalid={ariaInvalid}
            autoFocus={this.autoFocus}
            class="color-input__input"
            disabled={this.disabled}
            maxLength={9}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onInput={this.onInput}
            placeholder={this.placeholder}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            spellcheck="false"
            type="text"
            value={this.value}
          />
          <span
            class="color-input__preview"
            style={{
              backgroundColor: this.disabled
                ? "var(--s-border-subdued)"
                : this.value,
            }}
          ></span>
        </div>
      </Host>
    );
  }
}
