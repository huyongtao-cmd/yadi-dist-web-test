import requests from '@/utils/request';

export const login = (data: { [props: string]: any }) => {
  data.client_id = 'admin';
  data.client_secret = '123456';
  data.grant_type = 'password';
  data.scope = 'all';
  //client_id=admin&client_secret=123456&grant_type=password&scope=all&username=admin&password=123456
  return requests('/auth/oauth/token', {
    method: 'get',
    query: data
  });
};

export const getCaptcha = () => {
  return requests('/yd-system/sec/captcha', {
    method: 'get'
  });
};

export const getCurrent = () => {
  return requests('/yd-system/sys/users/current', {
    method: 'get'
  });
};

export const getAnswer = (data: any) => {
  return requests('/yd-user/sec/capkey/' + data, {
    method: 'get'
  });
};

export const getBu = () => {
  //    /yd-user/org/orgStore/list
  return requests('/yd-user/org/orgStore/listSpecServe', {
    method: 'POST',
    query: {
      current: 1,
      size: 999999,
      // storeType: 'A',
      storeStatus: 'ACTIVE'
    }
  });
};

export const getInBu = () => {
  return requests('/yd-user/org/orgStore/listSpec', {
    method: 'POST',
    query: {
      current: 1,
      size: 999999,
      // storeType: 'A',
      storeStatus: 'ACTIVE'
    }
  });
};

export const getOrgBu = () => {
  return requests('/yd-sale/crmCust/searchUserOrgBu', {
    method: 'POST',
    query: {
      current: 1,
      size: 999999,

    }
  });
};
