import React from 'antd';
import { Image } from 'antd';
import Icon from '@ant-design/icons';
import { ReactComponent as addTableBlueIconUrl } from '@/assets/img/icon/common/icon-add-blue.svg';
// import addTableBlueIconUrl from '@/assets/img/icon/common/icon-add-blue.svg';
import editTableBlueIconUrl from '@/assets/img/icon/common/icon-edit-blue.svg';
import delTableRedUrl from '@/assets/img/icon/common/icon-delete-red.svg';
import batchTableBlueIconUrl from '@/assets/img/icon/common/icon-batch-blue.svg';
import cancelTableBlueIconUrl from '@/assets/img/icon/common/icon-cancel-red.svg';
import closeTableBlueIconUrl from '@/assets/img/icon/common/icon-close-red.svg';
import exportTableBlackIconUrl from '@/assets/img/icon/common/icon-export-black.svg';
import auditTableBlueIconUrl from '@/assets/img/icon/common/icon-audit-blue.svg';
import upTableBlackIconUrl from '@/assets/img/icon/common/icon-up-black.svg';
import downTableBlackIconUrl from '@/assets/img/icon/common/icon-down-black.svg';
import importTableBlueIconUrl from '@/assets/img/icon/common/icon-import-blue.svg';
import saveTableBlueIconUrl from '@/assets/img/icon/common/icon-save-blue.svg';

import saveWhiteIconUrl from '@/assets/img/icon/common/icon-save-white.svg';
import submitWhiteIconUrl from '@/assets/img/icon/common/icon-submit-white.svg';
import resetBlackIcontUrl from '@/assets/img/icon/common/icon-reset-black.svg';
import refrshBlackIcontUrl from '@/assets/img/icon/common/icon-refresh-white.svg';
import leftBackBlackIconUrl from '@/assets/img/icon/common/icon-left-black.svg';
import uploadBlueIconUrl from '@/assets/img/icon/item/icon-upload-blue.svg';

import addQRCodeUrl from '@/assets/img/icon/item/icon-code-green.svg';
import bacthDownloadUrl from '@/assets/img/icon/item/icon-import-blue.svg';
import recycleUrl from '@/assets/img/icon/item/icon-recycle-red.svg';
import shelfOnUrl from '@/assets/img/icon/item/icon-shelves-green.svg';
import shelfOffUrl from '@/assets/img/icon/item/icon-TheShelves-red.svg';
import recommendOnUrl from '@/assets/img/icon/item/icon-recommended-yellow.svg';
import recommendNewUrl from '@/assets/img/icon/item/icon-goods-yellow.svg';
import pictureBlueIconUrl from '@/assets/img/icon/item/icon-picture-blue.svg';
import resetBlackIconUrl from '@/assets/img/icon/item/icon-reset-black.svg';
import generateGreenIconUrl from '@/assets/img/icon/item/icon-generate-green.svg';

import permissionsIconUrl from '@/assets/img/icon/permission/icon-permissions-blue.svg';

// ---------------- 公用图标  ----------------
import couponTableGreenIconUrl from '@/assets/img/icon/member/icon-coupons-green.svg';

// ---------------- 公用图标  ----------------
// 表格级
const AddTableBlueIcon = () => <Icon component={addTableBlueIconUrl} />; // 新增（表格级 蓝色）
const AddTableBlackIcon = () => <Icon component={addTableBlueIconUrl} />;
const EditTableBlueIcon = () => (
  <Image src={editTableBlueIconUrl} preview={false} />
); // 编辑（表格级 蓝色）
const DeleteTableRedIcon = () => <Image src={delTableRedUrl} preview={false} />; // 删除（表格级 红色）
const BatchTableBlueIcon = () => (
  <Image src={batchTableBlueIconUrl} preview={false} />
); // 批量（表格级 蓝色）
const CancelTableBlueIcon = () => (
  <Image src={cancelTableBlueIconUrl} preview={false} />
); // 取消（表格级 红色）
const CloseTableBlueIcon = () => (
  <Image src={closeTableBlueIconUrl} preview={false} />
); // 关闭（表格级 红色）
const AuditTableBlueIcon = () => (
  <Image src={auditTableBlueIconUrl} preview={false} />
); // 审核（表格级 蓝色）
const ExportTableBlackIcon = () => (
  <Image src={exportTableBlackIconUrl} preview={false} />
); // 导出
const UpTableBlackIcon = () => (
  <Image src={upTableBlackIconUrl} preview={false} />
); // 上移
const DownTableBlackIcon = () => (
  <Image src={downTableBlackIconUrl} preview={false} />
); // 下移
const ImportTableBlueIcon = () => (
  <Image src={importTableBlueIconUrl} preview={false} />
); // 导入
const SaveTableBlueIconUrl = () => (
  <Image src={saveTableBlueIconUrl} preview={false} />
); //保存（表格级 蓝色）
const PermissionsIcon = () => (
  <Image src={permissionsIconUrl} preview={false} />
); //权限分配（表格级 蓝色）

