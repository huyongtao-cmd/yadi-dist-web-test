import React from 'react';
import { Input } from 'antd';
const { TextArea: AntdTextArea } = Input;
interface Props {
  [props: string]: any;
}
interface State {
  textAreaValue: string;
}
class TextArea extends React.Component<Props, State> {
  static defaultProps = {
    autoSize: {
      minRows: 2,
      maxRows: 4
    },
    maxLength: 40
  };
  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: ''
    };
  }
  static getDerivedStateFromProps(props) {
    if (String(props.value).length <= props.maxLength) {
      return {
        textAreaValue: props.value ? String(props.value) : ''
      };
    }
    return null;
  }
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };
  render() {
    return (
      <>
        <AntdTextArea
          {...this.props}
          style={{ padding: '4px 7px' }}
          className='elTextArea'
          value={this.state.textAreaValue}
          onChange={this.onChange}
        />
      </>
    );
  }
}
export default TextArea;
