import { useRouter } from "next/router";
// ApiCall
import {  TagProxy } from "@services/api";
import { manageError } from "@services/axiosHelper";
// Components
import { InputSelect } from "../InputSelect";
import InputSelectAsync from "../InputSelectAsync";
// Utils
import { debounce } from "src/utils";

export const TagsListSelect = ({ title = "برچسب", ...rest }) => {

  const {push} = useRouter()
  const laodPublications = async (inputValue) => {
    try {
      const response = await TagProxy.getListSelect(inputValue);
      let serverError = response?.data?.error;
      let list = response?.data;
      if (list.status === 1) {
        let filter = list.entity.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()));
        let options = filter.map((u) => ({ value: u.id, label: u.title }));
        return options;
      }else {
        manageError("tagsListSelect", null, serverError, push);
      }
    } catch (error) {
      manageError("tagsListSelect", error, null, push);
    }
  };
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      debounce(() => resolve(laodPublications(inputValue)), 500)();
    });

  // const { TagsSelect, isLoading, refetch } = useFetching(["TagsSelect"], () => TagProxy.getListSelect(), {
  //   enabled: false,
  // });

  // let options =TagsSelect.status === 1 ? TagsSelect.entity.map((u) => ({ value: u.id, label: u.title })):[];

  return (
    <>
      <InputSelectAsync
        // options={options}
        loadOptions={promiseOptions}
        // isLoading={TagsSelect && isLoading}
        cacheOptions
        defaultOptions={true}
        title={title}
        // onFocus={!TagsSelect.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
