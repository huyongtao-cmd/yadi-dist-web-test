import requests from '@/utils/request';
//查询单条数据
export const findIdOne = (data: any) => {
  return requests('/yd-sale/salSo/findIdOne/' + data, {
    method: 'get'
    // query: data
  });
};