import requests from '@/utils/request';

// 查明细
export const findIdOne = (data: any) => {
  return requests(`/yd-inv/sal/salDo/findBySalDoIdOne?saldoid=` + data, {
    method: 'get'
  });
};