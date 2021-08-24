import React from 'react';
import { ElForm, ElCard, ElNotification } from '@/components/el';
import { Skeleton } from 'antd';
import { getTaskInfo, getWorkflowUser, resetTaskHandler } from './service';
import { getEditFormItems } from './config';
interface State {
  queryTaskInfoLoading: boolean;
  taskInfo: any;
  userList: Array<any>;
  formRef: any;
}
class ResetTaskHandleer extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      queryTaskInfoLoading: false,
      taskInfo: null,
      userList: [],
      formRef: null
    };
  }
  componentDidMount() {
    this.getWorkflowUser();
  }
  getTaskInfo = async (id) => {
    const res = await getTaskInfo(id);
    if (res.success) {
      this.setState({
        taskInfo: res.data
      });
    } else {
      this.setState({
        taskInfo: null
      });
    }
  };
  getWorkflowUser = async () => {
    const res = await getWorkflowUser();
    if (res.success) {
      this.setState({
        userList: res.data
      });
    }
  };
  onFormUserSelectChange = (value) => {
    this.getTaskInfo(value);
  };
  resetTaskHandler = async () => {
    const { formRef } = this.state;
    if (formRef) {
      const data = await formRef.validateFields();
      this.setState({
        queryTaskInfoLoading: true
      });
      const res = await resetTaskHandler(data);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        queryTaskInfoLoading: false
      });
    }
  };
  render() {
    const { taskInfo, queryTaskInfoLoading, userList } = this.state;
    return (
      <div style={{ marginTop: '50px' }}>
        <ElForm
          formProps={getEditFormItems({
            userList,
            onFormUserSelectChange: this.onFormUserSelectChange
          })}
        />
        <Skeleton active loading={queryTaskInfoLoading}>
          {taskInfo || queryTaskInfoLoading ? (
            <ElCard
              title='任务信息'
              style={{
                width: '100%',
                backgroundColor: '#DCDCDC'
              }}
            >
              <p>
                作为任务负责人的任务数量:
                <span style={{ fontWeight: 'bold' }}>
                  {taskInfo.assigneeCount}
                </span>
              </p>
              <p>
                作为任务候选人的任务数量:
                <span style={{ fontWeight: 'bold' }}>
                  {taskInfo.candidateCount}
                </span>
              </p>
              <p>
                配置当前用户任务节点数量:
                <span style={{ fontWeight: 'bold' }}>{taskInfo.nodeCount}</span>
              </p>
            </ElCard>
          ) : null}
        </Skeleton>
      </div>
    );
  }
}
export default ResetTaskHandleer;
