import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { debounce, isNumeric, toPrsianCurrency } from "src/utils";

export const Input = ({
  width = "w-full lg:w-52",
  height = "h-10",
  varient = "primary",
  disabled = false,
  className = "",
  title,
  align = "text-start",
  isPrice = false,
  reset=false,
  onChange = () => {},
  ...rest
}) => {
  const status = disabled ? "disabled" : varient;

  const inputRef=useRef()
  const promiseGetValue = (e) => {
    var value = e.target.value;
    const removeCurrency = (e.target.value = value.replace(/,/g, ""));
    const isNumber = isNumeric(removeCurrency);
    const isCurency = value.includes(",");
    const isStartZero = value[0] == 0;
    if (isNumber) {
      e.target.value = value ? toPrsianCurrency(isCurency ? removeCurrency : value, "en-US") : "";
    } else {
      e.target.value = "";
    }
    if (isStartZero) {
      e.target.value = "";
    }
  };

  const EnumVarient = (varient) => {
    return {
      primary: "bg-white",
      outline: "bg-transparent border",
      disabled: "bg-transparent border-2 text-white",
    }[varient];
  };
useEffect(() => {
  if(reset){
    inputRef.current.value=""
  }
}, [reset])

  return (
    <div className={`flex flex-col gap-2  ${width}`}>
      {title && (
        <label className={`text-xs w-full px-1  ${align}`}>{align == "text-start" ? title + " :" : ": " + title}</label>
      )}
      <input
      ref={inputRef}
        {...(isPrice ? { onChange: promiseGetValue } : { onChange: onChange })}
        disabled={disabled}
        className={` ${EnumVarient(
          status
        )}  ${align} peer ${height} text-black text-xs rounded relative px-2 ${className}`}
        onInvalid={(e) => {
          if (e.target.validity.valueMissing) {
            e.target.setCustomValidity("لطفا این قسمت را پر کنید");
          }
        }}
        onInput={(e) => e.target.setCustomValidity("")}
        {...rest}
      />
    </div>
  );
};
