import  { useState, useEffect } from "react";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
   const handelCheckQuery = (query) => {
    return {
      xsUp: "(min-width: 	320px)",
      smUp: "(min-width: 	640px)",
      mdUp: "(min-width: 768px)",
      lgUp: "(min-width: 1024px)",
      xlUp: "(min-width: 1280px)",
      "2xlUp": "(min-width: 1536px)",
    }[query];
  };

  useEffect (() => {
    const media = window.matchMedia(handelCheckQuery(query));
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};
