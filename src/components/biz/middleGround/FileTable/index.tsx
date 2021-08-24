import React from 'react';
import { Table, Button, Upload, message, Space } from 'antd';
import './index.less';
import dayjs from 'dayjs';
import requests from '@/utils/request';
interface State {
  column: any;
  selectedRowKeys: any;
  dataSource: any;
  fileList: any;
}
interface Props {
  onRef: Function;
  disabled?: any;
}

const config = {
  uploadUrl: `/yst-pur/com/file/v1/upload`,
  // downLoadUrl: `${process.env.REACT_APP_SERVER_HOST}/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/{id}/download`,
  // previewUrl: `/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/{id}/show?thumbnail=false`,
  // removeUrl: `/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/{id}`
};

const constPrefixStr =
  process.env.NODE_ENV !== 'development' ? 'yst-nrp-fe' : '';

class FileTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      column: [
        {
          title: '附件名称',
          dataIndex: 'originalName',
          key: 'originalName'
        },
        {
          title: '上传时间',
          dataIndex: 'modifyTime',
          key: 'modifyTime',
          render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          title: '操作',
          key: 'action',
          render: (record) => (
            <Space size='middle'>
              <a onClick={() => this.download(record)}>下载</a>
              {/* <a>预览</a> */}
            </Space>
          )
        }
      ],
      selectedRowKeys: [0],
      dataSource: [],
      fileList: []
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  setList = (list) => {
    this.setState({
      fileList: list
    });
    return list;
  };
  download = async (data) => {
    const downa = document.createElement('a');
    downa.href = `${constPrefixStr}/yst-pur/com/file/v1/${data.id}/download`;
    downa.download = data.originalName;
    downa.style.textDecoration = 'underline';
    document.body.appendChild(downa);
    downa.click();
    document.body.removeChild(downa);
  }
  handleDelete = async () => {
    console.log(this.state.selectedRowKeys);
    const { selectedRowKeys } = this.state;
    const fileList = this.state.fileList;
    const deleteParam = fileList.map((item) => {
      if (selectedRowKeys.includes(item.id)) {
        return item.id;
      }
    }).filter(Boolean);
    const res = await requests(`/yst-pur/com/file/v1/delete`, {
      method: 'DELETE',
      query: deleteParam
    });
    console.log(deleteParam, 'deleteParam');
    if (res.success) {
      this.setState({
        fileList: fileList.filter((item) => !selectedRowKeys.includes(item.id)),
      });
      message.success('成功');
      console.log(res, 'resssssssssssssss');
    } else {
      message.error('failed');
    }

  };
  beforeUpload = (file) => {
    console.log(file);
    return true;
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    console.log(this.state.fileList);
  };

  onChange = (info) => {
    console.log(info, 'info');
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name}上传成功`);
      const file = {
        ...info.file.response.data,
        originalName: info.file.name
      }
      this.setState({
        fileList: [...this.state.fileList, file],
        dataSource: info
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}上传失败`);
    }
  }
  render() {
    const { column, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div className='fileTable'>
        <div className='fileTable-top-button' key={Math.random()}>
          <Button className='el-btn-default' disabled={this.props.disabled}>
            <Upload
              action={config.uploadUrl}
              accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              listType='text'
              multiple={false}
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              onChange={this.onChange}
            >
              上传附件
            </Upload>
          </Button>
          <Button
            className='el-btn-default'
            onClick={this.handleDelete}
            disabled={this.props.disabled}
          >
            删除
          </Button>
        </div>
        <Table
          rowSelection={
            rowSelection
          }
          columns={column}
          pagination={false}
          size='small'
          rowKey='id'
          dataSource={this.state.fileList}
        />
      </div>
    );
  }
}

export default FileTable;
