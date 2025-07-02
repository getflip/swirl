import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Fragment,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import classNames from "classnames";
import Sortable from "sortablejs";
import { SwirlIconColor } from "../swirl-icon/swirl-icon";
import {
  SwirlTreeViewCanDropHandler,
  SwirlTreeViewDropItemEvent,
} from "../swirl-tree-view/swirl-tree-view";
import { treeViewDragDropConfig } from "../swirl-tree-view/swirl-tree-view.config";

export type SwirlTreeViewItemKeyboardMoveEvent = {
  canDrop: boolean;
  childrenCount: number;
  itemLabel: string;
  parentLabel: string;
  position: number;
};

/**
 * @slot slot - The children of the tree view item
 * @slot tags - The tags of the tree view item
 */
@Component({
  scoped: false,
  shadow: false,
  styleUrl: "swirl-tree-view-item.css",
  tag: "swirl-tree-view-item",
})
export class SwirlTreeViewItem {
  @Element() el!: HTMLSwirlTreeViewItemElement;

  @Prop() active?: boolean;
  @Prop() disableDrag?: boolean;
  @Prop() expandable?: boolean = true;
  @Prop() href?: string;
  @Prop() icon?: string;
  @Prop() iconColor?: SwirlIconColor;
  @Prop() itemId!: string;
  @Prop() label!: string;

  @Event() dropTreeViewItem!: EventEmitter<SwirlTreeViewDropItemEvent>;
  @Event() expandedChange!: EventEmitter<boolean>;
  @Event() itemSelected!: EventEmitter<HTMLSwirlTreeViewItemElement>;
  @Event({ eventName: "startKeyboardMove" })
  startKeyboardMoveEvent!: EventEmitter<SwirlTreeViewItemKeyboardMoveEvent>;
  @Event({ eventName: "endKeyboardMove" })
  endKeyboardMoveEvent!: EventEmitter<SwirlTreeViewItemKeyboardMoveEvent>;
  @Event({ eventName: "keyboardMove" })
  keyboardMoveEvent!: EventEmitter<SwirlTreeViewItemKeyboardMoveEvent>;

  @State() canDrop?: SwirlTreeViewCanDropHandler;
  @State() cannotKeyboardDropInCurrentPosition = false;
  @State() dragDropItemSelector?: string = "swirl-tree-view-item";
  @State() enableDragDrop = false;
  @State() expanded = false;
  @State() level = 0;
  @State() movingViaKeyboard = false;
  @State() selected = false;

  private childList?: HTMLElement;
  private positionBeforeKeyboardMove?: {
    parent: HTMLSwirlTreeViewItemElement | HTMLSwirlTreeViewElement;
    position: number;
  };
  private link?: HTMLAnchorElement;
  private sortable: Sortable | undefined;

  componentWillLoad() {
    this.updateLevel();

    const treeView = this.el.closest("swirl-tree-view");

    this.enableDragDrop = treeView?.enableDragDrop;
    this.canDrop = treeView?.canDrop;
    this.dragDropItemSelector = treeView?.dragDropItemSelector;
  }

  componentDidLoad() {
    this.setUpDragDrop();
  }

  @Method()
  async expand() {
    if (this.expanded || !this.expandable || this.getSemantics() !== "tree") {
      return;
    }

    this.expanded = true;
    this.expandedChange.emit(this.expanded);
  }

  @Method()
  async collapse() {
    if (!this.expanded || !this.expandable || this.getSemantics() !== "tree") {
      return;
    }

    this.expanded = false;
    this.expandedChange.emit(this.expanded);
  }

  @Method()
  async select(focus?: boolean) {
    if (this.getSemantics() !== "tree") {
      return;
    }

    this.selected = true;

    if (focus) {
      this.link?.focus();
    }

    this.itemSelected.emit(this.el);
  }

  @Method()
  async unselect() {
    if (this.getSemantics() !== "tree") {
      return;
    }

    this.selected = false;
  }

