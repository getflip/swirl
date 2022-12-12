import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";

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
      const newHightlightIndex = entries.findIndex((entry) => {
        return entry.intersectionRatio > 0;
      });

      setActiveIndex(newHightlightIndex);
    });

    const { current: currentObserver } = observer;

    elements?.forEach((element: Element) => {
      element ? currentObserver.observe(element) : null;
    });

    return () => currentObserver.disconnect();
  }, [elements]);

  return [activeIndex, setActiveIndex];
};

export default useScrollObserver;
