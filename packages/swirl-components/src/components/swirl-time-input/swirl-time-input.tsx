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
  private mask: Maska;
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

  private updateIconSize(smallIcon: boolean) {
    this.iconSize = smallIcon ? 20 : 24;
  }

  private onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    let newValue: string;

    if (value === "") {
      this.value = undefined;
      this.valueChange.emit(undefined);
    }

    const newDate = parse(value, this.format, new Date());

    const formatRegExp = new RegExp(
      `^${this.format.replace(/[Hhms]/g, "\\d")}$`
    );

    if (!Boolean(value.match(formatRegExp))) {
      return;
    }

    if (!isValid(newDate)) {
      newValue = format(new Date(), internalTimeFormat);
    } else {
      newValue = format(newDate, internalTimeFormat);
    }

    this.value = newValue;
    this.valueChange.emit(newValue);
  };

  private onBlur = (event: FocusEvent) => {
    this.inputBlur.emit(event);

    const input = event.target as HTMLInputElement;

    const dateValue = parse(input.value, this.format, new Date());

    if (!isValid(dateValue) && Boolean(this.value)) {
      const currentDateValue = Boolean(this.value)
        ? parse(this.value, internalTimeFormat, new Date())
        : undefined;

      if (!Boolean(currentDateValue) || !isValid(currentDateValue)) {
        this.value = "";
      }

      input.value = format(currentDateValue, this.format);
    }
  };

  private onInput = (event: InputEvent) => {
    this.onChange(event);
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
      return;
    }

    (event.target as HTMLInputElement).select();
  }

  private setupMask() {
    this.mask?.destroy();

    this.mask = createMask(`#${this.id}`, {
      mask: this.format.replace(/[Hhms]/g, "#"),
    });
  }

  render() {
    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const dateValue = Boolean(this.value)
      ? parse(this.value, internalTimeFormat, new Date())
      : undefined;

    const displayValue = isValid(dateValue)
      ? format(dateValue, this.format)
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
            onInput={this.onInput}
            placeholder={this.placeholder}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            type="text"
            value={displayValue}
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
