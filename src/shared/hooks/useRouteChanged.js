import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { handleToggleSideBar } from "@slices/SideBar";
import { setQueryString } from "@slices/Table/QueryStringTable";
const useRouterChanged = () => {
  const { pathname, events } = useRouter();
  const dispatch = useDispatch();

  const handleStart = (url) => {
    dispatch(setQueryString({}));
    url !== pathname ? null : dispatch(handleToggleSideBar(false));
  };
  const handleComplete = (url) => dispatch(handleToggleSideBar(false));
  useEffect(() => {
    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);
    events.on("routeChangeError", handleComplete);
    return () => {
      events.off("routeChangeStart", handleStart);
      events.off("routeChangeComplete", handleComplete);
      events.off("routeChangeError", handleComplete);
    };
  }, [[events]]);

  // return [toggleprogress];
};
export default useRouterChanged;
