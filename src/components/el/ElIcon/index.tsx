import React from 'react';
import Icon from './Icon';
import { ReactComponent as addSvg } from '@/assets/icons/icon-add.svg';
import { ReactComponent as editSvg } from '@/assets/icons/icon-edit.svg';
import { ReactComponent as saveSvg } from '@/assets/icons/icon-save.svg';
import { ReactComponent as auditSvg } from '@/assets/icons/icon-audit.svg';
import { ReactComponent as importSvg } from '@/assets/icons/icon-import.svg';
import { ReactComponent as exportSvg } from '@/assets/icons/icon-export.svg';
import { ReactComponent as batchSvg } from '@/assets/icons/icon-batch.svg';
import { ReactComponent as copySvg } from '@/assets/icons/icon-copy.svg';
import { ReactComponent as uploadSvg } from '@/assets/icons/icon-upload.svg';
import { ReactComponent as pictureSvg } from '@/assets/icons/icon-picture.svg';
import { ReactComponent as upSvg } from '@/assets/icons/icon-up.svg';
import { ReactComponent as downSvg } from '@/assets/icons/icon-down.svg';
import { ReactComponent as leftSvg } from '@/assets/icons/icon-left.svg';
import { ReactComponent as deleteSvg } from '@/assets/icons/icon-delete.svg';
import { ReactComponent as cancelSvg } from '@/assets/icons/icon-cancel.svg';
import { ReactComponent as closeSvg } from '@/assets/icons/icon-close.svg';
import { ReactComponent as submitSvg } from '@/assets/icons/icon-submit.svg';
import { ReactComponent as resetSvg } from '@/assets/icons/icon-reset.svg';
import { ReactComponent as permissionsSvg } from '@/assets/icons/icon-permissions.svg';
import { ReactComponent as setSvg } from '@/assets/icons/icon-set.svg';
import { ReactComponent as codeSvg } from '@/assets/icons/icon-code.svg';
import { ReactComponent as transferSvg } from '@/assets/icons/icon-transfer.svg';
import { ReactComponent as shelvesSvg } from '@/assets/icons/icon-shelves.svg';
import { ReactComponent as theShelvesSvg } from '@/assets/icons/icon-theShelves.svg';
import { ReactComponent as recommendedSvg } from '@/assets/icons/icon-recommended.svg';
import { ReactComponent as couponsSvg } from '@/assets/icons/icon-coupons.svg';
import { ReactComponent as recycleSvg } from '@/assets/icons/icon-recycle.svg';
import { ReactComponent as printSvg } from '@/assets/icons/icon-print.svg';
import { ReactComponent as searchSvg } from '@/assets/icons/icon-search.svg';
import { ReactComponent as goodsSvg } from '@/assets/icons/icon-goods.svg';
import { ReactComponent as settlementSvg } from '@/assets/icons/icon-settlement.svg';
import { ReactComponent as bindSvg } from '@/assets/icons/icon-bind.svg';
import { ReactComponent as activeSvg } from '@/assets/icons/icon-active.svg';
import { ReactComponent as commentSvg } from '@/assets/icons/icon-comment.svg';
import { ReactComponent as iphoneSvg } from '@/assets/icons/icon-iphone.svg';
import { ReactComponent as mailSvg } from '@/assets/icons/icon-mail.svg';
import { ReactComponent as workflowshow } from '@/assets/icons/icon-workflowshow.svg';
import { ReactComponent as workflowdesign } from '@/assets/icons/icon-workflowdesign.svg';
import { ReactComponent as workflowhang } from '@/assets/icons/icon-workflowhang.svg';
import { ReactComponent as workflowdeploy } from '@/assets/icons/icon-workflowdeploy.svg';
import { ReactComponent as billSvg } from '@/assets/icons/icon-bill.svg';
import { ReactComponent as invalidSvg } from '@/assets/icons/icon-invalid.svg';
import { ReactComponent as userSvg } from '@/assets/icons/icon-user.svg';
import { ReactComponent as generateSvg } from '@/assets/icons/icon-generate.svg';
import { ReactComponent as refreshSvg } from '@/assets/icons/icon-refresh.svg';
import { ReactComponent as userDefaultSvg } from '@/assets/icons/icon-user-default.svg';
import { ReactComponent as downloadSvg } from '@/assets/icons/icon-download.svg';
import { ReactComponent as storehouse } from '@/assets/icons/icon-storehouse.svg';
import { ReactComponent as reload } from '@/assets/icons/icon-reload.svg';
import { ReactComponent as minusSquare } from '@/assets/icons/icon-MinusSquare.svg';
import { ReactComponent as swapSvg } from '@/assets/icons/icon-swap.svg';
import { ReactComponent as staroutlinedSvg } from '@/assets/icons/icon-staroutlined.svg';
import { ReactComponent as starfilledSvg } from '@/assets/icons/icon-starfilled.svg';
import { ReactComponent as fullscreenSvg } from '@/assets/icons/icon-fullscreen.svg';
import { ReactComponent as fullscreenexitSvg } from '@/assets/icons/icon-fullscreenexit.svg';
import { ReactComponent as logoutSvg } from '@/assets/icons/icon-logout.svg';
import { ReactComponent as bellSvg } from '@/assets/icons/icon-bell.svg';
import { ReactComponent as appstoreSvg } from '@/assets/icons/icon-appstore.svg';
import { ReactComponent as menuSvg } from '@/assets/icons/icon-menu.svg';
import { ReactComponent as rightSvg } from '@/assets/icons/icon-right.svg';
import { ReactComponent as wrongSvg } from '@/assets/icons/icon-wrong.svg';
import { ReactComponent as checkcircleSvg } from '@/assets/icons/icon-checkcircle.svg';
import { ReactComponent as questioncircleSvg } from '@/assets/icons/icon-questioncircle.svg';
import { ReactComponent as closecircleSvg } from '@/assets/icons/icon-closecircle.svg';

