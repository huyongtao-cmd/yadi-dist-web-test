import React, { Component } from 'react';
import { maths } from '@/utils';
import ElCard from '@/components/el/ElCard';
import { ElEditTable, ElNotification } from '@/components/el';
import MultiTabMobx from '@/store/multiTab';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
// import { history } from 'react-router-dom';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';
import { getImgTableColumns } from './config';
import * as service from '../service';

class ImgInfo extends Component<any, any> {
  imgTableRef: any;
  inputRef: any;
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      imgDataSource: []
    };
  }

  uploadImg = async ({ selectedRowKeys }) => {
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
    const res = await service.uploadPic(formData);
    if (res && res.success) {
      // success
      let newId = 1;
      const dataSource = this.props.imgTableRef.getRows();
      if (dataSource.length > 0) {
        const lastItem = dataSource.slice(-1)[0];
        newId = lastItem.id + 1;
      }
      const newObj = {
        id: newId,
        fileId: res.data.fileCode,    //  res.data.id
        fileName: file.name,
        imgSize: `${image.width} * ${image.height}`,
        fileSize: file.size,
      };
      this.props.imgTableRef.addRow(newObj);
    }
  };

  delImg = async ({ selectedRowKeys }) => {
    this._delInTable(this.props.imgTableRef, { selectedRowKeys });
  };

  async _delInTable(tableRef, { selectedRowKeys }) {
    await tableRef.quitEditState();
    tableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  _addInTable(tableRef, value = {}) {
    tableRef.addRow({ ...value, id: maths.genFakeId(-1) });
  }

  getimgTableActionButtons() {
    let btns: Array<ActionButtonProps> = [
      {
        text: '上传图片',
        key: 'uploadImg',
        handleClick: this.uploadImg,
        disabled: false,
        location: 'left',
        icon: <AddBlue />
      },
      {
        text: '删除',
        key: 'delImg',
        handleClick: this.delImg,
        disabled: false,
        location: 'left',
        minSelection: 1,
        needConfirm: true,
        icon: <DeleteRed />
      }
    ];

    return btns;
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps.data', nextProps.data);
    if (prevState.imgDataSource != nextProps.data) {
      return { imgDataSource: nextProps.data };
    }
    return null;
  }
  render() {
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
          tableId='imgTable'
          scroll={{ y: 206 }}
          onRef={this.props.onRef}
          actionButtons={this.getimgTableActionButtons()}
          columns={getImgTableColumns()}
          dataSource={this.state.imgDataSource}
        ></ElEditTable>
      </>
    );
  }
}

export default ImgInfo;
