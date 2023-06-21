// ApiCall
import { useFetching } from "@services/axiosHelper";
import { FeatureCategoriesProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";

export const FeatureCategorySelect = ({ parent = false, title = "دسته بندی ویژگی", ...rest }) => {
  const { FeatureCategorySelect, isLoading, refetch } = useFetching(
    ["FeatureCategorySelect"],
    () => FeatureCategoriesProxy.getListSelect(parent),
    {
      enabled: false,
    }
  );
  let options =FeatureCategorySelect.status === 1 ?  FeatureCategorySelect.entity.map((u) => ({ value: u.id, label: u.title })) : [];
  return (
    <>
      <InputSelect
        options={options}
        isLoading={FeatureCategorySelect && isLoading}
        title={title}
        onFocus={!FeatureCategorySelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