import { ReactComponent as doubleleftSvg } from '@/assets/icons/icon-doubleleft.svg';
import { ReactComponent as doublerightSvg } from '@/assets/icons/icon-doubleright.svg';
import { ReactComponent as formSvg } from '@/assets/icons/icon-form.svg';

import { ReactComponent as eyeSvg } from '@/assets/icons/icon-eye.svg';
import { ReactComponent as dashboardSvg } from '@/assets/icons/icon-dashboard.svg';
import { ReactComponent as loadingSvg } from '@/assets/icons/icon-loading.svg';
import { ReactComponent as heartSvg } from '@/assets/icons/icon-heart.svg';
import { ReactComponent as sendSvg } from '@/assets/icons/icon-send.svg';
import { ReactComponent as shareSvg } from '@/assets/icons/icon-share.svg';
import { ReactComponent as messageSvg } from '@/assets/icons/icon-message.svg';
import { ReactComponent as lockSvg } from '@/assets/icons/icon-lock.svg';
interface IconProps {
  component: any;
}
// const Icon = (props: IconProps) => {
//   return <span className='el-icon'>{props.component}</span>;
// };
import './style.less';
// ---------------- 公用图标  ----------------

// blue
const DownloadBlue = (props) => (
  <Icon
    component={downloadSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 下载（蓝色）
const AddBlue = (props) => (
  <Icon
    component={addSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 新增（蓝色）
const GenerateBlue = (props) => (
  <Icon
    component={generateSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 转换（蓝色）
const EditBlue = (props) => (
  <Icon
    component={editSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 编辑（蓝色）
const SaveBlue = (props) => (
  <Icon
    component={saveSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 保存（蓝色）
const AuditBlue = (props) => (
  <Icon
    component={auditSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 审核（蓝色）
const ImportBlue = (props) => (
  <Icon
    component={importSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 导入（蓝色）
const ExportBlue = (props) => (
  <Icon
    component={exportSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 导出（蓝色）
const BatchBlue = (props) => (
  <Icon
    component={batchSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 批量（蓝色）
const CopyBlue = (props) => (
  <Icon
    component={copySvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 复制（蓝色）
const UpBlue = (props) => (
  <Icon
    component={upSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 上（蓝色）
const DownBlue = (props) => (
  <Icon
    component={downSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 下（蓝色）
const LeftBlue = (props) => (
  <Icon
    component={leftSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 左（蓝色）
const SubmitBlue = (props) => (
  <Icon
    component={submitSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 提交、确定（蓝色）
const RefreshBlue = (props) => (
  <Icon
    component={resetSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 重置（蓝色）
const UploadBlue = (props) => (
  <Icon
    component={uploadSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 上传（蓝色）
const PictureBlue = (props) => (
  <Icon
    component={pictureSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 图片选择（蓝色）
const PermissionsBlue = (props) => (
  <Icon
    component={permissionsSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 权限（蓝色）
const SetBlue = (props) => (
  <Icon
    component={setSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 设置（蓝色）
const PrintBlue = (props) => (
  <Icon
    component={printSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 打印（蓝色）
const BillBlue = (props) => (
  <Icon
    component={billSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 单据详情（蓝色）
const SearchBlue = (props) => (
  <Icon
    component={searchSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 搜索（蓝色）
const BindBlue = (props) => (
  <Icon
    component={bindSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 绑定（蓝色）
const ActiveBlue = (props) => (
  <Icon
    component={activeSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 激活（蓝色）
const CommentBlue = (props) => (
  <Icon
    component={commentSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 短信（蓝色）
const IphoneBlue = (props) => (
  <Icon
    component={iphoneSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // APP（蓝色）
const MailBlue = (props) => (
  <Icon
    component={mailSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 站内信（蓝色）
const WorkflowShowBlue = (props) => (
  <Icon
    component={workflowshow}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 流程查看（蓝色）
const WorkflowDesignBlue = (props) => (
  <Icon
    component={workflowdesign}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 流程设计（蓝色）
const WorkflowDeployBlue = (props) => (
  <Icon
    component={workflowdeploy}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 流程设计（蓝色）

const StoreHouseBlue = (props) => (
  <Icon
    component={storehouse}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); //配货（蓝色）
const ReloadBlue = (props) => (
  <Icon
    component={reload}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); //更新（蓝色）
const MinusSquare = (props) => (
  <Icon
    component={minusSquare}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); //释放单行（蓝色）
const CancelBlue = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 取消（蓝色）
// Cyan

const AuditCyan = (props) => (
  <Icon
    component={auditSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // 提交、确定（青色）
const UserCyan = (props) => (
  <Icon
    component={userSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); //用户（灰色）
const DefaultUserCyan = (props) => (
  <Icon
    component={userDefaultSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
);
const SubmitCyan = (props) => (
  <Icon
    component={submitSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // 提交、确定（青色）
const CodeCyan = (props) => (
  <Icon
    component={codeSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // 二维码（青色）
const TransferCyan = (props) => (
  <Icon
    component={transferSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // 转移（青色）
const ShelvesCyan = (props) => (
  <Icon
    component={shelvesSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // 上架（青色）
const PermissionsCyan = (props) => (
  <Icon
    component={permissionsSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // 生成首字母（青色）
const CouponsCyan = (props) => (
  <Icon
    component={couponsSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // 优惠券（青色）

// Yellow
const RecommendedYellow = (props) => (
  <Icon
    component={recommendedSvg}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // 推荐（黄色）
const GoodsYellow = (props) => (
  <Icon
    component={goodsSvg}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // 商品（黄色）
const StarFilledYellow = (props) => (
  <Icon
    component={starfilledSvg}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // 商品（黄色）
const WorkflowHangYellow = (props) => (
  <Icon
    component={workflowhang}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // 流程设计（黄色）
// Red
const DeleteRed = (props) => (
  <Icon
    component={deleteSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // 删除（红色）
const RecycleRed = (props) => (
  <Icon
    component={recycleSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // 回收站（红色）
const TheShelvesRed = (props) => (
  <Icon
    component={theShelvesSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // 下架（红色）
const CancelRed = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // 取消（红色）
const CloseRed = (props) => (
  <Icon
    component={closeSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // 关闭（红色）
const RefreshRed = (props) => (
  <Icon
    component={resetSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // 重置（红色）
const InvalidRed = (props) => (
  <Icon
    component={invalidSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // 作废（红色）

// Black
const SearchBlack = (props) => (
  <Icon
    component={searchSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 搜索（黑色）
const SendBlack = (props) => (
  <Icon
    component={sendSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 发送（黑色）
const MessageBlack = (props) => (
  <Icon
    component={messageSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 消息（黑色）
const LockBlack = (props) => (
  <Icon
    component={lockSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 锁定（黑色）
const ShareBlack = (props) => (
  <Icon
    component={shareSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 分享（黑色）
const EyeBlack = (props) => (
  <Icon
    component={eyeSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 眼睛（黑色）
const DashboardBlack = (props) => (
  <Icon
    component={dashboardSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 工作台（黑色）
const LoadingBlack = (props) => (
  <Icon
    component={loadingSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 加载中（黑色）
const HeartBlack = (props) => (
  <Icon
    component={heartSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 心（黑色）
const FormBlack = (props) => (
  <Icon
    component={formSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 表单（黑色）
const QuestioncircleBlack = (props) => (
  <Icon
    component={questioncircleSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 问号圆圈（黑色）
const ClosecircleBlack = (props) => (
  <Icon
    component={closecircleSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 关闭圆圈（黑色）
const CheckcircleBlack = (props) => (
  <Icon
    component={checkcircleSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 对勾圆圈（黑色）
const DoubleleftBlack = (props) => (
  <Icon
    component={doubleleftSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 双左箭头（黑色）
const DoublerightBlack = (props) => (
  <Icon
    component={doublerightSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 双右箭头（黑色）
const CloseBlack = (props) => (
  <Icon
    component={closeSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 关闭（黑色）
const WrongBlack = (props) => (
  <Icon
    component={wrongSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 叉（黑色）
const RightBlack = (props) => (
  <Icon
    component={rightSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 右（黑色）
const MenuBlack = (props) => (
  <Icon
    component={menuSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 菜单（黑色）
const AddBlack = (props) => (
  <Icon
    component={addSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 新增（黑色）
const UserBlack = (props) => (
  <Icon
    component={userSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 用户（黑色）
const LogoutBlack = (props) => (
  <Icon
    component={logoutSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 登出（黑色）
const StaroutlinedBlack = (props) => (
  <Icon
    component={staroutlinedSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 搜索（黑色）
const SetBlack = (props) => (
  <Icon
    component={setSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 设置（黑色）
const SwapBlack = (props) => (
  <Icon
    component={swapSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 上下交换（黑色）
const ExportBlack = (props) => (
  <Icon
    component={exportSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 导出（黑色）
const PrintBlack = (props) => (
  <Icon
    component={printSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 打印（黑色）
const UpBlack = (props) => (
  <Icon
    component={upSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 上（黑色）
const DownBlack = (props) => (
  <Icon
    component={downSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 下（黑色）
const UploadBlack = (props) => (
  <Icon
    component={uploadSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 下（黑色）

const LeftBlack = (props) => (
  <Icon
    component={leftSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 左（黑色）
const CancelBlack = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 取消（黑色）
const DeleteBlack = (props) => (
  <Icon
    component={deleteSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 取消（黑色）
const RefreshBlack = (props) => (
  <Icon
    component={refreshSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 刷新（黑色）
const AppstoreBlack = (props) => (
  <Icon
    component={appstoreSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // 刷新（黑色）

// white
const AddWhite = (props) => (
  <Icon
    component={addSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 新增（白色）
const BellWhite = (props) => (
  <Icon
    component={bellSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 提醒（白色）
const MenuWhite = (props) => (
  <Icon
    component={menuSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 新增（白色）
const EditWhite = (props) => (
  <Icon
    component={editSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 编辑（白色）
const SaveWhite = (props) => (
  <Icon
    component={saveSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 保存（白色）
const AuditWhite = (props) => (
  <Icon
    component={auditSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 审核（白色）
const ImportWhite = (props) => (
  <Icon
    component={importSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 导入（白色）
const ExportWhite = (props) => (
  <Icon
    component={exportSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 导出（白色）
const BatchWhite = (props) => (
  <Icon
    component={batchSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 批量（白色）
const CopyWhite = (props) => (
  <Icon
    component={copySvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 复制（白色）
const UpWhite = (props) => (
  <Icon
    component={upSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 上（白色）
const DownWhite = (props) => (
  <Icon
    component={downSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 下（白色）
const LeftWhite = (props) => (
  <Icon
    component={leftSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 左（白色）
const DeleteWhite = (props) => (
  <Icon
    component={deleteSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 删除（白色）
const CancelWhite = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 取消（白色）
const CloseWhite = (props) => (
  <Icon
    component={closeSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 关闭（白色）
const SubmitWhite = (props) => (
  <Icon
    component={submitSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 提交、确定（白色）
const UploadWhite = (props) => (
  <Icon
    component={uploadSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 上传（白色）
const PictureWhite = (props) => (
  <Icon
    component={pictureSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 图片选择（白色）
const RefreshWhite = (props) => (
  <Icon
    component={refreshSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 刷新（白色）
const PermissionsWhite = (props) => (
  <Icon
    component={permissionsSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 权限（白色）
const SetWhite = (props) => (
  <Icon
    component={setSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 设置（白色）
const CodeWhite = (props) => (
  <Icon
    component={codeSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 二维码（白色）
const FullscreenWhite = (props) => (
  <Icon
    component={fullscreenSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 全屏（白色）
const FullscreenexitWhite = (props) => (
  <Icon
    component={fullscreenexitSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 全屏（白色）
const TransferWhite = (props) => (
  <Icon
    component={transferSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 转移（白色）
const ShelvesWhite = (props) => (
  <Icon
    component={shelvesSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 上架（白色）
const TheShelvesWhite = (props) => (
  <Icon
    component={theShelvesSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 下架（白色）
const RecommendedWhite = (props) => (
  <Icon
    component={recommendedSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 推荐（白色）
const CouponsWhite = (props) => (
  <Icon
    component={couponsSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 优惠券（白色）
const RecycleWhite = (props) => (
  <Icon
    component={recycleSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 回收站（白色）
const PrintWhite = (props) => (
  <Icon
    component={printSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 打印（白色）
const SearchWhite = (props) => (
  <Icon
    component={searchSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 搜索（白色）
const GoodsWhite = (props) => (
  <Icon
    component={goodsSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // 商品（白色）

const QRCodeBlue = (props) => (
  <Icon
    component={codeSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 重新生成二维码 （表格级 绿色）

const RecycleBlue = (props) => (
  <Icon
    component={recycleSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 移入回收站 （表格级 红色）

const SettlementBlue = (props) => (
  <Icon
    component={settlementSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // 结算 （蓝色）

export {
  DownloadBlue,
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
  BindBlue,
  ActiveBlue,
  WorkflowShowBlue,
  WorkflowDesignBlue,
  WorkflowDeployBlue,
  BillBlue,
  SubmitCyan,
  CodeCyan,
  TransferCyan,
  ShelvesCyan,
  PermissionsCyan,
  CouponsCyan,
  RecommendedYellow,
  GoodsYellow,
  DeleteRed,
  RecycleRed,
  TheShelvesRed,
  CancelRed,
  CloseRed,
  ExportBlack,
  PrintBlack,
  UpBlack,
  DownBlack,
  LeftBlack,
  CancelBlack,
  SearchBlack,
  DeleteBlack,
  SetBlack,
  AddWhite,
  EditWhite,
  SaveWhite,
  AuditWhite,
  ImportWhite,
  ExportWhite,
  BatchWhite,
  CopyWhite,
  UpWhite,
  DownWhite,
  LeftWhite,
  DeleteWhite,
  CancelWhite,
  CloseWhite,
  SubmitWhite,
  UploadWhite,
  PictureWhite,
  PermissionsWhite,
  SetWhite,
  CodeWhite,
  TransferWhite,
  ShelvesWhite,
  TheShelvesWhite,
  RecommendedWhite,
  CouponsWhite,
  RecycleWhite,
  PrintWhite,
  SearchWhite,
  GoodsWhite,
  QRCodeBlue,
  RecycleBlue,
  GenerateBlue,
  SettlementBlue,
  CommentBlue,
  IphoneBlue,
  MailBlue,
  WorkflowHangYellow,
  RefreshRed,
  InvalidRed,
  UserCyan,
  AuditCyan,
  RefreshWhite,
  RefreshBlack,
  DefaultUserCyan,
  StoreHouseBlue,
  ReloadBlue,
  MinusSquare,
  CancelBlue,
  SwapBlack,
  MenuWhite,
  FullscreenWhite,
  FullscreenexitWhite,
  StaroutlinedBlack,
  StarFilledYellow,
  UserBlack,
  LogoutBlack,
  BellWhite,
  UploadBlack,
  AppstoreBlack,
  RightBlack,
  AddBlack,
  MenuBlack,
  CloseBlack,
  WrongBlack,
  ClosecircleBlack,
  CheckcircleBlack,
  QuestioncircleBlack,
  DoubleleftBlack,
  DoublerightBlack,
  FormBlack,
  EyeBlack,
  DashboardBlack,
  LoadingBlack,
  HeartBlack,
  SendBlack,
  ShareBlack,
  MessageBlack,
  LockBlack
};
