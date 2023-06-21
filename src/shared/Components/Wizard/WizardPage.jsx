import React, { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSteps } from "@slices/Wizard";

const WizardPages = ({ children, ...props }) => {
  const { activePageIndex } = useSelector((state) => state.wizard);

  const dispatch = useDispatch();
  const pages = React.Children.toArray(children);

  const steps = React.Children.count(children);
  React.useEffect(() => {
    dispatch(setSteps(steps));
  }, [dispatch, steps]);
  
  useEffect(() => {
    localStorage.setItem("activePageIndex", activePageIndex);
  }, [activePageIndex]);

  let currentPage = pages[activePageIndex];
  return <>{currentPage}</>;
};

export default WizardPages;
