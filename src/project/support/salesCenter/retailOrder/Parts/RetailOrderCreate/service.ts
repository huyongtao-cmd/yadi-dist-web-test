import requests from '@/utils/request';

// 保存或者销售出库
export const saveOrcheckout = (url, params) => {
  return requests(url, {
    method: 'post',
    query: params
  });
};

// 图片上传
export const uploadPic = (formData) => {
  return requests('/yd-user/com/file/v1/upload', {
    method: 'post',
    query: formData
  });
};

// 获取旧车信息一栏（旧车信息就一条数据）
export const getOldCar = () => {
  return requests('/yd-user/itm/itmItemYd/search', {
    method: 'post',
    // query: { itemName: '旧车' }
    query: { es6: '1' }
  });
};

// 仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};

// 序列号查数据
export const findSerialNoOnes = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerial/findSerialNoOnes/${data}`, {
    method: 'get'
  });
};

//查询详情
export const findIdOne = (data: any) => {
  return requests(`/yd-sale/salSo/findIdOne/${data}`, {
    method: 'get'
  });
};

// 库存数 repertory  /yd-inv/invStk/findPage  根据商品itemId 和 仓库whId
export const findPage = (data: any) => {
  console.log(data);
  return requests('/yd-inv/invStk/findPage', {
    method: 'post',
    query: data
  });
};

// 扫码 查库存合二为一接口
export const findSerialNoOnesSalOut = (data: any) => {
  console.log(data);
  return requests('/yd-inv/Inv/ydSerial/findSerialNoOnesSalOut', {
    method: 'post',
    query: data
  });
};




// 顾客查询
export const searchCustomer = (data) => {
  return requests('/yd-sale/crmCust/searchCustomerAndYdApi', {
    method: 'post',
    query: data
  });
};


// 经销商
// export const searchUserOrgBu = (data) => {
//   return requests('/yd-sale/crmCust/searchUserOrgBu', {
//     method: 'post',
//     query: data
//   });
// };
// 所属门店
export const searchUserOrgBu = (data) => {
  // /yd-user/org/orgStore/listSpecServe
  return requests('/yd-user/org/orgStore/list', {
    method: 'post',
    query: data
  });
};

// 根据门店获取制单人
export const getEmpList = (data) => {
  return requests('/yd-user/employee1/searchEmp', {
    method: 'post',
    query: data
  });
};

// 获取门店信息
export const getBuList = (data) => {
  //  /yd-user/org/orgStore/list
  return requests('/yd-user/org/orgStore/listSpecServe', {
    method: 'post',
    query: data
  });
};
