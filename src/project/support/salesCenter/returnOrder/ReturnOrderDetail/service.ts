import requests from '@/utils/request';

// 退货单保存
export const save = (data: any) => {
  return requests('/yd-sale/salSo/salesReturn', {
    method: 'post',
    query: data
  });
};

//根据id获取单条数据详情
export const findIdOne = (data: any) => {
  return requests('/yd-sale/salSo/findIdOne/' + data, {
    method: 'get'
  });
};
