import React from 'react';
import { Drawer, Row, Col, List, Input, Anchor, AutoComplete } from 'antd';
import { ElCard } from '@/components/el';
import {
  StarOutlined,
  StarFilled,
  CloseOutlined,
  RightOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import cls from 'classnames';
import Masonry from 'react-masonry-component';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AuthMobx from '@/store/auth';
import { observer } from 'mobx-react';
const { Link } = Anchor;
interface Props {
  routes: any;
  menuVisible: boolean;
  onOpen: any;
  onClose: any;
  history: any;
}
interface State {
  data: Array<any>;
  highLightTitle: string;
  selectedMenuTitle: string;
  collectionList: Array<any>;
  metaTitles: Array<any>;
  oriMetaTitles: Array<any>;
}
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  position: 'relative',
  width: '100%',
  // change background colour if dragging
  background: isDragging ? '#F5F5F5' : '#fff',

  ...draggableStyle
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#fff' : '#fff',
  width: '100%'
});
@observer
class ElMenu extends React.Component<Props, State> {
  authMobx: any;
  constructor(props: Props) {
    super(props);
    this.authMobx = AuthMobx;
    this.state = {
      data: [],
      highLightTitle: '',
      selectedMenuTitle: '',
      collectionList: [],
      metaTitles: [],
      oriMetaTitles: []
    };
  }
  componentDidMount() {
    const elCollection = localStorage.getItem('el-collection');
    if (elCollection) {
      this.setState({
        collectionList: JSON.parse(elCollection)
      });
    }
    this.getMenu3();
  }
  authMenufilter = (v) => {
    if (
      !v.meta.hidden &&
      this.authMobx.authMenuList.some((j) => j.code === v.name)
    ) {
      return true;
    }
    return false;
  };
  getMenu3 = () => {
    let arr = [];
    this.props.routes.filter(this.authMenufilter).forEach((v) => {
      if (v.routes) {
        v.routes.forEach((i) => {
          if (i.routes) {
            i.routes.forEach((j) => {
              if (j.meta && j.meta.title && !j.meta.hidden) {
                arr.push({
                  label: j.meta.title,
                  value: j.meta.title,
                  key: j.name,
                  path: j.path
                });
              }
            });
          }
        });
      }
    });
    arr = Array.from(new Set(arr));
    this.setState({
      metaTitles: arr,
      oriMetaTitles: arr
    });
  };
  navTo = (routeName) => {
    this.props.history.push(routeName);
    this.props.onClose();
    // message.success(`跳转到了${routeName}`);
  };
  isHighLight = (name) => {
    return (
      this.state.highLightTitle &&
      new RegExp(this.state.highLightTitle).test(name)
    );
  };
  collectMenu = (e, route) => {
    e.stopPropagation();
    const { collectionList } = this.state;
    this.setState(
      {
        collectionList: [...collectionList, route]
      },
      () => {
        localStorage.setItem('el-collection', JSON.stringify(collectionList));
      }
    );
  };
  unCollectMenu = (e, route) => {
    e.stopPropagation();
    const { collectionList } = this.state;
    this.setState(
      {
        collectionList: collectionList.filter((v) => v.name !== route.name)
      },
      () => {
        localStorage.setItem('el-collection', JSON.stringify(collectionList));
      }
    );
  };
  renderMenu2 = (menus) => {
    if (Array.isArray(menus)) {
      return menus.filter(this.authMenufilter).map((v) => {
        return (
          <ElCard
            key={v.name}
            title={v.meta.title}
            id={`${v.meta.title}`}
            className={cls('menu-2-card', {
              'menu-selected-field':
                v.meta.title === this.state.selectedMenuTitle
            })}
          >
            <Masonry>
              {Array.isArray(v.routes) &&
                v.routes.filter(this.authMenufilter).map((route) => {
                  return (
                    <div
                      key={route.name}
                      style={{ width: '30%', marginBottom: '10px' }}
                    >
                      <div className='menu-2-item-title'>
                        {route.meta.title}
                      </div>
                      <List
                        size='small'
                        split={false}
                        dataSource={
                          Array.isArray(route.routes)
                            ? route.routes.filter(this.authMenufilter)
                            : []
                        }
                        renderItem={(item: any) => (
                          <List.Item
                            className='menu-2-list'
                            onClick={() => this.navTo(item.path)}
                            actions={[
                              this.state.collectionList.find(
                                (v) => v.name === item.name
                              ) ? (
                                <StarFilled
                                  style={{ color: '#FAAB0F' }}
                                  key='collection'
                                  onClick={(e) => this.unCollectMenu(e, item)}
                                />
                              ) : (
                                <StarOutlined
                                  key='collection'
                                  onClick={(e) => this.collectMenu(e, item)}
                                />
                              )
                            ]}
                          >
                            <span
                              className={cls('menu-2-list-item', {
                                'menu-item-highliht': this.isHighLight(
                                  item.meta.title
                                )
                              })}
                            >
                              {item.meta.title}
                            </span>
                          </List.Item>
                        )}
                      />
                    </div>
                  );
                })}
            </Masonry>
          </ElCard>
        );
      });
    }
  };
  // setSelectedMenuTitle = (title: string) => {
  //   this.setState({
  //     selectedMenuTitle: title
  //   });
  // };
  onAnchorChange = (currentActiveLink: string) => {
    this.setState({
      selectedMenuTitle: currentActiveLink.replace('#', '')
    });
  };
  reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const { collectionList } = this.state;
    const newCollectionList = this.reOrder(
      collectionList,
      result.source.index,
      result.destination.index
    );

