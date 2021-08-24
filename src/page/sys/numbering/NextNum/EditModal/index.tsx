// 下一编号规则明细页
import React from 'react';
import { Modal } from 'antd';
import { ElForm, ElCard } from '@/components/el';
import { getFormItems } from './config';
class EditModal extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const { modalVisible, save, cancel, onRef, data, mark } = this.props;
    return (
      <Modal
        // width={1000}
        visible={modalVisible}
        okButtonProps={{}}
        okText='保存'
        onOk={save}
        onCancel={cancel}
        keyboard={true}
        centered
        title='发号器规则'
      >
        {/* <ElCard title='发号器规则'> */}
        <ElForm
          onRef={onRef}
          data={data}
          formProps={{
            items: getFormItems(mark)
            // labelCol: { span: 40 },
            // wrapperCol: { span: 10 }
          }}
        />
        {/* </ElCard> */}
      </Modal>
    );
  }
}

export default EditModal;
