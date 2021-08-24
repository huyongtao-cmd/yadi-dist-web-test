import React from 'react';
import { Modal } from 'antd';
import { ElNotification, ElSearchTable } from '@/components/el';
import { getTableSearchFormItems, getTableColumns } from './config';
import request from '@/utils/request';
interface Props {
  onRef: Function;
  defaultSearchData: any;
  handleConfirm: Function;
  paramData?: any;
  searchModeDisabled?: any;
}
interface State {
  tableRef: any;
  modalVisible: boolean;
}

class PurPoModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      modalVisible: false
    };
  }

  componentDidMount() {

    if (this.props.onRef) {
      this.props.onRef({
        setModalVisible: this.setModalVisible
      });
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.searchModeDisabled) === JSON.stringify(prevProps.searchModeDisabled)) {
      return false;
    }
    return true;
  }

  onTableRef = (ref) => {
    this.setState({ tableRef: ref });
  };
  setModalVisible = (flag) => {
    this.setState({ modalVisible: flag });
  };
  onModalConfirm = () => {
    const selectionData = this.state.tableRef.getSelectionData();
    if (selectionData.length === 0) {
      return ElNotification({
        type: 'warning',
        message: '请至少选择一条数据'
      });
    }
    this.props.handleConfirm(selectionData);
    this.setModalVisible(false);
  };

  request = (paramData) => {
    if (Object.keys(paramData).includes('searchMode') && paramData.searchMode === 'inventory') {
      return request(`/yd-inv/invStk/findItemPage`, {
        method: 'post',
        query: {
          ...paramData,
          itemStatus: "ENABLE",
          orders: [{ asc: false, column: 'createTime' }],
          ...this.props.paramData
        }
      });
    } else {
      return request(`/yd-user/itm/itmItemYd/search`, {
        method: 'post',
        query: {
          ...paramData,
          itemStatus: "ENABLE",
          orders: [{ asc: false, column: 'createTime' }],
        }
      });
    }

  };
  tableProxy = () => ({
    request: this.request,
    errCallBack: (res) => {
      console.log(res);
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    },
    props: {
      success: 'success',
      result: 'data.records',
      total: 'data.total'
    },
    autoLoad: true
  });

  render() {
    return (
      <Modal
        closable={false}
        destroyOnClose
        title=''
        width='80%'
        visible={this.state.modalVisible}
        onCancel={() => this.setModalVisible(false)}
        onOk={this.onModalConfirm}
      >
        <ElSearchTable
          tableId='mg_purc_settle_adPaymentApplyEdit_detailTable_itemModal'
          bordered
          rowKey='id'
          onRef={this.onTableRef}
          scroll={{ x: 'min-content', y: 400 }}
          tableProxy={this.tableProxy()}
          searchFormProps={{ items: getTableSearchFormItems() }}
          columns={getTableColumns()}
        />
      </Modal>
    );
  }
}
export default PurPoModal;
