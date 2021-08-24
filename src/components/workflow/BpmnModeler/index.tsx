import React from 'react';
import { Modal, Space } from 'antd';
import BpmnModeler from './BpmnModeler';
interface State {
  modalVisible: boolean;
  rowData: any;
  bpmnModelerRef: any;
}
interface Props {
  onRef?: Function;
}
class BpmnModelerModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      rowData: {},
      bpmnModelerRef: null
    };
  }
  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef({
        setModalVisible: this.setModalVisible
      });
    }
  }
  setModalVisible = (modalVisible: boolean, rowData: object) => {
    this.setState({
      modalVisible,
      rowData
    });
  };
  render() {
    return (
      <Modal
        className='bpmnModeler'
        title={<Space>{this.state.rowData.procDefName}</Space>}
        visible={this.state.modalVisible}
        style={{ top: 0, paddingBottom: 0 }}
        width='100%'
        maskClosable={false}
        okText='保存流程图'
        cancelText='关闭'
        destroyOnClose
        // forceRender
        onOk={() => {
          // 保存xml
          this.state.bpmnModelerRef.saveXml();
        }}
        onCancel={() => {
          // 关闭模态
          this.state.bpmnModelerRef.saveXml(() => {
            // 关闭modal
            this.setState({
              modalVisible: false
            });
            // 刷新table;
            // props.tableRef.tableReload();
          });
        }}
      >
        <div style={{ height: 'calc(100vh - 55px - 53px)' }}>
          {/* 流程编辑器 */}
          <BpmnModeler
            rowData={this.state.rowData}
            onRef={(bpmnModelerRef) => {
              this.setState({
                bpmnModelerRef
              });
            }}
          />
        </div>
      </Modal>
    );
  }
}
export default BpmnModelerModal;
