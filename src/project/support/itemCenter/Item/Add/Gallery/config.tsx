
import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import ImgUpload from '@/components/el/ItemComponent/ImgUpload';
import AppStore from '@/store';
import { UploadBlue, DeleteRed } from '@/components/el/ElIcon';


const getButtons = ({
  handleUploadPhoto,
  handleDelete,
  type
}): Array<ActionButtonProps> => [
    {
      key: 'creat',
      text: '上传图片',
      location: 'left',
      // minSelection: 1,
      icon: <UploadBlue />,
      handleClick: handleUploadPhoto,
      disabled: type === 'view',
      needConfirm: false
    },
    {
      key: 'delete',
      text: '删除',
      location: 'left',
      icon: <DeleteRed />,
      minSelection: 1,
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleDelete(selectedRowKeys);
      },
      disabled: type === 'view',
      confirmText: '您确定删除所选项吗？'
    }
  ];

const getColumns = (that, handleSetPrimary: Function, type, primaryRowId): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 30,
      align: 'center',
      dataIndex: 'id',
      cellRender: (text, record, index) => (index + 1)
    },
    {
      title: '商品图片',
      width: 100,
      align: 'center',
      dataIndex: 'picId',
      editable: false,
      cellRender: (text, record) => {
        return (
          <div className='action-image-wrapper'>
            {text && (
              <ImgUpload
                showUploadList={{ showRemoveIcon: false }}
                value={(text && (text.isArray ? text : [text])) || []}
              />
            )}
            {text && record.id === primaryRowId ? (
              <span className='primary-name'>主图</span>
            ) : (
              <span
                style={{ display: type === 'view' ? 'none' : 'inline-block' }}
                className='primary-set'
                onClick={() => handleSetPrimary(record)}
              >
                设为主图
              </span>
            )}
          </div>
        );
      },
      field: (data) => {
        return {
          formOption: {
            type: '$img-upload',
            props:
              data && data.text
                ? {
                  valueList: data.text,
                  fileListLen: 1
                }
                : {}
          },
          name: 'picId'
        };
      }
    },
    {
      title: '图片名称',
      width: 100,
      align: 'center',
      dataIndex: 'picName'
    },
    {
      title: '图片尺寸',
      width: 100,
      align: 'center',
      dataIndex: 'size'
    },
    {
      title: '图片大小',
      width: 100,
      align: 'center',
      dataIndex: 'picSize'
    }
  ];
};

export { getColumns, getButtons };
