import requests from '@/utils/request';

// 查询
export const search = (data: any) => {
  return requests('/yd-inv/inv/invtrn/findPage', {
    method: 'post',
    query: data
  });
};

// 确认
export const confirm = (data: any) => {
  return requests(`/yd-inv/inv/invtrn/submit/${data}`, {
    method: 'get'
  });
};

// 仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};