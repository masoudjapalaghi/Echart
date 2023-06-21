import { useEffect, useRef, useState } from "react";

// #region useElementOnScreen
export const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

// #endregion useElementOnScreen
// how to use
// const [refElement, isVisible] = useElementOnScreen({
//   root: null,
//   rootMargin: "0px",
//   threshold: [1, 1, 0.55],
// });
