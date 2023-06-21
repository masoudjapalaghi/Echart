import React from "react";

export const TextArea = ({ width = "w-full", align= "text-start",height = "h-auto",title, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <label className={`text-xs w-full px-1  ${align}`}>{align == "text-start" ? title + " :" : ": " + title}</label>
      )}
      <textarea
        className={`min-h-[80px] text-xs overflow-hidden resize-none focus:outline-0 focus:border-0 rounded-sm ${width} ${height} bg-white p-3`}
        {...rest}
      />
    </div>
  );
};
