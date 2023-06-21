import { useEffect, useRef, useMemo, useState } from "react";
import { components, createFilter } from "react-select";
import AsyncSelect from "react-select/async";
// Utils
import { isEmptyValue } from "src/utils";
// Hooks
import { useMediaQuery } from "@hooks/useMediaQuery";
// Components
import { Spinner } from "@components/Loading";
// Styles
import { customStyles } from "./InputselectStyle";
import { useRouter } from "next/router";

const InputSelectAsync = ({
  title,
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
  handleChange = () => {},
  ...rest
}) => {
  const md = useMediaQuery("mdUp");
  const {isReady}=useRouter()
  const [value, setValue] = useState([]);
  const [defaultOption, setDefaultOption] = useState([]);
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
      handleChange(e);
    }
  };
  const handleInitilaze = () => {
    var optionsDefaultValueSerialized = optionsDefaultValue.map(
      (u) => !isEmptyValue(u) && { value: u.id, label: u.title }
    );
    var initializeValue = optionsDefaultValueSerialized.map((u) => !isEmptyValue(u) && u.value);
    setValue(optionsDefaultValueSerialized);
    setDefaultOption(initializeValue);
  };
  useMemo(() => {
    return handleInitilaze();
  }, [initializeDependence]);

  const MultiValue = (props) => {
    return (
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
      </components.MultiValue>
    );
  };
  const Option = (props) => {
    // ***FOR PERFORMANCE Disable onMouseMove and onMouseOver events
    // const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    // const newProps = { ...props, innerProps: rest };
    // ***FOR PERFORMANCE Disable onMouseMove and onMouseOver events
    return (
      <div>
        <components.Option {...props}>
          <input type="checkbox" checked={props.isSelected} onChange={(e) => null} /> <label>{props.label} </label>
        </components.Option>
      </div>
    );
  };
  const selectInputRef = useRef();
  const onClear = () => {
    // console.log(selectInputRef.current.clearValue)
    selectInputRef.current.clearValue();
    setValue([]);
  };
  useEffect(() => {
    if (reset) {
      onClear();
    }
  }, [reset]);
  const setting = isMulti ? { Option, MultiValue } : {};
  const handleWidth = isMulti ? "w-full lg:min-w-[208px] lg:w-auto" : width;

  return (
    <div className={`${handleWidth} flex ${direction} gap-2 justify-start ${items}`}>
      {title && <label className="text-start text-[#404040] text-xs  whitespace-nowrap w-14">{title} : </label>}
      <AsyncSelect
        ref={selectInputRef}
        menuPlacement={menuPlacement}
        components={setting}
        styles={customStyles(md, disabled, outline)}
        classNamePrefix="select"
        isDisabled={disabled}
        {...rest}
        loadingMessage={() => (
          <div className="flex justify-center items-center gap-2">
            در حال دریافت اطلاعات <Spinner />
          </div>
        )}
        placeholder="جستجو کنید ..."
        noOptionsMessage={(e) => (e.inputValue ? `برای ${e.inputValue} موردی یافت نشد !` : <div>جستجو کنید ! </div>)}
        isMulti={isMulti}
        onChange={handleChangeInputSelect}
        value={value}
        filterOption={createFilter({ ignoreAccents: false })}
        closeMenuOnSelect={!isMulti}
        hideSelectedOptions={false}
        menuPortalTarget={isReady && document.body}
      />
      <input className="hidden" name={name} value={defaultOption} data-label={value.label} readOnly />
    </div>
  );
};

export default InputSelectAsync;
