import React from 'react';
import { Select } from 'antd';
// import { clone } from 'mathjs';

const { Option } = Select;

interface Props {
  defaultValue?: any;
  onChange?: Function;
  dataSource?: Array<any>;
  disabled?: any;
}
interface State {
  newDataSource?: Array<any>;
  newDefaultValue?: Array<any>;
}

let arr = [];
let cloneArr = [];

class ItemAttrList extends React.Component<Props, State> {
  formRef: any;
  constructor(props) {
    super(props);
    this.state = {
      newDataSource: [],
      newDefaultValue: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { dataSource, defaultValue } = props;
    console.log(dataSource);
    if (
      state.newDataSource !== dataSource ||
      state.defaultValue !== defaultValue
    ) {
      arr = defaultValue || [];
      cloneArr = [];
      return {
        newDataSource: dataSource,
        newDefaultValue:
          defaultValue && JSON.parse(JSON.stringify(defaultValue))
      };
    }
    return null;
  }

  /**
   * select change
   * @param index
   * @param value
   * @param name
   */
  onChange = async (index: any, value: any, name: string) => {
    const { dataSource } = this.props;
    // 先给数组中用undefined占位，保证顺序不变
    if (arr?.length === 0) {
      for (var i = 0; i < dataSource.length; i++) {
        arr.push('');
        cloneArr.push('');
      }
    }

    // 组装数据
    arr?.splice(index, 1, value);
    // cloneArr.splice(index, 1, { name, value });

    // 把数据转成 sting 的展示格式
    // let attrString = '';
    // cloneArr.map((item) => {
    //   if (item !== 'undefined') {
    //     attrString = attrString + item?.name + ':' + item?.value + '  ';
    //   }
    // });
    //  this.setState({
    //   newDefaultValue:arr
    //  })

    if (this.props.onChange) this.props.onChange(arr);
  };

  render() {
    const { dataSource, defaultValue, disabled } = this.props;
    // const { newDefaultValue } = this.state;
    // console.log(this.props, '----this.props-----', arr);

    return (
      <div style={{ display: 'flex' }}>
        {dataSource &&
          dataSource.map((item, i) => {
            let val = [];
            if (defaultValue && defaultValue.length > 0) {
              val = defaultValue.slice(i, i + 1);
            }
            return (
              <Select
                placeholder={`请选择${item?.attrName}`}
                key={item?.attrId}
                defaultValue={val[0]}
                disabled={disabled ? disabled : false}
                // value={arr[i]}
                onChange={(value) => this.onChange(i, value, item.attrName)}
              >
                {item.attrValueList.map((v) => (
                  <Option key={v} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>
            );
          })}
      </div>
    );
  }
}
export default ItemAttrList;
