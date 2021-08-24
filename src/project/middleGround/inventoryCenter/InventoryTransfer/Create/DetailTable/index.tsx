import React from 'react';
import { ElNotification, ElEditTable } from '@/components/el';
import { maths } from '@/utils';
import { Statistic } from '@/components/el/ItemComponent';
import { getTableColumns, getTableActionButtons } from './config';
import ItemModal from '@/project/components/el/Modal/ItemModal';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  type: any;
  setNum: any;
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
      .validateFields(['oouId', 'owhId', 'iouId', 'iwhId'])
      .catch(() => {
        ElNotification({
          type: 'warning',
          message: '请选择基础信息【调出门店】、【调出仓库】【调入门店】和【调入仓库】'
        });
        return Promise.reject();
      });
    const formRefs = await this.props.formRef.getFieldsValue();
    await this.props.editTableRef.quitEditState();
    // this.props.editTableRef.addRow({
    //   id: maths.genFakeId(-1),
    //   serialNoList: [],
    //   whId: formRefs.owhId,
    //   buId: formRefs.oouId
    // });
    this.setState({
      paramData: {
        whId: formRefs.owhId,
        buId: formRefs.oouId
      }
    });
    this.state.itemModalRef && this.state.itemModalRef.setModalVisible(true);
  }
  async handleRemove({ selectedRowKeys }) {
    await this.props.editTableRef.quitEditState();
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
    const data = this.props.editTableRef.getRows();
    this.props.setNum(data)
  }

  handleConfirm = ({ selectedRows }) => {
    const formRefs = this.props.formRef && this.props.formRef.getFieldsValue();
    const tableData = this.props.editTableRef.getRows();
    const rows = selectedRows.map(item => {
      console.log(item, 'pppppppppppp')
      return {
        ...item,
        id: maths.genFakeId(-1),
        serialNoList: [],
        whId: formRefs.owhId,
        buId: formRefs.oouId,
        itemName: {
          id: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode,
          brandName: item?.brandName,
        },
        qtyUom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        dbrand: item.brand,
        amt: 0,
        qty: 0,
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName
        },
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
          columns={getTableColumns(this.props.setNum)}
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
