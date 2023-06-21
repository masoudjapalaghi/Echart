import { useState } from "react";
// ApiCall
import { useFetching } from "@services/axiosHelper";
import { CrmProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const LeadersSelect = ({ title = "لیدر", reset, ...rest }) => {
  const [resetVisitor, setResetVisitor] = useState(false);

  const { cityId, provinceId } = useSelector((state) => state.provinceCity);
  const { resetStatus } = useSelector((state) => state.resetSearchFiled);
  const { LeadrsSelect, isLoading, isFetched, refetch, remove } = useFetching(
    ["LeadrsSelect"],
    () => {
      const parmas = { areaId: provinceId, cityId };
      return CrmProxy.getLeadsSelect(parmas);
    },
    {
      enabled: false,
    }
  );

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
    LeadrsSelect.status === 1
      ? LeadrsSelect.entity.map((u) => ({ value: u.id, label: u.title, typeId: u.typeId }))
      : [];
  const restartVisitorDelect = () => {
    refetch();
  };
  return (
    <>
      <InputSelect
        options={options}
        isLoading={LeadrsSelect && isLoading}
        title={title}
        onFocus={restartVisitorDelect}
        reset={resetStatus || resetVisitor}
        {...rest}
      />
    </>
  );
};
