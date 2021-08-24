import request from '@/utils/request';
import Mock from 'mockjs';
const list1Obj = {
  'records|10': [
    {
      'id|+1': 1,
      'applyId|1000000000-1009999999': 1000000000,
      name: '@name',
      createUserName: '@name',
      'type|1-2': 1,
      dateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
      stateCheck: 'APPROVING'
    }
  ],
  total: 10
};

const api = '/yd-user/itm/review';

// 分页查询
export const getList = (data: any) => {
  // console.log('getList request ', data)
  // return Promise.resolve({
  //   success: 200,
  //   data: Mock.mock(list1Obj),
  // })
  return request(`${api}/search`, {
    method: 'post',
    query: data
  });
};
//商品审核
export const review = (data) => {
  // console.log('review request ', data)
  // return Promise.resolve({
  //   success: 200,
  //   data: {}
  // })
  return request(`${api}`, {
    method: 'post',
    query: data
  });
};

//根据id获取审核详情
export const getReviewDetail = (data: any) => {
  // return Promise.resolve({
  //   success: 200,
  //   data: {
  //     applyId: 1005457223,
  //     applyType: '1',
  //     dateTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
  //     list: Mock.mock(list1Obj).records
  //   },
  // })
  return request(`${api}/${data}`, {
    method: 'get'
  });
};
