import request from '@/utils/request';

/**
 * 创建发号器规则，成功则返回对应ID
 * @param data
 * @constructor
 */
export const createRule = (data) => {
  return request('/yd-system/sys/numbering/rules', {
    method: 'post',
    query: data
  });
};

/**
 * 批量创建或更换规则明细
 * @param data
 * @constructor
 */
export const createRuleBatch = (data) => {
  return request('/yd-system/sys/numbering/ruledtls', {
    method: 'post',
    query: data
  });
};

/**
 * 检索发号器规则
 * @param data
 * @constructor
 */
export const getRuleList = (data) => {
  return request('/yd-system/sys/numbering/q', {
    method: 'post',
    query: data
  });
};
/**
 * 根据规则ID，获取规则对象，包括规则明细列表
 * @param id
 * @constructor
 */
export const searchRuleById = (id) => {
  return request(`/yd-system/sys/numbering/rules/${id}`, {
    method: 'get'
  });
};

/**
 * 删除发号器规则，及对应规则明细
 * @param id
 * @constructor
 */
export const removeRuleById = (id) => {
  return request(`/yd-system/sys/numbering/rules/${id}`, {
    method: 'delete'
  });
};

// ------------------------------------

/**
 * 根据规则明细ID列表，批量删除规则明细
 * @param id
 * @constructor
 */
export const removeRuleDtlsById = (id) => {
  return request(`/yd-system/sys/numbering/ruledtls`, {
    method: 'delete'
  });
};

/**
 * 更新发号器规则
 */
export const updataRule = (data) => {
  return request(`/yd-system/sys/numbering/rules`, {
    method: 'put',
    query: data
  });
};
