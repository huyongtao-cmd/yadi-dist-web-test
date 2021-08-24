import requests from '@/utils/request';

// 查询
export const search = (data: any) => {
  return requests('/yd-inv/inv/ydInvIo/ydStkAcct', {
    method: 'post',
    query: data
  });
};

// 仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};