// ApiCall
import { useFetching } from "@services/axiosHelper";
import { StatusProxy } from "@services/api/Status";
// Components
import { InputSelect } from "../InputSelect";

export const StatusRegisterSelect = ({ title = "وضعیت ریجیستر", ...rest }) => {
  const { StatusQuestionnaire, isLoading, refetch } = useFetching(
    ["StatusQuestionnaire"],
    () => StatusProxy.getQuestionnaireSelect(),
    {
      enabled: false,
    }
  );
  let options =
    StatusQuestionnaire.status === 1 ? StatusQuestionnaire.entity.map((u) => ({ value: u.id, label: u.title })) : [];

  return (
    <>
      <InputSelect
        options={options}
        isLoading={StatusQuestionnaire && isLoading}
        title={title}
        onFocus={!StatusQuestionnaire.entity?.length > 0 && refetch}
        {...rest}
      />
    </>
  );
};
