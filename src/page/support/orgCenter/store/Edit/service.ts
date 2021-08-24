import requests from '@/utils/request';

const api = '/yd-user/itm/item';

//根据id获取详情
export const getDetailById = (data: any) => {
  return requests(`/yd-user/org/orgStore/getDetailsById/${data}`, {
    method: 'get'
  });
};

//更新门店
export const updateStore = (data: any) => {
  return requests('/yd-user/org/orgStore/saveOrUpdate', {
    method: 'POST',
    query: data
  });
};
//获取币种
export const getCurrAll = () => {
  return requests('/yd-user/com/curr/all', {
    method: 'get'
  });
};
