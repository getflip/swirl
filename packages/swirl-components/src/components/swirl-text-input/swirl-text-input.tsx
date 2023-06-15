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
import { getDesktopMediaQuery, SwirlFormInput } from "../../utils";

export type SwirlTextInputType =
  | "date"
  | "datetime-local"
  | "email"
  | "number"
  | "password"
  | "reset"
  | "tel"
  | "text"
  | "url";

export type SwirlTextInputMode =
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
  styleUrl: "swirl-text-input.css",
  tag: "swirl-text-input",
})
export class SwirlTextInput implements SwirlFormInput {
  @Prop() autoComplete?: string = "on";
  @Prop() autoFocus?: boolean;
  @Prop() autoGrow?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() clearable?: boolean;
  @Prop() clearButtonLabel?: string = "Clear input";
  @Prop() disabled?: boolean;
  @Prop() disableDynamicWidth?: boolean;
  @Prop() swirlAriaAutocomplete?: string;
  @Prop() swirlAriaControls?: string;
  @Prop() swirlAriaDescribedby?: string;
  @Prop() swirlAriaExpanded?: string;
  @Prop() swirlRole?: string;
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() maxLength?: number;
  @Prop() max?: number;
  @Prop() min?: number;
  @Prop() mode?: SwirlTextInputMode;
  @Prop() placeholder?: string;
  @Prop() prefixLabel?: string;
  @Prop() required?: boolean;
  @Prop() rows?: number = 1;
  @Prop() showCharacterCounter?: boolean;
  @Prop() spellCheck?: boolean;
  @Prop() suffixLabel?: string;
  @Prop() step?: number;
  @Prop() passwordToggleLabel?: string = "Toggle password display";
  @Prop() type?: SwirlTextInputType = "text";
  @Prop({ mutable: true, reflect: true }) value?: string;

  @State() iconSize: 20 | 24 = 24;
  @State() showPassword = false;

  @Event() inputBlur: EventEmitter<FocusEvent>;
  @Event() inputFocus: EventEmitter<FocusEvent>;
  @Event() valueChange: EventEmitter<string>;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private inputEl: HTMLInputElement;

  componentDidLoad() {
    this.updateIconSize(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.onchange = this.desktopMediaQueryHandler;
  }

  componentDidRender() {
    this.adjustInputSize();
  }

  disconnectedCallback() {
    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.updateIconSize(event.matches);
  };

  private updateIconSize(smallIcon: boolean) {
    this.iconSize = smallIcon ? 20 : 24;
  }

  private adjustInputSize() {
    if (this.rows > 1 || this.autoGrow) {
      this.inputEl.style.width = "";
      this.inputEl.style.height = "";
      this.inputEl.style.height = Boolean(this.inputEl.scrollHeight)
        ? this.inputEl.scrollHeight / 16 + "rem"
        : "";
    }

    if (this.rows === 1 && !this.autoGrow) {
      this.inputEl.style.height = "";
      this.inputEl.style.width = "";

      if (
        this.type !== "password" &&
        !this.disableDynamicWidth &&
        !Boolean(this.placeholder)
      ) {
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
    const Tag = this.rows === 1 && !this.autoGrow ? "input" : "textarea";

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
        "text-input--auto-grow": this.autoGrow,
        "text-input--clearable": this.clearable,
        "text-input--disabled": this.disabled,
        "text-input--disable-dynamic-width":
          this.disableDynamicWidth || Boolean(this.placeholder),
        "text-input--has-suffix": Boolean(this.suffixLabel),
        "text-input--inline": this.inline,
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
            aria-autocomplete={this.swirlAriaAutocomplete}
            aria-controls={this.swirlAriaControls}
            aria-describedby={this.swirlAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-expanded={this.swirlAriaExpanded}
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
            placeholder={
              !Boolean(this.suffixLabel) ? this.placeholder : undefined
            }
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            role={this.swirlRole}
            rows={this.rows > 1 ? this.rows : this.autoGrow ? 1 : undefined}
            spellcheck={this.spellCheck}
            step={this.type === "number" ? this.step : undefined}
            type={type}
            value={this.value}
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
              part="text-input__clear-button"
              type="button"
            >
              <swirl-icon-cancel size={this.iconSize}></swirl-icon-cancel>
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
                <swirl-icon-visibility-off
                  size={this.iconSize}
                ></swirl-icon-visibility-off>
              ) : (
                <swirl-icon-visibility
                  size={this.iconSize}
                ></swirl-icon-visibility>
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
                <swirl-icon-expand-less
                  size={this.iconSize}
                ></swirl-icon-expand-less>
              </button>
              <button
                aria-hidden="true"
                class="text-input__step-button"
                onClick={this.decreaseValue}
                tabIndex={-1}
                type="button"
              >
                <swirl-icon-expand-more
                  size={this.iconSize}
                ></swirl-icon-expand-more>
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
