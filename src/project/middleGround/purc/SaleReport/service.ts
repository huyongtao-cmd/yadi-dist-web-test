import requests from '@/utils/request';

// 分页查询
export const getList = (data: any) => {
  return requests('/yd-sale/salSo/searchReport', {
    method: 'post',
    query: data
  });
};