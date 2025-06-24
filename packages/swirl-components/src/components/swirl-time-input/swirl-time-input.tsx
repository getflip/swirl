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
import IMask, { InputMask } from "imask";
import { DesktopMediaQuery } from "../../services/media-query.service";

const internalTimeFormat = "HH:mm:ss";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-time-input.css",
  tag: "swirl-time-input",
})
export class SwirlTimeInput {
  @Element() el: HTMLSwirlDateInputElement;

  @Prop() autoFocus?: boolean;
  @Prop() autoSelect?: boolean;
  @Prop() disabled?: boolean;
  @Prop() format?: string = "HH:mm";
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() placeholder?: string = "hh:mm";
  @Prop() required?: boolean;
  @Prop() swirlAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @State() iconSize: 20 | 24 = 24;

  @Event() inputBlur: EventEmitter<FocusEvent>;
  @Event() inputFocus: EventEmitter<FocusEvent>;
  @Event() valueChange: EventEmitter<string>;

  private id: string;
  private inputEl: HTMLInputElement;
  private mask: InputMask<any>;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentWillLoad() {
    const index = Array.from(
      document.querySelectorAll("swirl-time-input")
    ).indexOf(this.el);

    this.id = `swirl-time-input-${index}`;
  }

  componentDidLoad() {
    this.setupMask();

    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.updateIconSize(isDesktop);
    });

    // see https://stackoverflow.com/a/27314017
    if (this.autoFocus) {
      setTimeout(() => {
        this.inputEl.focus();
      });
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

  private updateIconSize(smallIcon: boolean) {
    this.iconSize = smallIcon ? 20 : 24;
  }

  private onBlur = (event: FocusEvent) => {
    this.inputBlur.emit(event);
  };

  private onClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  private onFocus = (event: FocusEvent) => {
    this.inputFocus.emit(event);
    this.handleAutoSelect(event);
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

  private setupMask() {
    this.mask?.destroy();

    // Due to automatic padding with 0s, we need to replace single characters with full length blocks.
    const pattern = this.format
      .replace(/(?<!H)H(?!H)/g, "HH")
      .replace(/(?<!h)h(?!h)/g, "hh")
      .replace(/(?<!m)m(?!m)/g, "mm")
      .replace(/(?<!s)s(?!s)/g, "ss");

    this.mask = IMask(this.inputEl, {
      mask: Date,
      pattern: pattern.replace(/([^A-Za-z0-9])/g, "$1`"), // Add backticks to separators to prevent symbols from shifting back
      autofix: "pad",
      lazy: true,
      overwrite: true,
      eager: "append",

      blocks: {
        HH: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
          maxLength: 2,
        },
        hh: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        mm: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
        ss: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
      },

      format: (date) => {
        if (!isValid(date)) {
          return "";
        }
        this.value = format(date, internalTimeFormat);
        return format(date, pattern);
      },
      parse: (str) => {
        return parse(str, pattern, new Date());
      },
    });

    // Set the initial value if it exists
    if (this.value) {
      const dateValue = parse(this.value, internalTimeFormat, new Date());
      if (isValid(dateValue)) {
        const formattedValue = format(dateValue, pattern);
        this.mask.value = formattedValue;
      }
    }
  }

  render() {
    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const className = classnames("time-input", {
      "time-input--inline": this.inline,
    });

    return (
      <Host>
        <div class={className}>
          <input
            aria-describedby={this.swirlAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-invalid={ariaInvalid}
            autoFocus={this.autoFocus}
            class="time-input__input"
            disabled={this.disabled}
            id={this.id}
            inputmode="numeric"
            onBlur={this.onBlur}
            onClick={this.onClick}
            onFocus={this.onFocus}
            placeholder={this.placeholder}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            type="text"
          />

          <span class="time-input__icon">
            <swirl-icon-time-outlined
              size={this.iconSize}
            ></swirl-icon-time-outlined>
          </span>
        </div>
      </Host>
    );
  }
}
