import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import { format, isMatch, isValid, parse } from "date-fns";
import IMask from "imask/esm/imask";

const internalDateFormat = "yyyy-MM-dd";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-date-input.css",
  tag: "flip-date-input",
})
export class FlipDateInput {
  @Prop() autoFocus?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() datePickerButtonLabel?: string = "Open date picker";
  @Prop() datePickerLabel?: string = "Date picker";
  @Prop() disabled?: boolean;
  @Prop() flipAriaDescribedby?: string;
  @Prop() format?: string = "yyyy-MM-dd";
  @Prop() invalid?: boolean;
  @Prop() mask?: string = "y-`m-`d";
  @Prop() required?: boolean;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @Event() valueChange: EventEmitter<string>;

  private id = `flip-date-input-${Math.round(Math.random() * 100000)}`;
  private inputEl: HTMLInputElement;
  private inputMask: IMask.InputMask<any>;
  private pickerPopover: HTMLFlipPopoverElement;

  componentDidLoad() {
    this.setupMask();
  }

  componentDidRender() {
    this.inputMask?.updateValue();
  }

  disconnectedCallback() {
    this.inputMask?.destroy();
  }

  private onChange = () => {
    const value = this.inputMask.value;
    const newDate = parse(value, this.format, new Date());

    if (!isMatch(value, this.format) || !isValid(newDate)) {
      return;
    }

    const newValue = format(newDate, internalDateFormat);

    this.value = newValue;
    this.valueChange.emit(newValue);
  };

  private onClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  private onFocus = (event: FocusEvent) => {
    this.handleAutoSelect(event);
  };

  private onPickDate = (event: CustomEvent<Date | Date[]>) => {
    const newDateValue = event.detail as Date;

    const newValue = format(newDateValue, internalDateFormat);

    this.value = newValue;
    this.valueChange.emit(newValue);

    this.pickerPopover.close();
    this.inputMask.updateValue();
  };

  private handleAutoSelect(event: FocusEvent) {
    if (!this.autoSelect) {
      return;
    }

    (event.target as HTMLInputElement).select();
  }

  private setupMask() {
    this.inputMask = IMask(this.inputEl, {
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
        },
      },
      lazy: false,
      mask: this.mask,
      overwrite: true,
      placeholderChar: "x",
    });

    this.inputMask.on("accept", this.onChange);
  }

  render() {
    const ariaInvalid =
      this.invalid === true
        ? "true"
        : this.invalid === false
        ? "false"
        : undefined;

    const dateValue = Boolean(this.value)
      ? parse(this.value, internalDateFormat, new Date())
      : undefined;

    const displayValue = isValid(dateValue)
      ? format(dateValue, this.format)
      : undefined;

    return (
      <Host>
        <div class="date-input">
          <input
            aria-describedby={this.flipAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-invalid={ariaInvalid}
            autoFocus={this.autoFocus}
            class="date-input__input"
            disabled={this.disabled}
            onClick={this.onClick}
            onFocus={this.onFocus}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            type="text"
            value={displayValue}
          />

          <button
            aria-label={this.datePickerButtonLabel}
            class="date-input__date-picker-button"
            disabled={this.disabled}
            id={this.id}
            type="button"
          >
            <flip-icon-today></flip-icon-today>
          </button>
        </div>

        {!this.disabled && (
          <flip-popover
            label={this.datePickerLabel}
            placement="bottom-end"
            popoverId="popover"
            ref={(el) => (this.pickerPopover = el)}
            trigger={this.id}
          >
            <flip-date-picker
              onValueChange={this.onPickDate}
              value={dateValue}
            ></flip-date-picker>
          </flip-popover>
        )}
      </Host>
    );
  }
}
