// ApiCall
import { useFetching } from "@services/axiosHelper";
import { BrandProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";

export const BrandSelect = ({ title = "برند", ...rest }) => {
  const { ProductBrandsSelect, isLoading, refetch } = useFetching(["ProductBrandsSelect"], () => BrandProxy.getListSelect(), {
    enabled: false,
  });

  let options = ProductBrandsSelect.status === 1 ? ProductBrandsSelect.entity.map((u) => ({ value: u.id, label: u.title })) : [];

  return (
    <>
      <InputSelect
        options={options}
        isLoading={ProductBrandsSelect && isLoading}
        title={title}
        onFocus={!ProductBrandsSelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
