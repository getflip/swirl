import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";

/**
 * @slot slot - The radio options (e.g. swirl-radio).
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
  styleUrl: "swirl-radio-group.css",
  tag: "swirl-radio-group",
})
export class SwirlRadioGroup {
  @Element() el: HTMLElement;

  @Prop() swirlAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?: string;

  @Event() valueChange: EventEmitter<string>;

  private componentLoaded = false;
  private radioButtons: HTMLSwirlRadioElement[];

  connectedCallback() {
    if (this.componentLoaded) {
      this.addValueChangeListeners();
    }
  }
  componentDidLoad() {
    this.radioButtons = Array.from(this.el.querySelectorAll("swirl-radio"));
    this.initValue();
    this.addValueChangeListeners();
    this.componentLoaded = true;
  }

  disconnectedCallback() {
    this.removeValueChangeListeners();
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

  private addValueChangeListeners() {
    this.radioButtons.forEach((radio) => {
      radio.addEventListener("valueChange", this.onRadioValueChange);
    });
  }

  private removeValueChangeListeners() {
    this.radioButtons?.forEach((radio) => {
      radio.removeEventListener("valueChange", this.onRadioValueChange);
    });
  }

  private onRadioValueChange = (event: Event) => {
    event.stopPropagation();

    const radio = event.target as HTMLSwirlRadioElement;

    if (radio.checked === true || (radio.checked as any) === "true") {
      this.value = radio.value;
      this.valueChange.emit(radio.value);

      this.radioButtons.forEach((r) => {
        if (r !== radio) {
          r.checked = false;
        }
      });
    }
  };

  render() {
    return (
      <Host aria-describedby={this.swirlAriaDescribedby} role="radiogroup">
        <div class="radio-group">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
