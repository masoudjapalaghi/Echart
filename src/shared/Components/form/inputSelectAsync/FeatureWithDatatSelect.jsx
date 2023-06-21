import { InputSelect } from "..";
//api
import { productPropertyProxy } from "@services/api";
import { useFetching } from "@services/axiosHelper";

export const FeatureWithDatatSelect = ({ title = "نوع ویژگی", ...rest }) => {
  const { FeatureWithDatatSelect, isLoading, refetch } = useFetching(
    ["FeatureWithDatatSelect"],
    () => productPropertyProxy.getListSelectWithData(),
    {
      enabled: false,
    }
  );
  let options =
    FeatureWithDatatSelect.status === 1
      ? FeatureWithDatatSelect.entity.map((u) => ({ value: u.id, label: u.title, typeId: u.typeId, data: u.data,color:u.color?u.color:[]}))
      : [];
  return (
    <>
      <InputSelect
        options={options}
        isLoading={FeatureWithDatatSelect && isLoading}
        title={title}
        onFocus={!FeatureWithDatatSelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
