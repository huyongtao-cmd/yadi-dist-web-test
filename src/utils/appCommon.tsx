// 项目内通用功能
import { ElNotification } from '@/components/el';

let app = {
  // 显示消息结果
  ShowMsg(res) {
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
  }
};

export default app;
