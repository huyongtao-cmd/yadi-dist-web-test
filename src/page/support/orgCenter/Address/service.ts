import request from '@/utils/request';
const api = '/yd-user/org/addr';

// 分页查询
export const getList = (data: any) => {
  return request(`${api}/list`, {
    method: 'post',
    query: data
  });
};

/**
 * 根据code获取组合商品详情，包含明细和标签
 * @param {String} data
 * @returns {Promise}
 */
export const getDetail = (data: any) => {
  return request(`${api}/${data}/details`, {
    method: 'get'
  });
};

//获取币种
export const getCurrAll = () => {
  return request('/yd-user/com/curr/all', {
    method: 'get'
  });
};
