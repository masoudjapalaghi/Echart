// ApiCall
import { useFetching } from "@services/axiosHelper";
import { CrmProxy, FeatureProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";

export const GiftSelect = ({ title = "نوع جایزه", ...rest }) => {
  const { ListGift, isLoading, refetch } = useFetching(["ListGift"], () => CrmProxy.getListGift(), {
    enabled: false,
  });
  let options =
    ListGift.status === 1 ? ListGift.entity.map((u) => ({ value: u.id, label: u.title, typeId: u.typeId })) : [];

  return (
    <>
      <InputSelect
        options={options}
        isLoading={ListGift && isLoading}
        title={title}
        onFocus={!ListGift.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
