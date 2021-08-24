import requests from '@/utils/request';

//入库提交
export const submit = (data) => {
  return requests(`/yd-inv/inv/ydPurGr/saveAndSubmit`, {
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

//查询详情
export const findPurcIdOne = (data: any) => {
  return requests(`/yd-inv/inv/invtrn/findOne`, {
    method: 'post',
    query: data
  });
};