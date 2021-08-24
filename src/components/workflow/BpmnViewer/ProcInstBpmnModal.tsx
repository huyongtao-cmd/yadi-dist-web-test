import React from 'react';
import { Modal } from 'antd';
import ProcInsBpmn from './ProcInsBpmn';
import ProcessHistory from '../ProcessHistory';
interface Props {
  processDefinitionId: string;
  onRef?: Function;
}
interface State {
  visible: boolean;
}
class ProcDefBpmnModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
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
  setModalVisible = (visible: boolean) => {
    this.setState({
      visible
    });
  };
  render() {
    return (
      <Modal
        title='流程图'
        visible={this.state.visible}
        width='80vw'
        style={{ top: 100 }}
        onCancel={() => {
          this.setModalVisible(false);
        }}
        footer={null}
        destroyOnClose
      >
        <div>
          {/* 流程图 */}
          <ProcInsBpmn processDefinitionId={this.props.processDefinitionId} />
          <ProcessHistory processInstanceId={this.props.processDefinitionId} />
        </div>
      </Modal>
    );
  }
}
export default ProcDefBpmnModal;
