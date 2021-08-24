import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ElNotification } from '@/components/el';
import request from '@/utils/request';
import { clone } from 'ramda';
interface Props {
  value?: any;
  url?: string;
  onChange?: Function;
  buttonText?: string;
  fileListLen?: any;
  [props: string]: any;
  orderCode?: string;
  onFileChange?: Function;
  onUploadErr?: Function;
  onRemoveErr?: Function;
}
const config = {
  uploadUrl: `/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/upload`,
  downLoadUrl: `/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/{id}/download`,
  previewUrl: `/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/{id}/show?thumbnail=false`,
  removeUrl: `/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/{id}`,
  searchUrl: `/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/query`
};

interface State {
  fileList: Array<any>;
  data: unknown[];
  loading: boolean;
}
const getFilesInfo = (idList) => {
  return request(config.searchUrl, {
    method: 'post',
    query: idList
  });
};
const downLoadFile = (id) => {
  return request(config.downLoadUrl.replace('{id}', id), {
    method: 'get',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
};
class FileUpload extends React.Component<Props, State> {
  static defaultProps = {
    buttonText: '上传',
    value: [],
    fileListLen: 1
  };
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      data: [],
      loading: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    // 设置 fileList
    const { value } = props;
    const values = value && Array.isArray(value) ? value : [value];
    if (values && JSON.stringify(values) !== JSON.stringify(state.value)) {
      return {
        value: values
      };
    } else {
      return null;
    }
  }
  componentDidMount() {
    if (this.props.value && Array.isArray(this.props.value)) {
      this.getFilesInfo(this.props.value);
    }
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.value) === JSON.stringify(prevProps.value)) {
      return false;
    }
    return true;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.getFilesInfo(this.props.value);
    }
  }
  getFilesInfo = async (value) => {
    this.setState({ loading: true });
    const res = await getFilesInfo(value);
    if (res.success) {
      this.setState({
        loading: false,
        fileList: res.data.map((v) => {
          return {
            uid: v.id,
            name: v.originalName || v.id,
            status: 'done',
            url: `${config.downLoadUrl.replace('{id}', v.id)}`
          };
        })
      });
    } else {
      this.setState({
        fileList: [],
        loading: false
      });
    }
  };
  onChange = ({ file, fileList }) => {
    const {
      onChange,
      value,
      onFileChange,
      fileListLen,
      onUploadErr
    } = this.props;
    if (onChange) {
      if (file.status === 'removed') {
        onChange(fileList.map((v) => v.uid));
        if (onFileChange) {
          onFileChange(fileList);
        }
      } else {
        if (file.response) {
          if (!file.response.success) {
            if (onUploadErr) {
              onUploadErr(file.response.msg);
            }
          }
          if (file.response.data) {
            let temp = value ? [...value] : [];
            temp.push(file.response.data.id);
            if (temp.length > fileListLen) {
              temp = temp.slice(-Number(fileListLen));
            }
            onChange(clone(temp));
            if (onFileChange) {
              onFileChange(fileList);
            }
          }
        }
      }
    }
  };
  onRemove = async (file) => {
    const { onRemoveErr, onChange, onFileChange } = this.props;
    const { fileList } = this.state;
    const { success, msg } = await request(
      config.removeUrl.replace('{id}', file.uid),
      {
        method: 'DELETE'
      }
    );
    // if (success) {
    if (onChange) {
      console.log(fileList.filter((v) => v.uid !== file.uid).map((v) => v.uid));
      onChange(fileList.filter((v) => v.uid !== file.uid).map((v) => v.uid));
    }

    if (onFileChange) {
      onFileChange(fileList.filter((v) => v.uid !== file.uid));
    }
    // }
    // if (success) {
    //   return true;
    // }
    if (onRemoveErr) {
      onRemoveErr(msg);
    }
    return true;
  };
  onPreview = async (file) => {
    const res = await downLoadFile(file.uid);
    const defaultName = '未命名的导出文件';
    const blob = new Blob([res]);
    const name = `${file.name ? file.name : defaultName}`;
    if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a');
      elink.download = name;
      elink.style.display = 'none';
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, file.name);
    }
  };
  beforeUpload = (file) => {
    // const imgTypeSupportList = [
    //   'image/jpeg',
    //   'image/png',
    //   'image/jpg',
    //   'image/tiff',
    //   'image/pcx',
    //   'image/bmp',
    //   'image/gif',
    //   'image/wbmp',
    //   'image/raw',
    //   'image/pnm',
    //   'image/tif'
    // ];
    // // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // const typeFlag = imgTypeSupportList.includes(file.type);
    // if (!typeFlag) {
    //   ElNotification({
    //     type: 'error',
    //     message:
    //       '请选择格式为jpg、png、jpeg、tiff、pcx、bmp、gif、wbmp、raw、pnm、tif的图片!'
    //   });
    //   return typeFlag;
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   ElNotification({
    //     type: 'error',
    //     message: '图片大小不能超过2MB!'
    //   });
    //   return isLt2M;
    // }
    return true;
  };
  customRequest = async (options) => {
    const { value, onChange, onFileChange, fileListLen } = this.props;
    const { onSuccess, onError, file, onProgress } = options;
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append('file', file);
    const fileUploadRes = await request(config.uploadUrl, {
      method: 'post',
      query: formData
    });
    let temp = value ? [...value] : [];
    temp.push(fileUploadRes.data.id);
    if (temp.length > fileListLen) {
      temp = temp.slice(-Number(fileListLen));
    }
    onChange(clone(temp));
    this.setState({ loading: false });
  };
  render() {
    const { fileListLen } = this.props;
    const { fileList } = this.state;
    console.log('value ++>', this.props, fileList);
    return (
      <>
        <Upload
          {...this.props}
          maxCount={fileListLen !== 'multi' ? fileListLen : undefined}
          listType='text'
          customRequest={this.customRequest}
          fileList={fileList}
          onChange={this.onChange}
          onRemove={this.onRemove}
          onPreview={this.onPreview}
          beforeUpload={this.beforeUpload}
        >
          {fileListLen !== 'multi' && fileList.length >= fileListLen ? null : (
            <Button icon={<UploadOutlined />}>{this.props.buttonText}</Button>
          )}
        </Upload>
      </>
    );
  }
}
export default FileUpload;
