import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipRadioState = boolean | "true" | "false";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-radio.css",
  tag: "flip-radio",
})
export class FlipRadio {
  @Prop({ mutable: true }) checked?: FlipRadioState = false;
  @Prop() disabled?: boolean = false;
  @Prop() inputId!: string;
  @Prop() inputName!: string;
  @Prop() label?: string;
  @Prop() value!: string;

  @Event() valueChange: EventEmitter<string>;

  private onChange = () => {
    this.checked = true;
    this.valueChange.emit(this.value);
  };

  render() {
    const unchecked = this.checked === false || this.checked === "false";
    const checked = this.checked === true || this.checked === "true";

    const ariaCheckedLabel = checked ? "true" : unchecked ? "false" : "mixed";

    const className = classnames("radio", {
      "radio--checked": checked,
      "radio--disabled": this.disabled,
      "radio--unchecked": unchecked,
    });

    return (
      <Host>
        <label class={className} htmlFor={this.inputId}>
          <span class="radio__control">
            <flip-visually-hidden>
              <input
                aria-checked={ariaCheckedLabel}
                checked={checked}
                class="radio__input"
                disabled={this.disabled}
                id={this.inputId}
                name={this.inputName}
                onChange={this.onChange}
                type="radio"
                value={this.value}
              />
            </flip-visually-hidden>
            <span aria-hidden="true" class="radio__backdrop"></span>
            <span aria-hidden="true" class="radio__box"></span>
          </span>
          {this.label && <span class="radio__label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
