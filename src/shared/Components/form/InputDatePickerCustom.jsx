import React, { useEffect, useRef } from "react";

const InputDatePickerCustom = ({
  setHour,
  setMinutes,
  value,
  setValue,
  openCalendar,
  placeholder = "",
  disabled,
  outline,
  reset,
}) => {
  const inputRef = useRef(null);

  const resetDate = (e) => {
    e.stopPropagation();
    setValue({});
    setHour("");
    setMinutes("");
    inputRef.current.value = "";
  };
  useEffect(() => {
    if (reset) {
      inputRef.current.value = "";
    }
  }, [reset]);

  return (
    <div
      className={
        disabled
          ? `relative  bg-transparent border  rounded-md ${
              outline ? "border border-[#e0e0e0]" : ""
            }`
          : `relative bg-white rounded-md ${
              outline ? "border border-[#e0e0e0]" : ""
            }`
      }
      onClick={openCalendar}
    >
      <input
        ref={inputRef}
        className="w-full h-10 rounded-md text-xs px-2"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        readOnly
      ></input>
      {value ? (
        <i
          className="fi fi fi-rr-cross  absolute left-11 text-xs top-[15px] text-disable cursor-pointer"
          onClick={resetDate}
        ></i>
      ) : null}
      <div className="w-[1px] h-5 absolute left-9 top-[10px] bg-disable"></div>
      <i className="fi fi-rr-calendar absolute left-3 top-3 text-disable"></i>
    </div>
  );
};

export default InputDatePickerCustom;
