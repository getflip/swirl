import { ComputePositionReturn, Placement } from "@floating-ui/dom";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  h,
} from "@stencil/core";
import classnames from "classnames";
import { SwirlFormInput, querySelectorAllDeep } from "../../utils";

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
  @Prop() emptyListLabel?: string = "No results found.";
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() label!: string;
  @Prop() multiSelect?: boolean;
  @Prop() required?: boolean;
  @Prop() searchInputLabel?: string = "Search options";
  @Prop() searchLoading?: boolean;
  @Prop() searchPlaceholder?: string;
  @Prop() selectId?: string = Math.round(Math.random() * 1000000).toString();
  @Prop() swirlAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?: string[];
  @Prop() withSearch?: boolean;

  @State() options: HTMLSwirlOptionListItemElement[] = [];
  @State() open: boolean;
  @State() placement: Placement;

  @Event() searchChange: EventEmitter<string>;
  @Event() valueChange: EventEmitter<string[]>;

  private input: HTMLInputElement;
  private observer: MutationObserver;
  private optionList: HTMLSwirlOptionListElement;
  private searchInput: HTMLInputElement;
  private swirlPopover: HTMLSwirlPopoverElement;

  componentWillLoad() {
    queueMicrotask(() => {
      this.updateOptions();
      this.observeSlotChanges();
    });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  @Listen("focusin", { target: "window" })
  onWindowFocusIn(event: FocusEvent) {
    if (event.target === this.el.querySelector("input")) {
      event.stopImmediatePropagation();
    }
  }

  private observeSlotChanges() {
    this.observer = new MutationObserver(() => {
      this.updateOptions();
    });

    this.observer.observe(this.el, {
      childList: true,
      subtree: true,
    });
  }

  private updateOptions() {
    this.options = querySelectorAllDeep<HTMLSwirlOptionListItemElement>(
      this.el,
      "swirl-option-list-item"
    );
  }

  private select = (event: CustomEvent<string[]>) => {
    event.stopPropagation();

    this.value = event.detail;
    this.valueChange.emit(this.value);

    if (!this.multiSelect) {
      this.swirlPopover.close();
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

    if (this.withSearch && Boolean(this.searchInput)) {
      this.searchInput.focus();
    } else {
      this.optionList.querySelector<HTMLElement>('[tabIndex="0"]')?.focus();
    }
  };

  private onClose = () => {
    if (Boolean(this.searchInput)) {
      this.searchInput.value = "";
      this.searchChange.emit("");
    }

    this.open = false;
    this.input.focus();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      if (event.target === this.searchInput) {
        return;
      }

      event.preventDefault();
      this.swirlPopover.open(this.el);
    } else if (
      event.code === "ArrowDown" &&
      event.target === this.searchInput
    ) {
      this.optionList.querySelector<HTMLElement>('[tabIndex="0"]')?.focus();
    }
  };

  private onSearchInput = (event: InputEvent) => {
    this.searchChange.emit((event.target as HTMLInputElement).value);
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
        "select--search-loading": this.searchLoading,
      }
    );

    return (
      <Host onKeyDown={this.onKeyDown}>
        <div class={className}>
          <swirl-popover-trigger
            swirlPopover={this.swirlPopover}
            setAriaAttributes={false}
          >
            <input
              aria-describedby={this.swirlAriaDescribedby}
              aria-disabled={this.disabled ? "true" : undefined}
              aria-invalid={ariaInvalid}
              class="select__input"
              disabled={this.disabled}
              readOnly={true}
              ref={(el) => (this.input = el)}
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
            ref={(el) => (this.swirlPopover = el)}
            useContainerWidth="swirl-form-control"
          >
            {this.withSearch && (
              <div class="select__search">
                <swirl-icon-search
                  class="select__search-icon"
                  size={20}
                ></swirl-icon-search>
                <input
                  aria-label={this.searchInputLabel}
                  class="select__search-input"
                  onInput={this.onSearchInput}
                  placeholder={this.searchPlaceholder}
                  ref={(el) => (this.searchInput = el)}
                  type="search"
                />
                {this.searchLoading && (
                  <swirl-spinner
                    class="select__search-spinner"
                    size="s"
                  ></swirl-spinner>
                )}
              </div>
            )}
            <swirl-option-list
              allowDeselect={this.allowDeselect}
              onValueChange={this.select}
              multiSelect={this.multiSelect}
              ref={(el) => (this.optionList = el)}
              value={this.value}
            >
              {!this.searchLoading && (
                <div
                  aria-disabled="true"
                  class="select__empty-list-label"
                  role="option"
                >
                  <swirl-text color="subdued" weight="medium">
                    {this.emptyListLabel}
                  </swirl-text>
                </div>
              )}
              <slot onSlotchange={this.onSlotChange}></slot>
            </swirl-option-list>
          </swirl-popover>
        </div>
      </Host>
    );
  }
}