    this.setState({
      collectionList: newCollectionList
    });
  };
  onMenuSelect = (value, option) => {
    this.setState(
      {
        highLightTitle: value
      },
      () => {
        this.navTo(option.path);
      }
    );
  };
  onMenuChange = (value) => {
    let reg = new RegExp(value);
    this.setState({
      highLightTitle: value,
      metaTitles: this.state.oriMetaTitles.filter((v) => reg.test(v.label))
    });
  };
  render() {
    return (
      <Drawer
        placement='left'
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.menuVisible}
        getContainer={false}
        style={{ position: 'absolute' }}
        bodyStyle={{
          overflow: 'hidden'
        }}
        width='1200px'
        height='100%'
      >
        <Row className='menu-container'>
          <Col className='menu-collection' span={4}>
            <div className='collection-header'>
              <div className='collection-header-title'>
                <AppstoreOutlined className='collection-header-app' />
                {'全部功能菜单'}
              </div>
              <RightOutlined className='collection-header-right' />
            </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId='droppable' direction='vertical'>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.collectionList.map((item, index) => (
                      <Draggable
                        key={item.name}
                        draggableId={item.name}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div
                              className='collection-item-container'
                              onClick={() => this.navTo(item.path)}
                            >
                              <div className='collection-item-title'>
                                {item.meta.title}
                              </div>
                              <CloseOutlined
                                className='collection-item-close'
                                onClick={(e) => this.unCollectMenu(e, item)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Col>
          <Col span={20} className='menu-col'>
            <AutoComplete
              // dropdownClassName='certain-category-search-dropdown'
              // dropdownMatchSelectWidth={'69%'}
              style={{ width: '79%', marginBottom: '10px' }}
              options={this.state.metaTitles}
              onChange={this.onMenuChange}
              onSelect={this.onMenuSelect}
            >
              <Input.Search
                className='menu-search'
                // onSearch={this.onMenuSearch}
              />
            </AutoComplete>
            <Row className='menu-card-container'>
              <Col id='anchor-container' className='menu-2-container' span={19}>
                {this.renderMenu2(this.props.routes)}
              </Col>
              <Col className='menu-1-container' span={5}>
                <Anchor
                  style={{ marginLeft: '10px' }}
                  affix={false}
                  onChange={this.onAnchorChange}
                  showInkInFixed={true}
                  getContainer={() =>
                    document.getElementById('anchor-container')
                  }
                >
                  {this.props.routes.filter(this.authMenufilter).map((v) => {
                    return (
                      <Link
                        key={v.name}
                        title={v.meta.title}
                        href={`#${v.meta.title}`}
                      />
                    );
                  })}
                </Anchor>
              </Col>
            </Row>
          </Col>
        </Row>
      </Drawer>
    );
  }
}
export default withRouter(ElMenu);
