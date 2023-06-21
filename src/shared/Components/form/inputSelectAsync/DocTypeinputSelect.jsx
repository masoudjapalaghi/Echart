import { useFetching } from "@services/axiosHelper";
import { FeatureCategoriesProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";
import { InventoryProxy } from "@services/api/Inventory";

export const DocTypeinputSelect = ({ parent = false, title = " نوع سند", ...rest  }) => {
  const { DocTypeinputSelect, isLoading, refetch } = useFetching(
    ["DocTypeinputSelect"],
    () => InventoryProxy.getDocType(parent),
    {
      enabled: false,
    }
  );

  let options =DocTypeinputSelect.status === 1 ?  DocTypeinputSelect.entity.map((u) => ({ value: u.id, label: u.title })) : [];
  return (
    <>
      <InputSelect
        handleChange={(e)=>{console.log(e);}}
        options={options}
        isLoading={DocTypeinputSelect && isLoading}
        title={title}
        onFocus={!DocTypeinputSelect.entity?.length > 0 && refetch}
        
        {...rest}
        
      />
    </>
  );
};
