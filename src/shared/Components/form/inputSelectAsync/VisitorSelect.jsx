import { useState } from "react";
// ApiCall
import { useFetching } from "@services/axiosHelper";
import { CrmProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const VisitorSelect = ({ title = "بازاریاب", reset, ...rest }) => {
  const [resetVisitor, setResetVisitor] = useState(false);

  const { cityId, provinceId } = useSelector((state) => state.provinceCity);
  const { resetStatus } = useSelector((state) => state.resetSearchFiled);

  const { VisitorSelect, isLoading, isFetched, refetch, remove } = useFetching(
    ["VisitorSelect"],
    () => {
      const parmas = { areaId: provinceId, cityId };
      return CrmProxy.getVisitorSelect(parmas);
    },
    {
      enabled: false,
    }
  );

  // console.log(cityId, provinceId)

  useEffect(() => {
    if ((cityId, provinceId)) {
      remove();
      setResetVisitor(true);
    }
  }, [cityId, provinceId]);

  useEffect(() => {
    if (isFetched) {
      setResetVisitor(false);
    }
  }, [isFetched, resetVisitor]);

  let options =
    VisitorSelect.status === 1
      ? VisitorSelect.entity.map((u) => ({ value: u.id, label: u.title, typeId: u.typeId }))
      : [];
  const restartVisitorDelect = () => {
    refetch();
  };
  return (
    <>
      <InputSelect
        options={options}
        isLoading={VisitorSelect && isLoading}
        title={title}
        onFocus={restartVisitorDelect}
        reset={resetStatus || resetVisitor}
        {...rest}
      />
    </>
  );
};
