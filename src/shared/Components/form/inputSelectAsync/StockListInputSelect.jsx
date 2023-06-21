import { useFetching } from "@services/axiosHelper";
import { FeatureCategoriesProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";
import { InventoryProxy } from "@services/api/Inventory";

export const StockListInputSelect = ({
  parent = false,
  title = "",
  isOrigin = true,
  isDestination = true,
  defaultOrigin,
  defaultDestination,
  ...rest
}) => {
  const { StockListInputSelect, isLoading, refetch } = useFetching(
    ["StockListInputSelect"],
    () => InventoryProxy.getStockList(parent),
    {
      enabled: false,
    }
  );

  let options =
    StockListInputSelect.status === 1 ? StockListInputSelect.entity.map((u) => ({ value: u.id, label: u.title })) : [];
  return (
    <>
      {isOrigin ? (
        <InputSelect
          options={options}
          isLoading={StockListInputSelect && isLoading}
          title={(title = "انبار مبدأ")}
          onFocus={!StockListInputSelect.entity?.length > 0 && refetch}
          optionsDefaultValue={defaultOrigin}
          initializeDependence
          {...rest}
        />
      ) : (
        ""
      )}
      {isDestination ? (
        <InputSelect
          options={options}
          isLoading={StockListInputSelect && isLoading}
          extraClassName=" text-error"
          extra={"#فقط در سند انتقالی انبار"}
          title={(title = "انبار مقصد ")}
          onFocus={!StockListInputSelect.entity?.length > 0 && refetch}
          optionsDefaultValue={defaultDestination}
          {...rest}
        />
      ) : (
        ""
      )}
    </>
  );
};
