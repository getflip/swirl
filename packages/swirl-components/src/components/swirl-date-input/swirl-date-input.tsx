import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { AirDatepickerLocale } from "air-datepicker";
import classnames from "classnames";
import { format, isValid, parse } from "date-fns";
import { create as createMask } from "maska/dist/es6/maska";
import Maska from "maska/types/maska";
import { getDesktopMediaQuery } from "../../utils";

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
  styleUrl: "swirl-date-input.css",
  tag: "swirl-date-input",
})
export class SwirlDateInput {
  @Prop() autoFocus?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() datePickerLabel?: string = "Date picker";
  @Prop() disabled?: boolean;
  @Prop() format?: string = "yyyy-MM-dd";
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() locale?: Partial<AirDatepickerLocale>;
  @Prop() placeholder?: string = "yyyy-mm-dd";
  @Prop() required?: boolean;
  @Prop() swirlAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @State() iconSize: 20 | 24 = 24;

  @Event() valueChange: EventEmitter<string>;

  private desktopMediaQuery: MediaQueryList = getDesktopMediaQuery();
  private id: string;
  private mask: Maska;
  private pickerPopover: HTMLSwirlPopoverElement;

  componentWillLoad() {
    const index = document.querySelectorAll("swirl-date-input").length;

    this.id = `swirl-date-input-${index}`;
  }

  componentDidLoad() {
    this.setupMask();

    this.updateIconSize(this.desktopMediaQuery.matches);

    this.desktopMediaQuery.addEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  disconnectedCallback() {
    this.mask?.destroy();

    this.desktopMediaQuery.removeEventListener?.(
      "change",
      this.desktopMediaQueryHandler
    );
  }

  @Watch("format")
  watchFormat() {
    this.setupMask();
  }

  private desktopMediaQueryHandler = (event: MediaQueryListEvent) => {
    this.updateIconSize(event.matches);
  };

  private updateIconSize(smallIcon: boolean) {
    this.iconSize = smallIcon ? 20 : 24;
  }

  private onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    if (value === "") {
      this.value = undefined;
      this.valueChange.emit(undefined);
    }

    const newDate = parse(value, this.format, new Date());

    const formatRegExp = new RegExp(
      `^${this.format.replace(/[ydM]/g, "\\d")}$`
    );

    if (!Boolean(value.match(formatRegExp)) || !isValid(newDate)) {
      return;
    }

    const newValue = format(newDate, internalDateFormat);

    this.value = newValue;
    this.valueChange.emit(newValue);
  };

  private onInput = (event: Event) => {
    this.onChange(event);
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
  };

  private handleAutoSelect(event: FocusEvent) {
    if (!this.autoSelect) {
      return;
    }

    (event.target as HTMLInputElement).select();
  }

  private setupMask() {
    this.mask?.destroy();

    this.mask = createMask(`#${this.id}`, {
      mask: this.format.replace(/[ydM]/g, "#"),
    });
  }

  render() {
    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const dateValue = Boolean(this.value)
      ? parse(this.value, internalDateFormat, new Date())
      : undefined;

    const displayValue = isValid(dateValue)
      ? format(dateValue, this.format)
      : undefined;

    const className = classnames("date-input", {
      "date-input--inline": this.inline,
    });

    return (
      <Host>
        <div class={className}>
          <input
            aria-describedby={this.swirlAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-invalid={ariaInvalid}
            autoFocus={this.autoFocus}
            class="date-input__input"
            disabled={this.disabled}
            id={this.id}
            onClick={this.onClick}
            onFocus={this.onFocus}
            onInput={this.onInput}
            placeholder={this.placeholder}
            required={this.required}
            type="text"
            value={displayValue}
          />

          <button
            aria-hidden="true"
            class="date-input__date-picker-button"
            disabled={this.disabled}
            id={`${this.id}-trigger`}
            tabIndex={-1}
            type="button"
          >
            <swirl-icon-today size={this.iconSize}></swirl-icon-today>
          </button>
        </div>

        {!this.disabled && (
          <swirl-popover
            label={this.datePickerLabel}
            placement="bottom-end"
            popoverId="popover"
            ref={(el) => (this.pickerPopover = el)}
            trigger={`${this.id}-trigger`}
          >
            <swirl-date-picker
              locale={this.locale}
              onValueChange={this.onPickDate}
              value={dateValue}
            ></swirl-date-picker>
          </swirl-popover>
        )}
      </Host>
    );
  }
}
