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

    const selectedItem = this.getSelectedItem();

    if (Boolean(selectedItem)) {
      selectedItem.select();
    } else {
      this.getItems()[0]?.select();
    }
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

    const nextSibling = selectedItem?.nextElementSibling as
      | HTMLSwirlTreeViewItemElement
      | undefined;

    const nextSiblingOfParent = selectedItem.parentElement.closest(
      "swirl-tree-view-item"
    )?.nextElementSibling as HTMLSwirlTreeViewItemElement | undefined;

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
    const selectedItem = this.getSelectedItem();

    const previousSibling = selectedItem?.previousElementSibling as
      | HTMLSwirlTreeViewItemElement
      | undefined;

    const previousSiblingExpanded = Boolean(
      previousSibling?.querySelector('[aria-expanded="true"]')
    );

    const lastChildOfPreviousSibling =
      previousSibling?.querySelector<HTMLSwirlTreeViewItemElement>(
        ":scope > li > ul > swirl-tree-view-item:last-child"
      );

    const parent = selectedItem.parentElement.closest("swirl-tree-view-item");

    const previousItem = previousSiblingExpanded
      ? lastChildOfPreviousSibling
      : previousSibling || parent;

    if (!Boolean(previousItem)) {
      return;
    }

    const allItems = this.getItems();

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
      (item) => item.querySelector("a").getAttribute("aria-selected") === "true"
    );
  }

  private isItemExpanded(item: HTMLSwirlTreeViewItemElement) {
    return Boolean(item.querySelector(':scope > li > [aria-expanded="true"]'));
  }

  render() {
    return (
      <Host>
        <ul aria-label={this.label} class="tree-view" role="tree">
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
