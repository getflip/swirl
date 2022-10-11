import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-radio-group.css",
  tag: "flip-radio-group",
})
export class FlipRadioGroup {
  @Element() el: HTMLElement;

  @Prop() flipAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @Event() valueChange: EventEmitter<string>;

  private radioButtons: HTMLFlipRadioElement[];

  componentDidLoad() {
    this.radioButtons = Array.from(this.el.querySelectorAll("flip-radio"));
    this.initValue();
    this.handleValueChanges();
  }

  private initValue() {
    if (this.value === undefined) {
      return;
    }

    const radioWithValue = this.radioButtons.find(
      (radio) => radio.value === this.value
    );

    if (!Boolean(radioWithValue)) {
      return;
    }

    radioWithValue.checked = true;
  }

  private handleValueChanges() {
    for (const [key, radio] of Object.entries(this.radioButtons)) {
      radio.addEventListener("valueChange", () => {
        if (radio.checked === true || radio.checked === "true") {
          this.valueChange.emit(radio.value);
          this.value = radio.value;

          this.radioButtons.forEach((r, k) => {
            if (String(k) === key) {
              return;
            }

            r.checked = false;
          });
        }
      });
    }
  }

  render() {
    return (
      <Host aria-describedby={this.flipAriaDescribedby} role="radiogroup">
        <div class="radio-group">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
