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
import Sortable, { SortableEvent } from "sortablejs";
import { v4 as uuid } from "uuid";

@Component({
  scoped: true,
  shadow: false,
  styleUrl: "swirl-resource-list.css",
  tag: "swirl-resource-list",
})
export class SwirlResourceList {
  @Element() el: HTMLElement;

  @Prop() allowDrag?: boolean;
  @Prop() assistiveTextItemGrabbed?: string =
    "Item grabbed. Use arrow keys to move item up or down. Use spacebar to save position.";
  @Prop() assistiveTextItemMoving?: string = "Current position:";
  @Prop() assistiveTextItemMoved?: string = "Item moved. New position:";
  @Prop() controllingElement?: HTMLElement;
  @Prop() label?: string;

  @State() assistiveText: string;
  @State() listId = uuid();

  @Event() itemDrop: EventEmitter<{
    item: HTMLSwirlResourceListItemElement;
    oldIndex: number;
    newIndex: number;
  }>;

  private dragging: HTMLSwirlResourceListItemElement;
  private draggingStartIndex: number;
  private focusedIndex = 0;
  private gridEl: HTMLElement;
  private items: HTMLSwirlResourceListItemElement[];
  private observer: MutationObserver;
  private sortable: Sortable;

  componentDidLoad() {
    this.observeSlotChanges();
    this.collectItems();
    this.setupControllingElement();
    this.setItemAllowDragState();
    this.setupDragDrop();
  }

  componentDidRender() {
    this.setupDragDrop();
  }

  disconnectedCallback() {
    this.sortable?.destroy();
    this.observer?.disconnect();
    this.controllingElement?.removeEventListener("keydown", this.onKeyDown);
  }

