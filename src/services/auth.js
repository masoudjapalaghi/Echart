import { AdminProxy } from './api/Admin';

export const isAuthValid = async (token) => {
  try {
    const response = await  AdminProxy.autorize(token)
    var autorizeStatus = await response?.data?.status;
  } catch(error) {
    console.log("SERVER SIDE ERROR IN SignIn",error.message);
  }
  return autorizeStatus === 1 ? true : false;
};


