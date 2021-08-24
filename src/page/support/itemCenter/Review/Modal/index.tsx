import React, { useRef } from 'react';
import { Modal as AntdModal, Input, Button, Radio } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ElForm } from '@/components/el';
import { FormInstance } from 'antd/lib/form';
import { ElFormProps } from '@/components/el/ElForm';
import { CloudUploadOutlined } from '@ant-design/icons';

// import { examine as review } from '../service'

interface ExamineModalProps extends ModalProps {
  modalType?: string;
  // formRef: FormInstance,
  formData?: object;
  isAccept: boolean;
  // handleApproveChange: Function;
  getFormRef: Function;
  formRef: any

}

const getFormProps = (formData, isAccept): ElFormProps => {
  return {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    },
    items: [
      // {
      //   title: '商品名称',
      //   name: 'name',
      //   span: 24,
      //   wrapperCol: { span: 12 },
      //   formOption: {
      //     type: '$text'
      //     // render: () =><text></text>
      //   }
      // },
      // {
      //   title: '商品审核',
      //   name: 'approve',
      //   span: 24,
      //   wrapperCol: { span: 16 },
      //   formOption: {
      //     type: '$input',
      //     props: {
      //     },
      //     render: () => (
      //       <Radio.Group onChange={handleApproveChange}>
      //         <Radio value={true}>审核通过</Radio>
      //         <Radio value={false}>审核不通过</Radio>
      //       </Radio.Group>
      //     )
      //   }
      // },
      {
        title: '反馈详情',
        name: 'comment',
        span: 24,
        wrapperCol: { span: 16 },
        rules: [{ required: !isAccept }],
        formOption: {
          type: '$textArea',
          props: {
            placeholder: '请输入内容',
            autoSize: { minRows: 6, maxRows: 8 }
          }
        }
      }
    ]
  };
};

const ReviewModal = ({
  modalType,
  visible,
  formData,
  onCancel = () => { },
  onOk = () => { },
  // handleApproveChange,
  isAccept,
  getFormRef,
  formRef
}: ExamineModalProps) => {

  const onSure = async () => {
    const { validateFields }: any = formRef;
    const values = await validateFields();
    onOk({ ...{ rows: formData }, ...values });
  };

  return (
    <AntdModal
      title='商品审核'
      visible={visible}
      onCancel={onCancel}
      onOk={onSure}
    >
      请确认是否审批{isAccept ? '通过' : '不通过'}？
      <ElForm
        onRef={(ref) => { getFormRef(ref) }}
        formProps={getFormProps(formData, isAccept)}
        data={formData}
      />
    </AntdModal>
  );
};

export default ReviewModal;
