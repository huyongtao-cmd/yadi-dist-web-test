import React from 'react';
import ActionButton from './ActionButton';
import { complete } from '../service';
import { ElNotification } from '@/components/el';
import ProcInstBpmnModal from '../../BpmnViewer/ProcInstBpmnModal';
import { AuditCyan } from '@/components/el/ElIcon';
interface Props {
  processInstanceId: string;
  getTextAreaData: Function;
  extraData: any;
  successCallBack?: Function;
}
interface State {
  modalRef: any;
}
class ShowProcessHistory extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalRef: null
    };
  }
  action = () => {
    this.state.modalRef && this.state.modalRef.setModalVisible(true);
  };
  render() {
    return (
      <>
        <ActionButton
          text='审批进度查询'
          tooltip='查看流程和审批历史'
          icon={<AuditCyan />}
          style={{ marginLeft: 'auto', marginRight: '0' }}
          action={this.action}
        />
        <ProcInstBpmnModal
          onRef={(modalRef) => this.setState({ modalRef })}
          processDefinitionId={this.props.processInstanceId}
        />
      </>
    );
  }
}
export default ShowProcessHistory;
