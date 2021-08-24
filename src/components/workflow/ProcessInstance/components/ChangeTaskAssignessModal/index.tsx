import React from 'react';
import { Modal } from 'antd';
import { ElForm, ElNotification } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { changeTaskAssigness, getWorkflowUser } from '../../service';
interface Props {
  tempTaskRow: any;
  onRef?: Function;
  getExpandTableData?: Function;
}
interface State {
  visible: boolean;
  formRef: any;
  formProps: ElFormProps;
}
class ChangeTaskAssignessModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formRef: null,
      formProps: {
        items: [
          {
            title: '任务负责人',
            name: 'newTaskAssigness',
            span: 24,
            rules: [
              {
                required: true,
                message: '请选择任务负责人!'
              }
            ],
            formOption: {
              type: '$select',
              props: {
                request: getWorkflowUser,
                placeholder: '请选择任务负责人'
              }
            }
          },
          {
            title: '备注',
            name: 'comment',
            span: 24,
            rules: [
              {
                required: true,
                message: '请输入备注!'
              }
            ],
            formOption: {
              type: '$textArea',
              props: {
                placeholder: '请输入备注'
              }
            }
          }
        ]
      }
    };
  }
  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef({
        setModalVisible: this.setModalVisible
      });
    }
  }
  changeTaskAssigness = async () => {
    const { formRef } = this.state;
    const { getExpandTableData, tempTaskRow } = this.props;
    if (formRef) {
      const formData = await formRef.validateFields();
      const data = {
        ...formData,
        taskId: tempTaskRow.taskId
      };
      const res = await changeTaskAssigness(data);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '修改成功'
        });
        getExpandTableData &&
          getExpandTableData(
            tempTaskRow.processInstanceId,
            tempTaskRow.businessKey
          );
        this.setModalVisible(false);
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
    }
  };
  setModalVisible = (visible: boolean) => {
    this.setState({
      visible
    });
  };
  render() {
    return (
      <Modal
        title='修改任务处理人'
        visible={this.state.visible}
        width='400px'
        style={{ top: 100 }}
        onCancel={() => {
          this.setModalVisible(false);
        }}
        okText='修改任务处理人'
        onOk={this.changeTaskAssigness}
        destroyOnClose
      >
        <ElForm
          formProps={this.state.formProps}
          onRef={(formRef) => {
            this.setState({
              formRef
            });
          }}
        />
      </Modal>
    );
  }
}
export default ChangeTaskAssignessModal;
