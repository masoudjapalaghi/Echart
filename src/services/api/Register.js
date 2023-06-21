import http, { AuthHelper } from "../axiosHelper";

const api = {
  user: "User",
  register: "Register",
  otp: "ValidateOtp",
  setName: "setName",
  authenticate: "Authenticate",
  forgetPassword:"ForgetPassword",
  setPassword:"SetPassword"
};

export const RegisterProxy = {
  Register: (params) => {
    return http.post(`${api.user}/${api.register}`, params);
  },
  Otp: (params) => {
    return http.post(`${api.user}/${api.otp}`, params);
  },
  nameAndFamily: (params) => {
    return http.post(`${api.user}/${api.setName}`, params);
  },
  signIn: (params) => {
    return AuthHelper.post(`${api.user}/${api.authenticate}`, params);
  },
  forgetPass: (params) => {
    return http.post(`${api.user}/${api.forgetPassword}`, params);
  },
  setPassword: (params) => {
    return http.post(`${api.user}/${api.setPassword}`, params);
  },
};
