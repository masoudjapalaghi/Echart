import React from "react";

export const  CheckBox = ({ title,disabled,className, checked,defaultChecked,labelClass,...rest }) => {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" className={`w-4 h-4 rounded border-gray-300 accent-primary ${className}`} checked={checked} defaultChecked={defaultChecked} {...rest} />
      {title?<label className={`ml-2 text-xs font-medium  ${disabled ? "text-disable" :"text-color"} ${labelClass}`}>{title}</label>:null}
    </div>
  );
};
