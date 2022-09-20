import { h, Component, Element, Host, Prop, Watch, State } from "@stencil/core";
import classnames from "classnames";

/**
 * @slot slot - The input element, e.g. `<flip-text-input></flip-text-input>`
 */
@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-form-control.css",
  tag: "flip-form-control",
})
export class FlipFormControl {
  @Element() el: HTMLElement;

  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() errorMessage?: string;
  @Prop() invalid?: boolean;
  @Prop() label!: string;

  @State() inputValue: string;

  private descriptionId = `form-control-description-${Math.round(
    Math.random() * 100000
  )}`;

  private inputEl: HTMLElement;

  componentWillLoad() {
    this.inputEl = this.el.children[0] as HTMLElement;

    this.associateDescriptionWithInputElement();
    this.setInputElementDisabledState();
    this.setInputElementInvalidState();
    this.checkInputValue();
    this.listenToInputValueChanges();
  }

  @Watch("description")
  associateDescriptionWithInputElement() {
    if (!Boolean(this.description) || !Boolean(this.inputEl)) {
      return;
    }

    this.inputEl.setAttribute("flip-aria-describedby", this.descriptionId);
  }

  @Watch("disabled")
  setInputElementDisabledState() {
    if (!Boolean(this.inputEl)) {
      return;
    }

    if (this.disabled) {
      console.log(this.inputEl);
      this.inputEl.setAttribute("disabled", "true");
    } else {
      this.inputEl.removeAttribute("disabled");
    }
  }

  @Watch("invalid")
  setInputElementInvalidState() {
    if (!Boolean(this.inputEl)) {
      return;
    }

    if (this.invalid) {
      this.inputEl.setAttribute("invalid", "true");
    } else {
      this.inputEl.removeAttribute("invalid");
    }
  }

  private listenToInputValueChanges = () => {
    this.inputEl.addEventListener("valueChange", this.checkInputValue);
  };

  private checkInputValue = () => {
    this.inputValue = (this.inputEl as HTMLInputElement)?.value;
  };

  render() {
    const showErrorMessage = Boolean(this.errorMessage);
    const showDescription = Boolean(this.description) && !showErrorMessage;

    const className = classnames("form-control", {
      "form-control--disabled": this.disabled,
      "form-control--has-value": Boolean(this.inputValue),
      "form-control--invalid": this.invalid,
    });

    return (
      <Host>
        <div class={className} role="group">
          <label class="form-control__label">
            {this.label}
            <span class="form-control__input">
              <slot></slot>
            </span>
          </label>
          {showDescription && (
            <span class="form-control__description" id={this.descriptionId}>
              {this.description}
            </span>
          )}
          {showErrorMessage && (
            <span
              aria-live="polite"
              class="form-control__error-message"
              id={this.descriptionId}
            >
              <flip-inline-error
                message={this.errorMessage}
                size="s"
              ></flip-inline-error>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
