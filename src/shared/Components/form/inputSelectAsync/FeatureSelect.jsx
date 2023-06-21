// ApiCall
import { useFetching } from "@services/axiosHelper";
import { FeatureProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";

export const FeatureSelect = ({ title = "نوع ویژگی", ...rest }) => {
  const { FeatureSelect, isLoading, refetch } = useFetching(["FeatureSelect"], () => FeatureProxy.getListSelect(), {
    enabled: false,
  });
  let options = FeatureSelect.status === 1 ? FeatureSelect.entity.map((u) => ({ value: u.id, label: u.title ,typeId: u.typeId})) : [];

  return (
    <>
      <InputSelect
        options={options}
        isLoading={FeatureSelect && isLoading}
        title={title}
        onFocus={!FeatureSelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
