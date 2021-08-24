import requests from '@/utils/request';

export const search = (data: any) => {
  return requests('/yd-pur/pur/purPo/purPoList', {
    method: 'post',
    query: data
  });
};

export const updateDeleteFlagBatch = (data: any) => {
  return requests('/yst-pur/pur/purPoPayplan/updateDeleteFlagBatch', {
    method: 'put',
    query: data
  });
};

export const save = (data: any) => {
  return requests('/yd-pur/pur/purPo/savePurPo', {
    method: 'post',
    query: data
  });
};

export const submit = (data: any) => {
  return requests('/yd-pur/pur/purPo/commitPurPo', {
    method: 'post',
    query: data
  });
};

export const findIdOne = (data: any) => {
  return requests(`/yd-pur/pur/purPo/purPoDetail/${data}`, {
    method: 'PATCH'
  });
};

// export const findBySalDoIdOne = (data: any) => {
//   return requests(`/yd-inv/sal/salDo/findBySalDoIdOne?saldoid=${data}`, {
//     method: 'GET'
//   });
// };

// 查库位
export const findBySalDoIdOne = (data: any) => {
  return requests('/yd-inv/sal/salDo/findBySalDoIdOne?saldoid=' + data, {
    method: 'get'
  });
};

export const deleteBetch = (data: any) => {
  return requests('/yst-pur/pur/purPoPayplan/deleteBatch', {
    method: 'delete',
    query: data
  });
};
