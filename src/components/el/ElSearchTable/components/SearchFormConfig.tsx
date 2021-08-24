import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import { Modal } from 'antd';
interface Props {
  searchFormProps?: ElFormProps;
  setSearchFormProps?: Function;
}
class SearchFormConfig extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Modal></Modal>{' '}
      </>
    );
  }
}
export default SearchFormConfig;
