import maths from '@/utils/maths';
export const sum = (pageData: any[], dataIndex: string): number => {
  //todo 处理精度 使用utils/maths.ts
  return pageData.reduce((pre, cur) => {
    return maths.add(pre, Number(cur[dataIndex]) || 0);
  }, 0);
};
export const count = (pageData: any[], dataIndex: string): number => {
  return pageData.length;
};
export const average = (pageData: any[], dataIndex: string): number => {
  return maths.div(sum(pageData, dataIndex), pageData.length);
};
export const max = (pageData: any[], dataIndex: string): number => {
  return Math.max(
    ...pageData
      .map((v) => Number(v[dataIndex]))
      .filter((j) => typeof j === 'number')
  );
};
export const min = (pageData: any[], dataIndex: string): number => {
  return Math.min(
    ...pageData
      .map((v) => Number(v[dataIndex]))
      .filter((j) => typeof j === 'number')
  );
};
