import React from 'react';
import ColumnSetting from './ColumnSetting';
import { Button, Popover, Checkbox } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { ElSearchTableColumns } from '../index';
interface ToolBarProps {
  columns: Array<ElSearchTableColumns>;
  setColumns: Function;
  tableId: string;
}
interface State {}
class ToolBar extends React.Component<ToolBarProps, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <ColumnSetting
          tableId={this.props.tableId}
          columns={this.props.columns}
          setColumns={this.props.setColumns}
        />
      </>
    );
  }
}

export default ToolBar;
