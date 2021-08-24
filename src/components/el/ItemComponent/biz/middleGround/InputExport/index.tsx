import React from 'react';
import { Upload, Button, message } from 'antd';
import './index.less';
import requests from '@/utils/request';
import { strings } from '@/utils';
interface Props {
  defaultFileList?: Array<any>;
  [props: string]: any;
}

const requestUrl = {
  uploadUrl: '/yst-pur/com/file/v1/upload',
  downUrl: '/yst-pur/com/file/v1/{id}/download',
  delUrl: '/yst-pur/com/file/v1/delete'
};

class InputExport extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  componentDidMount() {
    const { defaultFileList } = this.props;
    if (defaultFileList) {
      defaultFileList.forEach((row, index) => {
        row.status = 'done';
        row.uid = strings.getGuId(index);
      });
      this.setState({
        fileList: defaultFileList
      });
    }
  }
  //文件上传时的改变
  changeFile = ({ file }) => {
    console.log('....', this.props);
    console.log('file', file);
    const { fileList } = this.state;
    const { onleOne } = this.props;
    if (file.status === 'done') {
      if (file.response.success) {
        // this.props.onChange(file.response.data);
        this.setState(
          {
            fileList: [
              {
                name: file.name,
                uid: file.uid,
                size: file.size,
                status: file.status,
                ...file.response.data
              },
              ...fileList
            ]
          },
          () => {
            let submitFileList = [];
            const { fileList } = this.state;
            // 如果仅仅只能上传一个
            if (!onleOne) {
              submitFileList = fileList;
            } else {
              fileList.splice(1, fileList.length);
              submitFileList = fileList;
            }
            this.props.onChange(submitFileList);
          }
        );
      } else {
        message.error('上传失败');
      }
    }
  };

  //下载
  down = (e, data) => {
    e.stopPropagation();
    const downa = document.createElement('a');
    downa.href = requestUrl.downUrl.replace('{id}', data.id);
    downa.download = data.originalName || data.name;
    downa.style.textDecoration = 'underline';
    document.body.appendChild(downa);
    downa.click();
    document.body.removeChild(downa);
  };

  //删除
  del = async (e, row) => {
    e.stopPropagation();
    const res = await requests(requestUrl.delUrl, {
      method: 'DELETE',
      query: [row.id]
    });
    if (res.success) {
      const { fileList } = this.state;
      let updateFileList = fileList.filter((item) => {
        return item.id !== row.id;
      });
      this.setState(
        {
          fileList: updateFileList
        },
        () => {
          this.props.onChange(
            updateFileList.length === 0 ? null : updateFileList
          );
        }
      );
    } else {
      message.error(res.msg || '删除文件失败');
    }
  };

  render() {
    const { fileList } = this.state;
    return (
      <Upload
        disabled={this.props.disabled || this.props.previewMode}
        action={requestUrl.uploadUrl}
        onChange={this.changeFile}
        showUploadList={false}
      >
        {!this.props.previewMode ? (
          <Button disabled={this.props.disabled}>上传附件</Button>
        ) : (
          ''
        )}
        <div>
          {fileList.map((row, index) => {
            return (
              <div key={row.uid} className='inputExport-box'>
                <span>{row.originalName || row.name}</span>
                <span className='inputExport-button'>
                  <Button
                    size='small'
                    type='primary'
                    onClick={(e) => this.down(e, row)}
                  >
                    下载
                  </Button>
                  {!this.props.previewMode ? (
                    <Button
                      disabled={this.props.disabled}
                      size='small'
                      type='ghost'
                      danger
                      style={{ marginLeft: '10px' }}
                      onClick={(e) => this.del(e, row)}
                    >
                      删除
                    </Button>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </Upload>
    );
  }
}

export default InputExport;
