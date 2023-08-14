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
import { getActiveElement } from "../../utils";

export type SwirlFormControlLabelPosition = "inside" | "outside";

/**
 * @slot slot - The input element, e.g. `<swirl-text-input></swirl-text-input>`
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
  styleUrl: "swirl-form-control.css",
  tag: "swirl-form-control",
})
export class SwirlFormControl {
  @Element() el: HTMLElement;

  @Prop() description?: string;
  @Prop() disabled?: boolean;
  @Prop() errorMessage?: string;
  @Prop() hideLabel?: boolean;
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() label!: string;
  @Prop() labelPosition?: SwirlFormControlLabelPosition = "inside";

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
    this.setInputElementInlineState();
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

    this.inputEl.setAttribute("swirl-aria-describedby", this.descriptionId);
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

  @Watch("inline")
  setInputElementInlineState() {
    if (!Boolean(this.inputEl)) {
      return;
    }

    if (this.inline || this.labelPosition === "outside") {
      this.inputEl.setAttribute("inline", "true");
    } else {
      this.inputEl.removeAttribute("inline");
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

    event.stopPropagation();

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
    this.hasFocus = false;
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      setTimeout(() => {
        if (!this.el.contains(getActiveElement())) {
          this.hasFocus = false;
        }
      });
    }
  };

  render() {
    const showErrorMessage = Boolean(this.errorMessage);
    const showDescription = Boolean(this.description) && !showErrorMessage;

    const hasValue = Array.isArray(this.inputValue)
      ? this.inputValue.length > 0
      : Boolean(this.inputValue);

    const hasCharacterCounter = Boolean(
      this.inputEl.getAttribute("show-character-counter")
    );

    const hasPlaceholder = Boolean(this.inputEl.getAttribute("placeholder"));

    const isSelect = this.inputEl.tagName === "SWIRL-SELECT";

    const className = classnames(
      "form-control",
      `form-control--label-position-${this.labelPosition}`,
      {
        "form-control--disabled": this.disabled,
        "form-control--has-character-counter": hasCharacterCounter,
        "form-control--has-focus": this.hasFocus,
        "form-control--has-placeholder": hasPlaceholder,
        "form-control--has-value": hasValue,
        "form-control--hide-label": this.hideLabel,
        "form-control--inline": this.inline,
        "form-control--invalid": this.invalid,
        "form-control--is-select": isSelect,
      }
    );

    return (
      <Host
        onFocusin={this.onFocusIn}
        onFocusout={this.onFocusOut}
        onKeyDown={this.onKeyDown}
      >
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
              <swirl-inline-error
                message={this.errorMessage}
                size="s"
              ></swirl-inline-error>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
