import * as React from "react";

const map = new Map<string, React.RefObject<unknown>>();

type GridCellData = {
  index: number;
  data: any;
};

export const handleGridKeyDown = (
  key: string,
  gridCellData: GridCellData,
  getRefFn: (key: string) => void | React.RefObject<any>
) => {
  const currentRef = getRefFn(
    gridCellData.data[gridCellData.index]
  ) as React.RefObject<any>;

  switch (key) {
    case "ArrowRight" || "ArrowDown":
      const nextRef = getRefFn(
        gridCellData.data[gridCellData.index + 1]
      ) as React.RefObject<any>;
      if (gridCellData.index === gridCellData.data.length - 1) return;

      currentRef.current.tabIndex = -1;
      nextRef.current.tabIndex = 0;
      nextRef.current.focus();
      break;
    case "ArrowLeft" || "ArrowUp":
      const previousRef = getRefFn(
        gridCellData.data[gridCellData.index - 1]
      ) as React.RefObject<any>;
      if (gridCellData.index === 0) return;

      currentRef.current.tabIndex = -1;
      previousRef.current.tabIndex = 0;
      previousRef.current.focus();
      break;
  }
};

function getRef<T>(key: string): React.RefObject<T> | undefined | void {
  if (!key) return console.warn(`useDynamicRefs: Cannot get ref without key`);
  return map.get(key) as React.RefObject<T>;
}

function setRef<T>(key: string): React.RefObject<T> | void {
  if (!key) return console.warn(`useDynamicRefs: Cannot set ref without key `);
  const ref = React.createRef<T>();
  map.set(key, ref);
  return ref;
}

function useDynamicRefs<T>(): [
  (key: string) => void | React.RefObject<T>,
  (key: string) => void | React.RefObject<T>
] {
  return [getRef, setRef];
}

export default useDynamicRefs;
