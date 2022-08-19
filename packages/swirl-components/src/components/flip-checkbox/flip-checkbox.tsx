import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipCheckboxState = boolean | "true" | "false" | "indeterminate";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls. Instead we use Stencil's scoping.
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-checkbox.css",
  tag: "flip-checkbox",
})
export class FlipCheckbox {
  @Prop() checked?: FlipCheckboxState = false;
  @Prop() disabled?: boolean = false;
  @Prop() inputId!: string;
  @Prop() inputName!: string;
  @Prop() label?: string;
  @Prop() value?: string;

  @Event() valueChange: EventEmitter<boolean>;

  private onChange = () => {
    const checked = this.checked === true || this.checked === "true";

    this.valueChange.emit(!checked);
  };

  render() {
    const unchecked = this.checked === false || this.checked === "false";
    const checked = this.checked === true || this.checked === "true";
    const indeterminate = this.checked === "indeterminate";

    const ariaCheckedLabel = checked ? "true" : unchecked ? "false" : "mixed";

    const className = classnames("checkbox", {
      "checkbox--checked": checked,
      "checkbox--disabled": this.disabled,
      "checkbox--indeterminate": indeterminate,
      "checkbox--unchecked": unchecked,
    });

    return (
      <Host>
        <label class={className} htmlFor={this.inputId}>
          <span class="checkbox__control">
            <flip-visually-hidden>
              <input
                aria-checked={ariaCheckedLabel}
                checked={checked}
                class="checkbox__input"
                disabled={this.disabled}
                id={this.inputId}
                indeterminate={indeterminate}
                name={this.inputName}
                onChange={this.onChange}
                type="checkbox"
                value={this.value}
              />
            </flip-visually-hidden>
            <span aria-hidden="true" class="checkbox__backdrop"></span>
            <span aria-hidden="true" class="checkbox__box">
              <span class="checkbox__icon">
                {checked && <flip-icon-check-strong></flip-icon-check-strong>}
                {indeterminate && (
                  <span class="checkbox__indeterminate-icon"></span>
                )}
              </span>
            </span>
          </span>
          {this.label && <span class="checkbox__label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
