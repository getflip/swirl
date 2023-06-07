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
  @Prop() label?: string;

  @State() assistiveText: string;

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
  private sortable: Sortable;

  componentDidLoad() {
    this.collectItems();
    this.setItemAllowDragState();
    this.setupDragDrop();
  }

  disconnectedCallback() {
    this.sortable?.destroy();
  }

  @Watch("allowDrag")
  watchAllowDrag() {
    this.setItemAllowDragState();
    this.setupDragDrop();
  }

  private collectItems() {
    this.items = Array.from(
      this.el.querySelectorAll<HTMLSwirlResourceListItemElement>(
        "swirl-resource-list-item, swirl-resource-list-file-item"
      )
    ).filter((el) => el.isConnected);

    this.removeItemsFromTabOrder();
    this.enableItemFocus(this.items[this.focusedIndex]);
  }

  private getItemIndex(item: HTMLSwirlResourceListItemElement): number {
    return this.items.map((i) => i).findIndex((i) => i === item);
  }

  private removeItemsFromTabOrder() {
    this.items.forEach((item) =>
      item
        ?.querySelector(
          ".resource-list-item__content, .resource-list-file-item"
        )
        ?.setAttribute("tabIndex", "-1")
    );
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
          oldIndex: event.oldIndex,
          newIndex: event.newIndex,
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
    if (!Boolean(item)) {
      return;
    }

    const interactiveElement = item.querySelector<HTMLElement>(
      ".resource-list-item__content, .resource-list-file-item"
    );

    if (!Boolean(interactiveElement)) {
      return;
    }

    interactiveElement.setAttribute("tabIndex", "0");

    if (focus) {
      interactiveElement.focus();
    }
  }

  private focusItemAtIndex(index: number) {
    this.removeItemsFromTabOrder();

    const item = this.items[index];

    if (!Boolean(item) || !item.isConnected) {
      return;
    }

    this.enableItemFocus(item, true);

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
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!Boolean(this.dragging)) {
        this.focusItemAtIndex((this.focusedIndex + 1) % this.items.length);
      } else {
        this.moveDraggedItemDown();
      }
    } else if (event.key === "ArrowUp") {
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
    } else if (event.key === "Space" || event.key === "Enter") {
      const target = event.composedPath()[0] as HTMLElement;

      if (
        Boolean(this.dragging) &&
        !target?.classList.contains("resource-list-item__drag-handle")
      ) {
        event.preventDefault();
        this.stopDrag(this.dragging);
      }
    } else if (event.key === "Home") {
      event.preventDefault();

      this.focusItemAtIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();

      this.focusItemAtIndex(this.items.length - 1);
    }
  };

  private onSlotChange = () => {
    this.collectItems();
  };

  render() {
    return (
      <Host onKeyDown={this.onKeyDown}>
        <swirl-visually-hidden role="alert">
          {this.assistiveText}
        </swirl-visually-hidden>
        <swirl-stack
          aria-label={this.label}
          class="resource-list"
          ref={(el) => (this.gridEl = el)}
          role="grid"
        >
          <slot onSlotchange={this.onSlotChange}></slot>
        </swirl-stack>
      </Host>
    );
  }
}
