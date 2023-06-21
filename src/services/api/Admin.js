import { AuthHelper } from "../axiosHelper";
import http from "../axiosHelper";


const api = {
  Authenticate: "Admin/Authenticate",
  Autorize: "Admin/Autorize",
  Menues: "Users/Menues",
};

export const AdminProxy = {
  signIn: (params) => {
    return AuthHelper.post(api.Authenticate, params);
  },
  autorize: (token) => {
    return AuthHelper.get(api.Autorize, token);
  },
  menues: () => {
    return http.get(api.Menues);
  },
};
