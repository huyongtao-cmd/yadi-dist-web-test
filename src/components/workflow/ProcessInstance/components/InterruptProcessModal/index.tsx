import React from 'react';
import { Modal } from 'antd';
import { ElForm, ElNotification } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { interupProcess } from '../../service';
interface Props {
  processDefinitionId: string;
  getTableData?: Function;
  onRef?: Function;
}
interface State {
  visible: boolean;
  formRef: any;
  formProps: ElFormProps;
}
class InterruptProcessModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formRef: null,
      formProps: {
        items: [
          {
            title: '中断原因',
            name: 'comment',
            span: 24,
            rules: [
              {
                required: true,
                message: '请输入中断原因!'
              }
            ],
            formOption: {
              type: '$textArea',
              props: {
                placeholder: '中断原因'
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
  interupProcess = async () => {
    const { formRef } = this.state;
    const { getTableData } = this.props;
    if (formRef) {
      const formData = formRef.validateFields();
      const data = {
        ...formData,
        processInstanceId: this.props.processDefinitionId
      };
      const res = await interupProcess(data);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '中断成功'
        });
        getTableData && getTableData();
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
        title='中断流程'
        visible={this.state.visible}
        width='400px'
        style={{ top: 100 }}
        onCancel={() => {
          this.setModalVisible(false);
        }}
        okText='中断流程'
        onOk={this.interupProcess}
        destroyOnClose
      >
        <p style={{ color: 'red' }}>
          使用场景:当流程设计有误时,可中断已起流程,业务变成草稿状态,管理员重新部署新流程,部署后业务重新发起新流程
        </p>
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
export default InterruptProcessModal;
