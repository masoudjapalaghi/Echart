// Hooks
import { useMediaQuery } from "@hooks/useMediaQuery";
// Import
import { useDispatch, useSelector } from "react-redux";
import { goPrevPage } from "@slices/Wizard";


const WizardHeader = ({ label = "" }) => {
  const dispatch = useDispatch();
  const  {activePageIndex,steps} = useSelector(state=>state.wizard)


  const lgUp = useMediaQuery("lgUp");
  return (
    <div className="flex items-center max-w-max gap-2 h-5 cursor-pointer" onClick={() => dispatch(goPrevPage())}>
      {!activePageIndex <= 0 && (
        <>
          <i className="fi fi-rr-arrow-small-right text-xl" />
          <span className={lgUp ? "text-xs" : "text-lg"}>{lgUp ? "بازگشت" : label}</span>
        </>
      )}
      <div>
          مرحله {activePageIndex + 1} از {steps} ها
        </div>
    </div>
  );
};

export default WizardHeader;
