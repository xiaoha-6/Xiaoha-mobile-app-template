# xiaoha Phone · React + TypeScript App 模板

这是可编辑的独立 FiveM App 资源。fxmanifest.lua、client.lua、server.lua 已配好。`web/vendor/xiaoha-phone-sdk` 直接提供编译混淆后的 iOS 组件 SDK，package.json 通过本地 file: 依赖引用它；无需 tgz，SDK 不附组件实现源码。

## 本地开发

```bash
cd web
npm ci
npm run dev
```

打开终端显示的本地地址。预览可以切换 Duo / Pro Max、折叠和深色模式。本地模拟资料只在 dev 模式开启，生产包必须收到真实手机上下文。

## 部署

```bash
cd web
npm run build
```

将整个模板目录命名为 `xiaoha_phone_app`，放到 FiveM resources。在手机资源之后启动它：

```text
ensure ox_lib
ensure xiaoha_phone_duo
ensure xiaoha_phone_app
```

修改 client.lua 的 appId、名称和图标；修改 server.lua 添加自己的业务权限校验。页面挂载后才请求初始资料。后续刷新由 `SendAppMessage` 推送，React 监听会在卸载时清理。不要在 onOpen 中抢先发送初始资料，也不要信任网页传入的玩家 source、金额或职业。

API、组件属性和逐步指引：https://iphone.xiaoha.cloud/docs/app-template

## English

Run `npm install` and `npm run dev` in web for local development. Switch Duo / Pro Max, folded mode and theme in the preview toolbar. Run `npm run build`, then put the complete resource folder in FiveM resources and start it after the phone. Customize client.lua registration and server.lua business validation. Load initial data after the UI mounts; use SendAppMessage for later updates. Only development uses mock data. The production app requires a real phone context.
