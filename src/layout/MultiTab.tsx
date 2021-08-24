import React from 'react';
import { message, Dropdown } from 'antd';
import { observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import MultiTabMobx from '@/store/multiTab';
import {
  DoubleleftBlack,
  DoublerightBlack,
  DownBlack
} from '@/components/el/ElIcon';
import './style.less';

const CloseIcon = ({ onCloseMultiTab, item }) => {
  const close = (e) => {
    onCloseMultiTab(e, item);
  };

  return <span className='closeCircleOutlined' onClick={close} />;
};
class MultiTab extends React.Component<any, any> {
  multiTabStore: any;

  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      left: 0,
      contentWidth: 0,
      multiEl: null
      // MultiTabMobx:,
    };
  }

  componentDidMount() {
    console.log(
      'componentDidMountcomponentDidMountcomponentDidMountcomponentDidMount'
    );
    // this.multiTabStore.checkCurrentPath();
    this.setState({
      contentWidth: document.getElementById('multitab-content').offsetWidth,
      multiEl: document.getElementById('multitab-content')
    });

    //添加动画监听事件
    document
      .getElementById('multitab-content')
      .children[0].addEventListener('animationend', function () {
        this.classList.remove('rightClickAn');
        this.classList.remove('leftClickAn');
      });
  }

  //render标签
  renderMultiTabs() {
    let { tabList, currentPage } = this.multiTabStore;
    console.log('tabListtabList', tabList);
    console.log('this.multiTabStorethis.multiTabStore', this.multiTabStore);
    return tabList.map((item, index) => {
      return (
        <li
          key={item.url}
          className={
            item.selected
              ? 'defaultBackground currentBackground'
              : 'defaultBackground'
          }
        >
          <Link
            to={{
              pathname: item.url
            }}
          >
            {item.meta.title || '未配置meta'}
          </Link>
          {index != 0 && (
            <CloseIcon
              onCloseMultiTab={(e, item) => this.onCloseMultiTab(e, item)}
              item={item}
            />
          )}
        </li>
      );
    });
  }

  //关闭标签
  onCloseMultiTab = (e, item) => {
    //判断最后一个标签无法关闭
    const { tabList } = this.multiTabStore;
    if (tabList.length == 1) {
      e.preventDefault();
      message.error('最后一个标签页,无法关闭');
      return;
    } else {
      this.multiTabStore.del(item);
    }
  };

  //关闭全部
  closeAll = () => {
    this.multiTabStore.closeAllTabs('/dashboard');
    this.setState({
      left: 0
    });
  };

  content = () => {
    return (
      <>
        <div className='el-multitab-pop-text' onClick={this.closeAll}>
          关闭全部
        </div>
        <div className='el-multitab-pop-text'>预留位置</div>
        <div className='el-multitab-pop-text'>预留位置</div>
      </>
    );
  };

  //判断标签是否超过最大宽度
  checkTabsWidth = () => {
    const { tabList } = this.multiTabStore;
    let { contentWidth } = this.state;
    //每个tab默认按100px计算,如果tab超过最大长度
    if (tabList.length * 100 > contentWidth) {
      return true;
    }
    return false;
  };

  //点击左侧
  leftClick = () => {
    let { left, multiEl } = this.state;
    if (left < 0) {
      this.setState(
        {
          left: (left += 50)
        },
        () => {
          multiEl.children[0].className = 'leftClickAn';
        }
      );
    }
  };

  //点击右侧
  rightClick = () => {
    let { left, multiEl } = this.state;
    if (this.checkTabsWidth()) {
      this.setState(
        {
          left: (left -= 50)
        },
        () => {
          multiEl.children[0].className = 'rightClickAn';
        }
      );
      // setTimeout(() => {
      //   multiEl.children[0].style.removeProperty('animation');
      // }, 4);
    }
  };

  render() {
    const { left } = this.state;
    return (
      <div className='el-multitab' style={{ boxSizing: 'content-box' }}>
        <div className='left'>
          <DoubleleftBlack
            className='el-multitab-default-icon'
            onClick={this.leftClick}
          />
        </div>
        <div className='el-multitab-box'>
          <div className='el-multitab-box-content' id='multitab-content'>
            <ul style={{ left: left + 'px' }}>{this.renderMultiTabs()}</ul>
          </div>
        </div>
        <div className='right'>
          <DoublerightBlack
            className='el-multitab-default-icon'
            onClick={this.rightClick}
          />
          <Dropdown
            overlayStyle={{ zIndex: 1070 }}
            overlay={this.content}
            placement='bottomLeft'
            overlayClassName='el-multitab-pop'
          >
            <DownBlack className='el-multitab-default-icon down' />
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default withRouter(observer(MultiTab));