// 页面级
const SaveWhiteIcon = () => <Image src={saveWhiteIconUrl} preview={false} />; // 保存（页面级 白色）
const SubmitWhiteIcon = () => (
  <Image src={submitWhiteIconUrl} preview={false} />
); //提交（页面级 白色）
const RefreshBlackIcont = () => (
  <Image src={resetBlackIcontUrl} preview={false} />
); //刷新
const RefreshWhiteIcont = () => (
  <Image src={refrshBlackIcontUrl} preview={false} />
); //刷新
const LeftBackBlackIcon = () => (
  <Image src={leftBackBlackIconUrl} preview={false} />
); //返回（页面级 白色）
const UploadBlueIcon = () => <Image src={uploadBlueIconUrl} preview={false} />; // 上传

// ---------------- 商品模块  ----------------
const QRCodeIcon = () => <Image src={addQRCodeUrl} preview={false} />; // 重新生成二维码 （表格级 绿色）
const BacthDownloadIcon = () => (
  <Image src={bacthDownloadUrl} preview={false} />
); // 批量商品导入 （表格级 蓝色）
const RecycleIcon = () => <Image src={recycleUrl} preview={false} />; // 移入回收站 （表格级 红色）
const ShelfOnIcon = () => <Image src={shelfOnUrl} preview={false} />; // 商品上架（表格级 绿色）
const ShelfOffIcon = () => <Image src={shelfOffUrl} preview={false} />; // 商品下架 （表格级 红色）
const RecommendOnIcon = () => <Image src={recommendOnUrl} preview={false} />; // 设为推荐（表格级 黄色）
const RecommendNewIcon = () => <Image src={recommendNewUrl} preview={false} />; // 设为新品（表格级 黄色）
const PictureBlueIcon = () => (
  <Image src={pictureBlueIconUrl} preview={false} />
); // 从图片库选择
const ResetBlackIcon = () => <Image src={resetBlackIconUrl} preview={false} />; // 还原
const GenerateGreenIcon = () => (
  <Image src={generateGreenIconUrl} preview={false} />
); // 生成首字母

// ---------------- 会员模块  ----------------
const CouponTableGreenIcon = () => (
  <Image src={couponTableGreenIconUrl} preview={false} />
); // 赠送优惠券（表格级 绿色）

export {
  AddTableBlueIcon,
  AddTableBlackIcon,
  EditTableBlueIcon,
  DeleteTableRedIcon,
  BatchTableBlueIcon,
  CancelTableBlueIcon,
  CloseTableBlueIcon,
  ExportTableBlackIcon,
  UpTableBlackIcon,
  DownTableBlackIcon,
  ImportTableBlueIcon,
  SaveWhiteIcon,
  AuditTableBlueIcon,
  SubmitWhiteIcon,
  LeftBackBlackIcon,
  UploadBlueIcon,
  RefreshWhiteIcont,
  RefreshBlackIcont,
  QRCodeIcon,
  BacthDownloadIcon,
  RecycleIcon,
  ShelfOnIcon,
  ShelfOffIcon,
  RecommendOnIcon,
  RecommendNewIcon,
  PictureBlueIcon,
  ResetBlackIcon,
  GenerateGreenIcon,
  SaveTableBlueIconUrl,
  CouponTableGreenIcon,
  PermissionsIcon
};
