import React, { Component } from 'react';
import { ElForm } from '@/components/el';

import { getFormItems } from './config';

export default class Rule extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ElForm
          onRef={this.props.getRuleRef}
          data={this.props?.ruleData}
          formProps={{
            items: getFormItems(this.props.type)
          }}
        />
      </div>
    );
  }
}
