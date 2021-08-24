import requests from '@/utils/request';
import Mock from 'mockjs';
import app from '@/project/utils/appCommon';

const api = '/yd-user/employee1';
let ser = {
  //分页查询
  search: (data: any) => {
    app.InsertOrderParams(data);
    return requests(`${api}/searchEmp`, {
      method: 'post',
      query: data
    });
  },
  // 更新状态
  // 更新状态
  updateStatus: (ids) => {
    return requests(`${api}/switchStatus`, {
      method: 'post',
      query: { ids }
    });
  },

  // 获取明细数据
  getDetail: (id) => {
    return requests(`${api}/findEmpById/${id}`, {
      method: 'get'
    });
  },
  // 保存
  save: (data) => {
    return ser._update(data);
  },
  // 更新
  _update: (data) => {
    return requests(`${api}/saveEmp`, {
      method: 'post',
      query: data
    });
  },
  getAllRoleList: () => {
    let data = { enabled: true, current: 1, size: 99999 };
    return requests('/yd-system/sys/roles/q', {
      method: 'post',
      query: data
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
