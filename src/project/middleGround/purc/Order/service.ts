import requests from '@/utils/request';

export const search = (data: any) => {
  return requests('/yd-pur/pur/purPo/purPoList', {
    method: 'post',
    query: data
  });
};

// export const search = (data: any) => {
//   return requests('/yd-pur/pur/purPo/purPoDetailApp', {
//     method: 'post',
//     query: data
//   });
// };

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

//关闭采购单
export const close = (data: any) => {
  return requests(`/yd-pur/pur/purPo/purPoClose/${data}`, {
    method: 'PATCH'
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
    method: 'get'
  });
};

export const findDocNoOne = (data: any) => {
  // 更换接口 /yd-pur/pur/purPo/purPoDetail/${data}
  return requests(`/yd-pur/pur/purPo/purPoDetailApp/${data}`, {
    method: 'get'
  });
};

export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};

export const deleteBetch = (data: any) => {
  return requests('/yst-pur/pur/purPoPayplan/deleteBatch', {
    method: 'delete',
    query: data
  });
};
