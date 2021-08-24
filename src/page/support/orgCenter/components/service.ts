import requests from '@/utils/request';

const api = '/yd-user/itm/item';

//获取币种
export const getCurrAll = () => {
  return requests('/yd-user/com/curr/all', {
    method: 'get'
  });
};
