import requests from '@/utils/request';


export const getList = (data) => {
  return requests("/user/list", {
    method: "post",
    query: data
  })
}


export const getMock = () => {
  return require("../../mock/services/dashboardMock.json")
}

export const getNums = (data) => {
  return requests("/yd-sale/salSo/dataStatistics", {
    method: "post",
    query: data
  })
}

export const getBu = () => {
  //    /yd-user/org/orgStore/list
  return requests('/yd-user/org/orgStore/listSpecServe', {
    method: 'POST',
    query: {
      current: 1,
      size: 999999,
      // storeType: 'A',
      storeStatus: 'ACTIVE'
    }
  });
};
