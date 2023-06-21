import { useFetching } from "@services/axiosHelper";
import { FeatureCategoriesProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";
import { InventoryProxy } from "@services/api/Inventory";

export const CountUnitListSelect = ({ parent = false, title = " نوع سند", ...rest }) => {
  const { CountUnitListSelect, isLoading, refetch } = useFetching(
    ["CountUnitListSelect"],
    () => InventoryProxy.getCountUnitList(parent),
    {
      enabled: false,
    }
  );

  let options =CountUnitListSelect.status === 1 ?  CountUnitListSelect.entity.map((u) => ({ value: u.id, label: u.title })) : [];
  return (
    <>
      <InputSelect
        options={options}
        isLoading={CountUnitListSelect && isLoading}
        title={title}
        onFocus={!CountUnitListSelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
