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

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-search.css",
  tag: "flip-search",
})
export class FlipSearch {
  @Prop() autoFocus?: boolean;
  @Prop() clearButtonLabel?: string = "Clear search term";
  @Prop() disabled?: boolean;
  @Prop() inputName?: string;
  @Prop() inputId?: string;
  @Prop() label?: string;
  @Prop() placeholder?: string = "Search …";
  @Prop({ mutable: true }) value?: string;

  @Event() inputBlur: EventEmitter<FocusEvent>;
  @Event() inputFocus: EventEmitter<FocusEvent>;
  @Event() valueChange: EventEmitter<string>;

  private input: HTMLInputElement;

  @Listen("keydown", { target: "window" })
  onKeyDown(event: KeyboardEvent) {
    if (
      (event.code === "KeyK" || event.code === "Slash") &&
      (event.ctrlKey || event.metaKey)
    ) {
      this.input.focus();
    }
  }

  private clear = () => {
    this.input.value = "";
    this.input.focus();
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

  render() {
    const className = classnames("search", {
      "search--disabled": this.disabled,
    });

    return (
      <Host>
        <span class={className}>
          <flip-icon-search class="search__icon"></flip-icon-search>
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
            placeholder={this.placeholder}
            ref={(el) => (this.input = el)}
            type="search"
            value={this.value}
          />
          {!this.disabled && (
            <button
              aria-label={this.clearButtonLabel}
              class="search__clear-button"
              onClick={this.clear}
              type="button"
            >
              <flip-icon-cancel></flip-icon-cancel>
            </button>
          )}
        </span>
      </Host>
    );
  }
}
