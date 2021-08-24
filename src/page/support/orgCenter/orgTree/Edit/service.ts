import request from '@/utils/request';
import { resolve } from '@antv/x6/lib/registry/router/manhattan/options';
import Mock from 'mockjs';

const api = '/yd-user/org/orgBuTree';

export const setBuTreeStatus = (data: any) => {
  return request(`${api}/updateStatus`, {
    method: 'put',
    query: data
  });
};

export const saveData = (data: any) => {
  return request(`${api}/create`, {
    method: 'post',
    query: data
  });
};

/**
 * 获取详情
 * @param {string} data
 * @returns {Promise}
 */
export const getDetail = (data: any) => {
  return request(`${api}/getById/${data}`, {
    method: 'get'
  });
};

export const appendNode = (data: any) => {
  return request(`${api}/createTreeDetail`, {
    method: 'post',
    query: data
  });
};
export const deleteNode = (data: any) => {
  return request(`${api}/deleteTreeDetail/${data}`, {
    method: 'delete'
  });
};
// export const getDetail = (data: any) => {
//   return request(`${api}/getById/${data}`, {
//     method: 'get'
//   });
// };
