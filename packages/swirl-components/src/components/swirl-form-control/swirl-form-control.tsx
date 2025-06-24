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
import { getActiveElement, isDescendantOf } from "../../utils";

export type SwirlFormControlFontSize = "default" | "sm" | "base";

export type SwirlFormControlLabelPosition = "inside" | "outside";

/**
 * @slot prefix - The prefix element, e.g. `<select slot="prefix">…</select>`
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
  @Prop() fontSize?: SwirlFormControlFontSize = "default";
  @Prop() hideLabel?: boolean;
  @Prop() icon?: string;
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() label!: string;
  @Prop() labelPosition?: SwirlFormControlLabelPosition = "inside";
  @Prop() tooltip?: string;
  @Prop() secondaryLabel?: string;

  @State() hasFocus: boolean;
  @State() inputValue: string;

  private descriptionId = `form-control-description-${Math.round(
    Math.random() * 100000
  )}`;
  private labelId = `form-control-label-${Math.round(Math.random() * 100000)}`;

  private inputEl: HTMLElement;

  componentWillLoad() {
    this.inputEl = this.el.firstElementChild as HTMLElement;

    this.associateDescriptionWithInputElement();
    this.associateLabelWithInputElement();
    this.setInputElementDisabledState();
    this.setInputElementInlineState();
    this.setInputElementInvalidState();
    this.setInputElementLabel();
    this.checkInputValue();
    this.listenToInputValueChanges();
  }

  componentDidRender() {
    this.checkInputValue();
  }

  @Watch("description")
  watchDescription() {
    this.associateDescriptionWithInputElement();
  }

  @Watch("errorMessage")
  watchErrorMessage() {
    this.associateDescriptionWithInputElement();
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

    let label = this.label;

    if (this.secondaryLabel) {
      label += ` ${this.secondaryLabel}`;
    }

    this.inputEl.setAttribute("label", label);
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

  private associateLabelWithInputElement() {
    if (!Boolean(this.inputEl.getAttribute("contenteditable"))) {
      return;
    }

    this.inputEl.setAttribute("aria-labelledby", this.labelId);
    this.inputEl.setAttribute("aria-describedby", this.descriptionId);
  }

  private associateDescriptionWithInputElement() {
    if (!Boolean(this.inputEl)) {
      return;
    }

    if (Boolean(this.description) || Boolean(this.errorMessage)) {
      if (Boolean(this.inputEl.getAttribute("contenteditable"))) {
        this.inputEl.setAttribute("aria-describedby", this.descriptionId);
      } else {
        this.inputEl.setAttribute("swirl-aria-describedby", this.descriptionId);
      }
    } else {
      this.inputEl.removeAttribute("aria-describedby");
      this.inputEl.removeAttribute("swirl-aria-describedby");
    }
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
        if (!isDescendantOf(getActiveElement(), this.el)) {
          this.hasFocus = false;
        }
      });
    }
  };

  private onLabelClick = () => {
    if (Boolean(this.inputEl.getAttribute("contenteditable"))) {
      this.inputEl.focus();
    }
  };

  render() {
    const showErrorMessage = Boolean(this.errorMessage);
    const showDescription = Boolean(this.description) && !showErrorMessage;

    const hasContenteditableControl = Boolean(
      this.inputEl.getAttribute("contenteditable")
    );

    const hasPrefix = Boolean(this.el.querySelector('[slot="prefix"]'));
    const hasIcon = Boolean(this.icon);

    const hasValue = Array.isArray(this.inputValue)
      ? this.inputValue.length > 0
      : Boolean(this.inputValue) ||
        (hasContenteditableControl && Boolean(this.inputEl.innerHTML));

    const hasCharacterCounter = Boolean(
      this.inputEl.getAttribute("show-character-counter")
    );

    const hasPlaceholder = Boolean(this.inputEl.getAttribute("placeholder"));

    const isSelect = this.inputEl.tagName === "SWIRL-SELECT";

    const className = classnames(
      "form-control",
      `form-control--font-size-${this.fontSize}`,
      `form-control--label-position-${this.labelPosition}`,
      {
        "form-control--disabled": this.disabled,
        "form-control--has-character-counter": hasCharacterCounter,
        "form-control--has-focus": this.hasFocus,
        "form-control--has-placeholder": hasPlaceholder,
        "form-control--has-prefix": hasPrefix,
        "form-control--has-icon": hasIcon,
        "form-control--has-value": hasValue,
        "form-control--hide-label": this.hideLabel,
        "form-control--inline": this.inline,
        "form-control--invalid": this.invalid,
        "form-control--is-select": isSelect,
      }
    );

    const LabelTag = hasContenteditableControl ? "div" : "label";

    return (
      <Host
        onFocusin={this.onFocusIn}
        onFocusout={this.onFocusOut}
        onKeyDown={this.onKeyDown}
      >
        <div class={className} role="group">
          <span class="form-control__controls">
            <span class="form-control__prefix">
              <slot name="prefix"></slot>
            </span>
            <LabelTag class="form-control__label" onClick={this.onLabelClick}>
              {hasIcon && (
                <span class="form-control__icon">
                  <swirl-icon glyph={this.icon} size={20}></swirl-icon>
                </span>
              )}
              <span class="form-control__label-text" id={this.labelId}>
                {this.label}
                {this.secondaryLabel && this.labelPosition === "outside" && (
                  <span class="form-control__secondary-label">
                    {this.secondaryLabel}
                  </span>
                )}
                {this.tooltip && (
                  <span class="form-control__tooltip">
                    <swirl-tooltip
                      content={this.tooltip}
                      positioning="fixed"
                      position="top"
                    >
                      <swirl-icon-help size={16} tabindex="0"></swirl-icon-help>
                    </swirl-tooltip>
                  </span>
                )}
              </span>
              <span class="form-control__input">
                <slot></slot>
              </span>
            </LabelTag>
          </span>
          {showDescription && (
            <span class="form-control__description" id={this.descriptionId}>
              {this.description}
            </span>
          )}
          <span aria-live="polite">
            {showErrorMessage && (
              <span class="form-control__error-message" id={this.descriptionId}>
                <swirl-inline-error
                  message={this.errorMessage}
                  size="s"
                ></swirl-inline-error>
              </span>
            )}
          </span>
        </div>
      </Host>
    );
  }
}
