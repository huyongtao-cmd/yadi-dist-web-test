import { isIE } from "@/utils/utils";
if (process.env.NODE_ENV !== "production") {
  if (isIE()) {
    console.error(
      "[el] ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV."
    );
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log("[el] mock mounting");
  const Mock = require("mockjs");
  require("./services/example");
  require("./services/item");
  Mock.setup({
    timeout: 800, // setter delay time
  });
  console.log("[el] mock mounted");
}
