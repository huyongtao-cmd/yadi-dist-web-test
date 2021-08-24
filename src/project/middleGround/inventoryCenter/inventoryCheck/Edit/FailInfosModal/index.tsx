import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ElCard } from '@/components/el';
import { asserts, maths } from '@/utils';


export default ({ dataSource, flag }) => {
  dataSource.forEach((item, index) => {
    item.id = index + 1;
  })

  console.log(dataSource, 'dataSourcedataSource');
  const getColumnsConfig = () => {
    return [
      {
        title: '商品编码',
        key: 'itemCode',
        dataIndex: 'itemCode',
        width: 120,
      },
      flag === 'all' && {
        title: '车架号',
        key: 'serialNo',
        dataIndex: 'serialNo',
        width: 120,
      },
      {
        title: '错误原因',
        key: 'remarkDocStatus',
        dataIndex: 'remarkDocStatus',
        width: 160,
      },
    ].filter(Boolean)
  }

  return (
    <div style={{ width: '100%' }}>
      <ConfigProvider locale={zhCN}>
        <ElCard key='detail' id='detail' title='导入数据错误明细'>
          <ElSearchTable
            rowKey='id'
            tableId='failInfosModal'
            dataSource={dataSource}
            columns={getColumnsConfig()}
            scroll={{ x: 'max-content' }}
            mode={{
              proxy: false,
              search: false,
              action: true,
              pagination: true,
            }}
            rowSelectionConfig={null}
          />
        </ElCard>
      </ConfigProvider>
    </div>
  )
}

