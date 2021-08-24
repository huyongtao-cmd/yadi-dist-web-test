import request from '@/utils/request';
import { resolve } from '@antv/x6/lib/registry/router/manhattan/options';
import Mock from 'mockjs';
const list1Obj = {
  'records|10': [
    {
      'id|+1': 1,
      'itemCode|1000000000-1009999999': 1000000000,
      itemName: '@name',
      itemName2: '@name',
      uom: 'uom'
    }
  ],
  total: 10
};

const api = '/yd-user/itm/itmItemCombo';

// 分页查询
export const getList = (data: any) => {
  // console.log('getList request ', data)
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(Mock.mock({
  //       code: 200,
  //       success: true,
  //       data: {
  //         "records|10": [
  //           {
  //             'itemComboCode|1000000000-1009999999': 1000000000,
  //             'itemComboName': '@name',
  //             'itemComboOtherName': '@name',
  //             status: 'approve'
  //           }
  //         ],
  //         total: 10
  //       },
  //     }))
  //   }, 2000)
  // })
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
export const getItemDetail = (data: any) => {
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
  return request(`${api}/details/${data}`, {
    method: 'get'
  });
};

/**
 * 新增组合商品
 * @param {Object} data
 * @returns {Promise}
 */
export const addComboItem = (data: any) => {
  // return new Promise(resolve => setTimeout(() => {
  //   resolve({
  //     code: 200,
  //     success: true,
  //     data: {
  //       id: 100111
  //     },
  //   })
  // }, 2000))
  return request(`${api}/save`, {
    method: 'post',
    query: data
  });
};

/**
 * 保存组合商品
 * @param {Object} data
 * @returns {Promise}
 */
export const saveComboItem = (data: any) => {
  // return new Promise(resolve => setTimeout(() => {
  //   resolve({
  //     code: 200,
  //     success: true,
  //     data: {
  //       id: 100111
  //     },
  //   })
  // }, 2000))
  return request(`${api}/update`, {
    method: 'post',
    query: data
  });
};

/**
 * 从后台获取组合商品编码
 */
export const getItemCateCode = () => {
  return request(`${api}/getItemCateCode`, {
    method: 'get'
  });
};
