import requests from '@/utils/request';

const api = '/yd-user/org';
let ser = {
  //分页查询
  search: (data: any) => {
    return requests(`${api}/emp/list`, {
      method: 'post',
      query: data
    });
  },
  // 更新状态
  updateStatus: (ids) => {
    console.error('尚未提供接口，不明白此功能作用');
    return null;
  },

  // 获取明细数据
  getDetail: (id) => {
    return requests(`${api}/emp/detail/${id}`, {
      method: 'get'
    });
  },
  // 保存
  save: (data) => {
    return ser._update(data);
  },
  // 更新
  _update: (data) => {
    return requests(`${api}/emp/save`, {
      method: 'post',
      query: data
    });
  },
  getAllRoleList: () => {
    return requests('/yd-user/sys/roles/all', {
      method: 'get'
    });
  },
  bindUser: (empId, userId) => {
    return requests(`/yd-user/employee1/bindUserEmp/${empId}/${userId}`, {
      method: 'post'
    });
  },
  unBindUser: (empId) => {
    return requests(`/yd-user/employee1/unbindUserEmp/${empId}`, {
      method: 'post'
    });
  },
  getUserList: (data) => {
    return requests('/yd-system/sys/users/q', {
      method: 'post',
      query: data
    });
  }
};

export default ser;
