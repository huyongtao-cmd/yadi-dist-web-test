import requests from '@/utils/request';

//入库提交
export const submit = (data) => {
  return requests(`/yd-inv/inv/ydPurGr/submit/${data}`, {
    method: 'post'
  });
};

//保存
export const grsave = (data) => {
  return requests('/yd-inv/inv/ydPurGr/save', {
    method: 'post',
    query: data
  });
};

// 查库位
export const findOneInvAj = (data: any) => {
  return requests('/yd-inv/inv/ydinvWh/findBySalDoIdOne?id=' + data, {
    method: 'get'
  });
};

// 序列号查数据
export const findSerialNoOnes = (data: any) => {
  return requests(`/yd-inv/Inv/Serial/findSerialNoOnes/${data}`, {
    method: 'get'
  });
};

// 查明细
export const findIdOne = (data: any) => {
  return requests(`/yd-inv/inv/ydPurGrD/selectAll`, {
    method: 'post',
    query: data
  });
};

// 查所有明细数据
export const ydPurGrD = (data: any) => {
  return requests(`/yd-inv/inv/ydPurGrD/findIdOne/${data}`, {
    method: 'get',
  });
};