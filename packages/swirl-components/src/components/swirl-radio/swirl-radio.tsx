import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import classnames from "classnames";

export type SwirlRadioState = boolean | "true" | "false";

export type SwirlRadioVariant = "default" | "card";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-radio.css",
  tag: "swirl-radio",
})
export class SwirlRadio {
  @Prop({ mutable: true }) checked?: SwirlRadioState = false;
  @Prop() description?: string;
  @Prop() disabled?: boolean = false;
  @Prop() inputId!: string;
  @Prop() inputName!: string;
  @Prop() invalid?: boolean;
  @Prop() label?: string;
  @Prop() tooltip?: string;
  @Prop() value!: string;
  @Prop() variant?: SwirlRadioVariant = "default";

  @Event() valueChange: EventEmitter<string>;

  private onChange = () => {
    this.checked = true;
    this.valueChange.emit(this.value);
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

    const ariaCheckedLabel = this.getAriaCheckedLabel(checked, unchecked);
    const ariaInvalid = this.invalid;

    const className = classnames("radio", `radio--variant-${this.variant}`, {
      "radio--checked": checked,
      "radio--disabled": this.disabled,
      "radio--invalid": this.invalid,
      "radio--unchecked": unchecked,
    });

    return (
      <Host style={{ width: this.variant === "card" ? "100%" : undefined }}>
        <label class={className} htmlFor={this.inputId}>
          <span class="radio__control">
            <swirl-visually-hidden>
              <input
                aria-checked={ariaCheckedLabel}
                aria-invalid={ariaInvalid}
                checked={checked}
                class="radio__input"
                disabled={this.disabled}
                id={this.inputId}
                name={this.inputName}
                onChange={this.onChange}
                type="radio"
                value={this.value}
              />
            </swirl-visually-hidden>
            <span aria-hidden="true" class="radio__box"></span>
          </span>
          <span class="radio__label-container">
            {this.label && (
              <span class="radio__label">
                {this.label}
                {this.tooltip && (
                  <swirl-tooltip content={this.tooltip} position="top">
                    <swirl-icon-help
                      color="default"
                      size={20}
                      tabIndex={0}
                    ></swirl-icon-help>
                  </swirl-tooltip>
                )}
              </span>
            )}
            {this.description && (
              <span
                class="radio__description"
                innerHTML={this.description}
              ></span>
            )}
          </span>
        </label>
      </Host>
    );
  }
}
