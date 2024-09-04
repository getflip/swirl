import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
} from "@stencil/core";

/**
 * @slot slot - The tree view items
 */
@Component({
  shadow: true,
  styleUrl: "swirl-tree-view.css",
  tag: "swirl-tree-view",
})
export class SwirlTreeView {
  @Element() el!: HTMLSwirlTreeViewElement;

  @Prop() initiallyExpandedItemIds?: string[];
  @Prop() label!: string;

  @Event() expandedItemsChanged!: EventEmitter<string[]>;

  componentDidLoad() {
    if (Boolean(this.initiallyExpandedItemIds)) {
      this.expandItems(this.initiallyExpandedItemIds);
    }

    this.init();
  }

  @Method()
  async expandItems(itemIds: string[]) {
    const items = this.getItems().filter((item) => itemIds.includes(item.id));

    items.forEach((item) => item.expand());
  }

  @Listen("keydown")
  onKeyDown(event: KeyboardEvent) {
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
  onExpandedChange(event: Event) {
    const expandedItemIds = this.getItems()
      .filter((item) => this.isItemExpanded(item))
      .map((item) => item.id);

    const changedItemGotExpanded = !Boolean(
      (event.target as HTMLSwirlTreeViewItemElement).querySelector(
        ':scope > li > [aria-expanded="true"]'
      )
    );

    if (changedItemGotExpanded) {
      expandedItemIds.push((event.target as HTMLSwirlTreeViewItemElement).id);
    } else {
      expandedItemIds.splice(
        expandedItemIds.indexOf(
          (event.target as HTMLSwirlTreeViewItemElement).id
        ),
        1
      );
    }

    this.expandedItemsChanged.emit(expandedItemIds);
  }

  private init() {
    const selectedItem = this.getSelectedItem();
    const allItems = this.getItems();

    allItems.forEach((item) => item.unselect());

    if (Boolean(selectedItem)) {
      selectedItem.select();
    } else {
      allItems[0]?.select();
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
      previousSibling?.querySelector('[aria-expanded="true"]')
    );

    // find the last child of the nested previous sibling
    if (previousSiblingExpanded) {
      let lastChildOfNestedPreviousSibling =
        previousSibling?.querySelector<HTMLSwirlTreeViewItemElement>(
          ":scope > li > ul > swirl-tree-view-item:last-child, :scope > li > ul > *:last-child > swirl-tree-view-item"
        );

      let lastChildOfNestedPreviousSiblingExpanded = Boolean(
        lastChildOfNestedPreviousSibling?.querySelector(
          '[aria-expanded="true"]'
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

  private onSlotChange = () => {
    this.init();
  };

  render() {
    return (
      <Host>
        <ul aria-label={this.label} class="tree-view" role="tree">
          <slot onSlotchange={this.onSlotChange}></slot>
        </ul>
      </Host>
    );
  }
}
