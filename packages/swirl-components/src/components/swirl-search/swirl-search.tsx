import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
} from "@stencil/core";
import classnames from "classnames";
import { DesktopMediaQuery } from "../../services/media-query.service";

export type SwirlSearchVariant = "filled" | "outline" | "ghost";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-search.css",
  tag: "swirl-search",
})
export class SwirlSearch {
  @Prop() autoFocus?: boolean;
  @Prop() clearButtonLabel?: string = "Clear search term";
  @Prop() disabled?: boolean;
  @Prop() inputName?: string;
  @Prop() inputId?: string;
  @Prop() label?: string;
  @Prop() placeholder?: string = "Search …";
  @Prop({ mutable: true }) value?: string;
  @Prop() variant?: SwirlSearchVariant = "filled";
  @Prop() clearable?: boolean = true;

  @Event() clear: EventEmitter<void>;
  @Event() inputBlur: EventEmitter<FocusEvent>;
  @Event() inputFocus: EventEmitter<FocusEvent>;
  @Event() inputInput: EventEmitter<string>;
  @Event() valueChange: EventEmitter<string>;

  private input: HTMLInputElement;
  private iconEl: HTMLElement;
  private mediaQueryUnsubscribe: () => void = () => {};

  componentDidLoad() {
    this.mediaQueryUnsubscribe = DesktopMediaQuery.subscribe((isDesktop) => {
      this.forceIconProps(isDesktop);
    });

    // see https://stackoverflow.com/a/27314017
    if (this.autoFocus) {
      setTimeout(() => {
        this.input.focus();
      });
    }
  }

  disconnectedCallback() {
    this.mediaQueryUnsubscribe();
  }

  private forceIconProps(smallIcon: boolean) {
    if (!Boolean(this.iconEl)) {
      return;
    }

    const icon = this.iconEl.children[0];

    icon?.setAttribute("size", smallIcon ? "20" : "24");
  }

  @Listen("keydown", { target: "window" })
  onKeyDown(event: KeyboardEvent) {
    if (
      (event.code === "KeyK" || event.code === "Slash") &&
      (event.ctrlKey || event.metaKey)
    ) {
      this.input.focus();
    }
  }

  private handleClear = () => {
    this.input.value = "";
    this.input.focus();
    this.valueChange.emit("");
    this.clear.emit();
  };

  private onBlur = (event: FocusEvent) => {
    this.inputBlur.emit(event);
  };

  private onChange = (event: Event) => {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  };

  private onFocus = (event: FocusEvent) => {
    this.inputFocus.emit(event);
  };

  private onInput = (event: Event) => {
    this.inputInput.emit((event.target as HTMLInputElement).value);
  };

  render() {
    const className = classnames("search", `search--variant-${this.variant}`, {
      "search--disabled": this.disabled,
    });

    return (
      <Host>
        <span class={className} ref={(el) => (this.iconEl = el)}>
          <swirl-icon-search
            aria-hidden="true"
            class="search__icon"
          ></swirl-icon-search>
          <input
            aria-disabled={this.disabled ? "true" : undefined}
            aria-label={this.label}
            autoComplete="off"
            autoFocus={this.autoFocus}
            class="search__input"
            disabled={this.disabled}
            id={this.inputId}
            inputMode="search"
            name={this.inputName}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onInput={this.onInput}
            placeholder={this.placeholder}
            ref={(el) => (this.input = el)}
            type="search"
            value={this.value}
          />
          {!this.disabled && this.clearable && (
            <button
              aria-label={this.clearButtonLabel}
              class="search__clear-button"
              onClick={this.handleClear}
              type="button"
            >
              <swirl-icon-cancel></swirl-icon-cancel>
            </button>
          )}
        </span>
      </Host>
    );
  }
}
