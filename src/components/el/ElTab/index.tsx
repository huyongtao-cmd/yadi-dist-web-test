/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-19 17:13:02
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-02-19 18:29:50
 */
import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import './style.less';
interface ElTabProps {
  onTabChange?: Function;
  tabs: Array<ElTabPaneProps>;
  defaultActiveKey?: string;
  onTabClick?: any;
  onRef?: Function;
  record?: any;
}
interface ElTabPaneProps {
  name: string;
  key: string;
  render?: Function;
}
interface State {
  activeKey: string;
}
class ElTab extends React.Component<ElTabProps, State> {
  static defaultProps = {
    tabs: [],
    defaultActiveKey: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    };
  }
  componentDidMount() {
    const { defaultActiveKey, tabs, onRef } = this.props;
    if (onRef) {
      onRef({
        getActiveKey: this.getActiveKey,
        setActiveKey: this.setActiveKey
      });
    }
    if (defaultActiveKey) {
      this.setActiveKey(defaultActiveKey);
    } else {
      if (tabs.length >= 1) {
        this.setActiveKey(tabs[0].key);
      }
    }
  }
  onTabChange = (key: string) => {
    this.setActiveKey(key, () => {
      const { onTabChange } = this.props;
      if (onTabChange) {
        onTabChange(key);
      }
    });
  };
  setActiveKey = (key: string, callBack?: Function) => {
    this.setState(
      {
        activeKey: key
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };
  getActiveKey = () => {
    return this.state.activeKey;
  };
  render() {
    const { defaultActiveKey, tabs, onTabClick, record } = this.props;
    const { activeKey } = this.state;
    return (
      <div className='el-tab'>
        <Tabs
          activeKey={activeKey}
          onChange={this.onTabChange}
          onTabClick={onTabClick}
        >
          {tabs &&
            Array.isArray(tabs) &&
            tabs.map((tab) => {
              const { name, key, render } = tab;
              return (
                <TabPane tab={name} key={key} forceRender={true}>
                  {render(record ? record : {})}
                </TabPane>
              );
            })}
        </Tabs>
      </div>
    );
  }
}
export type { ElTabPaneProps, ElTabProps };
export default ElTab;
