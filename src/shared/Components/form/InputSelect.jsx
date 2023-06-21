import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { components, createFilter } from "react-select";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
// Utils
import { isEmptyValue } from "src/utils";
// Hooks
import { useMediaQuery } from "@hooks/useMediaQuery";
// Components
import { Spinner } from "@components/Loading";
// Styles
import { customStyles } from "./InputselectStyle";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setInitializeFirstIndex } from "@slices/CustomGroupDefault/customGroupDefault";

export const InputSelect = ({
  title,
  extraClassName,
  extra = "",
  direction = "flex-col",
  items = "items-start",
  disabled = false,
  menuPlacement = "bottom",
  isMulti = false,
  required = false,
  name = "",
  width = "w-full lg:w-52",
  reset = false,
  outline = false,
  optionsDefaultValue = [],
  initializeDependence,
  options = [],
  titleWidth = "w-14",
  hasPropertyAll,
  handleChange = () => {},
  selectFirstIndex,
  isFetched = false,
  ...rest
}) => {
  const md = useMediaQuery("mdUp");
  const { isReady } = useRouter();
  const [value, setValue] = useState([]);
  const [defaultOption, setDefaultOption] = useState([]);
  const dispatch = useDispatch();
  const handleChangeInputSelect = (e) => {
    if (e !== null) {
      if (isMulti) {
        const multivalue = e.map((item, i) => {
          return e[i].value;
        });
        setValue(e);
        setDefaultOption(multivalue.join());
      } else {
        setValue(e);
        setDefaultOption(e.value);
      }
    }
    handleChange(e);
  };

  const addPropertyAll = [{ label: "همه", value: 0 }, ...options];

  const handleInitilaze = () => {
    var optionsDefaultValueSerialized = optionsDefaultValue.map(
      (u) => !isEmptyValue(u) && { value: u.id, label: u.title }
    );
    var initializeValue = optionsDefaultValueSerialized.map((u) => !isEmptyValue(u) && u.value);
    setValue(optionsDefaultValueSerialized);
    setDefaultOption(initializeValue);
  };
  useMemo(() => {
    handleInitilaze();
  }, [initializeDependence]);

  const MultiValue = (props) => {
    return (
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
      </components.MultiValue>
    );
  };
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked={props.isSelected} onChange={(e) => null} />
            <label>{props.label}</label>
          </div>
        </components.Option>
      </div>
    );
  };
  const selectInputRef = useRef();

  const { resetStatus } = useSelector((state) => state.resetSearchFiled);
  const onClear = () => {
    selectInputRef.current.retry();
    setValue([]);
    setDefaultOption([]);
  };
  useEffect(() => {
    if (resetStatus || reset) {
      onClear();
    }
  }, [resetStatus || reset]);

  const setting = isMulti ? { Option, MultiValue, LoadingIndicator: null } : { LoadingIndicator: null };
  const handleWidth = isMulti ? "w-full lg:min-w-[208px] lg:w-auto" : width;

  useEffect(() => {
    if (selectFirstIndex) {
      setValue(options[0]);
      setDefaultOption(options[0]?.value);
      dispatch(setInitializeFirstIndex(options[0]));
    }
  }, [isFetched]);
  return (
    <div className={`${handleWidth} flex ${direction} gap-2 justify-start ${items}`}>
      <div className="flex">
        {title && (
          <label className={`text-start text-[#404040] text-xs  whitespace-nowrap ml-3 ${titleWidth} `}>
            {title} :{" "}
          </label>
        )}
        {isEmptyValue(extra) ? null : (
          <p className={`text-start text-[#404040] text-xs  whitespace-nowrap ml-3 ${extraClassName}`}>{extra}</p>
        )}
      </div>

      <Select
        ref={selectInputRef}
        menuPlacement={menuPlacement}
        styles={customStyles(md, disabled, outline)}
        components={setting}
        placeholder="جستجو کنید"
        isRtl
        isDisabled={disabled}
        noOptionsMessage={(e) => (e.inputValue ? `برای ${e.inputValue} موردی یافت نشد !` : <div>جستجو کنید ! </div>)}
        hideSelectedOptions={false}
        onChange={handleChangeInputSelect}
        value={value}
        loadingMessage={() => (
          <div className="flex justify-center items-center gap-2">
            در حال دریافت اطلاعات <Spinner />
          </div>
        )}
        filterOption={createFilter({ ignoreAccents: false })}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        {...rest}
        options={hasPropertyAll ? addPropertyAll : options}
        menuPortalTarget={isReady && document.body}
      />
      <input className="hidden" name={name} value={defaultOption} data-label={value?.label} readOnly />
    </div>
  );
};
