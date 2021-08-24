import React from 'react';
import { Modal } from 'antd';
import { ElForm, ElNotification } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { complete } from '../../service';
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
            title: '审批意见',
            name: 'comment',
            span: 24,
            rules: [
              {
                required: true,
                message: '请输入审批意见!'
              }
            ],
            formOption: {
              type: '$textArea',
              props: {
                placeholder: '请输入审批意见'
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
  complete = async () => {
    const { formRef } = this.state;
    const { getExpandTableData, tempTaskRow } = this.props;
    if (formRef) {
      const formData = await formRef.validateFields();
      console.log(tempTaskRow);
      const data = {
        ...formData,
        taskId: tempTaskRow.taskId
      };
      const res = await complete(data);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '推进成功'
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
        title='推进流程'
        visible={this.state.visible}
        width='400px'
        style={{ top: 100 }}
        onCancel={() => {
          this.setModalVisible(false);
        }}
        okText='推进流程'
        onOk={this.complete}
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
