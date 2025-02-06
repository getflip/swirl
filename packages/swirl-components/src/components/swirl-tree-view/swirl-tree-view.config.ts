import type Sortable from "sortablejs";

export const treeViewDragDropConfig: Partial<Sortable.Options> = {
  animation: 150,
  chosenClass: "tree-view-item--chosen",
  direction: "vertical",
  draggable: "swirl-tree-view-item",
  emptyInsertThreshold: 2,
  fallbackOnBody: true,
  filter: ".tree-view-item--disable-drag",
  ghostClass: "tree-view-item--ghost",
  group: "swirl-tree-view",
  handle: ".tree-view-item__drag-handle",
  onEnd: (event) => {
    event.item.closest(".tree-view")?.classList.remove("tree-view--dragging");
  },
  onStart: (event) => {
    event.item.closest(".tree-view")?.classList.add("tree-view--dragging");
  },
};
