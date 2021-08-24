import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ElCard } from '@/components/el';


export default ({ dataSource }) => {
  console.log(dataSource, 'dataSourcedataSource');
  const getColumnsConfig = () => {
    return [
      {
        title: '商品编码',
        key: 'itemCode',
        dataIndex: 'itemCode',
        width: 120,
      },
      {
        title: '失败原因',
        key: 'remarkDocStatus',
        dataIndex: 'remarkDocStatus',
        width: 160,
      },
    ]
  }

  return (
    <div style={{ width: '100%' }}>
      <ConfigProvider locale={zhCN}>
        <ElCard key='detail' id='detail' title='导入失败信息'>
          <ElSearchTable
            rowKey='id'
            tableId='ImportFailModal'
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

