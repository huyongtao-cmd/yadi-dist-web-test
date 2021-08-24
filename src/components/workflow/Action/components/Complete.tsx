import React from 'react';
import ActionButton from './ActionButton';
import { complete } from '../service';
import { ElNotification } from '@/components/el';
import { SubmitCyan } from '@/components/el/ElIcon';
interface Props {
  getTextAreaData: Function;
  extraData: any;
  successCallBack?: Function;
  actionBeforeCallBack?: Function;
  resetAction: Function;
}
const Complete = (props: Props) => {
  const completeProcess = async () => {
    props.actionBeforeCallBack && (await props.actionBeforeCallBack());
    const { getTextAreaData, extraData, successCallBack } = props;
    const data = {
      taskId: extraData.taskId,
      ...getTextAreaData()
    };
    const res = await complete(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '审批成功'
      });
      props.resetAction(props.extraData.processInstanceId);
      successCallBack && successCallBack();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  return (
    <ActionButton
      text='同意'
      tooltip='将流程推到下一个任务节点'
      action={completeProcess}
      icon={<SubmitCyan />}
    />
  );
};
export default Complete;
