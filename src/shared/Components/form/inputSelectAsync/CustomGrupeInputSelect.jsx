import { PriceingProxy } from "@services/api/pricing";
import { useFetching } from "@services/axiosHelper";
import React, { useEffect, useState } from "react";
import { InputSelect } from "..";

export const CustomGrupeInputSelect = ({
  title = "گروه مشتری",
  selectFirstIndex = false,
  ...rest
}) => {
  const { CustomGrupeInputSelect, isLoading, isFetched, refetch } = useFetching(
    ["CustomGrupeInputSelect"],
    () => PriceingProxy.getCustomerCategory(),
    {
      enabled: selectFirstIndex,
    }
  );
  let options =
    CustomGrupeInputSelect.status === 1
      ? CustomGrupeInputSelect.entity.map((u) => ({
          value: u.id,
          label: u.title,
        }))
      : [];
  return (
    <>
      <InputSelect
        selectFirstIndex={selectFirstIndex}
        options={options}
        isLoading={CustomGrupeInputSelect && isLoading}
        title={title}
        onFocus={!CustomGrupeInputSelect.entity?.length > 0 && refetch}
        isFetched={isFetched}
        {...rest}
      />
    </>
  );
};
