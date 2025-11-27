import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import { format, isValid, parse } from "date-fns";
import IMask, { InputMask } from "imask";
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
  @Prop() readonly?: boolean;

  @State() iconSize: 20 | 24 = 24;
  @State() isInPickOnlyMode: boolean = false;

  @Event() invalidInput: EventEmitter<string>;
  @Event() valueChange: EventEmitter<string>;

  private id: string;
  private inputEl: HTMLInputElement;
  private mask: InputMask<any>;
  private pattern: string;
  private pickerPopover: HTMLSwirlPopoverElement;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentWillLoad() {
    const index = Array.from(
      document.querySelectorAll("swirl-date-input")
    ).indexOf(this.el);

    this.id = `swirl-date-input-${index}`;
    this.setIsInPickOnlyMode(true);
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
      this.updateValue();
    }
  }

  /**
   * Opens the date picker popover.
   */
  @Method()
  async openPicker() {
    this.pickerPopover.open(this.el);
  }

  private focus(): void {
    setTimeout(() => {
      this.inputEl.focus();
    });
  }

  private updateIconSize(smallIcon: boolean) {
    this.iconSize = smallIcon ? 20 : 24;
  }

  private onClick = (event: MouseEvent) => {
    event.preventDefault();

    if (this.readonly) {
      return;
    }

    if (this.preferredInputMode === "pick") {
      this.pickerPopover.open(this.el);

      if (!isMobileViewport()) {
        this.focus();
      }
    }
  };

  private onMouseDown = () => {
    if (this.readonly) {
      return;
    }

    if (this.preferredInputMode === "pick") {
      this.pickerPopover.close();
    }
  };

  private onFocus = (event: FocusEvent) => {
    this.handleAutoSelect(event);
  };

  private onBlur = (event: FocusEvent) => {
    if (this.readonly) {
      return;
    }

    const popoverReceivingFocus = this.pickerPopover.contains(
      event.relatedTarget as HTMLElement
    );

    this.setIsInPickOnlyMode(!popoverReceivingFocus);
  };

  private onPickDate = (event: CustomEvent<Date | Date[]>) => {
    const newDateValue = event.detail as Date;

    const newValue = format(newDateValue, internalDateFormat);

    this.value = newValue;

    this.inputEl.value = format(newDateValue, this.pattern);
    this.mask.updateValue();

    this.setIsInPickOnlyMode(true);
    this.pickerPopover.close();
  };

  private handleAutoSelect(event: FocusEvent) {
    if (!this.autoSelect) {
      setTimeout(() => {
        if (
          event.target &&
          event.target instanceof HTMLInputElement &&
          event.target.setSelectionRange
        ) {
          event.target.setSelectionRange(0, 0);
        }
      });
      return;
    }

    if (event.target && event.target instanceof HTMLInputElement) {
      event.target.select();
    }
  }

  private setIsInPickOnlyMode(isInPickOnlyMode: boolean) {
    if (this.preferredInputMode === "pick" && isMobileViewport()) {
      this.isInPickOnlyMode = isInPickOnlyMode;
    } else {
      this.isInPickOnlyMode = false;
    }
  }

  private setupMask() {
    this.mask?.destroy();

    // Due to automatic padding with 0s, we need to replace single characters with full length blocks.
    this.pattern = this.format
      .replace(/(?<!d)d(?!d)/g, "dd")
      .replace(/(?<!M)M(?!M)/g, "MM")
      .replace(/(?<!y)y(?!y)/g, "yyyy")
      .replace(/(?<!y)yyy(?!y)/g, "yyyy");

    if (!this.pattern) {
      this.pattern = internalDateFormat;
    }

    this.mask = IMask(this.inputEl, {
      mask: Date,
      pattern: this.pattern.replace(/([^A-Za-z0-9])/g, "$1`"), // Add backticks to separators to prevent symbols from shifting back
      autofix: "pad",
      lazy: true,
      overwrite: true,
      eager: "append",

      blocks: {
        dd: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        yy: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 99,
          maxLength: 2,
        },
        yyyy: {
          mask: IMask.MaskedRange,
          from: 1000,
          to: 9999,
          maxLength: 4,
        },
      },

      // define date -> str conversion
      format: (date: Date) => {
        const newDate = format(date, this.pattern);

        if (!isValid(date)) {
          this.invalidInput.emit(date.toString());
          return "";
        }

        this.value = format(date, internalDateFormat);
        return newDate;
      },

      // define str -> date conversion
      parse: (str: string) => {
        const newString = parse(str, this.pattern, new Date());
        return newString;
      },
    });

    this.updateValue();
  }

  updateValue() {
    if (this.value) {
      const dateValue = parse(this.value, internalDateFormat, new Date());
      if (isValid(dateValue)) {
        const formattedValue = format(dateValue, this.pattern);
        this.mask.value = formattedValue;
        this.valueChange.emit(this.value);
      } else {
        this.invalidInput.emit(this.value);
      }
    } else {
      this.valueChange.emit("");
    }
  }

  render() {
    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const newDate = Boolean(this.value)
      ? parse(this.value, internalDateFormat, new Date())
      : undefined;

    const dateValue = isValid(newDate) ? newDate : undefined;

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
            readonly={this.isInPickOnlyMode || this.readonly}
            id={this.id}
            inputmode="numeric"
            onClick={this.onClick}
            onMouseDown={this.onMouseDown}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            placeholder={this.placeholder}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            type="text"
          />

          {!this.readonly && (
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
          )}
        </div>

        {!(this.disabled || this.readonly) && (
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