  private observeSlotChanges() {
    this.observer = new MutationObserver(() => {
      this.collectItems();
      this.setItemAllowDragState();
    });

    this.observer.observe(this.el, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  @Watch("allowDrag")
  watchAllowDrag() {
    this.setItemAllowDragState();
    this.setupDragDrop();
  }

  private collectItems() {
    this.items = Array.from(
      this.el.querySelectorAll<HTMLSwirlResourceListItemElement>(
        "swirl-resource-list-item, swirl-resource-list-file-item, [data-resource-list-item]"
      )
    ).filter((el) => el.isConnected);

    this.removeItemsFromTabOrder();
    this.enableItemFocus(this.items[this.focusedIndex]);

    if (Boolean(this.controllingElement)) {
      this.items[0]?.setAttribute("aria-selected", "true");
    }
  }

  private setupControllingElement() {
    if (!Boolean(this.controllingElement)) {
      return;
    }

    this.controllingElement.setAttribute("aria-controls", this.listId);
    this.controllingElement.setAttribute("role", "combobox");
    this.controllingElement.setAttribute("aria-autocomplete", "list");

    this.controllingElement.addEventListener("keydown", this.onKeyDown);
  }

  private getItemIndex(item: HTMLSwirlResourceListItemElement): number {
    return this.items.map((i) => i).findIndex((i) => i === item);
  }

  private removeItemsFromTabOrder() {
    this.items.forEach((item) => {
      const focusableEl = item?.querySelector(
        ".resource-list-item__content, .resource-list-file-item, [data-resource-list-item-button]"
      );

      const dragHandle = item?.querySelector(
        ".resource-list-item__drag-handle"
      );

      if (Boolean(this.controllingElement)) {
        item.setAttribute("aria-selected", "false");
      }

      focusableEl?.setAttribute("tabIndex", "-1");
      dragHandle?.setAttribute("tabIndex", "-1");
    });
  }

  private setItemAllowDragState() {
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

  private setupDragDrop() {
    if (Boolean(this.sortable)) {
      this.sortable.destroy();
    }

    if (!this.allowDrag) {
      return;
    }

    this.sortable = Sortable.create(this.gridEl, {
      animation: 150,
      draggable: "swirl-resource-list-item",
      handle: ".resource-list-item__drag-handle",
      onEnd: (event: SortableEvent) => {
        this.itemDrop.emit({
          item: event.item as HTMLSwirlResourceListItemElement,
          oldIndex: event.oldDraggableIndex,
          newIndex: event.newDraggableIndex,
        });
      },
    });
  }

  private toggleDrag = (
    event: CustomEvent<HTMLSwirlResourceListItemElement>
  ) => {
    const item = event.detail;

    if (Boolean(this.dragging)) {
      this.stopDrag(item);
    } else {
      this.startDrag(item);
    }
  };

  private startDrag = (item: HTMLSwirlResourceListItemElement) => {
    this.dragging = item;
    this.draggingStartIndex = this.getItemIndex(this.dragging);

    item.setAttribute("dragging", "true");

    const index = this.getItemIndex(this.dragging);
    this.focusItemAtIndex(index);

    this.assistiveText = this.assistiveTextItemGrabbed;
  };

  private stopDrag = (item: HTMLSwirlResourceListItemElement) => {
    const newIndex = this.getItemIndex(this.dragging);

    this.dragging = undefined;
    item.removeAttribute("dragging");

    this.assistiveText = `${this.assistiveTextItemMoved} ${newIndex + 1}`;

    this.itemDrop.emit({ item, oldIndex: this.draggingStartIndex, newIndex });

    this.draggingStartIndex = undefined;
  };

  private enableItemFocus(
    item?: HTMLSwirlResourceListItemElement,
    focus?: boolean
  ) {
    if (!Boolean(item) || Boolean(this.controllingElement)) {
      return;
    }

    const interactiveElement = item.querySelector<HTMLElement>(
      ".resource-list-item__content, .resource-list-file-item, [data-resource-list-item-button]"
    );

    const dragHandle = item.querySelector(".resource-list-item__drag-handle");

    if (Boolean(dragHandle)) {
      dragHandle.setAttribute("tabIndex", "0");
    }

    if (!Boolean(interactiveElement)) {
      return;
    }

    interactiveElement.setAttribute("tabIndex", "0");

    if (focus && !Boolean(this.controllingElement)) {
      interactiveElement.focus();
    }
  }

  private focusItemAtIndex(index: number) {
    this.removeItemsFromTabOrder();

    const item = this.items[index];

    if (!Boolean(item) || !item.isConnected) {
      return;
    }

    this.enableItemFocus(item, !Boolean(this.controllingElement));

    if (Boolean(this.controllingElement)) {
      item.setAttribute("aria-selected", "true");

      item.scrollIntoView({ block: "nearest" });
    }

    this.focusedIndex = index;
  }

  private moveDraggedItemDown() {
    const nextSibling = this.dragging.nextElementSibling;

    if (!Boolean(nextSibling)) {
      return;
    }

    nextSibling.after(this.dragging);
    this.collectItems();
    this.focusItemAtIndex(this.getItemIndex(this.dragging));

    this.assistiveText = `${this.assistiveTextItemMoving} ${
      this.getItemIndex(this.dragging) + 1
    }`;
  }

  private moveDraggedItemUp() {
    const prevSibling = this.dragging.previousElementSibling;

    if (!Boolean(prevSibling)) {
      return;
    }

    prevSibling.before(this.dragging);
    this.collectItems();
    this.focusItemAtIndex(this.getItemIndex(this.dragging));

    this.assistiveText = `${this.assistiveTextItemMoving} ${
      this.getItemIndex(this.dragging) + 1
    }`;
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowDown") {
      event.preventDefault();

      if (!Boolean(this.dragging)) {
        this.focusItemAtIndex((this.focusedIndex + 1) % this.items.length);
      } else {
        this.moveDraggedItemDown();
      }
    } else if (event.code === "ArrowUp") {
      event.preventDefault();

      if (!Boolean(this.dragging)) {
        const prevIndex =
          this.focusedIndex === 0
            ? this.items.length - 1
            : this.focusedIndex - 1;

        this.focusItemAtIndex(prevIndex);
      } else {
        this.moveDraggedItemUp();
      }
    } else if (event.code === "Space" || event.code === "Enter") {
      const target = event.composedPath()[0] as HTMLElement;

      if (
        Boolean(this.dragging) &&
        !target?.classList.contains("resource-list-item__drag-handle")
      ) {
        event.preventDefault();
        this.stopDrag(this.dragging);
      } else if (Boolean(this.controllingElement)) {
        const item = this.items[this.focusedIndex];

        if (!Boolean(item) || !item.isConnected) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        item.click();
      }
    } else if (event.code === "Home") {
      event.preventDefault();

      this.focusItemAtIndex(0);
    } else if (event.code === "End") {
      event.preventDefault();

      this.focusItemAtIndex(this.items.length - 1);
    }
  };

  render() {
    return (
      <Host onKeyDown={this.onKeyDown}>
        <swirl-visually-hidden role="alert">
          {this.assistiveText}
        </swirl-visually-hidden>
        <swirl-box paddingInlineEnd="8" paddingInlineStart="8">
          <swirl-stack
            aria-label={this.label}
            class="resource-list"
            id={this.listId}
            ref={(el) => (this.gridEl = el)}
            role="grid"
          >
            <slot></slot>
          </swirl-stack>
        </swirl-box>
      </Host>
    );
  }
}
