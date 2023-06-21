import { useEffect, useState } from "react";
import { debounce } from "src/utils";

export default function useScroll(delay = 3000) {
  const [clientWindowScroll, setScroll] = useState(null);
  var handleScroll = debounce(function () {
    // All the taxing stuff you do
    setScroll(window.scrollY);
  }, delay);
  useEffect(() => {
    if (typeof window !== "undefined") {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return clientWindowScroll;
}
