import {
  autoUpdate,
  computePosition,
  ComputePositionReturn,
  offset,
} from "@floating-ui/dom";
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
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import { debounce, SwirlFormInput } from "../../utils";
import { SwirlTextInputMode } from "../swirl-text-input/swirl-text-input";

export type SwirlAutocompleteSuggestion = {
  disabled?: boolean;
  id: string;
  label: string;
};

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-autocomplete.css",
  tag: "swirl-autocomplete",
})
export class SwirlAutocomplete
  implements
    SwirlFormInput<SwirlAutocompleteSuggestion | SwirlAutocompleteSuggestion[]>
{
  @Element() el: HTMLElement;

  @Prop() autoSelect?: boolean;
  @Prop() clearable?: boolean = true;
  @Prop() clearButtonLabel?: string = "Clear input";
  @Prop() disabled?: boolean;
  @Prop({ mutable: true }) generateSuggestions?: (
    term: string
  ) => Promise<SwirlAutocompleteSuggestion[]> = async () => [];
  @Prop() inline?: boolean;
  @Prop() invalid?: boolean;
  @Prop() maxLength?: number;
  @Prop() menuLabel?: string = "Suggestions";
  @Prop() mode?: SwirlTextInputMode;
  @Prop() multiSelect?: boolean;
  @Prop() placeholder?: string;
  @Prop() required?: boolean;
  @Prop() spellCheck?: boolean;
  @Prop() swirlAriaDescribedby?: string;
  @Prop({ mutable: true, reflect: true }) value?:
    | SwirlAutocompleteSuggestion
    | SwirlAutocompleteSuggestion[];

  @State() active: boolean = false;
  @State() loading: boolean = false;
  @State() position: ComputePositionReturn;
  @State() suggestions: SwirlAutocompleteSuggestion[] = [];

  @Event() valueChange: EventEmitter<
    SwirlAutocompleteSuggestion | SwirlAutocompleteSuggestion[]
  >;

  private disableAutoUpdate: any;
  private id: string;
  private listboxContainerEl: HTMLDivElement;
  private listboxEl: HTMLSwirlOptionListElement;
  private inputEl: HTMLSwirlTextInputElement;

  componentWillLoad() {
    const index = document.querySelectorAll("swirl-datepicker").length;

    this.id = `autocomplete-${index}`;

    this.handleInitialValue();
  }

  @Listen("click", { target: "window" })
  onWindowClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!this.el.contains(target)) {
      this.close();
    }
  }

  @Watch("multiSelect")
  watchMultiSelect() {
    this.handleInitialValue();
  }

  private async close() {
    if (!this.active) {
      return;
    }

    if (this.disableAutoUpdate) {
      this.disableAutoUpdate();
    }

    const inputEl = this.inputEl.querySelector("input");

    if (Boolean(inputEl)) {
      if (this.multiSelect) {
        inputEl.value = "";
      } else {
        inputEl.value =
          (this.value as SwirlAutocompleteSuggestion)?.label || "";
      }
    }

    this.active = false;
  }

  private async open() {
    if (this.active) {
      return;
    }

    this.active = true;

    requestAnimationFrame(async () => {
      await this.reposition();

      if (this.disableAutoUpdate) {
        this.disableAutoUpdate();
      }

      this.disableAutoUpdate = autoUpdate(
        this.inputEl,
        this.listboxContainerEl,
        this.reposition.bind(this),
        { animationFrame: true }
      );

      this.listboxContainerEl.scrollTop = 0;

      this.updateSuggestions(this.inputEl.querySelector("input").value);
    });
  }

  private async reposition() {
    if (!Boolean(this.listboxContainerEl)) {
      return;
    }

    this.position = await computePosition(
      this.inputEl,
      this.listboxContainerEl,
      {
        middleware: [offset({ crossAxis: -16, mainAxis: 16 })],
        placement: "bottom-start",
        strategy: "fixed",
      }
    );
  }

  private async updateSuggestions(term?: string) {
    this.loading = true;
    this.suggestions = [];
    this.suggestions = await this.generateSuggestions(term);
    this.loading = false;
  }

  private onChange = (event: CustomEvent<string>) => {
    event.stopPropagation();
    this.updateTerm(event);
  };

  private updateTerm = debounce(
    async (event: CustomEvent<string>) => {
      this.updateSuggestions(event.detail);
      this.open();

      if (this.multiSelect) {
        return;
      }

      if (!Boolean(event.detail) || event.detail === "") {
        this.value = undefined;
        this.valueChange.emit(this.value);
      }
    },
    250,
    false
  );

  private onSelect = async (event: CustomEvent<string[]>) => {
    event.stopPropagation();

    if (this.multiSelect) {
      const selectedItemIds = event.detail;
      const unselectedItemIds = this.suggestions
        .filter((suggestion) => !selectedItemIds.includes(suggestion.id))
        .map((suggestion) => suggestion.id);

      this.value = [
        ...(this.value as SwirlAutocompleteSuggestion[]).filter(
          (item) => !unselectedItemIds.includes(item.id)
        ),
        ...this.suggestions.filter(
          (suggestion) =>
            selectedItemIds.includes(suggestion.id) &&
            !(this.value as SwirlAutocompleteSuggestion[]).some(
              (item) => item.id === suggestion.id
            )
        ),
      ];

      this.valueChange.emit(this.value);
      this.inputEl.querySelector("input")?.focus();

      await this.updateSuggestions(this.inputEl.querySelector("input").value);
    } else {
      if (Boolean(event.detail[0])) {
        const itemId = event.detail[0];
        const suggestion = this.suggestions.find(
          (suggestion) => suggestion.id === itemId
        );

        if (!Boolean(suggestion)) {
          return;
        }

        this.value = suggestion;
        this.valueChange.emit(this.value);

        this.inputEl.querySelector("input")?.focus();
        this.close();
      }
    }
  };

  private onRemoveValue = (value: string) => {
    if (!Array.isArray(this.value)) {
      return;
    }

    this.value = (this.value as SwirlAutocompleteSuggestion[]).filter(
      (item) => item.id !== value
    );

    this.valueChange.emit(this.value);
  };

  private onFocusOut = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement | undefined;

    if (Boolean(relatedTarget) && !this.el.contains(relatedTarget)) {
      this.close();
    }
  };

  private onFocus = () => {
    this.updateSuggestions();
    this.open();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.inputEl.querySelector("input").focus();
      this.close();
    }
  };

  private onInputKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowDown") {
      event.preventDefault();
      this.listboxEl.querySelector<HTMLDivElement>('[role="listbox"]').focus();
    }
  };

  private handleInitialValue() {
    if (this.multiSelect && !Array.isArray(this.value)) {
      this.value = [];
    }

    if (!this.multiSelect && Array.isArray(this.value)) {
      this.value = undefined;
    }
  }

  render() {
    const suggestionsMenuId = `${this.id}-suggestions`;

    const clearable = this.clearable && !this.multiSelect;

    const optionListValue = this.multiSelect
      ? (this.value as SwirlAutocompleteSuggestion[]).map((item) => item.id)
      : Boolean(this.value)
      ? [(this.value as SwirlAutocompleteSuggestion).id]
      : [];

    const valueLabel = this.multiSelect
      ? undefined
      : (this.value as SwirlAutocompleteSuggestion)?.label || "";

    const className = classnames("autocomplete", {
      "autocomplete--inactive": !this.active,
    });

    return (
      <Host>
        <div
          class={className}
          onFocusout={this.onFocusOut}
          onKeyDown={this.onKeyDown}
        >
          {this.multiSelect &&
            Array.isArray(this.value) &&
            this.value.length > 0 && (
              <div class="autocomplete__multi-select-tags">
                <swirl-stack orientation="horizontal" spacing="8" wrap>
                  {this.value.map((item) => {
                    return (
                      <swirl-tag
                        key={item.id}
                        label={item.label}
                        // eslint-disable-next-line react/jsx-no-bind
                        onRemove={() => this.onRemoveValue(item.id)}
                        removable={!this.disabled}
                      ></swirl-tag>
                    );
                  })}
                </swirl-stack>
              </div>
            )}
          <swirl-text-input
            autoSelect={this.autoSelect}
            class="autocomplete__input"
            clearable={clearable}
            clearButtonLabel={this.clearButtonLabel}
            disabled={this.disabled}
            disableDynamicWidth
            id={this.id}
            inline={this.inline}
            invalid={this.invalid}
            onInputFocus={this.onFocus}
            onKeyDown={this.onInputKeyDown}
            onValueChange={this.onChange}
            maxLength={this.maxLength}
            mode={this.mode}
            placeholder={this.placeholder}
            ref={(el) => (this.inputEl = el)}
            required={this.required}
            spellCheck={this.spellCheck}
            swirlAriaAutocomplete="list"
            swirlAriaControls={suggestionsMenuId}
            swirlAriaDescribedby={this.swirlAriaDescribedby}
            swirlAriaExpanded={String(this.active)}
            swirlRole="combobox"
            value={valueLabel}
          ></swirl-text-input>

          <div
            class="autocomplete__listbox-container"
            ref={(el) => (this.listboxContainerEl = el)}
            style={{
              top: Boolean(this.position) ? `${this.position?.y}px` : "",
              left: Boolean(this.position) ? `${this.position?.x}px` : "",
              width: `${this.inputEl?.getBoundingClientRect().width + 32}px`,
            }}
          >
            {this.loading && (
              <div class="autocomplete__spinner">
                <swirl-spinner></swirl-spinner>
              </div>
            )}
            {this.suggestions.length > 0 && (
              <swirl-option-list
                allowDeselect={this.multiSelect === true}
                label={this.menuLabel}
                multiSelect={this.multiSelect}
                onValueChange={this.onSelect}
                optionListId={suggestionsMenuId}
                ref={(el) => (this.listboxEl = el)}
                value={optionListValue}
              >
                {this.suggestions.map((suggestion) => (
                  <swirl-option-list-item
                    selected={
                      Array.isArray(this.value)
                        ? this.value.some((item) => item.id === suggestion.id)
                        : this.value?.id === suggestion.id
                    }
                    key={suggestion.id}
                    disabled={suggestion.disabled}
                    label={suggestion.label}
                    value={suggestion.id}
                  ></swirl-option-list-item>
                ))}
              </swirl-option-list>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
