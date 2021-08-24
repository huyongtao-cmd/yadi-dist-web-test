import React from 'react';
import ActionButton from './ActionButton';
import { ElNotification, ElForm } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { getWorkflowUser, delegation } from '../service';
import { UserCyan } from '@/components/el/ElIcon';
interface Props {
  extraData: any;
  successCallBack?: Function;
  actionBeforeCallBack?: Function;
  resetAction: Function;
}
interface State {
  formRef: any;
}
class Delegation extends React.Component<Props, State> {
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
          name: 'delegationUserId',
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
  delegation = async () => {
    const { extraData, successCallBack, actionBeforeCallBack } = this.props;
    actionBeforeCallBack && (await actionBeforeCallBack());
    const { formRef } = this.state;
    let formData = formRef.getFieldsValue();
    const data = {
      taskId: extraData.taskId,
      ...formData
    };
    const res = await delegation(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '委派成功'
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
        text='委派'
        tooltip='将任务交给一个人进行审批,审批完后,再回到自己这边处理'
        needModal={true}
        action={this.delegation}
        icon={<UserCyan />}
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
        modalOkText='委派'
      />
    );
  }
}
export default Delegation;
