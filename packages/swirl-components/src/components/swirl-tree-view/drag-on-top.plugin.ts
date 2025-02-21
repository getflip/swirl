import Sortable from "sortablejs";

let dragOverTimeout: NodeJS.Timeout | undefined;
let previousDragOverTarget: HTMLElement | undefined;

export class DragOnTopPlugin {
  static readonly pluginName = "dragOnTop";

  private targetClassName = "tree-view-item--drag-on-top-target";

  constructor(
    private sortable?: Sortable,
    private el?: HTMLElement,
    __?: Sortable.Options
  ) {}

  dragOverValid({ cancel, completed, changed, onMove, target }) {
    if (previousDragOverTarget === target) {
      return;
    }

    if (previousDragOverTarget) {
      this.onLeave(previousDragOverTarget);
    }

    if (target && target !== this.el) {
      if (onMove(target) !== false) {
        previousDragOverTarget = target;
        this.onDragOver(target);
      } else {
        this.onLeave(previousDragOverTarget);
        previousDragOverTarget = undefined;
      }
    }

    changed();
    completed(true);
    cancel();
  }

  drop({ activeSortable, putSortable, dragEl, parentEl }) {
    const toSortable = putSortable || this.sortable;
    previousDragOverTarget &&
      Sortable.utils.toggleClass(
        previousDragOverTarget,
        this.targetClassName,
        false
      );
    if (previousDragOverTarget) {
      if (dragEl !== previousDragOverTarget) {
        toSortable.captureAnimationState();
        if (toSortable !== activeSortable) {
          activeSortable.captureAnimationState();
        }

        const leafChildren = parentEl.querySelector(
          ".tree-view-item__children"
        );

        leafChildren.appendChild(dragEl);

        toSortable.animateAll();

        if (toSortable !== activeSortable) {
          activeSortable.animateAll();
        }
      }
    }
  }

  nulling() {
    this.resetTimeout();
    previousDragOverTarget = undefined;
  }

  private async onDragOver(target: HTMLSwirlTreeViewItemElement) {
    Sortable.utils.toggleClass(
      target.querySelector(".tree-view-item"),
      this.targetClassName,
      true
    );

    target.addEventListener(
      "mouseleave",
      () => {
        this.onLeave(target);
      },
      { once: true }
    );

    const hasChildren = Boolean(this.el.querySelector("swirl-tree-view-item"));
    const notExpanded = !Boolean(
      target.querySelector(".tree-view-item--expanded")
    );

    if (hasChildren && notExpanded) {
      this.expandAfterTimeout(target as HTMLSwirlTreeViewItemElement);
    }
  }

  private onLeave(previousTarget: HTMLElement) {
    Sortable.utils.toggleClass(
      previousTarget.querySelector(".tree-view-item"),
      this.targetClassName,
      false
    );

    previousDragOverTarget = undefined;

    this.resetTimeout();
  }

  private expandAfterTimeout(target: HTMLSwirlTreeViewItemElement) {
    this.resetTimeout();

    dragOverTimeout = setTimeout(() => {
      target.expand();
    }, 1000);
  }

  private resetTimeout() {
    if (dragOverTimeout) {
      clearTimeout(dragOverTimeout);
    }
  }
}
