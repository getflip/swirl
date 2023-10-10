import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import {
  closestPassShadow,
  SwirlFormInput,
  querySelectorAllDeep,
} from "../../utils";
import Sortable, { SortableEvent } from "sortablejs";

@Component({
  /**
   * Form controls in shadow dom can still not be associated with labels in the
   * light dom, cross browser. So for now we disable shadow dom for form
   * controls (inputs, buttons, selects, etc.). Instead we use Stencil's scoping.
   * https://caniuse.com/?search=attachInternals
   */
  scoped: true,
  shadow: false,
  styleUrl: "swirl-option-list.css",
  tag: "swirl-option-list",
})
export class SwirlOptionList implements SwirlFormInput<string[]> {
  @Element() el: HTMLElement;

  @Prop() allowDeselect?: boolean = true;
  @Prop() allowDrag?: boolean;
  @Prop() assistiveTextItemGrabbed?: string =
    "Item grabbed. Use arrow keys to move item up or down. Use spacebar to save position.";
  @Prop() assistiveTextItemMoving?: string = "Current position:";
  @Prop() assistiveTextItemMoved?: string = "Item moved. New position:";
  @Prop() disabled?: boolean;
  @Prop() label?: string;
  @Prop() optionListId?: string;
  @Prop() multiSelect?: boolean;
  @Prop({ mutable: true }) value?: string[] = [];

  @State() assistiveText: string;

  @Event() itemDrop: EventEmitter<{
    item: HTMLSwirlOptionListItemElement;
    oldIndex: number;
    newIndex: number;
  }>;
  @Event() valueChange: EventEmitter<string[]>;

  private dragging: HTMLSwirlOptionListItemElement;
  private draggingStartIndex: number;
  private focusedItem: HTMLElement;
  private items: HTMLSwirlOptionListItemElement[];
  private listboxEl: HTMLDivElement;
  private observer: MutationObserver;
  private sortable: Sortable;

  componentDidLoad() {
    this.updateItems();
    this.observeSlotChanges();
    this.setItemAllowDragState();
    this.setItemDisabledState();
    this.setItemContext();
    this.syncItemsWithValue();
    this.setupDragDrop();
  }

  componentDidRender() {
    this.setupDragDrop();
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    this.sortable?.destroy();
  }

  @Watch("allowDrag")
  watchAllowDrag() {
    this.setItemAllowDragState();
    this.setupDragDrop();
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

  private onClick = (event: MouseEvent) => {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const item = target?.closest("swirl-option-list-item");

    const composedTarget = event.composedPath()[0] as HTMLElement;
    const clickedOption = Boolean(
      closestPassShadow(composedTarget, '[role="option"]')
    );

    if (!Boolean(item) || !clickedOption) {
      event.preventDefault();
      return;
    }

    this.selectItem(this.items.findIndex((i) => i.value === item.value));
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowDown") {
      event.preventDefault();

      if (!Boolean(this.dragging)) {
        this.focusNextItem();
      } else {
        this.moveDraggedItemDown();
      }
    } else if (event.code === "ArrowUp") {
      event.preventDefault();

      if (!Boolean(this.dragging)) {
        this.focusPreviousItem();
      } else {
        this.moveDraggedItemUp();
      }
    } else if (event.code === "Space" || event.code === "Enter") {
      const startingDrag = (event.target as HTMLElement).classList.contains(
        "option-list-item__drag-handle"
      );

      if (!startingDrag && Boolean(this.dragging)) {
        event.preventDefault();
        this.stopDrag(this.dragging);
        return;
      }

      const target = event.composedPath()[0] as HTMLElement;
      const optionFocused = Boolean(
        closestPassShadow(target, '[role="option"]')
      );

      if (!optionFocused) {
        return;
      }

      event.preventDefault();

      if (Boolean(this.dragging)) {
        this.stopDrag(this.dragging);
      } else {
        this.selectFocusedItem();
      }
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
    } else if (event.code === "Tab") {
      if (Boolean(this.dragging)) {
        event.preventDefault();
      }
    }
  };

  private observeSlotChanges() {
    this.observer = new MutationObserver(() => {
      this.updateItems();
      this.setItemAllowDragState();
      this.setItemDisabledState();
      this.setItemContext();
      this.syncItemsWithValue();
    });

    this.observer.observe(this.listboxEl, { childList: true, subtree: true });
  }

  private updateItems() {
    this.items = querySelectorAllDeep<HTMLSwirlOptionListItemElement>(
      this.el,
      "swirl-option-list-item"
    );

    this.items.forEach((item) =>
      item.querySelector('[role="option"]')?.removeAttribute("tabIndex")
    );

    const item = this.items[0]?.querySelector('[role="option"]') as HTMLElement;

    if (!Boolean(item)) {
      return;
    }

    item.setAttribute("tabIndex", "0");
  }

