import React from 'react';
import ActionButton from './ActionButton';
import { ElNotification, ElForm } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { getBackNodes, reject } from '../service';
import { List, Radio } from 'antd';
import { ACTION_TYPE } from '../../constance';
import dayjs from 'dayjs';
import { CancelRed } from '@/components/el/ElIcon';
interface Props {
  getTextAreaData?: Function;
  extraData: any;
  successCallBack?: Function;
  actionBeforeCallBack?: Function;
  resetAction: Function;
}
interface State {
  formRef: any;
  backNodes: Array<any>;
}
class Reject extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      formRef: null,
      backNodes: []
    };
  }
  componentDidMount() {
    this.getBackNodes();
  }
  getBackNodes = async () => {
    const { extraData } = this.props;
    const res = await getBackNodes(extraData.processInstanceId);
    if (res.success) {
      this.setState({
        backNodes: res.data
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
        },
        {
          name: 'targetActInsId',
          span: 24,
          formOption: {
            render: () => {
              return (
                <Radio.Group style={{ width: '100%' }}>
                  <List
                    itemLayout='horizontal'
                    dataSource={this.state.backNodes}
                    header='请选择可驳回节点:'
                    locale={{ emptyText: '暂无可驳回的节点' }}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Radio value={item.actId} />}
                          title={item.actName}
                          description={
                            item.actType == 'userTask' ? (
                              //用户任务节点
                              <div>
                                <div>处理人:{item.username}</div>
                                <div>类型:{ACTION_TYPE[item.commentType]}</div>
                                <div>审批意见:{item.commentMessage}</div>
                                <div>
                                  审批时间:
                                  {dayjs(item.endTime).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                  )}
                                </div>
                              </div>
                            ) : (
                              //会签节点
                              <div>
                                <div>处理人:{item.usernames?.join(',')}</div>
                              </div>
                            )
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Radio.Group>
              );
            },
            props: {
              placeholder: '请输入审批意见'
            }
          }
        }
      ]
    };
  };
  reject = async () => {
    const { extraData, successCallBack, actionBeforeCallBack } = this.props;
    actionBeforeCallBack && (await actionBeforeCallBack());
    const { formRef } = this.state;
    let formData = formRef.getFieldsValue();
    const data = {
      processInstanceId: extraData.processInstanceId,
      ...formData
    };
    const res = await reject(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '拒绝成功'
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
        text='驳回'
        tooltip='下一个任务节点未审批时,可以撤回'
        needModal={true}
        action={this.reject}
        icon={<CancelRed />}
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
        modalOkText='驳回'
      />
    );
  }
}
export default Reject;
