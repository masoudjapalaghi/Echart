// ApiCall
import { useFetching } from "@services/axiosHelper";
import { CrmProxy, FeatureProxy } from "@services/api";
// Components
import { InputSelect } from "../InputSelect";

export const QuestionCrmSelect = ({ title = "سوالات", ...rest }) => {

  const { getQuestions, isLoading, refetch } = useFetching(
    ["getQuestions"],
    () => CrmProxy.getQuestionsListSelect(),
    {
      enabled: false,
    }
  );
  let options =
    getQuestions.status === 1
      ? getQuestions.entity.map((u) => ({ value: u.id, label: u.question}))
      : [];

  return (
    <>
      <InputSelect
        options={options}
        isLoading={getQuestions && isLoading}
        title={title}
        onFocus={!getQuestions.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
