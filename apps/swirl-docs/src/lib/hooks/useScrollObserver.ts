import React from "react";

const useScrollObserver = (
  elements: Element[]
): [number, Element[] | undefined] => {
  // no active element by default
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const scrolledSections =
    activeIndex >= 0 ? elements?.slice(0, activeIndex + 1) : [];

  const observer = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
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

    elements?.forEach((element: any) =>
      element ? currentObserver.observe(element) : null
    );

    return () => currentObserver.disconnect();
  }, [elements]);

  return [activeIndex, scrolledSections];
};

export default useScrollObserver;
