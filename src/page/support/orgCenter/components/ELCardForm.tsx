import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
// 未启用
interface Props extends ElFormProps {}
interface State {}
class ELCardForm extends React.Component<Props, State> {
  static defaultProps = {};
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {}

  componentWillUnmount() {}
}

export default ELCardForm;
