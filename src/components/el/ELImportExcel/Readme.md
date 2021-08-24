# ELImportExcel 使用文档

注意: ELImportExcel 基础antd  Modal/Table/Upload组件组合而成，一次只能选择一个文件，调用接口成功后会返回信息。/把文件给后端。后端解析返回给前端

## 使用例子

```javascript
import { ELImportExcel } from '@/components/el';

  imports = () => {
    console.log('导入');
    const { importModalRef } = this.state;
    importModalRef.openModal();
    //importModalRef.closeModal();
  };
    //获取modalref
  modalRef = (importModalRef) => {
    this.setState({
      importModalRef
    });
  };
  //导入接口调用成功后的回调
  importCallBack = (rep) => {
    console.log('reprep', rep);
  };

  <ELImportExcel
    downTemplateRequest='/yst-pur/pur/purMoq/downloadTemplate'
    downTemplateFileName='MOQ导入模版'
    downTemplateMethod='GET'
    requestPath='/yst-pur/pur/purMoq/import'
    successCallBak={this.importCallBack}
    onRef={this.modalRef}
    maxSize={20}
    sizeType='MB'
    note='仅支持xlsx文件，不能大于20mb'
    fileType='xlsx|xls|xlsx'
  />

```
