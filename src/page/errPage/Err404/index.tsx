import React from 'react';
import './style.less';
interface Props {
  history: any;
}

export default class Err404 extends React.Component<Props, {}> {
  store: any;

  constructor(props) {
    super(props);
  }

  render() {
    return <div className='err404'></div>;
  }
}
