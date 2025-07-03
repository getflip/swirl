import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import Sortable, { SortableEvent } from "sortablejs";
import { SwirlTreeViewItemKeyboardMoveEvent } from "../swirl-tree-view-item/swirl-tree-view-item";
import { treeViewDragDropConfig } from "./swirl-tree-view.config";

export type SwirlTreeViewSemantics = "tree" | "list";

export type SwirlTreeViewDropItemEvent = Pick<
  SortableEvent,
  "oldIndex" | "newIndex" | "item"
> & {
  itemId: string;
  newNextSiblingItemId: string | undefined;
  newPrevSiblingItemId: string | undefined;
  sourceParentItemId: string;
  targetParentItemId: string;
};

export type SwirlTreeViewCanDropHandler = (location: {
  parentId: string;
  position: number;
}) => boolean;

const defaultDragDropInstructions = {
  cannotBeDropped: "Cannot drop here.",
  end: "{itemLabel}, dropped. Parent item: {parentLabel}. Final position in list: {position} of {childrenCount}.",
  initial: "Press space to move items.",
  moved:
    "{itemLabel}. Parent item: {parentLabel}. Current position in list: {position} of {childrenCount}.",
  start:
    "{itemLabel}, grabbed. Parent item: {parentLabel}. Current position in list: {position} of {childrenCount}. Press up and down arrow keys to change position, Space to drop.",
};

/**
 * @slot slot - The tree view items
 */
@Component({
  shadow: false,
  scoped: false,
  styleUrl: "swirl-tree-view.css",
  tag: "swirl-tree-view",
})
export class SwirlTreeView {
  @Element() el!: HTMLSwirlTreeViewElement;

  @Prop() canDrop?: SwirlTreeViewCanDropHandler;
  @Prop() dragDropInstructions = defaultDragDropInstructions;
  @Prop() dragDropItemSelector?: string = "swirl-tree-view-item";
  @Prop() enableDragDrop?: boolean;
  @Prop() initiallyExpandedItemIds?: string[];
  @Prop() label!: string;
  @Prop() semantics?: SwirlTreeViewSemantics = "tree";

  @Event() dropItem!: EventEmitter<SwirlTreeViewDropItemEvent>;
  @Event() itemExpansionChanged!: EventEmitter<{
    itemId: string;
    expanded: boolean;
  }>;

  @State() liveRegionText = "";

  private listElement?: HTMLElement;
  private sortable: Sortable | undefined;

  componentDidLoad() {
    if (Boolean(this.initiallyExpandedItemIds)) {
      this.expandItems(this.initiallyExpandedItemIds);
    }

    this.init();
    this.setUpDragDrop();
  }

  disconnectedCallback() {
    this.sortable?.destroy();
  }

  @Watch("enableDragDrop")
  handleEnableDragDropChange() {
    this.setUpDragDrop();
  }

  @Method()
  async expandItems(itemIds: string[]) {
    if (this.semantics !== "tree") {
      return;
    }

    const items = this.getItems().filter((item) =>
      itemIds.includes(item.itemId)
    );

    items.forEach((item) => item.expand());
  }

  @Listen("dropTreeViewItem")
  onItemDrop(event: CustomEvent<SwirlTreeViewDropItemEvent>) {
    event.stopPropagation();
    this.dropItem.emit(event.detail);

    // force update the new and old parent of the dropped item to reflect
    // new hierarchy
    if (event.detail.targetParentItemId) {
      const newParentItem = this.el.querySelector(`
        swirl-tree-view-item#${event.detail.targetParentItemId},
        #${event.detail.targetParentItemId} > swirl-tree-view-item
      `) as HTMLSwirlTreeViewItemElement | undefined;

      if (newParentItem) {
        forceUpdate(newParentItem);
        newParentItem.expand();
      }
    }

    if (event.detail.sourceParentItemId) {
      const oldParentItem = this.el.querySelector(`
        swirl-tree-view-item#${event.detail.sourceParentItemId},
        #${event.detail.sourceParentItemId} > swirl-tree-view-item
      `) as HTMLSwirlTreeViewItemElement | undefined;

      if (oldParentItem) {
        forceUpdate(oldParentItem);
        oldParentItem.expand();
      }
    }
  }

  @Listen("keydown")
  onKeyDown(event: KeyboardEvent) {
    if (this.semantics !== "tree") {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.selectNextItem();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.selectPreviousItem();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      this.expandSelectedItem();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.collapseSelectedItem();
    } else if (event.key === "Home") {
      event.preventDefault();
      this.selectFirstItem();
    } else if (event.key === "End") {
      event.preventDefault();
      this.selectLastItem();
    }
  }

  @Listen("itemSelected")
  onItemSelected(event: Event) {
    this.getItems().forEach((item) => {
      if (item !== event.target) {
        item.unselect();
      }
    });
  }

  @Listen("expandedChange")
  onExpandedChange(event: CustomEvent) {
    const target = event.target as HTMLSwirlTreeViewItemElement | undefined;

    if (target?.tagName === "SWIRL-TREE-VIEW-ITEM") {
      this.itemExpansionChanged.emit({
        itemId: target.itemId,
        expanded: event.detail,
      });
    }
  }

