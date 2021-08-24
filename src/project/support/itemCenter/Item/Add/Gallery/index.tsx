/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-03-05 11:35:03
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 15:46:57
 */
import React, { PureComponent } from 'react';
import { message } from 'antd';
import { ElEditTable } from '@/components/el';
import { getColumns, getButtons } from './config';
import { uploadPic } from '../../service';
import './index.less';

interface Props {
  onRef: Function;
  data: any;
  submitIndex: Number;
  majorId: Function;
  type: any;
}

interface State {
  dataSource: Array<any>;
  selectedPhoto: Array<object>;
  tableRef: any;
  primaryRowId: string;
  uploadPhoto: any;
  modalStatus: boolean;
  delDisabledStatus: boolean;
  selectedRows: Array<any>;
  type: string;
}

export default class Gallery extends PureComponent<Props, State> {
  tableRef: any;
  inputRef: any;
  submitIndex: Number;

  constructor(props) {
    super(props);
    this.tableRef = {};
    this.submitIndex = 0;
    this.inputRef = React.createRef();
    this.state = {
      dataSource: [],
      type: '',
      tableRef: {},
      uploadPhoto: {},
      selectedPhoto: [],
      primaryRowId: '',
      modalStatus: false,
      delDisabledStatus: true,
      selectedRows: []
    };
  }

  componentDidUpdate() {
    const { submitIndex, onRef, data, type, majorId } = this.props;
    if (type !== this.state.type) {
      if (type === 'add') {
        this.setState({
          type
        });
      }
    }
    if (Array.isArray(data) && data?.length !== 0 && data.length !== this.state.dataSource.length) {
      const major = data.filter((items: any) => items.major);
      majorId(major?.length > 0 ? major[0].id : '');
      this.setState(
        {
          type,
          primaryRowId: major?.length > 0 ? major[0].id : '',
          dataSource: data?.map((item: any) => {
            return {
              ...item,
              picId: item.fileId,
              picSize: item?.fileSize || '',
              picName: item?.fileName || '',
              size: item.imgSize
            };
          })
        },
        () => {
          this.tableRef.setCurrentColumns(getColumns(this, this.handleSetPrimary, type, this.state.primaryRowId));
        }
      );
    }
    // 根据submitIndex判断是否进行提交的操作，传递最新的form
    if (this.submitIndex !== submitIndex) {
      this.submitIndex = submitIndex;
      onRef && onRef(this.tableRef);
    }
  }

  onRef = (ref) => {
    this.tableRef = ref;
  };

  handleUploadPhoto = () => {
    // 无法传递upload组件，模拟点击上传的input触发上传操作
    const ie =
      navigator.appName == 'Microsoft Internet Explorer' ? true : false;
    const file = this.inputRef.current;
    if (ie) {
      file.click();
    } else {
      const a = document.createEvent('MouseEvents');
      a.initEvent('click', true, true);
      file.dispatchEvent(a);
    }
  };

  handleChange = (e) => {
    const formData = new FormData();

    const file = e.target.files[0];
    formData.append('file', file);
    this.submitPhoto(formData, file);
  };

  submitPhoto = async (formData, file) => {
    // const { dataSource } = this.state;
    // 将文件传给table组件以及photo的组件
    // 获取照片真实尺寸，校验尺寸是否正确
    let reader = new FileReader();
    reader.readAsDataURL(file);
    const image = new Image();
    reader.onload = function (theFile) {
      image.onload = function () {
        // 获取图片实际尺寸
      };
      image.src = window.URL.createObjectURL(file);
    };
    const res = await uploadPic(formData);
    if (res && res.success) {
      // success
      let newId = 1;
      const dataSource = this.tableRef.getRows();
      if (dataSource.length > 0) {
        const lastItem = dataSource.slice(-1)[0];
        newId = lastItem.id + 1;
      }
      const newObj = {
        id: newId,
        picId: [res.data.fileCode],    // todo res.data.id
        picName: file.name,
        size: `${image.width} * ${image.height}`,
        picSize: file.size
      };
      this.tableRef.addRow(newObj);
    }
  };

  handleDelete = async (data) => {
    // api delete

    const selection = this.tableRef.getSelectionData();
    for (let key of selection.selectedRowKeys) {
      await this.tableRef.removeRowByKey(key, 'rowKey');
    }
  };
  handleSetPrimary = (record) => {
    // 存储当前主图的行id，提交时加入
    this.setState({ primaryRowId: record.id }, () => {
      console.log(this.state.primaryRowId, this.tableRef);
      this.tableRef.setCurrentColumns(
        getColumns(this, this.handleSetPrimary, this.props.type, this.state.primaryRowId)
      );
    });
    const allData = this.tableRef.getRows();
    const activeRecord = allData.filter((item) => item.id === record.id);
    const activeItem =
      activeRecord && activeRecord.length > 0 ? activeRecord[0] : {};
    this.props.majorId(record.id);
    this.tableRef.setActiveRow({
      ...activeItem,
      primary: record.id
    });
  };

  render() {
    const { dataSource, primaryRowId } = this.state;
    const { type } = this.props;
    return (
      <>
        <input
          id='file'
          type='file'
          style={{ display: 'none' }}
          ref={this.inputRef}
          onChange={this.handleChange}
        />
        <ElEditTable
          rowKey='id'
          onRef={(ref) => this.onRef(ref)}
          dataSource={dataSource}
          actionButtons={getButtons({
            handleUploadPhoto: this.handleUploadPhoto,
            handleDelete: this.handleDelete,
            type: type
          })}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: true,
            disabledRowIds: []
          }}
          columns={getColumns(this, this.handleSetPrimary, type, primaryRowId)}
        />
      </>
    );
  }
}
