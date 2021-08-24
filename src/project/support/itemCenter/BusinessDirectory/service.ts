import requests from '@/utils/request';
import Mock from 'mockjs';

const api = '/yd-user/itm/itmItemBusiness';

/**分页查询 */
export const search = (data: any) => {
  return requests(`${api}/list`, {
    method: 'post',
    query: data
  });
};

/**获取组织树 */
export const getTreeData = () => {
  // return requests(`${api}/searchItmItemBusinessBuTree`, {
  //   method: 'get'
  // });
  return requests('/yd-user/tree/currentTree', {
    method: 'post'
  });
};

/**发布商品 */
export const configItemToBusiness = (buTreeDIds: string, ids: string) => {
  return requests(`${api}/itmItemBusinessConfig/${buTreeDIds}&&${ids}`, {
    method: 'put'
  });
};

/**根据id获取商品详情 */
export const getItemDetail = (id: string) => {
  return requests(`${api}/searchItmItemBusinessDetail/${id}`, {
    method: 'get'
  });
};

/**保存商品经营属性 */
export const saveItem = (params: any) => {
  return requests(`${api}/itmItemBusinessUpdate`, {
    method: 'put',
    query: params
  });
};
// 解绑经营目录
export const deleteItems = (ids) => {
  return requests(`${api}/itmItemBusinessDelete`, {
    method: 'delete',
    query: ids
  });
};

