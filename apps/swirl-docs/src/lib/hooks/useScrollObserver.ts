import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const useScrollObserver = (
  elements: Element[]
): [number, Dispatch<SetStateAction<number>>] => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      const intersecting = entries.filter((entry) => {
        return entry.intersectionRatio > 0;
      });

      // check if first intersecting element has an intersecting child to highlight
      if (
        intersecting.length > 1 &&
        intersecting[0].target.contains(intersecting[1].target)
      ) {
        const index = entries.indexOf(intersecting[1]);
        setActiveIndex(index);
        return;
      }

      const index = entries.indexOf(intersecting[0]);

      setActiveIndex(index);
    });

    const { current: currentObserver } = observer;

    elements?.forEach((element: Element) => {
      if (element) {
        currentObserver.observe(element);
      }
    });

    return () => currentObserver.disconnect();
  }, [elements]);

  return [activeIndex, setActiveIndex];
};

export default useScrollObserver;
