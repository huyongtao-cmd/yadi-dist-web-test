export const getColumnsConfig = (oriColumns, columns, checkedColumns) => {
  return oriColumns
    .sort((a, b) => {
      return (
        columns.findIndex((v) => v.dataIndex === a.dataIndex) -
        columns.findIndex((v) => v.dataIndex === b.dataIndex)
      );
    })
    .map((v, i) => {
      return {
        index: i,
        dataIndex: v.dataIndex,
        isShow: checkedColumns.includes(v.dataIndex)
      };
    });
};
export const tranColumnsConfig = (tableConfig, oriColumns) => {
  let checkedColumns = [];
  const columns = tableConfig
    .sort((a, b) => a.index - b.index)
    .map((v) => {
      if (v.isShow) {
        checkedColumns.push(v.dataIndex);
      }
      const t = oriColumns.find((j) => v.dataIndex === j.dataIndex);
      if (t) {
        return { ...t };
      } else {
        return null;
      }
    })
    .filter((v) => v !== null);
  return {
    checkedColumns,
    columns
  };
};
