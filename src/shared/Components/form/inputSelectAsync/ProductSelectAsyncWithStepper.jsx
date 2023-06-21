import { useRouter } from "next/router";
// APICALL
import { DiscountProxy } from "@services/api/Discount";
import { manageError } from "@services/axiosHelper";
// Utils
import { debounce } from "src/utils";
// Components
import InputSelectAsync from "../InputSelectAsync";
import { InputSelectAsyncWithStepper } from "../InputSelectAsyncWithStepper";

export const ProductSelcetAsyncWithStepper = ({ title = "کالا", hasTitle = true, ...rest }) => {
  const { push, query } = useRouter();
  const laodPublications = async (inputValue) => {
    try {
      const isGood = +query.filterBy === 101;
      const exceptId = isGood ? query.SearchId : ""
      const response = await DiscountProxy.getGoodList(exceptId, inputValue);
      let serverError = response?.data?.error;
      let list = response?.data;
      if (list.status === 1) {
        let filter = list.entity.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()));
        let options = filter.map((u) => ({ value: u.id, label: u.title }));
        return options;
      } else {
        manageError(title, null, serverError, push);
      }
    } catch (error) {
      manageError(title, error, null, push);
    }
  };
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      debounce(() => resolve(laodPublications(inputValue)), 500)();
    });
  return (
    <InputSelectAsyncWithStepper
      title={hasTitle ? title : null}
      cacheOptions
      defaultOptions={true}
      loadOptions={promiseOptions}
      {...rest}
    />
  );
};