  @Listen("endKeyboardMove")
  onEndKeyboardMove(event: CustomEvent<SwirlTreeViewItemKeyboardMoveEvent>) {
    this.updateLiveRegionText("end", event.detail);
  }

  @Listen("startKeyboardMove")
  onStartKeyboardMove(event: CustomEvent<SwirlTreeViewItemKeyboardMoveEvent>) {
    this.updateLiveRegionText("start", event.detail);
  }

  @Listen("keyboardMove")
  onKeyboardMove(event: CustomEvent<SwirlTreeViewItemKeyboardMoveEvent>) {
    this.updateLiveRegionText("moved", event.detail);
  }

  private init() {
    if (this.semantics !== "tree") {
      return;
    }

    const selectedItem = this.getSelectedItem();
    const allItems = this.getItems();

    allItems.forEach((item) => item.unselect());

    if (Boolean(selectedItem)) {
      selectedItem.select();
    } else {
      allItems[0]?.select();
    }
  }

  private setUpDragDrop() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = undefined;
    }

    if (this.enableDragDrop) {
      this.sortable = new Sortable(this.listElement, {
        ...treeViewDragDropConfig,
        draggable: this.dragDropItemSelector,
        onMove: (event) => {
          if (typeof this.canDrop === "function") {
            return this.canDrop({
              parentId: event.to.closest("swirl-tree-view-item")?.itemId,
              position:
                Math.max(
                  Array.from(event.to.children).indexOf(event.related),
                  0
                ) + 1,
            });
          }

          return true;
        },
        onStart: (event) => {
          treeViewDragDropConfig.onStart?.(event);
        },
        onEnd: (event) => {
          event.stopPropagation();

          treeViewDragDropConfig.onEnd?.(event);

          const { to, newIndex, oldIndex, item } = event;
          const sourceParentItemId = undefined;
          const targetParentItem = to.closest("swirl-tree-view-item");

          if (targetParentItem) {
            forceUpdate(targetParentItem);
            targetParentItem.expand();
          }

          this.dropItem.emit({
            newIndex,
            oldIndex,
            item,
            itemId:
              item.id ?? item.querySelector(":scope > swirl-tree-view-item").id,
            newNextSiblingItemId:
              newIndex < to.children.length - 1
                ? to.children[newIndex + 1].id
                : undefined,
            newPrevSiblingItemId:
              newIndex > 0 ? to.children[newIndex - 1].id : undefined,
            sourceParentItemId,
            targetParentItemId: targetParentItem?.itemId,
          });
        },
      });
    }
  }

  private selectFirstItem() {
    this.unselectAllItems();
    this.getItems()[0]?.select(true);
  }

  private selectLastItem() {
    const allItems = this.getItems();
    const lastVisibleItem = allItems
      .filter(
        (item) =>
          item.parentElement
            .closest("swirl-tree-view-item")
            ?.querySelector(':scope > li > [aria-expanded="true"]') ||
          !Boolean(item.parentElement.closest("swirl-tree-view-item"))
      )
      .pop();

    this.unselectAllItems();
    lastVisibleItem?.select(true);
  }

  private expandSelectedItem() {
    const selectedItem = this.getSelectedItem();

    if (!Boolean(selectedItem)) {
      return;
    }

    const isExpanded = this.isItemExpanded(selectedItem);

    if (isExpanded) {
      this.selectNextItem();
    } else {
      selectedItem.expand();
    }
  }

  private collapseSelectedItem() {
    const selectedItem = this.getSelectedItem();

    if (!Boolean(selectedItem)) {
      return;
    }

    const isExpanded = this.isItemExpanded(selectedItem);

    if (isExpanded) {
      selectedItem.collapse();
    } else {
      const parent = selectedItem.parentElement.closest(
        "swirl-tree-view-item"
      ) as HTMLSwirlTreeViewItemElement | undefined;

      if (!Boolean(parent)) {
        return;
      }

      this.unselectAllItems();
      parent.select(true);
    }
  }

  private selectNextItem() {
    const selectedItem = this.getSelectedItem();
    const selectedItemExpanded = this.isItemExpanded(selectedItem);
    const nextSibling = this.getNextSibling(selectedItem);

    let parent = selectedItem.parentElement.closest("swirl-tree-view-item");
    let nextSiblingOfParent = this.getNextSibling(parent);

    while (Boolean(parent) && !Boolean(nextSiblingOfParent)) {
      parent = parent?.parentElement.closest(
        "swirl-tree-view-item, swirl-tree-view"
      );

      nextSiblingOfParent = this.getNextSibling(parent);
    }

    const firstChild = selectedItem.querySelector("swirl-tree-view-item");

    const nextItem = selectedItemExpanded
      ? firstChild
      : nextSibling || nextSiblingOfParent;

    if (!Boolean(nextItem)) {
      return;
    }

    this.unselectAllItems();
    nextItem.select?.(true);
  }

  private selectPreviousItem() {
    const allItems = this.getItems();
    const selectedItem = this.getSelectedItem();
    const previousSibling = this.getPreviousSibling(selectedItem);
    const previousSiblingExpanded = Boolean(
      previousSibling?.querySelector(':scope > li > [aria-expanded="true"]')
    );

    // find the last child of the nested previous sibling
    if (previousSiblingExpanded) {
      let lastChildOfNestedPreviousSibling =
        previousSibling?.querySelector<HTMLSwirlTreeViewItemElement>(
          ":scope > li > ul > swirl-tree-view-item:last-child, :scope > li > ul > *:last-child > swirl-tree-view-item"
        );

      let lastChildOfNestedPreviousSiblingExpanded = Boolean(
        lastChildOfNestedPreviousSibling?.querySelector(
          ':scope > li > [aria-expanded="true"]'
        )
      );

      while (lastChildOfNestedPreviousSiblingExpanded) {
        lastChildOfNestedPreviousSibling =
          lastChildOfNestedPreviousSibling?.querySelector<HTMLSwirlTreeViewItemElement>(
            ":scope > li > ul > swirl-tree-view-item:last-child, :scope > li > ul > *:last-child > swirl-tree-view-item"
          );

        lastChildOfNestedPreviousSiblingExpanded = Boolean(
          lastChildOfNestedPreviousSibling?.querySelector(
            '[aria-expanded="true"]'
          )
        );
      }

      allItems.forEach((item) => item.unselect());
      lastChildOfNestedPreviousSibling.select?.(true);

      return;
    }

    const parent = selectedItem.parentElement.closest("swirl-tree-view-item");
    const previousItem = previousSibling || parent;

    if (!Boolean(previousItem)) {
      return;
    }

    allItems.forEach((item) => item.unselect());
    previousItem.select?.(true);
  }

  private unselectAllItems() {
    this.getItems().forEach((item) => item.unselect());
  }

  private getItems() {
    return Array.from(this.el.querySelectorAll("swirl-tree-view-item"));
  }

  private getSelectedItem() {
    return this.getItems().find(
      (item) =>
        item.querySelector("a")?.getAttribute("aria-selected") === "true"
    );
  }

  private isItemExpanded(item: HTMLSwirlTreeViewItemElement) {
    return Boolean(item.querySelector(':scope > li > [aria-expanded="true"]'));
  }

  private getNextSibling(
    item?: HTMLSwirlTreeViewItemElement
  ): HTMLSwirlTreeViewItemElement | undefined {
    if (item?.nextElementSibling?.tagName === "SWIRL-TREE-VIEW-ITEM") {
      return item.nextElementSibling as HTMLSwirlTreeViewItemElement;
    }

    const nestedSibling =
      item?.parentElement?.nextElementSibling?.querySelector(
        "swirl-tree-view-item"
      );

    return (nestedSibling as HTMLSwirlTreeViewItemElement) ?? undefined;
  }

  private getPreviousSibling(
    item?: HTMLSwirlTreeViewItemElement
  ): HTMLSwirlTreeViewItemElement | undefined {
    if (item?.previousElementSibling?.tagName === "SWIRL-TREE-VIEW-ITEM") {
      return item.previousElementSibling as HTMLSwirlTreeViewItemElement;
    }

    const nestedSibling =
      item?.parentElement?.previousElementSibling?.querySelector(
        "swirl-tree-view-item"
      );

    return (nestedSibling as HTMLSwirlTreeViewItemElement) ?? undefined;
  }

  private updateLiveRegionText(
    key?: keyof typeof this.dragDropInstructions,
    data?: SwirlTreeViewItemKeyboardMoveEvent
  ) {
    let newText = key ? this.dragDropInstructions[key] : "";

    if (!data?.canDrop) {
      newText += ` ${this.dragDropInstructions.cannotBeDropped}`;
    }

    for (const [key, value] of Object.entries(data ?? {})) {
      newText = newText.replaceAll(`{${key}}`, String(value));
    }

    if (newText !== this.liveRegionText) {
      this.liveRegionText = newText;
    }
  }

  private onSlotChange = () => {
    this.init();
  };

  private onFocus = () => {
    if (this.liveRegionText === "") {
      this.updateLiveRegionText("initial");
    }
  };

  private onBlur = (event: FocusEvent) => {
    const newlyFocusedElement = event.relatedTarget as HTMLElement | undefined;

    if (this.el.contains(newlyFocusedElement)) {
      return;
    }

    if (this.liveRegionText !== "") {
      this.updateLiveRegionText();
    }
  };

  render() {
    return (
      <Host>
        {this.enableDragDrop && (
          <swirl-visually-hidden>
            <span aria-live="assertive">{this.liveRegionText}</span>
          </swirl-visually-hidden>
        )}
        <ul
          aria-label={this.label}
          class="tree-view"
          onFocusin={this.onFocus}
          onFocusout={this.onBlur}
          role={this.semantics === "tree" ? "tree" : undefined}
          ref={(el) => (this.listElement = el)}
          tabIndex={-1}
        >
          <slot onSlotchange={this.onSlotChange}></slot>
        </ul>
      </Host>
    );
  }
}
