import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import './style.less';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  FormInstance,
  FormItemProps,
  FormProps as AntdFormProps
} from 'antd/lib/form';

import ElFormItem from './components/ElFormItem';
interface ElFormProps extends AntdFormProps {
  items?: Array<ElFormItemProps>;
  span?: number;
}
interface ElFormItemProps extends FormItemProps {
  title?: string;
  name?: string;
  dataIndex?: string;
  hidden?: boolean;
  span?: number;
  form?: FormInstance;
  className?: string;
  formOption: {
    type?: string;
    props?: {
      domain?: string;
      udc?: string;
      request?: Function;
      mode?: 'multiple' | 'tags';
      [props: string]: any;
    };
    render?: Function;
    events?: {
      onChange?: Function;
      [props: string]: any;
    };
  };
}
interface Props {
  onRef?: Function;
  formProps?: ElFormProps;
  rowClassName?: string;
  data?: any;
  children?: any;
  title?: string;
  id?: string;
}
const ElForm = (props: Props) => {
  const [form] = Form.useForm();
  // const [collapse, setCollapse] = useState(true);
  useEffect(() => {
    if (props.onRef) {
      props.onRef(form);
    }
  }, []);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue(props.data);
    }
  }, [props.data]);
  return (
    <>
      {props.title && (
        <div className='elform-title-container'>
          <p className='elform-title'>{props.title}</p>
        </div>
      )}
      <Form
        id={props.id}
        name='el_search'
        layout='horizontal'
        labelAlign='right'
        size='small'
        labelCol={{ style: { width: 100 } }} // 默认值
        {...props.formProps}
        form={form}
      >
        {props.children ? (
          props.children
        ) : (
          <Row className={props.rowClassName} align='middle'>
            {props.formProps?.items &&
              Array.isArray(props.formProps?.items) &&
              props.formProps?.items
                .filter((e) => !e.hidden)
                .map((v) => {
                  return (
                    <Col
                      span={v.span || 6}
                      key={v.name}
                      style={{ padding: '0 20px' }}
                      className={'ant-storeControl'}
                    >
                      <ElFormItem {...v} form={form} />
                    </Col>
                  );
                })}
          </Row>
        )}
      </Form>
    </>
  );
};
export type { ElFormProps, ElFormItemProps };
export default ElForm;
