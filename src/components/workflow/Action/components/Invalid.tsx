import React from 'react';
import ActionButton from './ActionButton';
import { ElNotification, ElForm } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { InvalidRed } from '@/components/el/ElIcon';
import { invalid } from '../service';
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
class Invalid extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      formRef: null
    };
  }
  invalid = async () => {
    const { extraData, successCallBack, actionBeforeCallBack } = this.props;
    actionBeforeCallBack && (await actionBeforeCallBack());
    const { formRef } = this.state;
    const data = {
      ...extraData,
      ...formRef.getFieldsValue()
    };
    const res = await invalid(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '作废成功'
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
              placeholder: '请输入作废意见'
            }
          }
        }
      ]
    };
  };
  render() {
    return (
      <ActionButton
        text='作废'
        tooltip='作废当前流程和单据'
        action={this.invalid}
        needModal={true}
        icon={<InvalidRed />}
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
        modalOkText='作废'
      />
    );
  }
}
export default Invalid;
