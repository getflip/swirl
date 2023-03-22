import * as React from "react";

type GridCellData = {
  index: number;
  data: string[];
};

/**
 * Checks the key pressed and moves the focus to the next or previous cell.
 * @param event Keyboard event
 * @param gridCellData Grid cell data. Consists of a data array with keys and an index of the current cell.
 * @param getRefFn Function to get a react-ref
 * @returns
 */
export const handleGridKeyDown = (
  event: React.KeyboardEvent,
  gridCellData: GridCellData,
  map: Map<string, React.RefObject<unknown>>,
  getRefFn: (
    key: string,
    map: Map<string, React.RefObject<unknown>>
  ) => void | React.RefObject<any>
) => {
  handlePreventScroll(event);
  const currentRef = getRefFn(
    gridCellData.data[gridCellData.index],
    map
  ) as React.RefObject<any>;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      const nextRef = getRefFn(
        gridCellData.data[gridCellData.index + 1],
        map
      ) as React.RefObject<any>;
      if (gridCellData.index === gridCellData.data.length - 1) return;

      currentRef.current.tabIndex = -1;
      nextRef.current.tabIndex = 0;
      nextRef.current.focus();
      break;
    case "ArrowLeft":
    case "ArrowUp":
      const previousRef = getRefFn(
        gridCellData.data[gridCellData.index - 1],
        map
      ) as React.RefObject<any>;
      if (gridCellData.index === 0) return;

      currentRef.current.tabIndex = -1;
      previousRef.current.tabIndex = 0;
      previousRef.current.focus();
      break;
    // case "Tab":
    //   if (event.shiftKey) {
    //     const firstRef = getRefFn(gridCellData.data[0]) as React.RefObject<any>;
    //     if (gridCellData.index === 0) return;

    //     currentRef.current.tabIndex = -1;
    //     firstRef.current.tabIndex = 0;
    //     firstRef.current.focus();
    //   }
    //   break;
  }
};

/**
 * Prevents the default scroll behavior of the arrow keys to be able to navigate through a grid as expected.
 */
function handlePreventScroll(event: React.KeyboardEvent): void {
  const isNextMove = event.key === "ArrowRight" || event.key === "ArrowDown";
  const isPrevMove = event.key === "ArrowLeft" || event.key === "ArrowUp";

  if (isNextMove || isPrevMove) {
    event.preventDefault();
  }
}

function getRef<T>(
  key: string,
  map: Map<string, React.RefObject<unknown>>
): React.RefObject<T> | undefined | void {
  if (!key) return console.warn(`useDynamicRefs: Cannot get ref without key`);
  return map.get(key) as React.RefObject<T>;
}

function setRef<T>(
  key: string,
  map: Map<string, React.RefObject<unknown>>
): React.RefObject<T> | void {
  console.log("setRef", key);
  if (!key) return console.warn(`useDynamicRefs: Cannot set ref without key `);
  const ref = React.createRef<T>();
  map.set(key, ref);
  return ref;
}

function useDynamicRefs<T>(): [
  (
    key: string,
    map: Map<string, React.RefObject<unknown>>
  ) => void | React.RefObject<T>,
  (
    key: string,
    map: Map<string, React.RefObject<unknown>>
  ) => void | React.RefObject<T>
] {
  return [getRef, setRef];
}

export default useDynamicRefs;
