import { Button } from "@components/Button";
import { CheckBox } from "@components/form";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import "react-multi-date-picker/styles/layouts/mobile.css";
// const DatePicker = dynamic(() => import("react-multi-date-picker"), {
//   ssr: false,
// });
// const Calendar = dynamic(() => import("react-multi-date-picker"), {
//   ssr: false,
// });
const TimePicker = dynamic(() => import("react-multi-date-picker/plugins/time_picker"), {
  ssr: false,
});
const InputIcon = dynamic(() => import("react-multi-date-picker/components/input_icon"), {
  ssr: false,
});
// Styles
import Styles from "./form.module.css";
import { useSelector } from "react-redux";
import InputDatePickerCustom from "./InputDatePickerCustom";
import { e2p, isEmptyValue, p2e, toForeignLocale, toShamsiDate } from "src/utils";
import { SetAannouhcemertTimePopUp } from "./CustomTimePicker";

export const DatePickerCustom = ({
  title,
  width = "w-full lg:w-52",
  disabled = false,
  key = "TimePicker",
  name,
  type = "normal",
  checked = false,
  defaultCheck = false,
  withoutTime = false,
  minDateToday = false,
  startTimeNow = false,
  reset = false,
  disabledOutSide = false,
  handleGetDate = () => {},
  handleGetDateWithTime = () => {},
  getValueHandler = () => {},
  shouldGetValueHandler = false,
  defaultValue = [],
  customMinDate,
  initializeDependence,
  placeholderInputCustom = "",
  persianDateEnNumber = false,
  outline = false,
  portal,
  ...rest
}) => {
  const [value, setValue] = useState({});
  const { datePicker, datePickerDisable } = Styles;
  const [checkBox, setCheckBox] = useState(false);
  const [startTimeNowChecked, setStartTimeNowChecked] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [hour, setHour] = useState(24);
  const datePickerRef = useRef();

  const pHour = hour == 24 ? new Number("0").toLocaleString("fa-ir") : new Number(hour).toLocaleString("fa-ir");
  const pMinutes = new Number(minutes).toLocaleString("fa-ir");
  const controlledHour = hour == 24 ? 0 : hour;
  const convert = (date, format = value.format) => {
    let object = { date, format };
    setValue({
      gregorianToCompare: new DateObject(object).convert(gregorian, gregorian_en).format("YYYY/MM/DD"),
      gregorian: new DateObject(object).convert(gregorian, gregorian_en).format("YYYY-MM-DD"),
      persian: new DateObject(object).format("YYYY-MM-DD") + `T${hour}:${minutes}:00.000Z`,
      gregorianWithTime:
        new DateObject(object).convert(gregorian, gregorian_en).format("YYYY-MM-DD") +
        `T${controlledHour > 10 ? controlledHour : "0" + controlledHour}:${
          minutes > 10 ? minutes : minutes + "0"
        }:00.000Z`,
      timeToShow:
        new DateObject(object).format("YYYY-MM-DD") +
        ` ${p2e(pHour) > 10 ? pHour : toForeignLocale(0) + pHour}:${
          p2e(pMinutes) > 10 ? pMinutes : toForeignLocale(0) + pMinutes
        }`,
      persianToCompare: new DateObject(object).format("YYYY/MM/DD"),
      jsDate: date.toDate(),
      ...object,
    });

    handleGetDate(new DateObject(object).convert(gregorian, gregorian_en).format(), name);
    handleGetDateWithTime(
      new Date(
        new DateObject(object).convert(gregorian, gregorian_en).year,
        new DateObject(object).convert(gregorian, gregorian_en).month.index,
        new DateObject(object).convert(gregorian, gregorian_en).day
      ),
      name
    );
  };
  const { resetStatus } = useSelector((state) => state.resetSearchFiled);
  useEffect(() => {
    if (resetStatus || reset) {
      setValue({});
    }
  }, [resetStatus, reset]);
  useMemo(() => {
    if (disabled) {
      setValue({});
    }
  }, [disabled]);

  const inputRef = useRef(null);

  const makeActiveHandler = async (e) => {
    setValue({});
    inputRef.current.value = "";
    await setCheckBox(e.target.checked);
    checkBox ? "datePickerRef.current.closeCalendar()" : datePickerRef.current.openCalendar();
  };
  useEffect(() => {
    if (disabled) {
      inputRef.current.value = "";
    }
  }, [disabled]);
  const handleInitilaze = () => {
    if (defaultValue?.length > 0) {
      if (!withoutTime) {
        var slide = defaultValue.split("T");
        const time = slide[1].split(":");
        var convertTime = time[0] + ":" + time[1];
      }

      setValue({
        date: new Date(defaultValue),
        gregorian: slide[0],
        gregorianWithTime: defaultValue,
        timeToShow:
          new DateObject(defaultValue).convert(persian, persian_fa).format("YYYY/MM/DD") + " " + e2p(convertTime),
      });
    }
  };
  useMemo(() => {
    setCheckBox(defaultCheck);
    return handleInitilaze();
  }, [initializeDependence]);

  if (shouldGetValueHandler) {
    getValueHandler(value);
  }

  const startTimeNowHandler = (e) => {
    setStartTimeNowChecked(e.target.checked);
  };


  return (
    <div className={`flex flex-col gap-2.5 ${width}`}>
      {checked && (
        <CheckBox
          onClick={(e) => {
            makeActiveHandler(e);
          }}
          checked={checkBox}
          title={title}
        />
      )}
      {startTimeNow && (
        <CheckBox
          name={"isStartNow"}
          onChange={(e) => {
            startTimeNowHandler(e);
          }}
          defaultChecked={startTimeNowChecked}
          title={title}
        />
      )}
      <div className={`${[datePicker, checkBox ? datePickerDisable : datePicker].join(" ")} ${width}`}>
        {checked || startTimeNow ? (
          ""
        ) : (
          <div className="flex">
            <p className="text-xs text-color">{title}</p>
          </div>
        )}
        <DatePicker
          minDate={customMinDate}
          editable={false}
          ref={datePickerRef}
          day
          render={(defaultValue, openCalendar) => (
            <InputDatePickerCustom
              reset={reset}
              disabled={checked ? !checkBox : startTimeNow ? startTimeNowChecked : false}
              name={name}
              value={value.timeToShow}
              setValue={setValue}
              setHour={setHour}
              setMinutes={setMinutes}
              openCalendar={openCalendar}
              placeholder={placeholderInputCustom}
              outline
            />
          )}
          onChange={convert}
          format={withoutTime ? "YYYY/MM/DD" : "HH:mm YYYY/MM/DD"}
          // plugins={withoutTime ? [] : [<TimePicker hideSeconds position="bottom" key={key} />]}
          plugins={withoutTime ? [] : [<SetAannouhcemertTimePopUp setMinutes={setMinutes} setHour={setHour} />]}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          className={"rmdp-mobile"}
          value={value.date}
          disabled={checked ? !checkBox : startTimeNow ? startTimeNowChecked : false}
          mobileLabels={{
            OK: "تایید",
            CANCEL: "بستن",
          }}
          portal={portal}
          // mobileLabels={{
          //   OK: "تایید",
          //   CANCEL: "لغو",
          // }}

          // mobileButtons={[
          //   {
          //     label: "RESET",
          //     type: "button",
          //     className: "rmdp-button rmdp-action-button",
          //     onClick: () => setValue({}),
          //   },
          // ]}
        >
          {/* <button
            className="mx-4"
            onClick={(e) => datePickerRef.current.closeCalendar()}
          >
            تایید
          </button>

          <button
            className="mx-4"
            onClick={(e) => {
              setValue();
              datePickerRef.current.closeCalendar();
            }}
          >
            لغو
          </button> */}
        </DatePicker>
        <input
          ref={inputRef}
          className="hidden"
          readOnly
          value={withoutTime ? value.gregorian : value.gregorianWithTime}
          name={name}
        />
      </div>
    </div>
  );
};
