import React from 'react';
import { ElEditTable, ElNotification } from '@/components/el';
import { maths } from '@/utils';
import { getTableColumns, getTableActionButtons } from './config';
import ItemModal from '@/project/components/el/Modal/ItemModal';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  type: any;
}

class DetailTable extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      itemModalRef: null,
      defaultSearchData: {},
      paramData: {},
    };
  }

  componentDidMount() { }

  async handleAdd() {
    await this.props.formRef
      .validateFields(['docType'])
      .catch(() => {
        ElNotification({
          type: 'warning',
          message: '请选择基础信息【出库类型】'
        });
        return Promise.reject();
      });
    await this.props.editTableRef.quitEditState();
    // this.props.editTableRef.addRow({
    //   id: maths.genFakeId(-1),
    //   serialNoList: [],
    //   whId: formRefs.whId,
    //   buId: formRefs.buId
    // });
    const formData = this.props.formRef && this.props.formRef.getFieldsValue();
    console.log(formData, 'oldCarTableRef------')
    this.setState({
      paramData: {
        buId: formData?.buId,
        whId: formData?.whId,
      }
    });
    this.state.itemModalRef && this.state.itemModalRef.setModalVisible(true);
  }


  async handleRemove({ selectedRowKeys }) {
    await this.props.editTableRef.quitEditState();
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  handleConfirm = ({ selectedRows }) => {
    const formRefs = this.props.formRef && this.props.formRef.getFieldsValue();
    const tableData = this.props.editTableRef.getRows();
    const rows = selectedRows.map(item => {
      return {
        ...item,
        id: maths.genFakeId(-1),
        serialNoList: [],
        whId: formRefs.whId,
        buId: formRefs.buId,
        itemName: {
          id: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode,
          brandName: item?.brandName,
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        qty: item.itemType === 'ALL' ? 0 : 1,
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName
        },
        amt: 0,
        ohQty: item.ohQty
      }
    });
    const itemIds = tableData.map((item) => item.itemId);
    const filterRows = rows.filter((item) => itemIds.indexOf(item.itemId) === -1);
    console.log('filterRows', filterRows);
    this.props.editTableRef.addRows(filterRows);
  };

  onItemModalRef = (ref) => {
    this.setState({
      itemModalRef: ref
    });
  };

  render() {
    return (
      <div>
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
          columns={getTableColumns(this.props.type)}
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
        <ItemModal
          onRef={this.onItemModalRef}
          defaultSearchData={this.state.defaultSearchData}
          handleConfirm={this.handleConfirm}
          paramData={this.state.paramData}
        />
      </div>
    );
  }
}
export default DetailTable;
