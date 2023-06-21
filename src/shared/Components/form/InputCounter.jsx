import { setCountGoods } from "@slices/Discount/countGoods";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";

const InputCounter = ({
  label,
  width = "",
  buttonsWidth = "w-[18px] md:w-6",
  btnVarient = "bgWhite",
  buttonHeight = "h-[18px] md:h-6",
  iconClassNamePlus = "",
  iconClassNameMinus = "",
  btnVarientPlus = "",
  btnVarientMinus = "",
  border,
  option,
  setValue,
}) => {
  const [count, setCount] = useState(null);
  const dispatch = useDispatch();
  const countGoods = useSelector((state) => state.countGoods.value);

  // console.log(option);
  // const onClickHandler = (e,type) => {
  //   e.stopPropagation()
  //   return {
  //     increase: setCount((prev) => prev + 1),
  //     decrease: count > 0 ? setCount((prev) => prev - 1) : undefined,
  //   }[type];
  // };
  const increaseHandler = (e) => {
    e.stopPropagation();
    setCount(count + 1);
    // if (count == null) {
    //   option.selectOption({ count: count + 1, value: option.value, label: option.label });
    // }
    dispatch(
      setCountGoods([
        ...countGoods?.filter((item) => item.value != option.value),
        { count: count + 1, value: option.value, label: option.title },
      ])
    );
  };
  useEffect(() => {
    countGoods?.map((item) => {
      if (item.value === option.value) {
        setCount(item.count);
      }
    });
  }, []);

  const decreaseHandler = (e) => {
    e.stopPropagation();
    if (count > 0) {
      setCount(count - 1);
      dispatch(
        setCountGoods([
          ...countGoods?.filter((item) => item.value != option.value),
          { count: count - 1, value: option.value, label: option.title },
        ])
      );

      // setCountParent([...countParent, { count: count - 1 , id: option.value }]);
      // setCountParent((prev) => prev - 1);
    }
    // if (+count === 1) {
    //   console.log(count);
    //   option.selectOption({ count: count + 1, value: option.value, label: null });
    // }
  };

  return (
    <div
      className={`z-50 flex w-[107px] md:w-[113px] h-[26px] md:h-[32px] justify-between items-center ${width} p-1 ${
        border ? "border border-primary rounded-[2px]" : ""
      }`}
    >
      <Button
        varient={btnVarientPlus}
        width={buttonsWidth}
        height={buttonHeight}
        icon={`fi fi-rr-plus  text-small  ${iconClassNamePlus}`}
        onClick={increaseHandler}
        className={"flex items-center h-1 justify-center rounded-lg border drop-shadow-sm"}
      ></Button>
      <p className="text-primary text-xs">
        {count ?? 0} {label}
      </p>
      <Button
        varient={btnVarientMinus}
        width={buttonsWidth}
        height={buttonHeight}
        icon={`fi fi-sr-minus text-small ${iconClassNameMinus}`}
        onClick={decreaseHandler}
        className={"flex items-center h-1 justify-center rounded-lg border drop-shadow-sm"}
      ></Button>
    </div>
  );
};

export default InputCounter;
