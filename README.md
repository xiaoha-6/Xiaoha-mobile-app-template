# xiaoha Phone · App 开发模板

React、Vue、原生 JavaScript 三个独立 FiveM 插件。复制其中一个目录作为自己的资源，修改业务界面与 Lua 回调，调用已混淆的 SDK。

每套模板自带 fxmanifest.lua、client.lua、server.lua。React 的 `web/vendor/xiaoha-phone-sdk` 是编译混淆后的 SDK 目录，通过 package.json 中的 file: 依赖引用；Vue 和原生直接引用 web/vendor 内的混淆消息桥与压缩样式。无需单独下载 SDK，不上传 tgz 或组件实现源码。

| 目录 / 资源名称 | 框架 | 默认 App ID | 本地预览 |
| --- | --- | --- | --- |
| [xiaoha-react](./xiaoha-react) | React + TypeScript | city_react | localhost:5192 |
| [xiaoha-vue](./xiaoha-vue) | Vue 3 | city_vue | localhost:5193 |
| [xiaoha-vanillajs](./xiaoha-vanillajs) | 原生 HTML / CSS / JavaScript | city_vanillajs | 手机内直接运行 |

## React / Vue 开发

```bash
git clone https://github.com/xiaoha-6/Xiaoha-mobile-app-template.git
cd Xiaoha-mobile-app-template/xiaoha-react/web
npm ci
npm run dev
```

Vue 将上述路径改成 xiaoha-vue/web。两个预览均支持 Duo / Pro Max、折叠和深浅色；只有独立开发预览使用测试角色。正式构建通过手机握手读取真实服务器数据。

## 作为独立插件安装

React / Vue 在 web 目录运行 npm run build。将对应的完整资源目录放进 FiveM resources：

```text
ensure ox_lib
ensure xiaoha_phone_duo
# 按需启动其中一种，也可以分别安装作对照
ensure xiaoha-react
ensure xiaoha-vue
ensure xiaoha-vanillajs
```

原生 JS 无需 npm 和编译，直接编辑 web/app.js。三个资源的默认 App ID 不同，Lua 回调和刷新事件根据 GetCurrentResourceName() 命名，可以同时启动。复制模板开发第二个 App 时，请给 client.lua 的 appId 设置唯一值；资源目录也应有自己的名称。

```text
xiaoha-react/ 或 xiaoha-vue/
  fxmanifest.lua       # 依赖、网页和 Lua 文件清单
  client.lua           # 注册、消息转交、停止清理、重启重新注册
  server.lua           # 真实 source、请求限流、业务数据
  web/
    src/               # 你的可编辑页面
    vendor/            # 混淆 SDK / 消息桥
    dist/              # npm run build 生成
```

## React 组件 SDK

```tsx
import {AppFrame, Page, Toolbar, Button, phone} from '@xiaoha/phone-sdk';
import '@xiaoha/phone-sdk/styles.css';

export default function App() {
  return <AppFrame><Page toolbar={<Toolbar title="城市服务" />}>
    <Button variant="liquid-glass" onClick={() => phone.home()}>完成</Button>
  </Page></AppFrame>;
}
```

React 使用组件 SDK；Vue 和原生 JS 使用同一套混淆消息桥 window.XiaohaPhone，界面由各自框架渲染。Vue 页面在 src/App.vue；主题、安全区、机型来自手机 context，不能直接把 React 组件当成 Vue 组件导入。

SDK 来自 [xiaoha_phone_sdk](https://github.com/xiaoha-6/xiaoha_phone_sdk)，仅含受保护运行时、压缩 CSS、公开类型声明与许可证，不包含组件实现源码。

## 读取业务与推送更新

React 页面挂载后等待 waitForPhone()，再调用 phone.message({action:'profile'})。Vue / 原生 JS 检查 phone.context 或监听 ready 后调用 message。客户端 onMessage 转交 ox_lib 回调；server.lua 从真实 source 读取角色。不要在 onOpen 里推送首次数据，iframe 可能尚未准备好。

```lua
-- 业务变化后，从对应 App 资源推送
exports['xiaoha_phone_duo']:SendAppMessage('city_vue', {action = 'refresh'})
```

React useNuiEvent、Vue onUnmounted、原生 JS pagehide 都会清理订阅。phone.home/close/open、toast/notify/badge 和 Duo fold 方法由手机处理；余额、物品、角色权限和业务保存必须在自己的服务端验证。

## 文档与许可

[组件 SDK](https://iphone.xiaoha.cloud/docs/sdk) · [三种模板教程](https://iphone.xiaoha.cloud/docs/app-template) · [消息 API](https://iphone.xiaoha.cloud/docs/custom-apps) · [English guide](https://iphone.xiaoha.cloud/docs/app-template?lang=en-US)

模板业务源码可编辑，组件实现以混淆发行包提供。第三方许可证随 SDK 保留。真实 FiveM 验收仍应覆盖手机资源重启、打开/关闭、消息更新和服务端拒绝响应。

目录组织参考 [LB 官方模板](https://github.com/lbphone/lb-phone-app-template) 的独立资源与多框架结构。本模板使用 xiaoha 协议，不需要 LB Phone。

English: Three independent resources for React TypeScript, Vue 3 and vanilla JavaScript. Build the React/Vue web directories with npm ci and npm run build; vanilla runs without a build. React uses the protected component package. Vue/vanilla use the protected framework-neutral message bridge. Each resource has a distinct App ID and callbacks scoped to its resource name.
