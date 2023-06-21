import { useEffect, useRef, useState } from "react";
// Hooks
import useScroll from "./useScroll";

// #region useElementOnScreen
export const useLazyLoadComponent = (options) => {
  const [done, setDone] = useState(false);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollHight = useScroll(1000);
  // console.log(test)
  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };
  const lazyLoadComponentsRomove = () => {
    // window.onscroll = function (ev) {
    if (window.innerHeight + scrollHight >= document.body.offsetHeight - 800) {
      setDone(true);
    }
    // };
  };
  useEffect(() => {
    lazyLoadComponentsRomove();
  }, [scrollHight]);

  useEffect(() => {
    if (!done) {
      const observer = new IntersectionObserver(callbackFunction, options);
      if (containerRef.current) observer.observe(containerRef.current);
      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    } else {
      setIsVisible(true);
    }
  }, [containerRef, options, done]);

  return [containerRef, isVisible, setDone];
};

// #endregion useElementOnScreen
// how to use
// const [refElement, isVisible] = useElementOnScreen({
//   root: null,
//   rootMargin: "0px",
//   threshold: [1, 1, 0.55],
// });
