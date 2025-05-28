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
import classnames from "classnames";
import { format, isValid, parse } from "date-fns";
import { create as createMask } from "maska/dist/es6/maska";
import Maska from "maska/types/maska";
import { WCDatepickerLabels } from "wc-datepicker/dist/types/components/wc-datepicker/wc-datepicker";
import { DesktopMediaQuery } from "../../services/media-query.service";
import { isMobileViewport } from "../../utils";

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
  @Element() el: HTMLSwirlDateInputElement;

  @Prop() autoFocus?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() datePickerDisableDate?: (date: Date) => boolean = () => false;
  @Prop() datePickerLabel?: string = "Date picker";
  @Prop() datePickerTriggerLabel?: string = "Open date picker";
  @Prop() disabled?: boolean;
  @Prop() firstDayOfWeek?: number = 0;
  @Prop() format?: string = "yyyy-MM-dd";
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() labels?: WCDatepickerLabels;
  @Prop() locale?: string = "en-US";
  @Prop() placeholder?: string = "yyyy-mm-dd";
  @Prop() preferredInputMode?: "input" | "pick" = "input";
  @Prop() required?: boolean;
  @Prop() swirlAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @State() iconSize: 20 | 24 = 24;
  @State() readonly: boolean = false;

  @Event() invalidInput: EventEmitter<string>;
  @Event() valueChange: EventEmitter<string>;

  private id: string;
  private inputEl: HTMLInputElement;
  private mask: Maska;
  private pickerPopover: HTMLSwirlPopoverElement;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentWillLoad() {
    const index = Array.from(
      document.querySelectorAll("swirl-date-input")
    ).indexOf(this.el);

    this.id = `swirl-date-input-${index}`;
    this.setReadOnly(true);
  }

  componentDidLoad() {
    this.setupMask();

    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.updateIconSize(isDesktop);
    });

    // see https://stackoverflow.com/a/27314017
    if (this.autoFocus) {
      this.focus();
    }
  }

  disconnectedCallback() {
    this.mask?.destroy();
    this.mediaQueryUnsubscribe();
  }

  @Watch("format")
  watchFormat() {
    this.setupMask();
  }

  @Watch("value")
  watchValue(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.valueChange.emit(newValue);
    }
  }

  private focus(): void {
    setTimeout(() => {
      this.inputEl.focus();
    });
  }

  private updateIconSize(smallIcon: boolean) {
    this.iconSize = smallIcon ? 20 : 24;
  }

  private onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    if (value === "") {
      this.value = undefined;
    }

    const newDate = parse(value, this.format, new Date());

    // First, escape any backslashes in the format string
    const escapedFormat = this.format.replace(/\\/g, "\\\\");
    // Then construct the RegExp using the escaped format string
    const formatRegExp = new RegExp(
      `^${escapedFormat.replace(/[ydM]/g, "\\d")}$`
    );

    if (!Boolean(value.match(formatRegExp))) {
      return;
    }

    if (!isValid(newDate)) {
      this.invalidInput.emit(value);
      return;
    }

    const newValue = format(newDate, internalDateFormat);

    this.value = newValue;
  };

  private onInput = (event: InputEvent) => {
    this.onChange(event);
  };

  private onClick = (event: MouseEvent) => {
    event.preventDefault();

    if (this.preferredInputMode === "pick") {
      this.pickerPopover.open(this.el);

      if (!isMobileViewport()) {
        this.focus();
      }
    }
  };

  private onMouseDown = () => {
    if (this.preferredInputMode === "pick") {
      this.pickerPopover.close();
    }
  };

  private onFocus = (event: FocusEvent) => {
    this.handleAutoSelect(event);
  };

  private onBlur = (event: FocusEvent) => {
    const popoverReceivingFocus = this.pickerPopover.contains(
      event.relatedTarget as HTMLElement
    );

    this.setReadOnly(!popoverReceivingFocus);
  };

  private onPickDate = (event: CustomEvent<Date | Date[]>) => {
    const newDateValue = event.detail as Date;

    const newValue = format(newDateValue, internalDateFormat);

    this.value = newValue;

    this.setReadOnly(true);
    this.pickerPopover.close();
  };

  private handleAutoSelect(event: FocusEvent) {
    if (!this.autoSelect) {
      return;
    }

    (event.target as HTMLInputElement).select();
  }

  private setReadOnly(readOnly: boolean) {
    if (this.preferredInputMode === "pick" && isMobileViewport()) {
      this.readonly = readOnly;
    } else {
      this.readonly = false;
    }
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
            readonly={this.readonly}
            id={this.id}
            inputmode="numeric"
            onClick={this.onClick}
            onMouseDown={this.onMouseDown}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.onInput}
            placeholder={this.placeholder}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            type="text"
            value={displayValue}
          />

          <swirl-popover-trigger swirlPopover={`popover-${this.id}`}>
            <button
              aria-label={this.datePickerTriggerLabel}
              class="date-input__date-picker-button"
              disabled={this.disabled}
              type="button"
            >
              <swirl-icon-today size={this.iconSize}></swirl-icon-today>
            </button>
          </swirl-popover-trigger>
        </div>

        {!this.disabled && (
          <swirl-popover
            animation="scale-in-y"
            class="date-input__date-picker-popover"
            id={`popover-${this.id}`}
            label={this.datePickerLabel}
            placement="bottom-end"
            ref={(el) => (this.pickerPopover = el)}
          >
            <swirl-date-picker
              disableDate={this.datePickerDisableDate}
              firstDayOfWeek={this.firstDayOfWeek}
              labels={this.labels}
              locale={this.locale}
              onValueChange={this.onPickDate}
              value={dateValue}
              startDate={dateValue}
            ></swirl-date-picker>
          </swirl-popover>
        )}
      </Host>
    );
  }
}
