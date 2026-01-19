import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import Sortable, { SortableEvent } from "sortablejs";
import { v4 as uuid } from "uuid";
import { SwirlStackSpacing } from "../swirl-stack/swirl-stack";

export type SwirlBoxPadding = "0" | "2" | "4" | "8" | "12" | "16";
export type SwirlResourceListSemantics = "grid" | "list";

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
  @Prop() padding?: SwirlBoxPadding;
  @Prop() paddingBlockEnd?: SwirlBoxPadding;
  @Prop() paddingBlockStart?: SwirlBoxPadding;
  @Prop() paddingInlineEnd?: SwirlBoxPadding;
  @Prop() paddingInlineStart?: SwirlBoxPadding;
  @Prop() semantics?: SwirlResourceListSemantics = "grid";
  @Prop() spacing?: SwirlStackSpacing = "0";

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
  private sections: HTMLSwirlResourceListSectionElement[];
  private observer: MutationObserver;
  private sortable: Sortable;

  componentDidLoad() {
    this.observeSlotChanges();
    this.collectItems();
    this.setupControllingElement();
    this.setItemAllowDragState();
    this.setupDragDrop();
    this.setSectionSpacingAndSeparator();
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
      this.setSectionSpacingAndSeparator();
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

  @Method()
  async resetFocus() {
    this.focusedIndex = 0;
    this.removeItemsFromTabOrder();
    this.enableItemFocus(this.items[0]);

    if (Boolean(this.controllingElement)) {
      this.items[0]?.setAttribute("aria-selected", "true");
    }
  }

  private collectItems() {
    this.items = Array.from(
      this.el.querySelectorAll<HTMLSwirlResourceListItemElement>(
        "swirl-resource-list-item, swirl-resource-list-file-item, [data-resource-list-item]"
      )
    ).filter((el) => el.isConnected);

    this.sections = Array.from(
      this.el.querySelectorAll<HTMLSwirlResourceListSectionElement>(
        "swirl-resource-list-section"
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
    if (this.semantics !== "grid") {
      return;
    }

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
      // Dragging items inside a `swirl-resource-list-section` is not currently allowed
      this.items
        .filter((item) =>
          this.sections.every((section) => !section.contains(item))
        )
        .forEach((item) => {
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
    if (this.semantics === "grid" && !Boolean(this.dragging)) {
      if (event.code === "ArrowDown") {
        event.preventDefault();
        this.focusItemAtIndex((this.focusedIndex + 1) % this.items.length);
      } else if (event.code === "ArrowUp") {
        event.preventDefault();

        const prevIndex =
          this.focusedIndex === 0
            ? this.items.length - 1
            : this.focusedIndex - 1;

        this.focusItemAtIndex(prevIndex);
      } else if (event.code === "Enter" && Boolean(this.controllingElement)) {
        const item = this.items[this.focusedIndex];

        if (!Boolean(item) || !item.isConnected) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        item.click();
      } else if (event.code === "Home") {
        event.preventDefault();
        this.focusItemAtIndex(0);
      } else if (event.code === "End") {
        event.preventDefault();
        this.focusItemAtIndex(this.items.length - 1);
      }
    }

    if (Boolean(this.dragging)) {
      if (event.code === "ArrowDown") {
        event.preventDefault();
        this.moveDraggedItemDown();
      } else if (event.code === "ArrowUp") {
        event.preventDefault();
        this.moveDraggedItemUp();
      } else if (event.code === "Space" || event.code === "Enter") {
        const target = event.composedPath()[0] as HTMLElement;

        if (!target?.classList.contains("resource-list-item__drag-handle")) {
          event.preventDefault();
          this.stopDrag(this.dragging);
        }
      }
    }
  };

  setSectionSpacingAndSeparator(): void {
    this.sections.forEach((section, index) => {
      // First section should not have a separator if there are no items above
      if (
        index === 0 &&
        section.previousElementSibling?.tagName !== "SWIRL-RESOURCE-LIST-ITEM"
      ) {
        section.hasSeparator = false;
      }
      section.spacing = this.spacing;
    });
  }

  render() {
    return (
      <Host onKeyDown={this.onKeyDown}>
        <swirl-visually-hidden role="alert">
          {this.assistiveText}
        </swirl-visually-hidden>
        <swirl-box
          paddingBlockEnd={this.paddingBlockEnd ?? this.padding}
          paddingBlockStart={this.paddingBlockStart ?? this.padding}
          paddingInlineEnd={this.paddingInlineEnd ?? this.padding ?? "8"}
          paddingInlineStart={this.paddingInlineStart ?? this.padding ?? "8"}
        >
          <swirl-stack
            aria-label={this.label}
            class="resource-list"
            id={this.listId}
            ref={(el) => (this.gridEl = el)}
            role={this.semantics}
            spacing={this.spacing}
          >
            <slot></slot>
          </swirl-stack>
        </swirl-box>
      </Host>
    );
  }
}
