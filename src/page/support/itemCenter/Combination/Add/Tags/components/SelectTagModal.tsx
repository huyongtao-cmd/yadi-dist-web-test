import React from 'react';
import { Modal, Button, Tree } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
import request from '@/utils/request';

import { search } from '../../../../Item/service';
import { getTagList } from '../../../../Tag/service';

import {
  getTableSearchFormItems,
  getTableColumns
} from '../../../../Item/config';
import { async } from '@antv/x6/lib/registry/marker/main';

interface State {
  // selectedRowKeys: Array<any>;
  // selectedRows: Array<any>;
  treeData: Array<any>;
  checkedKeys: React.Key[];
  checkedNodes: Array<any>;
}
interface Prop {
  onRef: Function;
  visible: boolean;
  /**
   * 添加数据时回调
   * @param {Object} records
   */
  onAdd: Function;
  onClose: Function;
}

class SelectTagModal extends React.Component<Prop, State> {
  tableRef: any;
  dataList: Array<any>;
  constructor(props) {
    super(props);
    this.tableRef = {};
    this.dataList = [];
    this.state = {
      treeData: [],
      checkedKeys: [],
      checkedNodes: []
    };
  }

  componentWillMount() {
    this.getTagList(0);
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
  }

  // 获取标签组列表
  getTagList = async (id) => {
    const res = await getTagList(id);
    if (res && res.success) {
      let treeData = res.data;
      // 替换tree组件识别显示的名称
      var newTreeData = JSON.parse(
        JSON.stringify(treeData)
          .replace(/tagName/g, 'title')
          .replace(/id/g, 'key')
          .replace(/treeNodes/g, 'children')
      );
      // 添加图标
      this.appendIcon(newTreeData);
      this.generateList(newTreeData);
      this.setState({ treeData: newTreeData });
      //   this.setState({ showInfo: {}, editVisible: null });
    }
  };

  generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title, tagCode } = node;
      this.dataList.push({ key, title, tagCode });
      if (node.children) {
        this.generateList(node.children);
      }
    }
  };

  /**
   * 点击树节点触发
   * @deprecated
   * @param keys
   * @param info
   */
  onSelect = (keys: React.Key[], info: any) => {
    if (keys && keys.length > 0) {
      const tagId = keys[0];
      console.log(keys, info);
      //   this.getTagDetail(tagId);
    }
  };

  onCheck = (keys: React.Key[], info: any) => {
    this.setState({
      checkedKeys: keys,
      checkedNodes: info.checkedNodes
    });
  };

  handleAdd = (needClose) => {
    const { onAdd } = this.props;
    onAdd(this.getCheckedTags());
    if (needClose) {
      this.handleClose();
    }
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
    this.setState({
      checkedKeys: [],
      checkedNodes: []
    });
  };

  getCheckedTags = () => {
    const checkedNodes = this.state.checkedNodes
      .filter((item) => item.tagType === 'TAG')
      .map((item) => {
        const { pkey, title, tagCode } = item;
        let PName = title;
        let tagGroupCode = null;
        this.dataList.some((item) => {
          PName = item.title;
          tagGroupCode = item.tagCode;
          return item.key === pkey;
        });
        item.tagGroupName = PName;
        item.tagGroupCode = tagGroupCode;
        return item;
      });
    console.log(checkedNodes);
    return JSON.parse(
      JSON.stringify(checkedNodes)
        .replace(/title/g, 'tagName')
        .replace(/key/g, 'id')
    );
  };

  //   getTagDetail = async (tagId) => {
  //     const res = await getTagDetail(tagId);
  //     if (res && res.success) {
  //       this.setState({ showInfo: res, editVisible: null })
  //     }
  //   }

  // 标签图标
  childTagListIcon() {
    return (
      <svg width='12px' height='12px' viewBox='0 0 12 12' version='1.1'>
        <title>icon-danzi</title>
        <g
          id='支撑域模版'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g
            id='2.1.2商品中心-标签管理-选中查看'
            transform='translate(-50.000000, -146.000000)'
            fill='#ec6303'
          >
            <g id='编组-4' transform='translate(0.000000, 64.000000)'>
              <g
                id='1.通用/2.Icon图标/Line/ContainerLined'
                transform='translate(50.000000, 82.000000)'
              >
                <path
                  d='M11.0037686,3.1803115 L7.71789334,0.225161408 C7.55996753,0.0851954165 7.35523959,0.00864258868 7.14354521,0.0104150518 L1.98137853,0 C1.98137853,0 0.75,0.0748389585 0.75,1.12517715 L0.75,10.8748814 C0.75,10.8748814 0.80407852,12 1.98165896,12 L10.0186215,12 C10.0186215,12 11.25,11.9475878 11.25,10.8748814 L11.25,3.71464321 C11.2479337,3.50968202 11.1584473,3.31517983 11.0037686,3.1793447 L11.0037686,3.1803115 Z M7.73380399,1.27355136 L9.88659845,3.22419827 L8.14325986,3.22419827 C8.14325986,3.22419827 7.73218046,3.20686915 7.73218046,2.84969586 C7.73380399,2.49155578 7.73380399,1.27390292 7.73380399,1.27390292 L7.73380399,1.27355136 Z M10.4294057,10.8732701 C10.4294057,11.2503506 10.018341,11.2484172 10.018341,11.2484172 L1.98137853,11.2484172 C1.59763357,11.2484172 1.57029912,10.8732701 1.57029912,10.8732701 L1.57029912,1.12324356 C1.57029912,0.773672819 1.98137853,0.748096616 1.98137853,0.748096616 L6.91320968,0.748096616 L6.91320968,2.84809918 C6.91320968,3.88704088 8.14452917,3.97293942 8.14452917,3.97293942 L10.4300403,3.97293942 L10.4300403,10.8729918 L10.4291253,10.8729918 L10.4294057,10.8732701 Z M3.3835826,5.42622733 C3.3835826,5.63398637 3.56813441,5.80169654 3.79470629,5.80169654 L8.22570599,5.80169654 C8.45257306,5.80169654 8.63677064,5.63244828 8.63677064,5.42622733 C8.63677064,5.22034329 8.45257306,5.05108038 8.22570599,5.05108038 L3.79373217,5.05108038 C3.5668651,5.05108038 3.38265276,5.22034329 3.38265276,5.42622733 L3.3835826,5.42622733 Z M8.22570599,6.94388055 L3.79373217,6.94388055 C3.5668651,6.94388055 3.38265276,7.11314345 3.38265276,7.3193644 C3.38265276,7.52530704 3.56720457,7.69455529 3.79373217,7.69455529 L8.22473187,7.69455529 C8.45159894,7.69455529 8.63613598,7.52530704 8.63613598,7.3193644 C8.63613598,7.11314345 8.45257306,6.94388055 8.22570599,6.94388055 Z M8.22570599,8.8367393 L3.79373217,8.8367393 C3.5668651,8.8367393 3.38265276,9.0060022 3.38265276,9.21222316 C3.38265276,9.41844411 3.56720457,9.58735545 3.79373217,9.58735545 L8.22473187,9.58735545 C8.45159894,9.58735545 8.63613598,9.41844411 8.63613598,9.21222316 C8.63613598,9.0060022 8.45159894,8.8367393 8.22473187,8.8367393 L8.22570599,8.8367393 Z'
                  id='icon_container'
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
  // 给左侧目录加图标
  appendIcon = (arr, isChild: boolean = false) => {
    if (Array.isArray(arr)) {
      arr.map((item) => {
        if (item.tagType === 'GROUP') {
          this.appendIcon(item.children, true);
          item.isLeaf = false;
        }
        if (isChild) {
          item['icon'] = <this.childTagListIcon />;
        } else {
          item['icon'] = ({ expanded }) =>
            expanded ? (
              <this.parentOpenTagListIcon />
            ) : (
              <this.parentCloseTagListIcon />
            );
        }
      });
    }
  };

  // 标签组打开图标
  parentOpenTagListIcon() {
    return (
      <svg width='12px' height='12px' viewBox='0 0 12 12' version='1.1'>
        <title>icon-文件开</title>
        <g
          id='支撑域模版'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g
            id='2.1.2商品中心-标签管理-选中查看'
            transform='translate(-32.000000, -114.000000)'
          >
            <g id='编组-4' transform='translate(0.000000, 64.000000)'>
              <g
                id='1.通用/2.Icon图标/Colored/FolderOpenColored备份'
                transform='translate(32.000000, 50.000000)'
              >
                <path
                  d='M9.74422745,11.1156379 L9.74422745,2.27844178 C9.74422745,1.38543875 8.91183495,1.47207568 8.91183495,1.47207568 C8.91183495,1.47207568 6.20180969,1.47874631 6.46104017,1.47207568 C6.17449247,1.47874631 6.03803959,1.32545182 6.03803959,1.32545182 C6.03803959,1.32545182 5.84017294,0.992245381 5.48543211,0.465818247 C5.11013674,-0.0873565141 4.68030687,0.00593478232 4.68030687,0.00593478232 L1.0234132,0.00593478232 C0.0136586127,0.00593478232 -7.99360578e-15,0.958941006 -7.99360578e-15,0.958941006 L-7.99360578e-15,11.0623216 C-7.99360578e-15,12.1219604 0.818717233,11.9952834 0.818717233,11.9952834 L8.9800947,11.9952834 C9.86700506,11.9952834 9.74422745,11.1156379 9.74422745,11.1156379 Z'
                  id='Fill-1备份'
                  fill='#FAAB0F'
                ></path>
                <path
                  d='M2.57136209,3.75 L11.5012704,3.75 C11.6625958,3.75 11.8139382,3.83384762 11.9075098,3.97491429 C12.0010991,4.11605714 12.0253387,4.2971619 11.9725506,4.46085714 L9.8999317,11.6394286 C9.83045785,11.8552762 9.64122227,12 9.4286337,12 L0.498725425,12 C0.337399971,12 0.186057615,11.9162095 0.0924860141,11.7750667 C-0.00108558659,11.6339238 -0.0253429202,11.452819 0.0274451516,11.2891238 L2.10008182,4.11055238 C2.16960887,3.89470476 2.35877351,3.75 2.57136209,3.75 Z'
                  id='Fill-3'
                  fill='#FFD561'
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  // 标签组关闭图标
  parentCloseTagListIcon() {
    return (
      <svg width='12px' height='12px' viewBox='0 0 12 12' version='1.1'>
        <title>icon-文件关</title>
        <g
          id='支撑域模版'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g
            id='2.1.2商品中心-标签管理-选中查看'
            transform='translate(-32.000000, -562.000000)'
          >
            <g id='编组-4' transform='translate(0.000000, 64.000000)'>
              <g
                id='1.通用/2.Icon图标/Colored/FolderClosedColored'
                transform='translate(32.000000, 498.000000)'
              >
                <path
                  d='M11.9942275,11.1156379 L11.9942275,2.27844178 C11.9942275,1.38543875 11.161835,1.47207568 11.161835,1.47207568 C11.161835,1.47207568 6.20180969,1.47874631 6.46104017,1.47207568 C6.17449247,1.47874631 6.03803959,1.32545182 6.03803959,1.32545182 C6.03803959,1.32545182 5.84017294,0.992245381 5.48543211,0.465818247 C5.11013674,-0.0873565141 4.68030687,0.00593478232 4.68030687,0.00593478232 L1.0234132,0.00593478232 C0.0136586127,0.00593478232 -7.99360578e-15,0.958941006 -7.99360578e-15,0.958941006 L-7.99360578e-15,11.0623216 C-7.99360578e-15,12.1219604 0.818717233,11.9952834 0.818717233,11.9952834 L11.2300947,11.9952834 C12.1170051,11.9952834 11.9942275,11.1156379 11.9942275,11.1156379 Z'
                  id='Fill-1'
                  fill='#FAAB0F'
                ></path>
                <path
                  d='M11.221391,12 L0.77177254,12 C0.341507473,12 0,11.6612319 0,11.249427 L0,1.5 L11.2282275,1.5 C11.6585092,1.5 12,1.83875187 12,2.25055675 L12,11.2427785 C12,11.6612319 11.6516727,12 11.221391,12 Z'
                  id='Fill-3'
                  fill='#FFD561'
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  render() {
    const { visible } = this.props;
    const { treeData, checkedKeys } = this.state;
    return (
      <>
        <Modal
          visible={visible}
          title='添加标签'
          width={1000}
          onCancel={this.handleClose}
          footer={[
            <Button
              key='add'
              type='primary'
              onClick={() => {
                this.handleAdd(true);
              }}
            >
              添加
            </Button>,
            <Button
              key='continuousAdd'
              type='primary'
              onClick={() => {
                this.handleAdd(false);
              }}
            >
              继续添加
            </Button>,
            <Button key='cancel' onClick={this.handleClose}>
              取消
            </Button>
          ]}
          // destroyOnClose
        >
          {treeData.length > 0 && (
            <Tree
              blockNode
              checkable
              showIcon
              className='tag-list'
              checkedKeys={checkedKeys}
              // onSelect={this.onSelect}
              onCheck={this.onCheck}
              treeData={treeData}
              // loadData={this.onLoadData}
            />
          )}
        </Modal>
      </>
    );
  }
}

export default SelectTagModal;
