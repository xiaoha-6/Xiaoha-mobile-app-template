# xiaoha Phone · 原生 JavaScript 模板

完整独立 FiveM 资源，包含 fxmanifest.lua、client.lua、server.lua 和 web。无需 npm，也不用编译。将整个目录放进 resources，启动 ox_lib、xiaoha_phone_duo 后启动本资源。

client.lua 使用 city_vanillajs 注册 App，服务器回调与刷新事件按当前资源名隔离；手机重启后自动重新注册，App 资源停止时清理。web/app.js 使用附带的混淆版 window.XiaohaPhone 消息 SDK。

页面等待上下文，message 读取真实服务器资料，监听 message 推送后刷新，pagehide 清理订阅。server.lua 使用真实 source 并做限流，继续在这里添加你的业务权限校验。

[安装与调用](https://iphone.xiaoha.cloud/docs/app-template) · [全部消息 API](https://iphone.xiaoha.cloud/docs/custom-apps)
