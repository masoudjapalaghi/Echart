import { setQueryString } from "@slices/Table/QueryStringTable";
import { refetchTable } from "@slices/Table/RefechTable";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyObj } from "src/utils";

const useFetchBasedOnQuery = (refetch, isBolean) => {
  const { query, isReady } = useRouter();
  const { queryString } = useSelector((state) => state.queryStringTable);
  const { refetchTabelByClick } = useSelector((state) => state.refechTable);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!emptyObj(query)) {
      dispatch(setQueryString(query));
    }
  }, [query]);

  useEffect(() => {
    if (!emptyObj(queryString) && isReady && isBolean) {
      refetch();
    }
  }, [queryString]);

  useEffect(() => {
    refetchTabelByClick && refetch();
  }, [refetchTabelByClick]);

  useMemo(() => {
    setTimeout(() => {
      refetchTabelByClick && dispatch(refetchTable(false));
    }, 10);
  }, [refetchTabelByClick]);

  return [queryString];
};
export default useFetchBasedOnQuery;
