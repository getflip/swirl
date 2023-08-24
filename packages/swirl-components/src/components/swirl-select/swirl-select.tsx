import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import classnames from "classnames";
import { SwirlFormInput, querySelectorAllDeep } from "../../utils";
import { ComputePositionReturn, Placement } from "@floating-ui/dom";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-select.css",
  tag: "swirl-select",
})
export class SwirlSelect implements SwirlFormInput<string[]> {
  @Element() el: HTMLElement;

  @Prop() allowDeselect?: boolean = true;
  @Prop() disabled?: boolean;
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() label!: string;
  @Prop() multiSelect?: boolean;
  @Prop() required?: boolean;
  @Prop() selectId?: string = Math.round(Math.random() * 1000000).toString();
  @Prop() swirlAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?: string[];

  @State() options: HTMLSwirlOptionListItemElement[] = [];
  @State() open: boolean;
  @State() placement: Placement;

  @Event() valueChange: EventEmitter<string[]>;

  private popover: HTMLSwirlPopoverElement;

  componentWillLoad() {
    queueMicrotask(() => {
      this.updateOptions();
    });
  }

  @Listen("focusin", { target: "window" })
  onWindowFocusIn(event: FocusEvent) {
    if (event.target === this.el.querySelector("input")) {
      event.stopImmediatePropagation();
    }
  }

  private updateOptions() {
    this.options = querySelectorAllDeep<HTMLSwirlOptionListItemElement>(
      this.el,
      "swirl-option-list-item"
    );
  }

  private select = (event: CustomEvent<string[]>) => {
    this.value = event.detail;
    this.valueChange.emit(this.value);

    if (!this.multiSelect) {
      this.popover.close();
    }
  };

  private unselectOption = (value: string) => {
    if (!this.allowDeselect) {
      return;
    }

    this.value = this.value.filter((v) => v !== value);
    this.valueChange.emit(this.value);
  };

  private onSlotChange = () => {
    this.updateOptions();
  };

  private onOpen = (
    event: CustomEvent<{ position: ComputePositionReturn }>
  ) => {
    this.placement = event.detail.position?.placement;
    this.open = true;
  };

  private onClose = () => {
    this.open = false;
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      this.popover.open(this.el);
    }
  };

  render() {
    const label = Boolean(this.value)
      ? this.value
          ?.map(
            (value) =>
              this.options.find((option) => option.value === value)?.label
          )
          .join(", ")
      : "";

    const ariaInvalid =
      this.invalid === true || this.invalid === false
        ? String(this.invalid)
        : undefined;

    const formControl = this.el.closest<
      HTMLSwirlFormControlElement | undefined
    >("swirl-form-control");

    const offset =
      formControl?.inline || formControl?.labelPosition === "outside"
        ? -12
        : -16;

    const className = classnames(
      "select",
      `select--placement-${this.placement}`,
      {
        "select--disabled": this.disabled,
        "select--inline": this.inline,
        "select--multi": this.multiSelect,
      }
    );

    return (
      <Host onKeyDown={this.onKeyDown}>
        <div class={className}>
          <swirl-popover-trigger
            popover={this.popover}
            setAriaAttributes={false}
          >
            <input
              aria-describedby={this.swirlAriaDescribedby}
              aria-disabled={this.disabled ? "true" : undefined}
              aria-invalid={ariaInvalid}
              class="select__input"
              disabled={this.disabled}
              readOnly={true}
              type="text"
              value={label}
            ></input>
          </swirl-popover-trigger>
          <span class="select__multi-select-values">
            {this.value
              ?.map((value) =>
                this.options.find((option) => option.value === value)
              )
              ?.map((option) => (
                <swirl-tag
                  aria-hidden="true"
                  label={option?.label}
                  // eslint-disable-next-line react/jsx-no-bind
                  onRemove={() => this.unselectOption(option?.value)}
                  removable={!this.disabled && this.allowDeselect}
                ></swirl-tag>
              ))}
          </span>
          <span class="select__indicator">
            {this.open ? (
              <swirl-icon-expand-less></swirl-icon-expand-less>
            ) : (
              <swirl-icon-expand-more></swirl-icon-expand-more>
            )}
          </span>
          <swirl-popover
            animation="scale-in-y"
            class="select__popover"
            id={`select-options-${this.selectId}`}
            label={this.label}
            offset={[0, offset]}
            onPopoverClose={this.onClose}
            onPopoverOpen={this.onOpen}
            ref={(el) => (this.popover = el)}
            useContainerWidth="swirl-form-control"
          >
            <swirl-option-list
              allowDeselect={this.allowDeselect}
              onValueChange={this.select}
              multiSelect={this.multiSelect}
              value={this.value}
            >
              <slot onSlotchange={this.onSlotChange}></slot>
            </swirl-option-list>
          </swirl-popover>
        </div>
      </Host>
    );
  }
}
