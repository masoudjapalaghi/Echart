import { useDispatch, useSelector } from "react-redux";
import { goNextPage, goPrevPage } from "@slices/Wizard";
// Components
import { Button } from "@components/Button";

export const WizardButtonPrev = ({ children, as: Comp = "button", ...props }) => {
  const { activePageIndex, steps } = useSelector((state) => state.wizard);
  const dispatch = useDispatch();

  return activePageIndex === 0 ? null : (
    <Button {...props} onClick={() => dispatch(goPrevPage())}>
      {children}
    </Button>
  );
};

export const WizardButtonNext = ({ children, as: Comp = "Button", ...props }) => {
  const dispatch = useDispatch();
  const { activePageIndex, steps } = useSelector((state) => state.wizard);

  return activePageIndex < steps - 1 ? (
    <Button {...props} onClick={() => dispatch(goNextPage())}>
      {children}
    </Button>
  ) : null;
};
