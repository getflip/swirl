import type Sortable from "sortablejs";

export const treeViewDragDropConfig: Partial<
  Sortable.Options & { dragOnTop: boolean }
> = {
  animation: 100,
  chosenClass: "tree-view-item--chosen",
  direction: "vertical",
  dragClass: "tree-view-item--drag",
  dragOnTop: true,
  emptyInsertThreshold: 0,
  fallbackOnBody: true,
  filter: ".tree-view-item--disable-drag",
  ghostClass: "tree-view-item--ghost",
  group: "swirl-tree-view",
  invertSwap: true,
  onEnd: (event) => {
    event.item.closest(".tree-view")?.classList.remove("tree-view--dragging");
  },
  onStart: (event) => {
    event.item.closest(".tree-view")?.classList.add("tree-view--dragging");
  },
  swapThreshold: 0.75,
  invertedSwapThreshold: 1,
};
