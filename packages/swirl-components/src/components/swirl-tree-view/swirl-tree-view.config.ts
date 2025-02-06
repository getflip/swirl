import type Sortable from "sortablejs";

export const treeViewDragDropConfig: Partial<Sortable.Options> = {
  animation: 150,
  chosenClass: "tree-view-item--chosen",
  draggable: "swirl-tree-view-item",
  fallbackOnBody: true,
  ghostClass: "tree-view-item--ghost",
  group: "swirl-tree-view",
  onEnd: (event) => {
    event.item.closest(".tree-view")?.classList.remove("tree-view--dragging");
  },
  onStart: (event) => {
    event.item.closest(".tree-view")?.classList.add("tree-view--dragging");
  },
};
