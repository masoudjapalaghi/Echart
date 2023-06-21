import { value } from "@slices/TypeSellsOrder/contentTypeSalsOrder";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { emptyObj, p2e, toGregorianDate, toShamsiDate } from "src/utils";
import { fte } from "src/utils/Fatools";
import { DatePickerCustom } from ".";
import { isEmptyValue } from "src/utils";
import persian from "react-date-object/calendars/persian";
import { DateObject } from "react-multi-date-picker";
export const TimeSpanDatePicker = ({
  startTimeTitle = "تاریخ شروع :",
  endTimeTitle = "زمان پایان :",
  stratTimeName,
  endTimeName,
  defaultValueStart = "",
  defaultValueEnd = "",
  startDisable,
  startDisabledOutSide,
  checkedEndTime,
  defaultOptions = {},
  startTimeNow,
  minDateToday,
  withoutTime = false,
  compareValueHandler = false,
  flexWrap = false,
  ...rest
}) => {
  const [baseDate, setBaseDate] = useState();
  const [startDayValue, setStartDayValue] = useState();
  const [endDayValue, setEndDayValue] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [reset, setReset] = useState(false);
  const [minDateCustomStart, setMinDateCustomStart] = useState();
  const [minDateCustomEnd, setMinDateCustomEnd] = useState();
  // console.log(defaultOptions[stratTimeName])

  const secondsToMidnight = (n) => {
    return (24 - n.getHours() - 1) * 60 * 60 + (60 - n.getMinutes() - 1) * 60;
  };
  const shouldGetStartValueHandler = (value) => {
    let time = new Date(value.gregorianToCompare);
    const timeToSecounds = secondsToMidnight(time);
    if (value.persian) {
      const baseDate = p2e(value.persianToCompare);
      const startDaySplit = value?.persian.split("T")[0];
      const splitToDay = startDaySplit.split("-")[2];
      const startDayValue = p2e(splitToDay);
      setStartDayValue(+startDayValue);
      setStartTime(timeToSecounds);
      setBaseDate(baseDate);
    }
  };
  const shouldGetEndValueHandler = (value) => {
    let time = new Date(value.gregorianToCompare);
    const timeToSecounds = secondsToMidnight(time);
    if (value.persian) {
      const startDaySplit = value?.persian.split("T")[0];
      const splitToDay = startDaySplit.split("-")[2];
      const endDayValue = p2e(splitToDay);
      setEndTime(timeToSecounds);
      setEndDayValue(+endDayValue);
    }
  };

  useEffect(() => {
    if (startTime <= endTime && startDayValue == endDayValue) {
      setEndDayValue(null);
      setEndTime(null);
      setReset(true);
    } else if (startTime > endTime && startDayValue !== endDayValue) {
      setReset(false);
    }
  }, [endDayValue, endTime, startDayValue, endDayValue]);

  useEffect(() => {
    if (startTime <= endTime && startDayValue == endDayValue) {
      setReset(true);
      setMinDateCustomStart()
      setMinDateCustomEnd()
      toast.warning("زمان پایان زودتر از زمان شروع است", {
        toastId: "datePicker",
      });
    } else {
      setReset(false);
    }
  }, [endTime, endDayValue, startTime, startDayValue]);
  useEffect(() => {
    if (
      isEmptyValue(defaultValueStart) &&
      isEmptyValue(endDayValue) &&
      isEmptyValue(startDayValue)
    ) {
      setMinDateCustomStart(
        new DateObject({ calendar: persian }).set(
          "day",
          new DateObject({ calendar: persian }).day
        )
      );

      setMinDateCustomEnd(
        new DateObject({ calendar: persian }).set(
          "day",
          new DateObject({ calendar: persian }).day
        )
      );
    } 
    if (!isEmptyValue(startDayValue)) {
      setMinDateCustomEnd(baseDate);
    }
  }, [endTime, endDayValue, startTime, startDayValue]);

  useEffect(() => {
    if (isEmptyValue(startDayValue)) {
      setMinDateCustomEnd(null);
    }
  }, [startDayValue, startTime]);

  useEffect(() => {
    if (!isEmptyValue(defaultValueStart) && !isEmptyValue(defaultValueEnd)) {
      const timeStart = defaultValueStart
        .split("T")[0]
        .replace("-", "/")
        .replace("-", "/");
      const timeStartToShamsi = p2e(toShamsiDate(timeStart));
      const timeEnd = defaultValueEnd
        .split("T")[0]
        .replace("-", "/")
        .replace("-", "/");
      const timeEndToShamsi = p2e(toShamsiDate(timeEnd));
      setMinDateCustomEnd(timeEndToShamsi);
      setMinDateCustomStart(timeStartToShamsi);
    }if (!isEmptyValue(defaultValueStart)) {
      const splitValueStart = defaultValueStart.split("T")[0].replace("-", "/")
      .replace("-", "/")
      const persian2e=p2e(toShamsiDate(splitValueStart))
      setMinDateCustomStart(persian2e);
    }if(!isEmptyValue(defaultValueEnd)){
      const splitValueEnd = defaultValueEnd.split("T")[0].replace("-", "/")
      .replace("-", "/")
      const persian2e=p2e(toShamsiDate(splitValueEnd))
      setMinDateCustomEnd(persian2e);
    }
  }, [defaultValueStart, defaultValueEnd]);
  // defaultValueStart
  // defaultValueEnd
  return (
    <div
      className={`flex flex-col  gap-4 lg:flex-row w-full ${
        flexWrap ? "flex-wrap lg:flex-col" : ""
      } lg:w-auto ${checkedEndTime ? "items-end" : ""}`}
    >
      <DatePickerCustom
        withoutTime={withoutTime}
        name={stratTimeName}
        persianDateEnNumber
        title={startTimeTitle}
        disabled={startDisable}
        disabledOutSide={startDisabledOutSide}
        placeholderInputCustom={"شروع از همین لحظه"}
        startTimeNow={startTimeNow}
        customMinDate={minDateToday ? minDateCustomStart : null}
        shouldGetValueHandler={compareValueHandler}
        getValueHandler={shouldGetStartValueHandler}
        defaultValue={defaultValueStart}
        defaultCheck={defaultOptions?.stratTimeName?.length > 0 ? true : false}
        {...rest}
      />
      <DatePickerCustom
        withoutTime={withoutTime}
        customMinDate={
          compareValueHandler && !withoutTime ? minDateCustomEnd : null
        }
        checked={checkedEndTime}
        reset={reset}
        shouldGetValueHandler={compareValueHandler}
        getValueHandler={shouldGetEndValueHandler}
        title={endTimeTitle}
        defaultValue={defaultValueEnd}
        defaultCheck={defaultOptions?.endTimeName?.length > 0 ? true : false}
        name={endTimeName}
        {...rest}
      />
    </div>
  );
};
