import { useRouter } from "next/router";
// APICALL
import {  ProductProxy } from "@services/api";
import { manageError } from "@services/axiosHelper";
// Utils
import { debounce } from "src/utils";
// Components
import InputSelectAsync from "../InputSelectAsync";

export const ProductSelcetAsync = ({  title = "کالا",hasTitle = true , ...rest }) => {
  const {push} = useRouter()
  const laodPublications = async (inputValue) => {
    try {
      const response = await ProductProxy.getListSelect(inputValue);
      console.log(response)
      let serverError = response?.data?.error;
      let list = response?.data;
      if (list.status === 1) {
        let filter = list.entity.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()));
        let options = filter.map((u) => ({ value: u.id, label: u.title }));
        return options;
      }else {
        manageError("categoryListSelect", null, serverError, push);
      }
    } catch (error) {
      manageError("categoryListSelect", error, null, push);
    }
  };
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      debounce(() => resolve(laodPublications(inputValue)), 500)();
    });
  return (
    <InputSelectAsync
      title={hasTitle ? title : null}
      cacheOptions
      defaultOptions={true}
      loadOptions={promiseOptions}
      {...rest}
    />
  );
}
