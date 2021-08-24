import requests from '@/utils/request';

// 分页查询
export const getList = (data: any) => {
  return requests('/yd-inv/inv/ydinvWh/search', {
    method: 'post',
    query: data
  });
};

// 保存
export const save = (data: any) => {
  return requests('/yd-inv/inv/ydinvWh/createOne', {
    method: 'post',
    query: data
  });
};

// 提交
export const submit = (data: any) => {
  return requests('/yd-user/invaj/submitOneInvAj', {
    method: 'post',
    query: data
  });
};

// 查详情
export const findOneInvAj = (data: any) => {
  return requests('/yd-inv/inv/ydinvWh/findBySalDoIdOne?id=' + data, {
    method: 'get'
  });
};

// 提交
export const updateStatus = (data: any) => {
  return requests('/yd-inv/inv/ydinvWh/updateStatusBatch', {
    method: 'post',
    query: data
  });
};

// 查地址
export const findAddr = (data: any) => {
  return requests('/yd-user/org/orgStore/getDetailsById/' + data, {
    method: 'get'
  });
};
