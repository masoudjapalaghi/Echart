import { productCategoriesProxy } from "@services/api";
import { useFetching } from "@services/axiosHelper";
import React, { useEffect, useState } from "react";

import Branch from "./Branch";

const Tree = ({className,ref,isMulti,checkParent}) => {
  const { productCategories, isLoading, isFetched, refetch, remove } = useFetching(["productCategories"], () =>
    productCategoriesProxy.getCategoriesListSelect(),{
    }
  );
  const categoriesStatus = productCategories.status === 1;
  const categoriesEntity = productCategories.entity ? productCategories.entity : [];

  // useEffect(() => {
  // remove();
  // }, [isLoading]);

  return (
    <>
      <div className={`w-full bg-white rounded-md overflow-auto min-h-max scroll z-50 mt-20 ${className}`} ref={ref}>
        {categoriesEntity?.map((item) => (
          <Branch checkParent={checkParent} isMulti={isMulti} key={item.id} item={item} level={0} />
        ))}
      </div>
    </>
  );
};

export default Tree;
