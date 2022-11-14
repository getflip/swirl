import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type FlipCheckboxState = boolean | "true" | "false" | "indeterminate";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-checkbox.css",
  tag: "flip-checkbox",
})
export class FlipCheckbox {
  @Prop({ mutable: true }) checked?: FlipCheckboxState = false;
  @Prop() description?: string;
  @Prop() disabled?: boolean = false;
  @Prop() flipAriaDescribedby?: string;
  @Prop() inputId!: string;
  @Prop() inputName!: string;
  @Prop() invalid?: boolean;
  @Prop() label?: string;
  @Prop() value?: string;

  @Event() valueChange: EventEmitter<boolean>;

  private onChange = () => {
    this.checked =
      this.checked === true || this.checked === "true" ? false : true;

    this.valueChange.emit(this.checked);
  };

  private getAriaCheckedLabel(checked: boolean, unchecked: boolean) {
    if (checked) {
      return "true";
    } else if (unchecked) {
      return "false";
    }

    return "mixed";
  }

  render() {
    const unchecked = this.checked === false || this.checked === "false";
    const checked = this.checked === true || this.checked === "true";
    const indeterminate = this.checked === "indeterminate";

    const showLabelContainer = Boolean(this.label) || Boolean(this.description);
    const ariaCheckedLabel = this.getAriaCheckedLabel(checked, unchecked);

    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const className = classnames("checkbox", {
      "checkbox--checked": checked,
      "checkbox--disabled": this.disabled,
      "checkbox--indeterminate": indeterminate,
      "checkbox--invalid": this.invalid,
      "checkbox--unchecked": unchecked,
    });

    return (
      <Host>
        <label class={className} htmlFor={this.inputId}>
          <span class="checkbox__control">
            <flip-visually-hidden>
              <input
                aria-checked={ariaCheckedLabel}
                aria-describedby={this.flipAriaDescribedby}
                aria-invalid={ariaInvalid}
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
            <span aria-hidden="true" class="checkbox__box">
              <span class="checkbox__icon">
                {checked && <flip-icon-check-strong></flip-icon-check-strong>}
                {indeterminate && (
                  <span class="checkbox__indeterminate-icon"></span>
                )}
              </span>
            </span>
          </span>
          {showLabelContainer && (
            <span class="checkbox__label-container">
              {this.label && <span class="checkbox__label">{this.label}</span>}
              {this.description && (
                <span class="checkbox__description">{this.description}</span>
              )}
            </span>
          )}
        </label>
      </Host>
    );
  }
}
