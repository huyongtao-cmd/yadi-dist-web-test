import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ElSearchTableColumns } from '../index';
import { Button, Popover, Checkbox } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { clone } from 'ramda';
import { getColumnsConfig, tranColumnsConfig } from './utils';
import './ColumnSetting.less';
interface Props {
  columns: Array<ElSearchTableColumns>;
  setColumns: Function;
  tableId: string;
}
interface State {
  columns: Array<any>;
  oriColumns: Array<any>;
  checkedColumns: Array<unknown>;
}
const grid = 4;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  width: '100%',
  // change background colour if dragging
  background: isDragging ? '#F5F5F5' : '#fff',

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#fff' : '#fff',
  // display: 'flex',
  width: '100%',
  padding: grid
  // overflow: 'auto'
});
class ColumnSetting extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      oriColumns: [],
      checkedColumns: []
    };
  }
  componentDidMount() {
    this.initColumnSetting();
  }
  initColumnSetting = () => {
    const { columns } = this.props;
    this.setState(
      {
        columns,
        oriColumns: columns,
        checkedColumns: columns.map((v) => v.dataIndex)
      },
      () => {
        // this.getColumnsConfig(columns);
      }
    );
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
    const { columns } = this.state;
    const newColumns = this.reOrder(
      columns,
      result.source.index,
      result.destination.index
    );

    this.setState({
      columns: newColumns
    });
  };
  resetColumns = () => {
    const { setColumns } = this.props;
    const { oriColumns } = this.state;
    if (setColumns) {
      setColumns(oriColumns);
      this.setState({
        columns: oriColumns,
        checkedColumns: oriColumns.map((v) => v.dataIndex)
      });
    }
  };
  onAllCheckChange = (e) => {
    const { oriColumns } = this.state;
    if (e.target.checked) {
      return this.setState({
        checkedColumns: oriColumns.map((v) => v.dataIndex)
      });
    }
    return this.setState({
      checkedColumns: []
    });
  };
  isChecked = (key: unknown) => {
    const { checkedColumns } = this.state;
    if (checkedColumns.includes(key)) {
      return true;
    }
    return false;
  };
  onItemCheckChange = (e, key: unknown) => {
    const { checkedColumns } = this.state;
    if (e.target.checked) {
      return this.setState({
        checkedColumns: Array.from(new Set(checkedColumns).add(key))
      });
    }
    const newCheckedColumns = new Set(checkedColumns);
    newCheckedColumns.delete(key);
    return this.setState({
      checkedColumns: Array.from(newCheckedColumns)
    });
  };
  saveColumnsConfig = () => {
    const { tableId } = this.props;
    const { oriColumns, columns, checkedColumns } = this.state;
    const config = getColumnsConfig(oriColumns, columns, checkedColumns);
    localStorage.setItem(tableId, JSON.stringify(config));
  };
  getColumnsConfig = (columns) => {
    const { tableId } = this.props;
    const config = localStorage.getItem(tableId);
    if (config) {
      const obj = tranColumnsConfig(JSON.parse(config), columns);
      console.log(obj);
      this.setState(
        {
          checkedColumns: obj.checkedColumns,
          columns: obj.columns
        },
        () => {
          console.log(this.state);
          this.setNewColumns();
        }
      );
    }
    return false;
  };
  setNewColumns = (callBack?: Function) => {
    const { setColumns } = this.props;
    const { columns, checkedColumns } = this.state;
    console.log(columns, checkedColumns);
    setColumns(
      clone(columns.filter((v) => checkedColumns.includes(v.dataIndex)))
    );
    if (callBack) {
      callBack();
    }
  };
  render() {
    const { columns } = this.state;
    return (
      <Popover
        content={
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId='droppable' direction='vertical'>
              {(provided, snapshot) => (
                <div
                  className='columnSetting'
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {columns.map((item, index) => (
                    <Draggable
                      key={item.dataIndex}
                      draggableId={item.dataIndex}
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
                          <Checkbox
                            checked={this.isChecked(item.dataIndex)}
                            onChange={(e) =>
                              this.onItemCheckChange(e, item.dataIndex)
                            }
                          >
                            {item.title}
                          </Checkbox>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        }
        title={
          <>
            <Checkbox
              onChange={this.onAllCheckChange}
              checked={
                this.state.checkedColumns.length ===
                this.state.oriColumns.length
              }
            >
              列显示
            </Checkbox>
            <a
              onClick={() => this.setNewColumns(this.saveColumnsConfig)}
              className='columnSetting-confirm'
            >
              确认
            </a>
            <a onClick={this.resetColumns} className='columnSetting-reset'>
              重置
            </a>
          </>
        }
        trigger='click'
      >
        <Button
          icon={<SettingOutlined />}
          size='small'
          className='el-pagination-columnconfig'
        >
          列设置
        </Button>
      </Popover>
    );
  }
}

export default ColumnSetting;
