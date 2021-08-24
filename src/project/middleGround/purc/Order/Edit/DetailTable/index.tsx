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
  sum:any;
}

interface State {
  qty: any;
  amt: any;
}
class DetailTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      amt: 0
    }
  }

  componentDidMount() {}

  async handleAdd() {
    await this.props.editTableRef.quitEditState();
    await this.props.formRef.validateFields();
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

  // setSum = (data) => {
  //   const {} = sum(data;
  //   this.setState({
      
  //   })
  // }

  render() {
    return (
      <div>
        {/* <div style={{ textAlign: 'right' }}>
          <span>
            总数量：
            <Statistic
              value={this.state.qty}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
          <span style={{ marginLeft: '30px' }}>
            总价格：
            <Statistic
              value={this.state.amt}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
        </div> */}
        <ElEditTable
          rowKey='id'
          bordered
          scroll={{ y: 370 }}
          onRef={this.props.onRef}
          dataSource={this.props.tableData}
          actionButtons={getTableActionButtons(
            this.handleAdd.bind(this),
            this.handleRemove.bind(this)
          )}
          columns={getTableColumns()}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: true,
            disabledRowIds: []
          }}
        />
      </div>
    );
  }
}
export default DetailTable;
