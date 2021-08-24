
import React, { PureComponent } from 'react';
import { ElEditTable } from '@/components/el';
import { getEditTableColumns, getEditTableActionButtons } from './config'
import { maths } from '@/utils';

interface Props {
  onRef: Function;
  data: any;
  submitIndex: Number;
  type: any;
  loaded: boolean;
}

interface State {
  type: string;
  formData: any;
}

export default class CustomParams extends PureComponent<Props, State> {
  paramsRef: any;
  submitIndex: Number;

  constructor(props) {
    super(props);
    this.paramsRef = {};
    this.submitIndex = 0;
    this.state = {
      type: '',
      formData: {}
    };
  }

  componentDidUpdate() {
    const { submitIndex, onRef, data, type, loaded } = this.props;
    if (type !== this.state.type) {
      if (type === 'add') {
        this.setState({
          type
        });
      } else {
        if (Object.keys(data).length !== Object.keys(this.state.formData).length && loaded) {
          this.setState({
            formData: data,
            type
          });
        }
      }
    }
    // 根据submitIndex判断是否进行提交的操作，传递最新的form
    if (this.submitIndex !== submitIndex) {
      this.submitIndex = submitIndex;
      onRef && onRef(this.paramsRef);
    }
  }
  addRows = () => {
    this.paramsRef.quitEditState(() => {
      this.paramsRef.addRow({
        id: maths.genFakeId(-1),
        tagCode: '',
        tagName: ''
      })
    });

  }
  deleteRows = (index) => {
    this.paramsRef.quitEditState(() => {
      this.paramsRef.removeRowsByKeys(index, 'rowKey');
    });
  }

  render() {
    const { formData } = this.state;
    const { type, data } = this.props;
    return (
      <ElEditTable
        pagination={false}
        bordered
        rowKey='id'
        columns={getEditTableColumns(type)}
        dataSource={data}
        onRef={(ref) => (this.paramsRef = ref)}
        rowSelectionConfig={{
          type: 'checkbox',
          fixed: true,
          disabledRowIds: []
        }}
        actionButtons={getEditTableActionButtons(this.addRows, this.deleteRows, type)}
      />
    );
  }
}
