// Redux
import { useDispatch, useSelector } from "react-redux";
// ApiCall
import useToggle from "@hooks/useToggle";
import { CrmProxy, provinceCityProxy } from "@services/api";
import { useFetching } from "@services/axiosHelper";
import { useEffect } from "react";
import { useState } from "react";
// Components
import { InputSelect } from "../InputSelect";

export const QuestionsOptionsSelect = ({
  nameQuestion = "questionId",
  nameOption = "optionId",
  getValueHandler = () => {},
  hasCity = true,
  ...rest
}) => {
  const [resetOptions, setResetOptions] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const { resetStatus } = useSelector((state) => state.resetSearchFiled);

  const {
    questions,
    isLoading: provinceIsloading,
    isFetched,
    refetch: refetchProvince,
  } = useFetching(["questions"], () => CrmProxy.getQuestionsListSelect(), {
    enabled: false,
  });
  let questionOptions = questions.status === 1 ? questions.entity.map((u) => ({ value: u.id, label: u.question })) : [];

  const projectId = 1;
  const {
    options,
    isLoading: CityIsLoading,
    isFetching,
    refetch: cityRefetch,
    remove,
  } = useFetching(["options"], () => CrmProxy.getOptionsListSelect(projectId, questionId), {
    enabled: false,
  });

  let optionQuestionOptions =
    options.status === 1 ? options.entity[0]?.options.map((u) => ({ value: u.id, label: u.title })) : [];

  const getQuestion = (e) => {
    setQuestionId(e.value);
    getValueHandler(e);
    setResetOptions(true);
  };

  useEffect(() => {
    if (resetStatus) {
      setQuestionId(null);
    }
  }, [resetStatus]);

  useEffect(() => {
    if (isFetched) {
      setResetOptions(false);
    }
  }, [resetOptions, isFetched]);

  const restartCityDelect = () => {
    remove();
    cityRefetch();
  };
  return (
    <>
      <InputSelect
        options={questionOptions}
        isLoading={questionOptions && provinceIsloading}
        title="سوالات"
        name={nameQuestion}
        onFocus={!questionOptions?.length > 0 && refetchProvince}
        handleChange={getQuestion}
        {...rest}
      />
      {hasCity ? (
        <InputSelect
          options={optionQuestionOptions}
          isLoading={isFetching}
          title="پاسخ"
          name={nameOption}
          onFocus={restartCityDelect}
          reset={resetOptions}
          disabled={!questionId}
          {...rest}
        />
      ) : null}
    </>
  );
};
