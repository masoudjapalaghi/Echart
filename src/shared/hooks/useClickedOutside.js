import { useEffect } from "react";

const useOnClickOutside = (ref, handleToggle, toggle) => {
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (toggle && ref.current && !ref.current.contains(e.target)) {
        handleToggle();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref, handleToggle]);
};

export default useOnClickOutside;