  private setItemDisabledState() {
    if (this.disabled) {
      this.items.forEach((item) => (item.disabled = true));
    }
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

  private setupDragDrop() {
    if (Boolean(this.sortable)) {
      this.sortable.destroy();
    }

    if (!this.allowDrag) {
      return;
    }

    this.sortable = Sortable.create(this.listboxEl, {
      animation: 150,
      draggable: "swirl-option-list-item",
      handle: ".option-list-item__drag-handle",
      onEnd: (event: SortableEvent) => {
        this.itemDrop.emit({
          item: event.item as HTMLSwirlOptionListItemElement,
          oldIndex: event.oldIndex,
          newIndex: event.newIndex,
        });
      },
    });
  }

  private setItemAllowDragState() {
    if (this.allowDrag && !this.multiSelect) {
      console.error(
        "[SwirlOptionList] Drag can only be allowed for multi select lists."
      );
      return;
    }

    const sections = querySelectorAllDeep<HTMLSwirlOptionListSectionElement>(
      this.el,
      "swirl-option-list-section"
    );

    if (this.allowDrag && sections.length > 0) {
      console.error(
        "[SwirlOptionList] Drag can only be allowed for lists without sections."
      );
      return;
    }

    if (this.allowDrag) {
      this.items.forEach((item) => {
        item.setAttribute("allow-drag", "true");
        item.addEventListener("toggleDrag", this.toggleDrag);
      });
    } else {
      this.items.forEach((item) => {
        item.removeAttribute("allow-drag");
        item.removeEventListener("toggleDrag", this.toggleDrag);
      });
    }
  }

  private selectItem(index: number) {
    if (this.disabled) {
      return;
    }

    const item = this.items[index];

    if (item.disabled) {
      return;
    }

    const itemIsAlreadySelected = this.value.includes(item.value);

    if (itemIsAlreadySelected && !this.allowDeselect) {
      return;
    }

    if (!this.multiSelect) {
      this.value = [];
    }

    if (!itemIsAlreadySelected) {
      this.updateValue([...this.value, item.value]);
    } else {
      this.updateValue(this.value.filter((v) => v !== item.value));
    }

    this.focusItem(index);
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
    this.items?.forEach(
      (item) => (item.selected = this.value.includes(item.value))
    );
  }

  private focusItem(index: number) {
    if (this.disabled) {
      return;
    }

    this.items.forEach((item) =>
      item.querySelector('[role="option"]').removeAttribute("tabIndex")
    );

    const item = this.items[index]?.querySelector(
      '[role="option"]'
    ) as HTMLElement;

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
    return Boolean(this.focusedItem)
      ? this.items
          .map((item) => item.querySelector('[role="option"]'))
          .findIndex((item) => item === this.focusedItem)
      : 0;
  }

  private getItemIndex(item: HTMLSwirlOptionListItemElement): number {
    return this.items.map((i) => i).findIndex((i) => i === item);
  }

  private toggleDrag = (event: CustomEvent<HTMLSwirlOptionListItemElement>) => {
    const item = event.detail;

    if (Boolean(this.dragging)) {
      this.stopDrag(item);
    } else {
      this.startDrag(item);
    }
  };

  private startDrag = (item: HTMLSwirlOptionListItemElement) => {
    this.dragging = item;
    this.draggingStartIndex = this.getItemIndex(this.dragging);

    item.setAttribute("dragging", "true");

    const index = this.getItemIndex(this.dragging);
    this.focusItem(index);

    this.assistiveText = this.assistiveTextItemGrabbed;
  };

  private stopDrag = (item: HTMLSwirlOptionListItemElement) => {
    this.dragging = undefined;
    item.removeAttribute("dragging");

    const newIndex = this.getActiveItemIndex();

    this.assistiveText = `${this.assistiveTextItemMoved} ${newIndex + 1}`;

    this.itemDrop.emit({ item, oldIndex: this.draggingStartIndex, newIndex });

    this.draggingStartIndex = undefined;

    this.focusItem(newIndex);
  };

  private moveDraggedItemDown() {
    const nextSibling = this.dragging.nextElementSibling;

    if (!Boolean(nextSibling)) {
      return;
    }

    nextSibling.after(this.dragging);
    this.updateItems();
    this.listboxEl.focus();

    this.assistiveText = `${this.assistiveTextItemMoving} ${
      this.getActiveItemIndex() + 1
    }`;
  }

  private moveDraggedItemUp() {
    const prevSibling = this.dragging.previousElementSibling;

    if (!Boolean(prevSibling)) {
      return;
    }

    prevSibling.before(this.dragging);
    this.updateItems();
    this.listboxEl.focus();

    this.assistiveText = `${this.assistiveTextItemMoving} ${
      this.getItemIndex(this.dragging) + 1
    }`;
  }

  render() {
    const ariaMultiselectable = this.multiSelect ? "true" : undefined;
    const tabIndex = Boolean(this.dragging) ? 0 : undefined;

    return (
      <Host>
        <swirl-visually-hidden role="alert">
          {this.assistiveText}
        </swirl-visually-hidden>
        <div
          aria-label={this.label}
          aria-multiselectable={ariaMultiselectable}
          class="option-list"
          id={this.optionListId}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          ref={(el) => (this.listboxEl = el)}
          role="listbox"
          tabIndex={tabIndex}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
