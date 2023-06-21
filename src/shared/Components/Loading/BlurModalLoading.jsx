import { DotPulse, Spinner } from "@components/Loading";

export const BlurModalLoading = () => {
  return (
    <div className={`inset-0 m-auto absolute z-50 bg-[#F5F5F5]   flex justify-center items-center`}>
      <div className=" absolute inset-0 m-auto rounded"></div>
      <div className="flex justify-center items-center">
      <DotPulse/>
        {/* <p className="text-xs">در حال دریافت اطلاعات ...</p> */}
      </div>
    </div>
  );
};
