import requests from '@/utils/request';
import Mock from 'mockjs';
import serOrg from '@/page/support/orgCenter/orgData/List/service';

const api = '/yd-user/agent';
let ser = {
  //分页查询
  search: (data: any) => {
    data.buType = 'DEALER';
    return serOrg.search(data);
  },
  // 更新状态
  updateStatus: (ids) => {
    return requests(`${api}/updateStatus`, {
      method: 'post',
      query: { ids }
    });
  },
  // 获取明细数据
  getDetail: (id) => {
    return requests(`${api}/findById/${id}`, {
      method: 'get'
    });
  },
  // 保存
  save: (data) => {
    return ser._edits(data);
  },
  // 更新
  updates: (data) => {
    return ser._update(data);
  },
  // 更新
  _update: (data) => {
    return requests(`/yd-sale/crmCust/updateWholesaleCustomer`, {
      method: 'put',
      query: data
    });
  },
  // 保存
  _edits: (data) => {
    return requests(`/yd-sale/crmCust/createWholesaleCustomer`, {
      method: 'post',
      query: data
    });
  },
  // 客户编辑
  details: (data) => {
    return requests(`/yd-sale/crmCust/searchWholesaleCustomerByCustCode?custCode=${data}`, {
      method: 'get'
    });
  },

};

export default ser;
