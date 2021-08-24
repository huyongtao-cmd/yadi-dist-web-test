import { ElCard, ElForm, ElPage, ElRowContainer } from '@/components/el';
import { SaveWhite } from '@/components/el/ElIcon';
import { getFormItems } from './config';
import React from 'react';
import { Button } from 'antd';
import { asserts, maths } from '@/utils';
import * as service from '../../service';
import { clone } from 'ramda';

interface Props {
  formRef: any;
  onRef: any;
  editTableRef: any;
  formData: Object;
  type: String;
}
class ExamBaseForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      whRef: null,
    }
  }

  render() {
    return (
      <>
        <ElForm
          data={this.props.formData}
          onRef={this.props.onRef}
          formProps={{
            items: getFormItems()
          }}
        />
      </>

    )
  }
}

export default ExamBaseForm;