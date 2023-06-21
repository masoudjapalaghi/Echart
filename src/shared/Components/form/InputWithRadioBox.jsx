import { useMemo } from "react";
import { toast } from "react-toastify";
import { Input, RadioBox } from ".";

export const InputWithRadioBox = ({
  titlesRadio = [],
  nameRadio = "saleCheck",
  nameInput = "",
  titleInput = "",
  data,
  setData,
  radioBox,
  setRadioBox,
  defaultValue,
}) => {
  useMemo(() => {
    setData({ ...data, [titleInput.en]: null });
  }, [data.amountTypeId]);
  return (
    <div className="flex flex-wrap flex-1 md:flex-nowrap gap-4 ">
      <div className="flex md:items-center md:justify-around mt-4  md:mb-0">
        <RadioBox
          name={nameRadio}
          title={titlesRadio[0].nameType}
          checked={radioBox.countStop}
          onChange={(e) => {
            setData({ ...data, amountTypeId: titlesRadio[0].amountType });
            setRadioBox({ countStop: true, percentStop: false });
          }}
        />
        <RadioBox
          name={nameRadio}
          title={titlesRadio[1].nameType}
          checked={radioBox.percentStop}
          onChange={(e) => {
            setData({ ...data, amountTypeId: titlesRadio[1].amountType });
            setRadioBox({ countStop: false, percentStop: true });
          }}
        />
      </div>
      <div className="w-full lg:w-[200px]">
        <Input
          title={titleInput.fa}
          width={"w-full lg:w-[200px]"}
          name={nameInput}
          value={data[titleInput.en]}
          defaultValue={defaultValue}
          onChange={(e) => {
            const amount = e.target.value;
            if ((+amount > 100 && +data.amountTypeId === 321) || (+data.amountTypeId === 324 && +amount > 100)) {
              toast.info("مقدار وارد شده باید کمتر از 100 درصد باشد .", { toastId: amount });
            } else {
              !isNaN(+e.target.value) ? setData({ ...data, [titleInput.en]: +e.target.value }) : null;
            }
          }}
        />
      </div>
    </div>
  );
};
