// 项目内通用功能
import { ElNotification } from '@/components/el';
import dayjs from 'dayjs';

class AppHelper {
  // 显示消息结果
  ShowMsg(res, errExternMsg = null) {
    if (res.success) {
      errExternMsg = null;
    }
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: errExternMsg
        ? `${res.msg},${errExternMsg}`
        : res.msg || '服务未响应：' + JSON.stringify(res)
    });
  }

  // 插入默认查询顺序
  InsertOrderParams(data) {
    data.orders = [
      {
        asc: false,
        column: 'createTime'
      }
    ];
  }

  containChianese(s) {
    return escape(s).indexOf('%u') >= 0;
  }
}

let app = new AppHelper();
export default app;
