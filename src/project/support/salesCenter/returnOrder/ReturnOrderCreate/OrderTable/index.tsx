//订单明细
import React from 'react';
import { ElNotification, ElEditTable, ELImportExcel } from '@/components/el';
import { getTableColumns, getTableActionButtons } from './config';
import { Statistic } from '@/components/el/ItemComponent';
import { maths } from '@/utils';

interface Props {
  // editTableRef: any;
  // onRef: Function;
  // tableData: Array<any>;
  formRef: any;
  // setDeleteFlags: Function;
}

class OrderTable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      // formRef: null
    };
  }

  componentDidMount() { }

  add = async () => {
    const formRefs = await this.props.formRef.validateFields();
    console.log(formRefs, 'formRefs999988888')
    await this.props.orderTableRef.quitEditState();
    this.props.orderTableRef.addRow({
      id: maths.genFakeId(-1),
      whId: formRefs.whId,
      docType: formRefs.docType
    });
  };

  del = async ({ selectedRowKeys }) => {
    console.log('删除');
    await this.props.orderTableRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.orderTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };



  onValuesChange = async (changedFields) => {

    console.log(changedFields, 'changedFields0000000')

  };

  render() {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
          {/* <span>
            总数量：
            <Statistic
              value={0}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
          <span style={{ marginLeft: '30px' }}>
            总价格：
            <Statistic
              value={0}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span> */}
        </div>
        <ElEditTable
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: false,
            disabledRowIds: []
          }}
          rowKey='id'
          bordered
          onRef={this.props.onRef}
          dataSource={this.props.data}
          scroll={{ y: 370 }}
          actionButtons={getTableActionButtons(
            this.add.bind(this),
            this.del.bind(this)
          )}
          columns={getTableColumns(this.props.formRefs)}
        />
      </>
    );
  }
}
export default OrderTable;
