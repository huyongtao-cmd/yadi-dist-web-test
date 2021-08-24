import request from '@/utils/request';
const api = '/yst-fin/fin/purSettle';

// 采购结算单分页查询
export const getList = (data) => {
  return request(`${api}/list`, {
    method: 'post',
    query: data
  });
};

// 采购结算单-审核通过
export const approved = (data) => {
  return request(`${api}/approved`, {
    method: 'put',
    query: data
  });
};
//  复核
export const review = (data) => {
  return request(`${api}/review`, {
    method: 'put',
    query: data
  });
};
// 暂挂
export const pending = (data) => {
  return request(`${api}/pending`, {
    method: 'put',
    query: data
  });
};
// 采购结算单-审核拒绝
export const rejected = (data) => {
  return request(`${api}/rejected`, {
    method: 'put',
    query: data
  });
};
// 采购结算单-分页查询 采购单发票信息（详情页）
export const invoice = (data) => {
  return request(`${api}/invoice`, {
    method: 'post',
    query: data
  });
};

// 采购结算单- 分页查询 采购单明细信息（详情页）
export const details = (data) => {
  return request(`${api}/details`, {
    method: 'post',
    query: data
  });
};

// 采购结算单- 分页查询 采购单付款信息（详情页）
export const pay = (data) => {
  return request(`${api}/verify`, {
    method: 'post',
    query: data
  });
};

// 采购结算单-按照id查询基本信息（详情页）
export const searchBasic = (data) => {
  return request(`${api}/query/${data.id}`, {
    method: 'get'
  });
};
// 保存生成付款单
export const getProcurementStatement = (data) => {
  return request(`/yst-fin/fin/purSettle/createPre`, {
    method: 'post',
    query: data
  });
}
//查询可支付金额
export const getCanPayAmount = (id) => {
  return request(`/yst-fin/fin/purSettle/canPay/${id}`, {
    method: 'get'
  })
}