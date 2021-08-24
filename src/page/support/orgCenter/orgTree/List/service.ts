import request from '@/utils/request';
import Mock from 'mockjs';

const api = '/yd-user/org/orgBuTree';

// 分页查询
export const getList = (data: any) => {
  return request(`${api}/list`, {
    method: 'post',
    query: data
  });
};

export const setBuTreeStatus = (payload: {
  buTreeStatus: string;
  ids: Array<string>;
}) => {
  console.log(payload);
  return request(`${api}/updateStatus`, {
    method: 'put',
    query: payload
  });
};

/**
 * 根据code获取组合商品详情，包含明细和标签
 * @param {String} data
 * @returns {Promise}
 */
export const getDetail = (data: any) => {
  // return new Promise(resolve => setTimeout(() => {
  //   resolve({
  //     code: 200,
  //     success: true,
  //     data: {
  //       "id": 1,
  //       'itemCode': 1000000000,
  //       'itemName': Mock.mock('@name'),
  //       'itemName2': Mock.mock('@name'),
  //       items: Mock.mock(list1Obj).records,
  //       tags: Mock.mock(list1Obj).records
  //     },
  //   })
  // }, 2000));
  return request(`${api}/${data}/details`, {
    method: 'get'
  });
};
