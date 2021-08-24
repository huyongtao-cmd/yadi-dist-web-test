import React from 'react';
import { ElSearchTable, ElEditTable, ElTab } from '@/components/el';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import ImgUpload from '@/components/el/ItemComponent/ImgUpload';
import { ElPageHeader } from '@/components/el';
// import request from "@/utils/request";
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { Checkbox } from 'antd';
import { ElForm, ElRowContainer, ELImportExcel } from '@/components/el';
import { Input, Button } from 'antd';
import { asserts } from '@/utils';
import ToolBar from '@/components/el/ElSearchTable/components/ToolBar';
import ElImage from '@/components/el/ElImage';
import { DownOutlined } from '@ant-design/icons';
import { Action } from '@/components/workflow';
import {
  AddBlue,
  EditBlue,
  SaveBlue,
  AuditBlue,
  ImportBlue,
  ExportBlue,
  BatchBlue,
  CopyBlue,
  UpBlue,
  DownBlue,
  LeftBlue,
  SubmitBlue,
  RefreshBlue,
  UploadBlue,
  PictureBlue,
  PermissionsBlue,
  SetBlue,
  PrintBlue,
  SearchBlue,
  DeleteRed,
  RecycleRed,
  TheShelvesRed,
  CancelRed,
  CloseRed
} from '@/components/el/ElIcon';
interface State {
  tableRef: any;
  dataSource: Array<any>;
}
interface Props {
  store: any;
}

