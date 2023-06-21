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
import InputCounter from "./InputCounter";
import { useDispatch, useSelector } from "react-redux";
import { setCountGoods } from "@slices/Discount/countGoods";
import { useRouter } from "next/router";

export const InputSelectAsyncWithStepper = ({
  title,
  direction = "flex-col",
  items = "items-start",
  disabled = false,
  menuPlacement = "bottom",
  isMulti = false,
  required = false,
  name = "",
  width = "w-full min-w-[200px]  lg:w-auto",
  reset = false,
  outline = false,
  optionsDefaultValue = [],
  initializeDependence,
  handleChange = () => {},
  ...rest
}) => {
  const md = useMediaQuery("mdUp");
  const [value, setValue] = useState([]);
  const [defaultOption, setDefaultOption] = useState([]);
  const { isReady } = useRouter();

  //redux
  const dispatch = useDispatch();
  const countGoods = useSelector((state) => state.countGoods.value);
  const handleChangeInputSelect = (e) => {
    if (e !== null) {
      if (isMulti) {
        if (e.length == 0) {
          dispatch(setCountGoods([]));
        }
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
      (u) => !isEmptyValue(u) && { value: u.value, label: u.title, count: u.count }
    );
    var initializeValue = optionsDefaultValueSerialized.map((u) => !isEmptyValue(u) && u.value);
    setValue(optionsDefaultValueSerialized);
    setDefaultOption(initializeValue);
  };
  useMemo(() => {
    return handleInitilaze();
  }, [initializeDependence]);

  const saveCount = (count, id) => {
    setValue({ ...value, [id]: count });
  };

  const MultiValue = (props) => {
    const countGoods = useSelector((state) => state.countGoods.value);
    const count = countGoods.filter((item) => item.value == props.data.value)[0]?.count;
    return (
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
        <span>({count ? count : 0})</span>
      </components.MultiValue>
    );
  };

  const MultiValueRemove = (props) => {
    return (
      <components.MultiValueRemove
        {...props}
        onClick={(e) => {
          e.stopPropagation();
          const removeItem = countGoods.filter((item) => {
            return item.value != props.data.value;
          });
          dispatch(setCountGoods(removeItem));
        }}
      >
        <div>
          <i className="fi fi-sr-cross text-small"></i>
        </div>
      </components.MultiValueRemove>
    );
  };

  const handleInputCounter = () => {};

  const Option = (props) => {
    // ***FOR PERFORMANCE Disable onMouseMove and onMouseOver events
    // const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    // const newProps = { ...props, innerProps: rest };
    // ***FOR PERFORMANCE Disable onMouseMove and onMouseOver events
    return (
      <div>
        <components.Option {...props}>
          <div className="flex justify-between">
            <div>
              <label>{props.label}</label>
            </div>
            <InputCounter option={props} handleInputCounter={handleInputCounter} value={value} setValue={setValue} />
          </div>
        </components.Option>
      </div>
    );
  };
  const selectInputRef = useRef();
  const onClear = () => {
    selectInputRef.current.clearValue();
    setValue([]);
  };
  useEffect(() => {
    if (reset) {
      onClear();
    }
  }, [reset]);
  const setting = isMulti ? { Option, MultiValue, MultiValueRemove } : {};
  // const handleWidth = isMulti ? "w-full lg:min-w-[208px] lg:w-auto" : width;

  return (
    <div className={`${width} flex ${direction} gap-2 justify-start ${items}`}>
      {title && <label className="text-start text-[#404040] text-xs  whitespace-nowrap w-14">{title} : </label>}
      <AsyncSelect
        ref={selectInputRef}
        menuPlacement={menuPlacement}
        components={setting}
        styles={customStyles(md, disabled, outline)}
        classNamePrefix="select"
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
        menuPortalTarget={isReady && document.body}
        filterOption={createFilter({ ignoreAccents: false })}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
      <input className="hidden" name={name} value={defaultOption} data-label={value.label} readOnly />
    </div>
  );
};
