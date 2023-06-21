// ApiCall
import { useFetching } from "@services/axiosHelper";
import { FeatureTypeProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";

export const FeatureTypeSelect = ({ title = "نوع ویژگی", ...rest }) => {
  const { FeatureTypeSelect, isLoading, refetch } = useFetching(["FeatureTypeSelect"], () => FeatureTypeProxy.getListSelect(), {
    enabled: false,
  });
  let options = FeatureTypeSelect.status === 1 ? FeatureTypeSelect.entity.map((u) => ({ value: u.id, label: u.title })) : [];

  return (
    <>
      <InputSelect
        options={options}
        isLoading={FeatureTypeSelect && isLoading}
        title={title}
        menuPlacement="top"
        onFocus={!FeatureTypeSelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