const getColumns: () => Array<ElEditTableColumns> = () => {
  return [
    {
      title: '公司名',
      width: 100,
      dataIndex: 'ouName',
      editable: true,
      rule: {
        required: true,
        type: 'integer'
      },
      selectMapping: (p) => {
        return { ouCode: '397786433983635456' };
      },
      field: () => {
        return {
          formOption: { type: '$input12312321' },
          name: 'ouName'
        };
      }
    },
    {
      title: '测试',
      children: [
        {
          title: '公司编码',
          width: 100,
          dataIndex: 'ouCode1',
          editable: true,
          rule: {
            required: true
          },
          cellRender: () => {
            return '111';
          },
          selectMapping: (p) => {
            console.log(1);
            return { ouCode: '397786433983635456' };
          },
          field: (text) => {
            console.log(text);
            return {
              formOption: {
                type: '$img-upload',
                props: {
                  fileListLen: 2
                }
              },
              name: 'ouCode1'
            };
          }
        },
        {
          title: '公司编码',
          width: 100,
          dataIndex: 'ouCode2',
          editable: true,
          rule: {
            required: true
          },
          selectMapping: (p) => {
            console.log(2);

            return { ouCode: '397786433983635456' };
          },
          field: (text) => {
            console.log(text);
            return {
              formOption: {
                type: '$input'
              },
              name: 'ouCode2'
            };
          }
        }
      ]
    },
    {
      title: '公司编码',
      width: 100,
      dataIndex: 'ouCode3'
    },
    {
      title: '公司编码',
      width: 100,
      dataIndex: 'ouCode4'
    }
  ];
};
const getButtons: () => Array<ActionButtonProps> = () => [
  {
    key: 'AddBlue',
    text: 'AddBlue',
    location: 'left',
    icon: <AddBlue />,
    authCode: 'AddBlue'
  },
  { key: 'EditBlue', text: 'EditBlue', location: 'left', icon: <EditBlue /> },
  { key: 'SaveBlue', text: 'SaveBlue', location: 'left', icon: <SaveBlue /> },
  {
    key: 'AuditBlue',
    text: 'AuditBlue',
    location: 'right',
    icon: <AuditBlue />
  },
  {
    key: 'ImportBlue',
    text: 'ImportBlue',
    location: 'right',
    icon: <ImportBlue />
  },
  {
    key: 'ExportBlue',
    text: 'ExportBlue',
    location: 'right',
    icon: <ExportBlue />
  },
  {
    key: 'BatchBlue',
    text: 'BatchBlue',
    location: 'right',
    icon: <BatchBlue />
  },
  { key: 'CopyBlue', text: 'CopyBlue', location: 'right', icon: <CopyBlue /> },
  { key: 'UpBlue', text: 'UpBlue', location: 'right', icon: <UpBlue /> },
  { key: 'DownBlue', text: 'DownBlue', location: 'right', icon: <DownBlue /> },
  { key: 'LeftBlue', text: 'LeftBlue', location: 'right', icon: <LeftBlue /> },
  {
    key: 'SubmitBlue',
    text: 'SubmitBlue',
    location: 'right',
    icon: <SubmitBlue />
  },
  {
    key: 'RefreshBlue',
    text: 'RefreshBlue',
    location: 'right',
    icon: <RefreshBlue />
  },
  {
    key: 'UploadBlue',
    text: 'UploadBlue',
    location: 'right',
    icon: <UploadBlue />
  },
  {
    key: 'PictureBlue',
    text: 'PictureBlue',
    location: 'right',
    icon: <PictureBlue />
  },
  {
    key: 'PermissionsBlue',
    text: 'PermissionsBlue',
    location: 'right',
    icon: <PermissionsBlue />
  },
  { key: 'SetBlue', text: 'SetBlue', location: 'right', icon: <SetBlue /> },
  {
    key: 'PrintBlue',
    text: 'PrintBlue',
    location: 'right',
    icon: <PrintBlue />
  },
  {
    key: 'SearchBlue',
    text: 'SearchBlue',
    location: 'right',
    icon: <SearchBlue />
  }
];
let formRef1 = null;
@inject('store')
@observer
class SearchTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    // makeAutoObservable(this)
    this.state = {
      tableRef: null,
      dataSource: []
    };
    // this.store = new AppStore();
  }
  componentDidMount() {
    // console.log(this.props)
    console.log(asserts.isExist(null));
    console.log(this.props.store.appName);
    setTimeout(() => {
      this.setState({
        dataSource: [
          { id: 1, ouCode: '397819515881152512' },
          { id: 2, ouName: '123111' }
        ]
      });
    }, 1000);
  }
  onClick = () => {
    console.log(1);
  };
  getButtons: () => Array<ActionButtonProps> = () => [
    { key: '11', text: 'AddBlue', location: 'left', icon: { AddBlue } },
    { key: '21', text: '123', location: 'left', minSelection: 1 },
    { key: '1', text: '123', location: 'right', minSelection: 1 },
    { key: '2', text: '123', location: 'right', minSelection: 1 }
  ];
  test = () => {
    this.setState({
      dataSource: []
    });
  };
  cli = () => {
    this.state.tableRef.quitEditState(() => {
      console.log(this.state.tableRef.getSelectionData());
    });
  };
  render() {
    return (
      <>
        <Action processInstanceId={'b845aea9-99a5-11eb-b740-080058000005'} />
        <button onClick={this.cli}>test</button>
        <ElRowContainer blocks={getButtons()} position='top'></ElRowContainer>
        {/* <ElTab
          defaultActiveKey='1'
          tabs={[
            {
              name: '基本信息',
              key: '1',
              render: () => {
                return <div>123</div>;
              }
            },
            {
              name: '基本信息',
              key: '2',
              render: () => {
                return <div>1234</div>;
              }
            }
          ]}
        /> */}
        {/* <ELImportExcel
          downTemplateRequest={`/yst-inv/invCk/exportInvCkDList/1`}
          downTemplateFileName='库存盘点明细导入模版'
          downTemplateMethod='GET'
          requestPath='/yst-inv/invCk/importInvCkDList'
          successCallBak={() => {}}
          onRef={() => {}}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
        <ElPageHeader
          title='123'
          blocks={[{ key: '1', text: '1', handleClick: this.onClick }]}
        />
        <button
          onClick={() => console.log(this.state.tableRef.getSearchFormData())}
        >
          test
        </button>
        <ElSearchTable
          pageSize={4}
          onRef={(formRef) =>
            this.setState({
              tableRef: formRef
            })
          }
          descriptions={() => <div>123</div>}
          actionButtons={getButtons()}
          rowSelectionConfig={{
            type: 'radio',
            fixed: true,
            disabledRowIds: [1]
          }}
          mode={{
            pagination: false
          }}
          dataSource={[
            { id: 1, ouCode: '1' },
            { id: 2, ouName: '2' },
            { id: 3, ouCode: '3' },
            { id: 4, ouName: '4' },
            { id: 5, ouCode: '5' },
            { id: 6, ouName: '6' },
            { id: 7, ouCode: '7' },
            { id: 8, ouName: '8' },
            { id: 9, ouCode: '9' },
            { id: 10, ouName: '1' },
            { id: 11, ouCode: '2' },
            { id: 12, ouName: '3' },
            { id: 13, ouCode: '4' },
            { id: 14, ouName: '5' },
            { id: 15, ouCode: '6' },
            { id: 16, ouName: '7' },
            { id: 17, ouCode: '8' },
            { id: 18, ouName: '9' },
            { id: 19, ouCode: '1' },
            { id: 20, ouName: '2' },
            { id: 21, ouCode: '3' },
            { id: 22, ouName: '4' }
          ]}
          searchFormProps={{
            items: [
              // {
              //   title: '公司名',
              //   name: 'ouName',
              //   span: 6,
              //   formOption: { type: '$b2c-cascader-region', props: {} }
              // },
              {
                title: '公司编码',
                name: 'ouCode',
                span: 6,
                formOption: { type: '$udc', props: {} }
              },
              {
                title: '公司编码',
                name: 'ouCode1',
                span: 6,
                formOption: {
                  render: () => {
                    return <Checkbox />;
                  }
                }
              }
            ]
          }}
          columns={getColumns()}
        /> */}
        <ElForm
          data={{
            name: ['1', '72', '2799']
          }}
          formProps={{
            items: [
              {
                title: '模板名称',
                name: 'name',
                span: 24,
                formOption: {
                  type: '$input',
                  props: {
                    level: 3
                  }
                },
                rules: [{ required: true }]
              },
              {
                title: '目的地',
                name: 'address',
                span: 24,
                formOption: {
                  type: '$rangePicker'
                },
                rules: [{ required: true }]
              }
            ]
          }}
        />
        <ElForm
          data={{
            name: ['1', '72', '2799']
          }}
          formProps={{
            items: [
              {
                title: '模板名称',
                name: 'name',
                span: 24,
                formOption: {
                  type: '$input',
                  props: {
                    level: 3
                  }
                },
                rules: [{ required: true }]
              },
              {
                title: '目的地',
                name: 'address',
                span: 24,
                formOption: {
                  type: '$rangePicker'
                },
                rules: [{ required: true }]
              }
            ]
          }}
        />
        <ElEditTable
          defaultTableConfig={{
            onBottomPressEnter: 'noaction',
            onTableIntoEdit: 'dbclick'
          }}
          // needToolBar={false}
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          dataSource={[
            { id: 1, ouCode1: [] },
            { id: 2, ouName: '2' }
          ]}
          // actionButtons={getButtons()}
          columns={getColumns()}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: true,
            disabledRowIds: []
          }}
        />
      </>
    );
  }
}
export default SearchTable;
