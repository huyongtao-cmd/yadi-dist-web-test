import requests from '@/utils/request';

export const getList = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerialDoc/search`, {
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

