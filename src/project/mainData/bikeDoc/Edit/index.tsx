/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 10:59:42
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-02-24 11:00:12
 */
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Button, Spin } from 'antd';
import ElCard from '@/components/el/ElCard';
import ElForm from '@/components/el/ElForm';
import { getBaseConfig, getPriceConfig, getImgTableColumns } from './config';
import './index.less';
import service from '../service';
import { ElEditTable, ElNotification, ElRowContainer } from '@/components/el';
import app from '@/project/utils/appCommon';
import MultiTabMobx from '@/store/multiTab';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import {
  AddBlue,
  DeleteRed,
  ImportBlue,
  SaveWhite
} from '@/components/el/ElIcon';
import { asserts, maths } from '@/utils';
import { getInitRowData } from '@/project/utils/tableHelper';

interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  id: string | number;
  formDataBase: any;
  formDataPrice: any;
  imgDataSource: any;
  [props: string]: any;
  itemType2Disabled: boolean;
}

export default class Detail extends PureComponent<Props, State> {
  static propTypes = {};
  formBaseRef: any;
  formPriceRef: any;
  imgTableRef: any;
  inputRef: any;
  workPostTableRef: any;
  mainPagePath: string;

  constructor(props) {
    super(props);
    // 2021年06.24 修改路由配置   去掉 /orgCenter
    this.mainPagePath = `/mainData/bikeDoc`;
    this.inputRef = React.createRef();
    this.state = {
      loading: false,
      formDataBase: {
        partStatus: 0
      },
      formDataPrice: {},
      imgDataSource: [],
      // 简化参数
      type: this.props.match.params?.type,
      id: this.props.match.params?.id,
      itemType2Disabled: true,
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
    app.ShowMsg(res, '图片不能超过1M');
    if (res && res.success) {
      // success
      let newId = 1;
      const dataSource = this.imgTableRef.getRows();
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
      this.imgTableRef.addRow(newObj);
    }
  };

  delImg = async ({ selectedRowKeys }) => {
    this._delInTable(this.imgTableRef, { selectedRowKeys });
  };

  async _delInTable(tableRef, { selectedRowKeys }) {
    await tableRef.quitEditState();
    tableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  _addInTable(tableRef, value = {}) {
    tableRef.addRow({ ...value, id: maths.genFakeId(-1) });
  }

  getimgTableActionButtons(type) {
    let btns: Array<ActionButtonProps> = [
      {
        text: '上传图片',
        key: 'uploadImg',
        handleClick: this.uploadImg,
        disabled: type == 'view',
        location: 'left',
        icon: <AddBlue />
      },
      {
        text: '删除',
        key: 'delImg',
        handleClick: this.delImg,
        disabled: type == 'view',
        location: 'left',
        minSelection: 1,
        needConfirm: true,
        icon: <DeleteRed />
      }
    ];

    return btns;
  }

  async componentDidMount() {
    const { type, id } = this.state;
    console.log('type', type)
    // 默认值
    this.setState({
      formDataBase: { itemType: 'ALL' }
    });
    if (type == 'add') {
      return;
    }

    this.setState({ loading: true });
    let res = await service.getDetail(id);
    this.setState({ loading: false });
    if (!res.success) {
      return;
    }

    // 经销商
    if (res.data.buId) {
      res.data.buObj = {
        id: res.data.buId,
        buName: res.data.buName,
        buCode: res.data.buCode
      };
    }
    // 图片信息
    let imgList = res.data.itmImageSaveParams || [];
    // 初始化数据
    this.setState({
      formDataBase: { ...res.data, partStatus: res.data.partStatus === '1' ? true : false },
      formDataPrice: res.data,
      imgDataSource: imgList,
      itemType2Disabled: type === 'view' ? true : res.data.itemType === 'PART' ? false : true
    });
  }

  componentWillUnmount() { }

  async onSave() {
    const { id, formDataBase } = this.state;
    let formData = await this._getWholeData();
    formData.id = Number(id) > 0 ? id : undefined;
    this.setState({ loading: true });
    const res = await service.save(formData);
    this.setState({ loading: false });
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }

    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  }

  async _getWholeData() {
    let newFormDataBase = await this.formBaseRef.validateFields();
    console.error('newFormDataBasenewFormDa13452345', newFormDataBase);
    if (newFormDataBase.buObj) {
      newFormDataBase.buId = newFormDataBase.buObj.id;
      newFormDataBase.buCode = newFormDataBase.buObj.buCode;
      newFormDataBase.buName = newFormDataBase.buObj.buName;
    }
    newFormDataBase.partCode = asserts.isExist(newFormDataBase.itemType4) ? newFormDataBase.itemType4 : null;
    newFormDataBase.partStatus = newFormDataBase.partStatus ? 1 : 0;
    // delete newFormDataBase.buObj;
    let newFormDataPrice = await this.formPriceRef.validateFields();

    await this.imgTableRef.quitEditState();
    let imgList = this.imgTableRef.getRows();

    return {
      ...newFormDataBase,
      ...newFormDataPrice,
      itmImageSaveParams: imgList
    };
  }

  handleCancelClick = () => {
    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  };
  getButtons = ({ type, formDataBase }) => [
    {
      key: 'save',
      text: '保存',
      icon: <SaveWhite />,
      disabled: type === 'view',
      location: 'left',
      type: 'primary',
      handleClick: () => this.onSave()
    }
  ];

  handleSelectItemType = (value) => {
    if (value === 'PART') {
      this.setState({
        itemType2Disabled: false
      })
    } else {
      this.setState({
        itemType2Disabled: true
      })
    }
  }
  render() {
    const { loading, formDataBase, formDataPrice, type } = this.state;

    return (
      <>
        <Spin spinning={loading}>
          <ElRowContainer
            onBack={this.handleCancelClick}
            blocks={this.getButtons({ type, formDataBase })}
            position='top'
          />

          <ElCard title='基本信息'>
            <ElForm
              formProps={getBaseConfig(type, formDataBase.es7 == '0', this.handleSelectItemType, this.state.itemType2Disabled)}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>

          <ElCard title='价格信息'>
            <ElForm
              formProps={getPriceConfig(type)}
              data={formDataPrice}
              onRef={(ref) => (this.formPriceRef = ref)}
            ></ElForm>
          </ElCard>
          <ElCard title='图片信息'>
            <input
              id='file'
              type='file'
              style={{ display: 'none' }}
              ref={this.inputRef}
              onChange={this.handleChange}
            />
            <ElEditTable
              rowKey='fileId'
              tableId='imgTable'
              scroll={{ y: 206 }}
              onRef={(ref) => (this.imgTableRef = ref)}
              actionButtons={this.getimgTableActionButtons(type)}
              columns={getImgTableColumns()}
              dataSource={this.state.imgDataSource}
            ></ElEditTable>
          </ElCard>
        </Spin>
      </>
    );
  }
}
