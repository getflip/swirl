import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from "@stencil/core";
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
  @Prop() autoComplete?: string = "on";
  @Prop() autoFocus?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() clearable?: boolean;
  @Prop() clearButtonLabel?: string = "Clear input";
  @Prop() disabled?: boolean;
  @Prop() disableDynamicWidth?: boolean;
  @Prop() flipAriaAutocomplete?: string;
  @Prop() flipAriaControls?: string;
  @Prop() flipAriaDescribedby?: string;
  @Prop() flipAriaExpanded?: string;
  @Prop() flipRole?: string;
  @Prop() invalid?: boolean;
  @Prop() maxLength?: number;
  @Prop() max?: number;
  @Prop() min?: number;
  @Prop() mode?: FlipTextInputMode;
  @Prop() prefixLabel?: string;
  @Prop() required?: boolean;
  @Prop() rows?: number = 1;
  @Prop() showCharacterCounter?: boolean;
  @Prop() spellCheck?: boolean;
  @Prop() suffixLabel?: string;
  @Prop() step?: number;
  @Prop() passwordToggleLabel?: string = "Toggle password display";
  @Prop() type?: FlipTextInputType = "text";
  @Prop({ mutable: true, reflect: true }) value?: string;

  @State() showPassword = false;

  @Event() inputBlur: EventEmitter<FocusEvent>;
  @Event() inputFocus: EventEmitter<FocusEvent>;
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

      if (this.type !== "password" && !this.disableDynamicWidth) {
        this.inputEl.style.width = this.inputEl.scrollWidth / 16 + "rem";
      }
    }
  }

  private clear = () => {
    this.inputEl.value = "";
    this.value = "";
    this.valueChange.emit("");
    this.inputEl.focus();
  };

  private onChange = (event: Event) => {
    const el = event.target as HTMLInputElement;

    this.value = el.value;
    this.valueChange.emit(el.value);
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

  private onKeyPress = (event: KeyboardEvent) => {
    if (this.type !== "number") {
      return;
    }

    if (["+", "-", "e"].includes(event.key)) {
      event.preventDefault();
    }
  };

  private decreaseValue = () => {
    if (this.type !== "number") {
      return;
    }
    const step = this.step || 1;

    let currentValue = this.inputEl.valueAsNumber;

    if (isNaN(this.inputEl.valueAsNumber)) {
      currentValue = this.min !== undefined ? this.min + 1 : 1;
    }

    this.value = String(Math.max(this.min || -Infinity, currentValue - step));
    this.valueChange.emit(this.value);
  };

  private increaseValue = () => {
    if (this.type !== "number") {
      return;
    }

    const step = this.step || 1;

    let currentValue = this.inputEl.valueAsNumber;

    if (isNaN(this.inputEl.valueAsNumber)) {
      currentValue = this.min !== undefined ? this.min - 1 : -1;
    }

    this.value = String(Math.min(this.max || Infinity, currentValue + step));
    this.valueChange.emit(this.value);
  };

  private handleAutoSelect(event: FocusEvent) {
    if (!this.autoSelect) {
      return;
    }

    (event.target as HTMLInputElement).select();
  }

  private togglePassword = () => {
    if (this.type !== "password") {
      return;
    }

    this.showPassword = !this.showPassword;
  };

  render() {
    const Tag = this.rows === 1 ? "input" : "textarea";

    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const showStepper = this.type === "number" && !this.disabled;
    const showPasswordToggle = this.type === "password" && !this.disabled;

    const showClearButton =
      this.clearable &&
      !this.disabled &&
      Boolean(this.value) &&
      !showPasswordToggle &&
      !showStepper &&
      !this.showCharacterCounter;

    const type =
      this.type === "password" && this.showPassword ? "text" : this.type;

    const className = classnames(
      "text-input",
      `text-input--type-${this.type}`,
      {
        "text-input--clearable": this.clearable,
        "text-input--disabled": this.disabled,
        "text-input--disable-dynamic-width": this.disableDynamicWidth,
        "text-input--show-password":
          this.type === "password" && this.showPassword,
      }
    );

    return (
      <Host>
        <div class={className}>
          {this.prefixLabel && (
            <span class="text-input__prefix">{this.prefixLabel}</span>
          )}
          <Tag
            aria-autocomplete={this.flipAriaAutocomplete}
            aria-controls={this.flipAriaControls}
            aria-describedby={this.flipAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-expanded={this.flipAriaExpanded}
            aria-invalid={ariaInvalid}
            autoComplete={this.autoComplete}
            autoFocus={this.autoFocus}
            class="text-input__input"
            disabled={this.disabled}
            inputMode={this.mode}
            maxLength={this.maxLength}
            max={this.type === "number" ? this.max : undefined}
            min={this.type === "number" ? this.min : undefined}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onInput={this.onInput}
            onKeyPress={this.onKeyPress}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            role={this.flipRole}
            rows={this.rows > 1 ? this.rows : undefined}
            spellcheck={this.spellCheck}
            step={this.type === "number" ? this.step : undefined}
            type={type}
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
          {showPasswordToggle && (
            <button
              aria-label={this.passwordToggleLabel}
              class="text-input__password-toggle"
              onClick={this.togglePassword}
              type="button"
            >
              {this.showPassword ? (
                <flip-icon-visibility-off></flip-icon-visibility-off>
              ) : (
                <flip-icon-visibility></flip-icon-visibility>
              )}
            </button>
          )}
          {showStepper && (
            <span class="text-input__stepper">
              <button
                aria-hidden="true"
                class="text-input__step-button"
                onClick={this.increaseValue}
                tabIndex={-1}
                type="button"
              >
                <flip-icon-expand-less></flip-icon-expand-less>
              </button>
              <button
                aria-hidden="true"
                class="text-input__step-button"
                onClick={this.decreaseValue}
                tabIndex={-1}
                type="button"
              >
                <flip-icon-expand-more></flip-icon-expand-more>
              </button>
            </span>
          )}
          {this.showCharacterCounter && (
            <span class="text-input__character-counter">
              {this.value?.length || 0}{" "}
              {Boolean(this.maxLength) ? `/ ${this.maxLength}` : ""}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
