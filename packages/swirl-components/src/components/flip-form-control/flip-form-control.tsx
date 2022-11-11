import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from "@stencil/core";
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

  @State() hasFocus: boolean;
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
    this.setInputElementLabel();
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

  @Watch("label")
  setInputElementLabel() {
    if (!Boolean(this.inputEl)) {
      return;
    }

    this.inputEl.setAttribute("label", this.label);
  }

  @Listen("click", { target: "window" })
  onWindowClick(event: MouseEvent) {
    if (!this.hasFocus) {
      return;
    }

    const target = event.target as HTMLElement;

    if (this.el.contains(target)) {
      return;
    }

    this.hasFocus = false;
  }

  private listenToInputValueChanges = () => {
    this.inputEl.addEventListener("valueChange", this.checkInputValue);
  };

  private checkInputValue = () => {
    this.inputValue = (this.inputEl as HTMLInputElement)?.value;
  };

  private onFocusIn = () => {
    this.hasFocus = true;
  };

  private onFocusOut = () => {
    if (!this.hasFocus) {
      return;
    }

    this.hasFocus = false;
  };

  render() {
    const showErrorMessage = Boolean(this.errorMessage);
    const showDescription = Boolean(this.description) && !showErrorMessage;

    const hasValue = Array.isArray(this.inputValue)
      ? this.inputValue.length > 0
      : Boolean(this.inputValue);

    const isSelect = this.inputEl.tagName === "FLIP-SELECT";

    const className = classnames("form-control", {
      "form-control--disabled": this.disabled,
      "form-control--has-focus": this.hasFocus,
      "form-control--has-value": hasValue,
      "form-control--invalid": this.invalid,
      "form-control--is-select": isSelect,
    });

    return (
      <Host onFocusin={this.onFocusIn} onFocusout={this.onFocusOut}>
        <div class={className} role="group">
          <label class="form-control__label">
            <span class="form-control__label-text">{this.label}</span>
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
