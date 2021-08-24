import React from 'react';
import { getTabsConfig } from './config';
import { ElSearchTable, ElNotification, ElTab } from '@/components/el';
import ProcInstBpmnModal from '../BpmnViewer/ProcInstBpmnModal';
interface State {
  tableRef: any;
  categoryEditLoading: boolean;
  categoryDeleteLoading: boolean;
  categorySaveLoading: boolean;
  tempProcessDefinitionId: string;
  insModalRef: any;
}
class ProcessCategory extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      categoryEditLoading: false,
      categoryDeleteLoading: false,
      categorySaveLoading: false,
      tempProcessDefinitionId: '',
      insModalRef: null
    };
  }
  componentDidMount() {}
  setTempProcessDefinitionId = (
    tempProcessDefinitionId,
    callBack?: Function
  ) => {
    this.setState(
      {
        tempProcessDefinitionId
      },
      () => {
        callBack && callBack();
      }
    );
  };
  setModalVisible = (visible: boolean) => {
    const { insModalRef } = this.state;
    if (insModalRef) {
      insModalRef.setModalVisible(visible);
    }
  };
  render() {
    return (
      <>
        <ProcInstBpmnModal
          processDefinitionId={this.state.tempProcessDefinitionId}
          onRef={(insModalRef) => {
            this.setState({
              insModalRef
            });
          }}
        />
        <ElTab
          tabs={getTabsConfig({
            setTempProcessDefinitionId: this.setTempProcessDefinitionId,
            setModalVisible: this.setModalVisible
          })}
        />
      </>
    );
  }
}
export default ProcessCategory;
