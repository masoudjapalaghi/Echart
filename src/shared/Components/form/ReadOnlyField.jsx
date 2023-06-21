import { UnavailableTable } from "@components/Unavailable";

export const ReadOnlyField = ({ width = "w-full lg:w-52", align = "text-start", title = "", value }) => {
  return (
    <div className={`${width} text-primary`}>
      <label className={`text-xs w-full whitespace-nowrap   ${align}`}>
        {align == "text-start" ? title + " :" : ": " + title}
      </label>
      <div className=" rounded border text-xs   border-gray-300 h-10 flex items-center px-2">
        {value ? value : <span className="text-red-500">موجود نیست</span>}
      </div>
    </div>
  );
};
