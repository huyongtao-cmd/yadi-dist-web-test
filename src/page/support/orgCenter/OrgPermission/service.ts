import request from '@/utils/request';
import { resolve } from '@antv/x6/lib/registry/router/manhattan/options';
import Mock from 'mockjs';

const api = '/yd-user/sys/sysDpRole';

export const saveData = (payload: any) => {
  return request(`${api}/create`, {
    method: 'post',
    query: payload
  });
};

/**
 * 获取详情
 * @param {string} data
 * @returns {Promise}
 */
export const getDetail = (payload: { buTreeDId: string }) => {
  const { buTreeDId } = payload;
  return request(`${api}/details/${buTreeDId}`, {
    method: 'get'
  });
};

export const getNodeDetail = (payload: { buTreeDId: string }) => {
  const { buTreeDId } = payload;
  return request(`${api}/dpRolePowerDetails/${buTreeDId}`, {
    method: 'get'
  });
};

export const saveConfig = (payload: { query: any }) => {
  const { query } = payload;
  return request(`${api}/detailCreate`, {
    method: 'post',
    query
  });
};
