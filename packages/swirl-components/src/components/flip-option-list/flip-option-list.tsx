import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";
import { FlipFormInput, querySelectorAllDeep } from "../../utils";

@Component({
  shadow: true,
  styleUrl: "flip-option-list.css",
  tag: "flip-option-list",
})
export class FlipOptionList implements FlipFormInput<string[]> {
  @Element() el: HTMLElement;

  @Prop() disabled?: boolean;
  @Prop() label?: string;
  @Prop() multiSelect?: boolean;
  @Prop({ mutable: true }) value?: string[] = [];

  @Event() valueChange: EventEmitter<string[]>;

  private focusedItem: HTMLElement;
  private items: HTMLFlipOptionListItemElement[];

  componentDidLoad() {
    this.items = querySelectorAllDeep<HTMLFlipOptionListItemElement>(
      this.el,
      "flip-option-list-item"
    );

    this.setItemDisabledState();
    this.setItemContext();
    this.syncItemsWithValue();
  }

  @Watch("disabled")
  watchDisabled() {
    this.setItemDisabledState();
  }

  @Watch("multiSelect")
  watchMultiSelect() {
    this.setItemContext();
  }

  @Watch("value")
  watchValue() {
    this.syncItemsWithValue();
  }

  private onFocus = () => {
    if (Boolean(this.focusedItem)) {
      this.focusItem(this.getActiveItemIndex());
    } else {
      this.focusItem(0);
    }
  };

  private onClick = (event: MouseEvent) => {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const item = target?.closest("flip-option-list-item");

    if (!Boolean(item)) {
      return;
    }

    this.selectItem(this.items.findIndex((i) => i.value === item.value));
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowDown") {
      event.preventDefault();
      this.focusNextItem();
    } else if (event.code === "ArrowUp") {
      event.preventDefault();
      this.focusPreviousItem();
    } else if (event.code === "Space") {
      event.preventDefault();
      this.selectFocusedItem();
    } else if (event.code === "Home") {
      event.preventDefault();
      this.focusItem(0);
    } else if (event.code === "End") {
      event.preventDefault();
      this.focusItem(this.items.length - 1);
    } else if (
      event.code === "KeyA" &&
      (event.metaKey || event.ctrlKey) &&
      this.multiSelect
    ) {
      event.preventDefault();
      this.selectAllItems();
    }
  };

  private setItemDisabledState() {
    this.items.forEach((item) => (item.disabled = this.disabled));
  }

  private setItemContext() {
    if (this.multiSelect) {
      this.items.forEach((item) => (item.context = "multi-select"));
    } else {
      this.items.forEach((item) => (item.context = "single-select"));

      if (this.value.length > 1) {
        this.updateValue([this.value[0]]);
      }
    }
  }

  private selectItem(index: number) {
    if (this.disabled) {
      return;
    }

    const item = this.items[index];
    const itemIsAlreadySelected = this.value.includes(item.value);

    if (!this.multiSelect) {
      this.value = [];
    }

    if (!itemIsAlreadySelected) {
      this.updateValue([...this.value, item.value]);
    } else {
      this.updateValue(this.value.filter((v) => v !== item.value));
    }
  }

  private updateValue(value: string[]) {
    this.value = value;
    this.valueChange.emit(this.value);
  }

  private selectFocusedItem() {
    if (this.disabled || this.getActiveItemIndex() === -1) {
      return;
    }

    this.selectItem(this.getActiveItemIndex());
  }

  private selectAllItems() {
    if (this.disabled) {
      return;
    }

    const alreadySelected = this.items.every((item) =>
      this.value.includes(item.value)
    );

    if (alreadySelected) {
      this.updateValue([]);
    } else {
      this.updateValue(this.items.map((item) => item.value));
    }
  }

  private syncItemsWithValue() {
    this.items.forEach(
      (item) => (item.selected = this.value.includes(item.value))
    );
  }

  private focusItem(index: number) {
    if (this.disabled) {
      return;
    }

    this.items.forEach((item) =>
      item.shadowRoot.children[0].removeAttribute("tabIndex")
    );

    const item = this.items[index].shadowRoot.children[0] as HTMLElement;

    if (!Boolean(item)) {
      return;
    }

    item.setAttribute("tabIndex", "0");
    item.focus();

    this.focusedItem = item;
  }

  private focusNextItem() {
    if (this.disabled) {
      return;
    }

    const activeItemIndex = this.getActiveItemIndex();
    const newIndex = Math.min(activeItemIndex + 1, this.items.length - 1);

    this.focusItem(newIndex);
  }

  private focusPreviousItem() {
    const activeItemIndex = this.getActiveItemIndex();
    const newIndex = Math.max(activeItemIndex - 1, 0);

    this.focusItem(newIndex);
  }

  private getActiveItemIndex(): number {
    return this.items
      .map((item) => item.shadowRoot.children[0])
      .findIndex((item) => item === this.focusedItem);
  }

  render() {
    const ariaMultiselectable = this.multiSelect ? "true" : undefined;
    const tabIndex = this.disabled ? -1 : 0;

    return (
      <Host>
        <div
          aria-label={this.label}
          aria-multiselectable={ariaMultiselectable}
          class="option-list"
          onClick={this.onClick}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          role="listbox"
          tabIndex={tabIndex}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
