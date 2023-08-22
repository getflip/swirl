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
export class SwirlAutocomplete implements SwirlFormInput<string | string[]> {
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
  @Prop({ mutable: true, reflect: true }) value?: string | string[];

  @State() active: boolean = false;
  @State() loading: boolean = false;
  @State() position: ComputePositionReturn;
  @State() suggestions: SwirlAutocompleteSuggestion[] = [];

  @Event() valueChange: EventEmitter<string | string[]>;

  private disableAutoUpdate: any;
  private id: string;
  private listboxContainerEl: HTMLDivElement;
  private listboxEl: HTMLSwirlOptionListElement;
  private inputEl: HTMLSwirlTextInputElement;

  componentWillLoad() {
    const index = document.querySelectorAll("swirl-datepicker").length;

    this.id = `autocomplete-${index}`;
  }

  @Listen("click", { target: "window" })
  onWindowClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!this.el.contains(target)) {
      this.close();
    }
  }

  componentDidRender() {
    if (this.multiSelect) {
      this.reposition();
    }
  }

  private async close() {
    if (!this.active) {
      return;
    }

    if (this.disableAutoUpdate) {
      this.disableAutoUpdate();
    }

    if (this.multiSelect) {
      this.inputEl.querySelector("input").value = "";
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
        this.reposition.bind(this)
      );

      this.listboxContainerEl.scrollTop = 0;
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
    this.updateValue(event);
  };

  private updateValue = debounce(
    async (event: CustomEvent<string>) => {
      this.updateSuggestions(event.detail);
      this.open();

      if (this.multiSelect) {
        return;
      }

      this.value = event.detail;
      this.valueChange.emit(this.value);
    },
    250,
    false
  );

  private onSelect = async (event: CustomEvent<string[]>) => {
    event.stopPropagation();

    if (this.multiSelect) {
      this.value = event.detail;
      this.valueChange.emit(this.value);
      this.inputEl.querySelector("input")?.focus();

      await this.updateSuggestions(this.inputEl.querySelector("input").value);
    } else {
      if (Boolean(event.detail[0])) {
        this.value = event.detail[0];
        this.valueChange.emit(this.value);
        this.inputEl.querySelector("input")?.focus();
        this.close();
      }
    }
  };

  private onRemoveValue = (value: string) => {
    if (typeof this.value === "string") {
      return;
    }

    this.value = this.value.filter((item) => item !== value);
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

  render() {
    const suggestionsMenuId = `${this.id}-suggestions`;

    const clearable = this.clearable && !this.multiSelect;

    const value = typeof this.value === "string" ? [this.value] : this.value;
    const valueLabel = typeof this.value === "string" ? this.value : undefined;

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
            typeof this.value === "object" &&
            this.value.length > 0 && (
              <div class="autocomplete__multi-select-tags">
                <swirl-stack orientation="horizontal" spacing="8" wrap>
                  {this.value.map((item) => (
                    <swirl-tag
                      key={item}
                      label={item}
                      // eslint-disable-next-line react/jsx-no-bind
                      onRemove={() => this.onRemoveValue(item)}
                      removable
                    ></swirl-tag>
                  ))}
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
                label={this.menuLabel}
                multiSelect={this.multiSelect}
                onValueChange={this.onSelect}
                optionListId={suggestionsMenuId}
                ref={(el) => (this.listboxEl = el)}
                value={value}
              >
                {this.suggestions.map((suggestion) => (
                  <swirl-option-list-item
                    selected={this.value === suggestion.label}
                    key={suggestion.id}
                    disabled={suggestion.disabled}
                    label={suggestion.label}
                    value={suggestion.label}
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
