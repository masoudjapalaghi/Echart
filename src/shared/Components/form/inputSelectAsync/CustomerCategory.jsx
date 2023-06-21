// ApiCall
import { useFetching } from "@services/axiosHelper";
import { DiscountProxy } from "@services/api/Discount";
// Components
import { InputSelect } from "../InputSelect";
import { RadioBox } from "..";

export const CustomerCategory = ({
  parent = false,
  title = "",
  hasTitle = true,
  ckeckedDetail = {
    hasCkecked: false,
    titleChecked: "",
    nameChecked: "",
    onChange: () => {},
    checked: false,
  },
  apiCallName = "getCustomerCategory",
  ...rest
}) => {
  const {
    [apiCallName]: customerCategory,
    isLoading,
    refetch,
  } = useFetching([apiCallName], () => DiscountProxy[apiCallName](0, ""), {
    enabled: false,
  });

  let options =
    customerCategory.status === 1
      ? customerCategory.entity.map((u) => ({ value: u.id, label: u.title }))
      : [];

  return (
    <div className="flex flex-col gap-1">
      {ckeckedDetail.hasCkecked ? (
        <RadioBox
          title={ckeckedDetail.titleChecked}
          name={ckeckedDetail.nameChecked}
          onChange={ckeckedDetail.onChange}
          checked={ckeckedDetail.checked}
        />
      ) : null}
      <InputSelect
        options={options}
        isLoading={customerCategory && isLoading}
        title={hasTitle ? title : null}
        onFocus={!customerCategory.entity?.length > 0 && refetch}
        {...rest}
      />
    </div>
  );
};
