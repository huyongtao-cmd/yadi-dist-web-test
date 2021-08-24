import React from 'react';
import ActionButton from './ActionButton';
import { ElNotification, ElForm } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { getWorkflowUser, transfer } from '../service';
import { TransferCyan } from '@/components/el/ElIcon';
interface Props {
  getTextAreaData?: Function;
  extraData: any;
  successCallBack?: Function;
  actionBeforeCallBack?: Function;
  resetAction: Function;
}
interface State {
  formRef: any;
}
class Transfer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      formRef: null
    };
  }
  getEditForm = (): ElFormProps => {
    return {
      items: [
        {
          name: 'transferUserId',
          span: 24,
          formOption: {
            type: '$select',
            props: {
              request: getWorkflowUser,
              placeholder: '请选择委派人'
            }
          }
        },
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
  transfer = async () => {
    const { extraData, successCallBack, actionBeforeCallBack } = this.props;
    actionBeforeCallBack && (await actionBeforeCallBack());
    const { formRef } = this.state;
    let formData = formRef.getFieldsValue();
    const data = {
      taskId: extraData.taskId,
      ...formData
    };
    const res = await transfer(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '转办成功'
      });
      this.props.resetAction(this.props.extraData.processInstanceId);
      successCallBack && successCallBack();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  render() {
    return (
      <ActionButton
        text='转办'
        tooltip='将任务交给别人处理'
        needModal={true}
        icon={<TransferCyan />}
        formContent={
          <ElForm
            formProps={this.getEditForm()}
            onRef={(formRef) => {
              this.setState({
                formRef
              });
            }}
          />
        }
        modalOkText='转办'
      />
    );
  }
}
export default Transfer;
