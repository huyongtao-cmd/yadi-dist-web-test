import { ElEditTable } from '@/components/el';
import React, { Component } from 'react';
import { maths } from '@/utils';
import { getTableColumns, getTableActionButtons } from './config';

export default class index extends Component<any, any> {
  create = async () => {
    console.log('新增');
    await this.props.detailRef.quitEditState();
    this.props.detailRef.addRow({
      id: maths.genFakeId(-1)
    });
  };

  del = async ({ selectedRowKeys }) => {
    console.log('删除');
    await this.props.detailRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.detailRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };

  save = () => {
    console.log('保存');
    this.props.save();
  };
  render() {
    return (
      <ElEditTable
        tableId='sys_rule_detail'
        rowKey='id'
        bordered
        onRef={this.props.getDetailRef}
        dataSource={this.props?.detailData}
        // dealDataToForm={(record) => {
        //   if (record && record.numberTypeName && record.numberType) {
        //     return {
        //       ...record,
        //       numberTypeUdc: {
        //         udcVal: record.numberType,
        //         valDesc: record.numberTypeName
        //       }
        //     };
        //   }
        // }}
        // dealFormToData={({ data }) => {
        //   if (
        //     data.numberTypeUdc &&
        //     data.numberTypeUdc.udcVal &&
        //     data.numberTypeUdc.valDesc
        //   ) {
        //     console.log({
        //       numberType: data.numberTypeUdc.udcVal,
        //       numberTypeName: data.numberTypeUdc.valDesc
        //     });
        //     return {
        //       ...data,
        //       numberType: data.numberTypeUdc.udcVal,
        //       numberTypeName: data.numberTypeUdc.valDesc
        //     };
        //   }
        // }}
        actionButtons={getTableActionButtons(
          this.create.bind(this),
          this.del.bind(this),
          this.save.bind(this),
          this.props.saveLoading
        )}
        columns={getTableColumns()}
      />
    );
  }
}
