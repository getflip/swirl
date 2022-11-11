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
import { FlipFormInput, querySelectorAllDeep } from "../../utils";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "flip-select.css",
  tag: "flip-select",
})
export class FlipSelect implements FlipFormInput<string[]> {
  @Element() el: HTMLElement;

  @Prop() disabled?: boolean;
  @Prop() flipAriaDescribedby?: string;
  @Prop() invalid?: boolean;
  @Prop() label!: string;
  @Prop() multiSelect?: boolean;
  @Prop() required?: boolean;
  @Prop({ mutable: true, reflect: true }) value?: string[];

  @State() options: HTMLFlipOptionListItemElement[] = [];
  @State() open: boolean;

  @Event() valueChange: EventEmitter<string[]>;

  private popover: HTMLFlipPopoverElement;

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
    this.options = querySelectorAllDeep<HTMLFlipOptionListItemElement>(
      this.el,
      "flip-option-list-item"
    );
  }

  private select = (event: CustomEvent<string[]>) => {
    this.value = event.detail;
    this.valueChange.emit(this.value);

    if (!this.multiSelect) {
      this.popover.close();
    }
  };

  private onSlotChange = () => {
    this.updateOptions();
  };

  private onOpen = () => {
    this.open = true;
  };

  private onClose = () => {
    this.open = false;
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      this.popover.open();
    }
  };

  render() {
    const label = Boolean(this.value)
      ? this.value
          .map(
            (value) =>
              this.options.find((option) => option.value === value)?.label
          )
          .join(", ")
      : "";

    const ariaInvalid =
      this.invalid === true
        ? "true"
        : this.invalid === false
        ? "false"
        : undefined;

    const className = classnames("select", {
      "select--disabled": this.disabled,
    });

    return (
      <Host onKeyDown={this.onKeyDown}>
        <div class={className}>
          <input
            aria-describedby={this.flipAriaDescribedby}
            aria-disabled={this.disabled ? "true" : undefined}
            aria-invalid={ariaInvalid}
            class="select__label"
            disabled={this.disabled}
            id="trigger"
            readOnly={true}
            type="text"
            value={label}
          ></input>
          <span class="select__indicator">
            {this.open ? (
              <flip-icon-expand-less></flip-icon-expand-less>
            ) : (
              <flip-icon-expand-more></flip-icon-expand-more>
            )}
          </span>
          <flip-popover
            animation="scale-in-y"
            class="select__popover"
            enableFlip={false}
            label={this.label}
            offset={[16, -16]}
            onPopoverClose={this.onClose}
            onPopoverOpen={this.onOpen}
            popoverId="select-options"
            ref={(el) => (this.popover = el)}
            trigger="trigger"
            useContainerWidth="flip-form-control"
          >
            <flip-option-list
              onValueChange={this.select}
              multiSelect={this.multiSelect}
              value={this.value}
            >
              <slot onSlotchange={this.onSlotChange}></slot>
            </flip-option-list>
          </flip-popover>
        </div>
      </Host>
    );
  }
}
