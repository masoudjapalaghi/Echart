// Hooks
import { Button } from "@components/Button";
import { useDispatch, useSelector } from "react-redux";
import { goNextPage, reset } from "@slices/Wizard";
import useMediaQuery from "@hooks/useMediaQuery";
import { useEffect } from "react";
import { useMemo } from "react";

const WizardNavigation = ({ label = "", children, ...rest }) => {
  // const status = disabled ? "disabled" : varient;

  // const EnumVarient = (varient) => {
  //   return {
  //     primary: "btnPrimary",
  //     disabled: "btnDisable",
  //     bgWhite:"btnBgWhite",
  //     bgTransparent:"btnTransparent",
  //     outLine:"btnOutLine",

  //   }[varient];
  // };
  const dispatch = useDispatch();
  const md = useMediaQuery();
  const { disabled } = useSelector((state) => state.wizard);

  const { activePageIndex, steps } = useSelector((state) => state.wizard);

  const lastStep = activePageIndex + 1 === steps;


  return (
    <>
      <div className=" md:hidden flex gap-2 justify-center items-end px-8 md:px-0  fixed bottom-[30px] right-0 left-0  drop-shadow  md:${width} md:self-end">
        <Button width="w-full md:w-[360px] lg:w-[408px]" onClick={() => dispatch(goNextPage())} {...rest}>
          {label}
          {children}
        </Button>
      </div>
      <div className="hidden md:flex gap-2  justify-center items-end ">
        <Button width="w-full md:w-[360px] lg:w-[408px]" onClick={() => dispatch(goNextPage())}  {...rest}>
          {label}
          {children}
        </Button>
      </div>
    </>
  );
};
export default WizardNavigation;
