import request from '@/utils/request';

/**
 * 检索下一编号
 * @param data
 * @constructor
 */
export const getNextNumList = (data) => {
  return request('/yd-system/sys/numbering/nn/q', {
    method: 'post',
    query: data
  });
};
/**
 * 根据ID获取对应下一编号
 * @param data
 * @constructor
 */
export const findOneNextNum = (data) => {
  return request('/yd-system/sys/numbering/nn/' + data, {
    method: 'get'
    // query: data
  });
};

/**
 * 创建下一编号规则，成功则返回对应ID
 * @param data
 * @constructor
 */
export const createNextNum = (data) => {
  return request('/yd-system/sys/numbering/nn', {
    method: 'post',
    query: data
  });
};
/**
 * 修改编号规则
 * @param data
 * @constructor
 */
export const updateNextNum = (data) => {
  return request('/yd-system/sys/numbering/nn', {
    method: 'put',
    query: data
  });
};
/**
 * 删除下一编号列表
 * @param ids
 * @constructor
 */
export const removeNextNums = (ids) => {
  return request('/yd-system/sys/numbering/nn', {
    method: 'delete',
    query: ids
  });
};
