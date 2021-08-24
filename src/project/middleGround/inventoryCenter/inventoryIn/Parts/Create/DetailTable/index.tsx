import React from 'react';
import { ElNotification, ElEditTable } from '@/components/el';
import { maths } from '@/utils';
import { Statistic } from '@/components/el/ItemComponent';
import { getTableColumns, getTableActionButtons } from './config';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  type: any;
  warehousingFlag: boolean;
}

class DetailTable extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.formRef, 'formRef')
  }

  async handleAdd() {
    await this.props.editTableRef.quitEditState();
    // const docNoParams =
    //   this.props.formRef && this.props.formRef.getFieldValue('docNo');
    // if (!docNoParams) {
    //   return ElNotification({
    //     type: 'warning',
    //     message: '请选择基础信息【采购单编号】！'
    //   });
    // }
    // todo
    this.props.editTableRef.addRow({
      id: maths.genFakeId(-1),
      serialNoList: []
      // ouId: docNoParams.ouId,
      // ouCode: '18101', // docNoParams.ouCode
      // ouName: '大昌行食品(上海)有限公司', // docNoParams.ouName
      // suppId: docNoParams.suppId,
      // suppCode: '10080025', // docNoParams.suppCode
      // suppName: '枫树屋枫树糖浆供应商', // docNoParams.suppName
      // currCode: docNoParams.currCode,
      // currName: 'RMB', // docNoParams.currName
      // paymentTerm: 'C01', // docNoParams.paymentTerm
      // paymentTermName: '发货/发票1天', // docNoParams.paymentTermName
      // docNo: docNoParams.docNo,
      // masId: docNoParams.id
    });
  }

  async handleRemove({ selectedRowKeys }) {
    await this.props.editTableRef.quitEditState();
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  render() {
    return (
      <div>
        <ElEditTable
          rowKey='id'
          bordered
          scroll={{ y: 370 }}
          onRef={this.props.onRef}
          dataSource={this.props.tableData}
          disabledTable={this.props.warehousingFlag}
          actionButtons={getTableActionButtons(
            this.handleAdd.bind(this),
            this.handleRemove.bind(this),
            this.props.warehousingFlag
          )}
          columns={getTableColumns()}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: true,
            disabledRowIds: []
          }}
          defaultTableConfig={
            {
              onBottomPressEnter: 'save',
              onTableIntoEdit: 'click'
            }
          }
        />
      </div>
    );
  }
}
export default DetailTable;
