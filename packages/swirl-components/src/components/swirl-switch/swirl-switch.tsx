import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import classnames from "classnames";

export type SwirlSwitchLabelPosition = "start" | "end";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-switch.css",
  tag: "swirl-switch",
})
export class SwirlSwitch {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) checked?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() hideLabel?: boolean;
  @Prop() inputId!: string;
  @Prop() inputName!: string;
  @Prop() label?: string;
  @Prop() labelPosition?: SwirlSwitchLabelPosition = "end";
  @Prop() value?: string;

  @Event() valueChange: EventEmitter<boolean>;

  private onChange = () => {
    this.checked = !this.checked;
    this.valueChange.emit(this.checked);
  };

  render() {
    const off = !this.checked;
    const on = this.checked;

    const ariaCheckedLabel = on ? "true" : "false";

    const className = classnames(
      "switch",
      `switch--label-position-${this.labelPosition}`,
      {
        "switch--off": off,
        "switch--on": on,
        "switch--disabled": this.disabled,
      }
    );

    return (
      <Host>
        <label class={className} htmlFor={this.inputId}>
          <span class="switch__control">
            <swirl-visually-hidden>
              <input
                aria-checked={ariaCheckedLabel}
                checked={on}
                class="switch__input"
                disabled={this.disabled}
                id={this.inputId}
                name={this.inputName}
                onChange={this.onChange}
                role="switch"
                type="checkbox"
                value={this.value}
              />
            </swirl-visually-hidden>
            <span aria-hidden="true" class="switch__thumb"></span>
          </span>
          {this.label && !this.hideLabel && (
            <span class="switch__label">{this.label}</span>
          )}
          {this.label && this.hideLabel && (
            <swirl-visually-hidden>{this.label}</swirl-visually-hidden>
          )}
        </label>
      </Host>
    );
  }
}
