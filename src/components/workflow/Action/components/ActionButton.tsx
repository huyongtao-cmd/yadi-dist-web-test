import React from 'react';
import { Button, Modal, Tooltip } from 'antd';
interface Props {
  taskDefKey?: string;
  actionName?: string;
  text?: string;
  tooltip?: string;
  action?: Function;
  formContent?: any;
  extendParams?: any;
  modalOkText?: string;
  needModal?: boolean;
  style?: any;
  icon?: JSX.Element;
}
interface State {
  modalVisible: boolean;
  loading: boolean;
}
export default class ActionButton extends React.Component<Props, State> {
  static defaultProps = {
    needModal: false,
    text: '按钮'
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false
    };
  }
  showModal = () => {
    this.setModalVisible(true); // 显示模态
  };
  setModalVisible = (modalVisible) => {
    this.setState({
      modalVisible
    });
  };
  setLoading = (loading) => {
    this.setState({
      loading
    });
  };
  handleClick = () => {
    const { action } = this.props;
    action && action();
  };
  handleAction = async () => {
    const { action } = this.props;
    this.setLoading(true);
    action && (await action());
    this.setLoading(false);
  };
  render() {
    const { needModal } = this.props;
    return (
      <>
        <Tooltip placement='top' title={this.props.tooltip}>
          <Button
            className='action-button'
            style={this.props.style}
            icon={this.props.icon}
            onClick={() => {
              if (needModal) {
                this.showModal();
              } else {
                this.handleAction();
              }
            }}
          >
            {this.props.text}
          </Button>
        </Tooltip>

        {/* Modal */}
        {needModal && (
          <Modal
            className='workflow-actionbutton'
            title={this.props.text}
            visible={this.state.modalVisible}
            okText={this.props.modalOkText}
            onOk={() => {
              this.handleClick();
            }}
            confirmLoading={this.state.loading}
            cancelText='取消'
            onCancel={() => {
              this.setModalVisible(false);
            }}
            destroyOnClose //关闭时销毁 Modal 里的子元素
          >
            {this.props.formContent}
          </Modal>
        )}
      </>
    );
  }
}
