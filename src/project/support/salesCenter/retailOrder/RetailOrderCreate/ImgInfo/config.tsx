import React from 'react';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Image } from 'antd';
import AppStore from '@/store';
import {
  filledFormConfig,
  filledColumnsConfig,
  setFormDisabledByType,
  filledColumnsEditAbleConfig,
  getOptionsYN,
  getCellRenderYN
} from '@/project/utils/tableHelper';

const getImgTableColumns = (that = null): Array<ElEditTableColumns> => {
  let columns: Array<ElEditTableColumns> = [
    {
      title: '序号',
      align: 'center',
      width: 100,
      cellRender: (value, column, index) => {
        return index + 1;
      }
    },
    {
      title: '图片',
      // width: 100,
      align: 'center',
      dataIndex: 'fileId',
      cellRender: (text, record) => {
        return (
          <Image
            width={48}
            height={36}
            preview={true}
            src={AppStore.urlPrefix.replace('{picId}', text)}
          />
        );
      }
    },
    {
      title: '图片尺寸',
      dataIndex: 'imgSize'
    },
    {
      title: '图片大小',
      dataIndex: 'fileSize'
    }
  ];

  // filledColumnsEditAbleConfig(columns);
  filledColumnsConfig(columns);
  return columns;
};

export { getImgTableColumns };
