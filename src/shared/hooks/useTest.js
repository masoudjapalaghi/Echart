import { setQueryString } from "@slices/Table/QueryStringTable";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTest = (refetch) => {
  const { query } = useRouter();
  const { queryString } = useSelector((state) => state.queryStringTable);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(query).length !== 0) {
      dispatch(setQueryString(query));
    }
  }, [query]);

  useEffect(() => {
    if (Object.keys(queryString).length !== 0) {
      refetch();
    }
  }, [queryString]);

  return [queryString];
};
export default useTest;
