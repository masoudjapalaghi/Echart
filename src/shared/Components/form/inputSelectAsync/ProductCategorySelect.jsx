// ApiCall
import { useFetching } from "@services/axiosHelper";
import {  productCategoriesProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";

export const ProductCategorySelect = ({ parent = false, title = "دسته بندی", ...rest }) => {
  const { ProductCategorySelect, isLoading, refetch } = useFetching(
    ["ProductCategorySelect"],
    () => productCategoriesProxy.getListSelect(parent),
    {
      enabled: false,
    }
  );

  let options =
  ProductCategorySelect.status === 1 ? ProductCategorySelect.entity.map((u) => ({ value: u.id, label: u.title })) : [];

  return (
    <>
      <InputSelect
        options={options}
        isLoading={ProductCategorySelect && isLoading}
        title={title}
        onFocus={!ProductCategorySelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
