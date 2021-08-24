import request from '@/utils/request';

// 查询银行信息
export const getBankInfo = (data) => {
    return request(`/yst-support/org/component/addr/bankacc/paging`, {
        method: 'post',
        query: data
    });
};

