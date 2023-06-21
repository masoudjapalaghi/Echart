import axios from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
// ENV
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
// Auth
import { setAuthorize } from "./auth";
import { deleteCookie, getCookie } from "cookies-next";

const http = {
  auth: publicRuntimeConfig.authApi,
  admin: publicRuntimeConfig.adminApi,
};

const axiosHelper = axios.create({
  baseURL: http.admin,
  headers: {
    Accept: "application/json;charset=UTF-8",
  },
});
export default axiosHelper;
export const AuthHelper = axios.create({
  baseURL: http.auth,
  headers: {
    Accept: "application/json;charset=UTF-8",
    token: getCookie("token"),
  },
});
// Set token  in instance
setAuthorize(axiosHelper);
// setAuthorize(AuthHelper)
export const useMutate = (label, fallback, options) => {
  const { push } = useRouter();
  const mutation = useMutation(fallback, {
    onSuccess(data) {
      let serverError = data?.data?.error;
      if (data.data.status === 1) {
        handelThrowSuccess("عملیات موفق آمیز بود");
        // mutation.reset()
      } else {
        manageError(label, null, serverError, push);
      }
      // return data;
    },
    onError(error) {
      manageError(label, error, null, push);
    },
    onSettled(err) {
      // console.log("Mutation completed.");
    },
    cacheTime: 0,
    ...options,
  });
  //For  REACT_QUERY_ERROR
  let serverError = mutation?.data?.data?.error;
  if (!mutation?.error?.response && !serverError?.code) {
    mutation.error && manageError(label, mutation.error, null, push);
  }

  return {
    res: mutation.data ? mutation.data.data : { status: null, error: null, entity: [] },
    mutateAsync: mutation.mutateAsync,
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
    mutation,
  };
};

export const useFetching = (label, proxy, options) => {
  const query = useQuery(label, proxy, { retry: false, refetchOnWindowFocus: false, cacheTime: 0, ...options });
  const { data, isError, error } = query;
  const { push } = useRouter();
  const serverError = data?.data?.error;
  if (error || serverError) {
    !data?.data?.entity && manageError(label, error, serverError, push);
  }
  return {
    [label[0]]: data?.data ? data.data : { status: null, error: null, entity: null },
    isError: query.isError,
    error: query.error,
    isFetched: query.isFetched,
    isFetchedAfterMount: query.isFetchedAfterMount,
    isFetching: query.isFetching,
    isLoading: query.isLoading,
    isLoadingError: query.isLoadingError,
    isPaused: query.isPaused,
    isPlaceholderData: query.isPlaceholderData,
    isPreviousData: query.isPreviousData,
    isRefetchError: query.isRefetchError,
    isRefetching: query.isRefetching,
    isStale: query.isStale,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
    remove: query.remove,
    status: query.status,
  };
};
export const manageError = (label, error, serverError, push) => {
  if (error?.response?.status > 500) {
    handelThrowError("مشکلی از سمت سرور وجود دارد");
  }
  if (400 <= error?.response?.status < 500) {
    manageError400_500(label, error);
  }
  if (!error?.response && !serverError?.code) {
    //For  REACT_QUERY_ERROR
    handelThrowError(`react-query=>${label}:${error}`);
  }
  if (serverError?.code === "Z01") {
    deleteCookie("token");
    toast.warning("کاربر معتبر نیست", { toastId: "کاربر معتبر نیست" });
    push("/auth/SignIn");
  } else {
    handelThrowError(serverError?.message);
  }
};
const manageError400_500 = (label, error) => {
  let errorResponse = error?.response?.data;
  let errorTitle = errorResponse?.title;
  if (errorResponse?.errors) {
    var errerDetails =
      Object.values(errorResponse ? errorResponse.errors : [])[0] &&
      Object.values(errorResponse ? errorResponse.errors : [])[0][0];
    if (typeof errerDetails !== "undefined") handelThrowError(`${label} => 400-500 :${errerDetails}`);
  }
  if (typeof error?.message !== "undefined" || typeof errorTitle !== "undefined") {
    if (error?.response?.status === 0) {
      handelThrowError("اتصال به اینترنت را چک کنید !");

    }else if(error?.response?.status >= 500) {
      handelThrowError("مشکلی از سمت سرور وجود دارد!");

    }else {
      handelThrowError(`${error?.message} => ${errorTitle} `);
    }
  }
};
const handelThrowError = (message) => {
  toast.error(message, { toastId: message });
};
const handelThrowSuccess = (message) => {
  toast.success(message);
};
const EnumSuccess = (status) => {
  return {
    0: "ناموفق",
    1: "موفق",
  }[status];
};
