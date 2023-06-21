import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { emptyArray, uuid } from "src/utils";

export const InputCreatable = ({
  name,
  title = "مقادیر",
  width = "w-full",
  handleChange = () => {},
  defaultValue,
  ...rest
}) => {
  const [values, setValues] = useState([]);
  const inputRef = useRef(null);
  const handleFocusClick = () => {
    inputRef.current.focus();
  };
 
  const handleAdd = (e) => {
    e.preventDefault();
    const item = {
      id: uuid(),
      label: e.target.label.value,
    };
    setValues((prev) => [...prev, item]);
    e.target.reset();
  };
  const handleDelete = (id) => {
    if (defaultValue) {
      const newDefaultValue = values.filter((item) => {
        return item.id != id;
      });
      setValues(newDefaultValue);
    } else {
      const filterDelete = values.filter((item) => item.id !== id);
      setValues(filterDelete);
    }
  };
  useEffect(() => {
    if (defaultValue) {
      const items = defaultValue.map((item) => {
        return { label: item, id: uuid() };
      });
      setValues(items);
    }
  }, [defaultValue]);

  useMemo(() => {
    if (!emptyArray(values)) {
      handleChange(values);
    }
  }, [values]);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs w-full px-1  text-start">{title} :</label>
      <form
        onSubmit={handleAdd}
        onClick={handleFocusClick}
        className={`h-auto min-h-[165px] ${width} bg-white p-3 max-h-48 overflow-y-auto`}
      >
        <div className="flex flex-wrap gap-2 rounded-sm">
          {values.map((item) => {
            return (
              <div
                key={item.id}
                className="flex gap-2 bg-bg text-black p-1 rounded-sm"
              >
                <i
                  className="fi fi-rr-cross-small bg-white px-1"
                  onClick={() => handleDelete(defaultValue ? item.id : item.id)}
                />
                <span>{defaultValue ? item.label : item.label}</span>
              </div>
            );
          })}
          <input
            name="label"
            required
            className={`focus:invalid:outline-0 focus:outline-0 `}
            ref={inputRef}
          />
          {/* <input name={name} className="hidden" value={valuesInput} {...rest} /> */}
        </div>
        <button className="hidden" />
      </form>
    </div>
  );
};
