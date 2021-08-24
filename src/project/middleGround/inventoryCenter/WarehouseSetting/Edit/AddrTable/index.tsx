import React from 'react';
import dayjs from 'dayjs';
import { maths } from '@/utils';
import { ElNotification, ElEditTable, ELImportExcel } from '@/components/el';
import { getTableColumns, getTableActionButtons } from './config';

interface State {
  importModalRef: any;
  ptype: String;
}
interface Props {
  onRef: Function;
  editTableRef: any;
  formRef: any;
  dataSource: Array<any>;
}
class AddrTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      importModalRef: null,
      ptype: 'CUST'
    };
  }
  create = async () => {
    const formData = await this.props.formRef.validateFields();
    console.log(formData);
    this.props.editTableRef.addRow({
      id: maths.genFakeId(-1),
      // deter2: formData.deter2,
      // reasonCode: formData.reasonCode,
      // // 失效日期 生效日期默认当天
      // manuDate: dayjs().format('YYYY-MM-DD'),
      // expireDate: dayjs().format('YYYY-MM-DD'),
      // toLotNo: dayjs().format('YYMMDD') + '/' + dayjs().format('YYMMDD')
    });
  };
  del = async ({ selectedRowKeys }) => {
    console.log(selectedRowKeys);
    await this.props.editTableRef.quitEditState();
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };

  setStateData = (params, back) => {
    this.setState(params, back);
  };
  
  render() {
    return (
      <>
        <ElEditTable
          rowKey='id'
          tableId='inventoryAdjustEdit'
          scroll={{ y: 206 }}
          onRef={this.props.onRef}
          actionButtons={getTableActionButtons(
            this.create,
            this.del
          )}
          columns={getTableColumns(this.state.ptype, this.setStateData)}
          dataSource={this.props.dataSource}
        />
      </>
    );
  }
}

export default AddrTable;
