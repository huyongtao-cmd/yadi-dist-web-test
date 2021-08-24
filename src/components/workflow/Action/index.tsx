import React from 'react';
import { Skeleton } from 'antd';
import { getTaskNodeConfigByProcInstId } from './service';
import { ElForm } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import {
  Complete,
  Withdraw,
  Invalid,
  Reject,
  Delegation,
  Transfer,
  ShowProcessHistory
} from './components';
import './index.less';
interface Props {
  processInstanceId: string;
  actionBeforeCallBack?: Function;
  successCallBack?: Function;
}
interface State {
  loading: boolean;
  config: {
    withdrawAble: boolean;
    transferAble: boolean;
    delegationAble: boolean;
    rejectedFromAble: boolean;
    completeAble: boolean;
    invalidAble: boolean;
    taskId: string;
    taskDefKey: string;
  };
  formRef: any;
}
class Action extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      config: {
        withdrawAble: false,
        transferAble: false,
        delegationAble: false,
        rejectedFromAble: false,
        completeAble: false,
        invalidAble: false,
        taskId: '',
        taskDefKey: ''
      },
      formRef: null
    };
  }
  setLoading = (loading: boolean) => {
    this.setState({
      loading
    });
  };
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      !this.props.processInstanceId ||
      this.props.processInstanceId === prevProps.processInstanceId
    ) {
      return false;
    }
    return true;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.getWorkFlowInfoByProcessInstanceId(this.props.processInstanceId);
    }
  }
  componentDidMount() {
    this.getWorkFlowInfoByProcessInstanceId(this.props.processInstanceId);
  }
  getWorkFlowInfoByProcessInstanceId = async (processInstanceId) => {
    if (!processInstanceId) {
      return;
    }
    this.setLoading(true);
    const res = await getTaskNodeConfigByProcInstId(processInstanceId);
    if (res.success) {
      this.setState({
        config: res.data
      });
    }
    this.setLoading(false);
  };
  getTextAreaData = () => {
    const { formRef } = this.state;
    if (!formRef) {
      return {
        comment: ''
      };
    }
    return formRef.getFieldsValue();
  };
  getEditForm = (): ElFormProps => {
    return {
      items: [
        {
          name: 'comment',
          span: 24,
          formOption: {
            type: '$textArea',
            props: {
              placeholder: '请输入审批意见'
            }
          }
        }
      ]
    };
  };
  render() {
    const { config } = this.state;
    const { actionBeforeCallBack, successCallBack } = this.props;
    if (!this.props.processInstanceId) {
      return null;
    } else {
      return (
        <Skeleton active loading={this.state.loading}>
          <div className='workflow-btn-container'>
            {/***********************************  通过 ***********************************/}
            {config.completeAble && (
              <Complete
                resetAction={this.getWorkFlowInfoByProcessInstanceId}
                getTextAreaData={this.getTextAreaData}
                extraData={{
                  ...this.state.config,
                  processInstanceId: this.props.processInstanceId
                }}
                actionBeforeCallBack={actionBeforeCallBack}
                successCallBack={successCallBack}
              />
            )}
            {/***********************************  撤回 ***********************************/}
            {config.withdrawAble && (
              <Withdraw
                resetAction={this.getWorkFlowInfoByProcessInstanceId}
                extraData={{
                  ...this.state.config,
                  processInstanceId: this.props.processInstanceId
                }}
                actionBeforeCallBack={actionBeforeCallBack}
                successCallBack={successCallBack}
              />
            )}
            {/***********************************  作废 ***********************************/}

            {config.invalidAble && (
              <Invalid
                resetAction={this.getWorkFlowInfoByProcessInstanceId}
                extraData={{
                  ...this.state.config,
                  processInstanceId: this.props.processInstanceId
                }}
                actionBeforeCallBack={actionBeforeCallBack}
                successCallBack={successCallBack}
              />
            )}
            {/***********************************  驳回 ***********************************/}

            {config.rejectedFromAble && (
              <Reject
                resetAction={this.getWorkFlowInfoByProcessInstanceId}
                extraData={{
                  ...this.state.config,
                  processInstanceId: this.props.processInstanceId
                }}
                actionBeforeCallBack={actionBeforeCallBack}
                successCallBack={successCallBack}
              />
            )}
            {/***********************************  委派 ***********************************/}

            {config.delegationAble && (
              <Delegation
                resetAction={this.getWorkFlowInfoByProcessInstanceId}
                extraData={{
                  ...this.state.config,
                  processInstanceId: this.props.processInstanceId
                }}
                actionBeforeCallBack={actionBeforeCallBack}
                successCallBack={successCallBack}
              />
            )}
            {/***********************************  转办 ***********************************/}

            {config.transferAble && (
              <Transfer
                resetAction={this.getWorkFlowInfoByProcessInstanceId}
                extraData={{
                  ...this.state.config,
                  processInstanceId: this.props.processInstanceId
                }}
                actionBeforeCallBack={actionBeforeCallBack}
                successCallBack={successCallBack}
              />
            )}
            <ShowProcessHistory
              processInstanceId={this.props.processInstanceId}
              getTextAreaData={this.getTextAreaData}
              extraData={{
                ...this.state.config,
                processInstanceId: this.props.processInstanceId
              }}
            />
          </div>
          <ElForm
            formProps={this.getEditForm()}
            onRef={(formRef) => {
              this.setState({
                formRef
              });
            }}
          />
        </Skeleton>
      );
    }
  }
}
export default Action;
