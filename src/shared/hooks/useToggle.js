// Parameter is the boolean, with default "false" value
import { useState } from "react";

const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = () => setState((state) => !state);
  const close = () => setState(false);
  const open = () => setState(true);
  return [state, toggle, close, open];
};

export default useToggle;
// Call the hook which returns, current value and the toggler function
//  const [isTextChanged, setIsTextChanged] = useToggle();
