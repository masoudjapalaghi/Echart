import http from "../axiosHelper";

const api = {
  baseData:"BaseData",
  brand: "/Brand",
};

export const BrandProxy = {
  getList: (currentPage, pageSize, sort,searchField) => {
    return http.get(`${api.brand}/List?Title=${searchField}&CurrentPage=${currentPage}&PageSize=${pageSize}&Sort=${sort}`);
  },
  getById: (id) => {
    return http.get(`${api.brand}/GetById/${id}`);
  },
  getListSelect: () => {
    return http.get(`${api.baseData}/Brands?CurrentPage=1&PageSize=1000000&Sort=1&`);
  },
  add:(data)=>{
    return http.post(`${api.brand}/Add`,data)
  },
  update: (params) => {
    return http.put(`${api.brand}/Update`,params);
  },
  delete: (id) => {
    return http.delete(`${api.brand}/Delete/?id=${id}`);
  },
};
