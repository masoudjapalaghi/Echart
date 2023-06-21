import { useEffect } from "react";

export const useLockBodyScroll = ( toggleState ) => {
  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    if (toggleState) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = originalStyle);
    // Re-enable scrolling when component unmounts
  }, [toggleState]); // Empty array ensures effect is only run on mount and unmount
};

//     // Call hook to lock body scroll in modal
//     useLockBodyScroll();
