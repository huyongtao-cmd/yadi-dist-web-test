/* 商品添加流程组件 */
import React, { Component } from 'react';
import { Steps, Card } from 'antd';
import './styles.less';

const { Step } = Steps;



export default class AddItemStep extends Component {
  // constructor(props) {
  //   super(props);
  //   this.renderIcon = this.renderIcon.bind(this);
  //   this.renderTitle = this.renderTitle.bind(this);
  // }
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        index: 1,
        title: 's',
        description: '选择商品分类'
      }, {
        index: 2,
        // title: '第二个',
        description: '填写商品信息'
      }, {
        index: 3,
        // title: '第三个',
        description: '填写商品属性'
      }, {
        index: 4,
        // title: '第四个',
        description: '选择商品关联'
      }]
    };
  }


  renderTitle(title) {
    if (!title) return;
    return (
      <div>
        <span
          className='stepSpan'
        >{title}</span>
      </div>
    );
  }
  // // 渲染图标
  // renderIcon(iconStr) {
  //   if (!iconStr) return;
  //   return (
  //     <img
  //       src={require(`./icon/state_icon_${iconStr}.png`)} alt=""
  //       style={{ display: 'block' }}
  //       width="100%" height="100%"
  //     />
  //   );
  // }

  render() {
    const { list }: any = this.state;

    return (
      <Card
        bordered={false}
        className='addItemStepCard'
      >
        <Steps
          className="step"
        //  current={current - 1} className={styles.step}
        >
          {
            list?.map((item, index) => {
              // let tempFlag = current >= index + 1;
              return (
                <Step
                  key={index}
                  title={item.title}
                  description={this.renderTitle(item.description)}
                // icon={tempFlag ? this.renderIcon(item.iconName + '_selected') : this.renderIcon(item.iconName + '_default')}
                />
              );
            })
          }
        </Steps>
      </Card>
    );
  }
}


