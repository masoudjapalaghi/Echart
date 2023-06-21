import React from "react";

export const InputSwitch = ({ activeLabel = false,lableRight="فعال", lableLeft="غیر فعال", ...rest }) => {
  return (
    <label className="relative flex justify-between items-center group p-2 text-xl  max-w-max  ">
      <input
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full  peer appearance-none rounded-md"
        {...rest}
      />
      {activeLabel && <span className="text-xs opacity-50 peer-checked:opacity-100 ml-2 font-semibold whitespace-nowrap">{lableRight}</span>}
      <span className="w-10 h-5 flex items-center flex-shrink-0  p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-0 after:-translate-x-4"></span>
      {activeLabel && <span className="text-xs opacity-100 peer-checked:opacity-50 mr-2 font-semibold whitespace-nowrap"> {lableLeft} </span>}
    </label>
  );
};
