import { useState } from "react";
import { allAreTrue, emptyArray } from "src/utils";
// Utils

export const useForm = (options) => {
  const [fields, setFields] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState([]);
  const handleOnInput = (e) => {};
  if (typeof window !== "undefined") {
    // console.log(options.ref);
  }

  const handleChange =
    (key, selectvalue = false, withoutTimeOut, sanitizeFn) =>
    (e) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : selectvalue ? e.value : e.target.value;
      const timeOut = selectvalue || withoutTimeOut ? 0 : 2000;
      setTimeout(() => {
        setFields({
          ...fields,
          [key]: value,
        });

        const allFilds = document.querySelector("form");

        const filterRquiredInput = allFilds.querySelectorAll("input[required]");
        const newArray = Array.from(filterRquiredInput).map((item, index) => {
          return item.value.length > 0;
        });
        setVisible(newArray);
      }, timeOut);
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = fields[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    fields,
    handleChange,
    handleSubmit,
    handleOnInput,
    errors,
    visible: emptyArray(visible) ? false : allAreTrue(visible),
  };
};
