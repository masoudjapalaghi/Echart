import http from "@services/axiosHelper";

const api = {
  BaseData:"/BaseData",
  baseGood: "baseGood",
  tag: "tag",
};

export const TagProxy = {
  add: (params) => {
    return http.post(`${api.tag}/Add`,params);
  },
  list: (CurrentPage, PageSize, sort, searchField) => {
    return http.get(
      `${api.tag}/List?title=${searchField}&CurrentPage=${CurrentPage}&PageSize=${PageSize}&Sort=${sort}`
    );
  },
  getById: (id) => {
    return http.get(`${api.tag}/GetById?Id=${id}`);
  },
  delete: (id) => {
    return http.delete(`${api.tag}/Delete?Id=${id}`);
  },
  update: (params) => {
    return http.put(`${api.tagUpdate}/Update`, params);
  },

  getListSelect: () => {
    return http.get(`${api.BaseData}/Tags?CurrentPage=1&PageSize=1000000&Sort=1&`);
  },
  getBaseGoodsByTagId: (id) => {
    return http.get(`${api.tag}/GetRelationGood/GetBaseGoodsByTagId/${id}`);
  },
  postBaseGoodsByTagId: (params) => {
    return http.post(`${api.baseGood}/AddTag/Tags`, params);
  },
  deleteBaseGoodsByTagId: (data) => {
    return http.delete(`${api.baseGood}/DeleteTag/${data.baseGoodId}/Tags/${data.id}`);
  },
};
