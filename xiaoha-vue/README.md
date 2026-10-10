# xiaoha Phone · Vue 模板

进入 web 后运行 `npm ci`、`npm run dev`，预览地址 http://localhost:5193。`npm run build` 生成 web/dist；将整个资源目录放入 FiveM resources，先启动 ox_lib 和 xiaoha_phone_duo。

web/src/App.vue 是你的业务页面。Vue 通过已混淆的消息 SDK `window.XiaohaPhone` 调用手机；它不直接导入 React 组件。样式随包附带，主题、安全区与机型由手机上下文同步。Standalone 开发预览只使用测试资料，正式构建请求真实 Lua 回调。

监听 ready 后调用 message，context 同步界面，message 接收后续更新；onUnmounted 取消订阅。桥接 SDK 无需 Vue 或 React，本模板只依赖 Vue 3 和 Vite。

[调用文档](https://iphone.xiaoha.cloud/docs/app-template) · [全部消息 API](https://iphone.xiaoha.cloud/docs/custom-apps)