  private setUpDragDrop() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = undefined;
    }

    if (this.enableDragDrop && this.childList) {
      this.sortable = new Sortable(this.childList, {
        ...treeViewDragDropConfig,
        draggable: this.dragDropItemSelector,
        onMove: (event) => {
          if (typeof this.canDrop === "function") {
            return this.canDrop({
              parentId: event.to.closest("swirl-tree-view-item")?.itemId,
              position: Math.max(
                Array.from(event.to.children).indexOf(event.related),
                0
              ),
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

          const { from, to, newIndex, oldIndex, item } = event;
          const sourceParentItemId = from.closest(
            "swirl-tree-view-item"
          )?.itemId;
          const targetParentItemId = to.closest("swirl-tree-view-item")?.itemId;

          this.dropTreeViewItem.emit({
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
            targetParentItemId,
          });
        },
      });
    }
  }

  private updateLevel() {
    let parentItem = this.el.parentElement?.closest("swirl-tree-view-item");

    while (Boolean(parentItem)) {
      this.level += 1;
      parentItem = parentItem.parentElement?.closest("swirl-tree-view-item");
    }
  }

  private getItemContext(): {
    canDrop: boolean;
    parent: HTMLSwirlTreeViewItemElement | HTMLSwirlTreeViewElement;
    position: number;
    siblingCount: number;
  } {
    const parent =
      this.getParentTreeViewItem() ?? this.el.closest("swirl-tree-view");

    const siblings = Array.from(
      parent.querySelectorAll(`
        :scope > .tree-view-item > .tree-view-item__children > ${this.dragDropItemSelector},
        :scope > .tree-view > ${this.dragDropItemSelector}
      `)
    );

    return {
      canDrop: !this.cannotKeyboardDropInCurrentPosition,
      parent,
      position: siblings.indexOf(this.el),
      siblingCount: siblings.length,
    };
  }

  private getParentItem(): HTMLElement | null {
    return this.getElementToMove().parentElement.closest(
      this.dragDropItemSelector
    );
  }

  private getParentTreeViewItem(): HTMLSwirlTreeViewItemElement | null {
    return this.el.parentElement.closest("swirl-tree-view-item");
  }

  private getElementToMove(): HTMLElement {
    return this.dragDropItemSelector
      ? this.el.closest(this.dragDropItemSelector)
      : this.el;
  }

  private getKeyboardMoveEventData():
    | SwirlTreeViewItemKeyboardMoveEvent
    | undefined {
    const { canDrop, parent, position, siblingCount } = this.getItemContext();

    if (!parent) {
      return undefined;
    }

    return {
      canDrop,
      parentLabel: parent.label,
      childrenCount: siblingCount,
      itemLabel: this.label,
      position,
    };
  }

  private toggleKeyboardMove() {
    if (this.movingViaKeyboard) {
      this.endKeyboardMove();
    } else {
      this.startKeyboardMove();
    }
  }

  private endKeyboardMove() {
    const { parent, position } = this.getItemContext();

    if (typeof this.canDrop === "function") {
      const canBeDroppedHere = this.canDrop({ parentId: parent.id, position });

      if (!canBeDroppedHere) {
        return;
      }
    }

    this.movingViaKeyboard = false;

    const eventData = this.getKeyboardMoveEventData();

    if (!eventData) {
      return;
    }

    this.endKeyboardMoveEvent.emit(eventData);
    this.dropTreeViewItem.emit({
      item: this.getElementToMove(),
      itemId: this.itemId,
      newIndex: position,
      oldIndex: this.positionBeforeKeyboardMove.position,
      newNextSiblingItemId:
        eventData.position < eventData.childrenCount - 1
          ? this.getElementToMove().nextElementSibling?.id
          : undefined,
      newPrevSiblingItemId:
        eventData.position > 0
          ? this.getElementToMove().previousElementSibling?.id
          : undefined,
      sourceParentItemId:
        this.positionBeforeKeyboardMove.parent.id ?? undefined,
      targetParentItemId: this.getParentItem()?.id,
    });
  }

  private startKeyboardMove() {
    if (this.disableDrag) {
      return;
    }

    const { parent, position } = this.getItemContext();

    this.positionBeforeKeyboardMove = {
      parent,
      position,
    };

    this.movingViaKeyboard = true;

    const eventData = this.getKeyboardMoveEventData();

    if (!eventData) {
      return;
    }

    this.startKeyboardMoveEvent.emit(eventData);
  }

  moveItem(direction: "up" | "down") {
    const elementToMove = this.getElementToMove();
    const parentItem = this.getParentItem();
    const parentTreeViewItem = this.getParentTreeViewItem();

    if (direction === "down") {
      const nextSibling =
        elementToMove.nextElementSibling as HTMLElement | null;

      if (nextSibling) {
        // move inside the next sibling
        nextSibling
          .querySelector(".tree-view-item__children")
          .prepend(elementToMove);

        // update parent tree view item
        if (parentTreeViewItem) {
          forceUpdate(parentTreeViewItem);
        }

        const siblingTreeItem =
          nextSibling.tagName === "SWIRL-TREE-VIEW-ITEM"
            ? (nextSibling as HTMLSwirlTreeViewItemElement)
            : nextSibling.querySelector("swirl-tree-view-item");

        forceUpdate(siblingTreeItem);
        siblingTreeItem.expand();
      } else {
        if (parentItem) {
          // move after the parent item
          parentItem.parentElement.insertBefore(
            elementToMove,
            parentItem.nextElementSibling
          );

          if (parentTreeViewItem) {
            forceUpdate(parentTreeViewItem);
          }
        }
      }
    } else if (direction === "up") {
      const prevSibling =
        elementToMove.previousElementSibling as HTMLElement | null;

      if (prevSibling) {
        // move before the previous sibling
        prevSibling
          .querySelector(".tree-view-item__children")
          .appendChild(elementToMove);

        // update parent tree view item
        if (parentTreeViewItem) {
          forceUpdate(parentTreeViewItem);
        }

        const siblingTreeItem =
          prevSibling.tagName === "SWIRL-TREE-VIEW-ITEM"
            ? (prevSibling as HTMLSwirlTreeViewItemElement)
            : prevSibling.querySelector("swirl-tree-view-item");

        forceUpdate(siblingTreeItem);
        siblingTreeItem.expand();
      } else {
        if (parentItem) {
          // move before the parent item
          parentItem.parentElement.insertBefore(elementToMove, parentItem);

          if (parentTreeViewItem) {
            forceUpdate(parentTreeViewItem);
          }
        }
      }
    }

    requestAnimationFrame(() => {
      this.link.focus();
    });

    this.checkKeyboardDropStatus();

    const eventData = this.getKeyboardMoveEventData();

    if (!eventData) {
      return;
    }

    this.keyboardMoveEvent.emit(eventData);
  }

  private checkKeyboardDropStatus() {
    const { parent, position } = this.getItemContext();

    if (typeof this.canDrop === "function") {
      const canBeDroppedHere = this.canDrop({ parentId: parent.id, position });

      this.cannotKeyboardDropInCurrentPosition = !canBeDroppedHere;
      return;
    }

    this.cannotKeyboardDropInCurrentPosition = false;
  }

  private onFocus = () => {
    if (!this.selected && this.getSemantics() === "tree") {
      this.select();
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      this.toggleKeyboardMove();
      return;
    }

    if (!this.movingViaKeyboard) {
      return;
    }

    if (event.code === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      this.moveItem("down");
    } else if (event.code === "ArrowUp") {
      event.preventDefault();
      event.stopPropagation();
      this.moveItem("up");
    }
  };

  private onClickCollapse = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    this.collapse();
  };

  private onClickExpand = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    this.expand();
  };

  private getSemantics(): "tree" | "list" {
    const hasTreeSemantics = this.el.closest('[role="tree"]');

    return hasTreeSemantics ? "tree" : "list";
  }

  render() {
    const hasChildren = Boolean(this.el.querySelector("swirl-tree-view-item"));
    const hasTags = Boolean(this.el.querySelector('[slot="tags"]'));
    const iconIsEmoji =
      Boolean(this.icon) && /\p{Extended_Pictographic}/u.test(this.icon);

    const shouldShowChildrenDropZone = this.enableDragDrop && !hasChildren;

    const semantics = this.getSemantics();
    const expanded = this.expanded || semantics !== "tree";
    const tabIndex =
      semantics === "tree" ? (this.selected ? 0 : -1) : undefined;

    const className = classNames("tree-view-item", {
      "tree-view-item--active": this.active,
      "tree-view-item--cannot-keyboard-drop":
        this.cannotKeyboardDropInCurrentPosition,
      "tree-view-item--moving-via-keyboard": this.movingViaKeyboard,
      "tree-view-item--disable-drag": this.disableDrag,
      "tree-view-item--has-tags": hasTags,
    });

    return (
      <Host id={this.itemId} role="none">
        <li class={className} role={semantics === "tree" ? "none" : undefined}>
          <a
            aria-current={this.active ? "page" : undefined}
            aria-expanded={
              !hasChildren || semantics !== "tree"
                ? undefined
                : String(expanded)
            }
            aria-level={semantics === "tree" ? this.level + 1 : undefined}
            aria-owns={
              hasChildren && semantics === "tree"
                ? `${this.itemId}-children`
                : undefined
            }
            aria-selected={
              semantics === "tree" ? String(this.selected) : undefined
            }
            class="tree-view-item__link"
            href={this.href}
            onFocus={this.onFocus}
            onKeyDown={this.onKeyDown}
            ref={(el) => (this.link = el)}
            role={semantics === "tree" ? "treeitem" : undefined}
            tabIndex={tabIndex}
          >
            {!this.disableDrag && this.enableDragDrop && (
              <span class="tree-view-item__drag-handle">
                <swirl-icon-drag-handle size={20}></swirl-icon-drag-handle>
              </span>
            )}
            {this.expandable && semantics === "tree" && (
              <span class="tree-view-item__toggle-icon">
                {hasChildren && (
                  <Fragment>
                    {expanded ? (
                      <swirl-icon-expand-more
                        onClick={this.onClickCollapse}
                        size={24}
                      ></swirl-icon-expand-more>
                    ) : (
                      <swirl-icon-chevron-right
                        onClick={this.onClickExpand}
                        size={24}
                      ></swirl-icon-chevron-right>
                    )}
                  </Fragment>
                )}
              </span>
            )}
            {Boolean(this.icon) && (
              <Fragment>
                <span class="tree-view-item__icon">
                  {iconIsEmoji ? (
                    this.icon
                  ) : (
                    <swirl-icon
                      glyph={this.icon}
                      size={24}
                      color={this.iconColor}
                    ></swirl-icon>
                  )}
                </span>
              </Fragment>
            )}
            <span class="tree-view-item__label">{this.label}</span>
            <span class="tree-view-item__tags">
              <slot name="tags"></slot>
            </span>
          </a>
          <ul
            aria-label={this.label}
            class={`tree-view-item__children ${
              shouldShowChildrenDropZone
                ? "tree-view-item__children--drop-zone"
                : ""
            }`}
            id={`${this.itemId}-children`}
            ref={(el) => (this.childList = el)}
            role="group"
            style={{
              display:
                (!expanded || !hasChildren) && !shouldShowChildrenDropZone
                  ? "none"
                  : undefined,
            }}
          >
            <slot></slot>
          </ul>
        </li>
      </Host>
    );
  }
}
