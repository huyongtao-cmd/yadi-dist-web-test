import React, { Component } from 'react';
import { ElCard, ElPage, ElRowContainer } from '@/components/el';
import BaseForm from './BaseForm';
import { SaveBlue } from '@/components/el/ElIcon';
import MultiTabMobx from '@/store/multiTab';

export default class WholesaleAdd extends Component {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
  }
  save = () => {
    console.log('保存');
  };
  onBack = () => {
    this.multiTabStore.closeCurrentToPath('/sale/wholesale/search');
  };
  render() {
    return (
      <ElPage>
        <ElRowContainer
          position='top'
          blocks={[
            {
              key: 'save',
              text: '保存',
              icon: <SaveBlue />,
              location: 'left',
              handleClick: this.save
            }
          ]}
          onBack={this.onBack}
        />
        <ElCard title='基本信息'>
          <BaseForm></BaseForm>
        </ElCard>
      </ElPage>
    );
  }
}
