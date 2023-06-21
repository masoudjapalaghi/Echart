import { data } from "autoprefixer";
import { useMemo } from "react";
import { useState } from "react";
import { Input, CheckBox } from ".";

export const PriceRange = ({
  width = "w-full",
  className = "",
  startPriceName = "",
  endPriceName = "",
  data,
  setData,
  defaultStartPriceBox = true,
  defaultEndPriceBox = true,
}) => {
  const [startPriceBox, setStartPriceBox] = useState(defaultStartPriceBox);
  const [endPriceBox, setEndPriceBox] = useState(defaultEndPriceBox);

  useMemo(() => {
    setStartPriceBox(defaultStartPriceBox);
    setEndPriceBox(defaultEndPriceBox);
  }, [defaultStartPriceBox, defaultEndPriceBox]);

  return (
    <div className={`flex flex-wrap gap-4 ${width} ${className}`}>
      <div className="flex flex-col items-center w-full gap-2 md:w-[200px] ">
        <div className="w-full md:w-[200px]">
          <CheckBox
            onClick={() => {
              setStartPriceBox(!startPriceBox);
            }}
            checked={!startPriceBox}
            title={"از مبلغ :"}
          />
        </div>
        <Input
          disabled={startPriceBox}
          name={startPriceName}
          value={data.from}
          onChange={(e) => (!isNaN(+e.target.value) ? setData({ ...data, from: +e.target.value }) : null)}
          width={"w-full lg:w-[200px]"}
        />
      </div>
      <div className="flex flex-col items-center w-full gap-2 md:w-[200px] ">
        <div className="w-full md:w-[200px]">
          <CheckBox
            onClick={() => {
              setEndPriceBox(!endPriceBox);
            }}
            checked={!endPriceBox}
            title={"تا مبلغ :"}
          />
        </div>
        <Input
          disabled={endPriceBox}
          name={endPriceName}
          value={data.to}
          onChange={(e) => (!isNaN(+e.target.value) ? setData({ ...data, to: +e.target.value }) : null)}
          width={"w-full lg:w-[200px]"}
        />
      </div>
    </div>
  );
};
