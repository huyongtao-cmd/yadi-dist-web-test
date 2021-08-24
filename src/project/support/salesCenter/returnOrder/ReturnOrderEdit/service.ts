import requests from '@/utils/request';

// 退货单保存
export const save = (data: any) => {
  let url = '';
  if (data.docType === 'D') {
    // 零售单
    url = '/yd-sale/salSo/salesReturn'
  } else {
    // 批发单
    url = '/yd-sale/salSo/salesPFReturn';
  }
  return requests(`${url}`, {
    method: 'post',
    query: data
  });
};

// 退货单提交
export const submit = (data: any) => {
  let url = '';
  if (data.docType === 'D') {
    // 零售单  
    url = '/yd-sale/salSo/salesReturnSubmit'
  } else {
    // 批发单
    url = '/yd-sale/salSo/salesPFReturn';
  }
  return requests(`${url}`, {
    method: 'post',
    query: data
  });
};


//根据id获取单条数据详情
export const findIdOne = (data: any) => {
  return requests('/yd-sale/salSo/findIdOne/' + data, {
    method: 'get',
    // query: data
  });
};

// 仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};