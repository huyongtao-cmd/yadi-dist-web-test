import React from 'react';
import ActionButton from './ActionButton';
import { ElNotification, ElForm } from '@/components/el';
import { withdraw } from '../service';
import { ElFormProps } from '@/components/el/ElForm';
import { RefreshRed } from '@/components/el/ElIcon';
interface Props {
  extraData: any;
  successCallBack?: Function;
  actionBeforeCallBack?: Function;
  resetAction: Function;
}
interface State {
  formRef: any;
}
class Withdraw extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      formRef: null
    };
  }
  withDraw = async () => {
    const { extraData, successCallBack, actionBeforeCallBack } = this.props;
    actionBeforeCallBack && (await actionBeforeCallBack());
    const { formRef } = this.state;
    const data = {
      ...extraData,
      targetTaskDefKey: extraData.withdrawTaskDefKey,
      ...formRef.getFieldsValue()
    };
    const res = await withdraw(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '撤回成功'
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
    return (
      <ActionButton
        text='撤回'
        tooltip='下一个任务节点未审批时,可以撤回'
        action={this.withDraw}
        needModal={true}
        icon={<RefreshRed />}
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
        modalOkText='撤回'
      />
    );
  }
}
export default Withdraw;
