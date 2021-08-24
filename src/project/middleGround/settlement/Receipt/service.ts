import request from '@/utils/request';

const api = '/yst-fin/sal/receiveSettle';

// 分页查询
export const search = (data) => {
  return request(`${api}/list`, {
    method: 'post',
    query: data
  });
};

// 收款结算单-审核通过(批量)
export const approved = (data) => {
  return request(`${api}/approved`, {
    method: 'post',
    query: data
  });
};
// 收款结算单-审核拒绝（批量）
export const rejected = (data) => {
  return request(`${api}/rejected`, {
    method: 'post',
    query: data
  });
};

// 收款结算单-审核拒绝（单个）
export const rejectedById = (data) => {
  return request(`${api}/rejected/${data.id}`, {
    method: 'post',
    query: data
  });
};
// 收款结算单-审核暂挂（批量）
export const pending = (data) => {
  return request(`${api}/pending`, {
    method: 'post',
    query: data
  });
};


// 销分页查询-收款结算明细
export const details = (data) => {
  return request(`${api}/details`, {
    method: 'post',
    query: data
  });
};


// 收款结算单-按照id查询基本信息（详情页）
export const searchBasic = (data) => {
  return request(`${api}/${data.id}`, {
    method: 'post'
  });
};

// 收款商品明细
export const searchItemList = (data) => {
  return request(`${api}/classDetails`, {
    method: 'post',
    query: data
  });
};

// 收款结算单明细查看页面---分页查询
export const searchDetailList = (data) => {
  return request(`/yst-order/order/salReceipt/select`, {
    method: 'post',
    query: data
  });
};
