import React from 'react';
import { Button, Popover, Radio } from 'antd';
import {
  SettingOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  SwapOutlined
} from '@ant-design/icons';
interface ToolBarProps {
  getTableConfig: Function;
  setTableConfig: Function;
  setUpRow: Function;
  setDownRow: Function;
  swapRow: Function;
  selectionData: {
    selectedRowKeys: Array<any>;
    selectedRows: Array<any>;
    length: number;
  };
  defaultTableConfig?: {
    onBottomPressEnter: 'add' | 'save' | 'trigger' | 'noaction';
    onTableIntoEdit: 'click' | 'dbclick';
  };
}
interface State {
  onBottomPressEnter: 'add' | 'save' | 'trigger' | 'noaction';
  onTableIntoEdit: 'click' | 'dbclick';
}
const onBottomPressEnterOptions = [
  { label: '新增一行', value: 'add' },
  { label: '退出编辑', value: 'save' },
  { label: '回到表头', value: 'trigger' },
  { label: '无操作', value: 'noaction' }
];
const onTableIntoEditOptions = [
  { label: '单击', value: 'click' },
  { label: '双击', value: 'dbclick' }
];
class ToolBar extends React.Component<ToolBarProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      onBottomPressEnter: 'add',
      onTableIntoEdit: 'dbclick'
    };
  }
  componentDidMount() {
    const { getTableConfig, defaultTableConfig } = this.props;
    let config = getTableConfig();
    if (defaultTableConfig) {
      config = defaultTableConfig;
    }
    this.setState({
      onBottomPressEnter: config.onBottomPressEnter,
      onTableIntoEdit: config.onTableIntoEdit
    });
  }
  onBottomPressEnterChange = (e) => {
    const { getTableConfig, setTableConfig } = this.props;
    let config = getTableConfig();
    config.onBottomPressEnter = e.target.value;
    setTableConfig(config);
    this.setState({
      onBottomPressEnter: e.target.value
    });
  };
  onTableIntoEditChange = (e) => {
    const { getTableConfig, setTableConfig } = this.props;
    let config = getTableConfig();
    config.onTableIntoEdit = e.target.value;
    setTableConfig(config);
    this.setState({
      onTableIntoEdit: e.target.value
    });
  };
  setUpRow = () => {
    const { setUpRow, selectionData } = this.props;
    setUpRow(selectionData.selectedRowKeys[0]);
  };
  setDownRow = () => {
    const { setDownRow, selectionData } = this.props;
    setDownRow(selectionData.selectedRowKeys[0]);
  };
  swapRow = () => {
    const { swapRow, selectionData } = this.props;
    swapRow(selectionData.selectedRowKeys[0], selectionData.selectedRowKeys[1]);
  };
  render() {
    const { selectionData } = this.props;
    const { onBottomPressEnter, onTableIntoEdit } = this.state;
    return (
      <>
        <Button
          icon={<UpCircleOutlined />}
          size='small'
          className='el-pagination-button'
          disabled={selectionData.length !== 1}
          onClick={this.setUpRow}
        >
          向上移动
        </Button>
        <Button
          icon={<DownCircleOutlined />}
          size='small'
          className='el-pagination-button'
          disabled={selectionData.length !== 1}
          onClick={this.setDownRow}
        >
          向下移动
        </Button>
        <Button
          icon={<SwapOutlined />}
          size='small'
          className='el-pagination-button'
          disabled={selectionData.length !== 2}
          onClick={this.swapRow}
        >
          交换位置
        </Button>
        <Popover
          trigger='click'
          title='表格设置'
          content={
            <>
              <div>当表格编辑处于最后一行时的操作:</div>
              <Radio.Group
                options={onBottomPressEnterOptions}
                onChange={this.onBottomPressEnterChange}
                value={onBottomPressEnter}
              />
              <div>如何进入编辑状态:</div>
              <Radio.Group
                options={onTableIntoEditOptions}
                onChange={this.onTableIntoEditChange}
                value={onTableIntoEdit}
              />
            </>
          }
        >
          <Button
            icon={<SettingOutlined />}
            size='small'
            className='el-pagination-button'
          >
            表格设置
          </Button>
        </Popover>
      </>
    );
  }
}

export default ToolBar;
