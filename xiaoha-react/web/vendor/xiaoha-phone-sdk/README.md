# xiaoha Phone SDK

为 xiaoha Phone 第三方 App 提供同一套 iOS 组件、毛玻璃、主题、事件和 NUI 请求。支持 React 18 / 19，Duo 与 Pro Max。SDK 发行包只有受保护的运行时代码、压缩 CSS 与公开类型声明。

```tsx
import {AppFrame, Page, Toolbar, Button, ListSection, usePhoneContext, phone} from '@xiaoha/phone-sdk';
import '@xiaoha/phone-sdk/styles.css';

export default function App() {
  const context = usePhoneContext();
  return <AppFrame><Page toolbar={<Toolbar title="我的应用" trailing={
    <Button variant="liquid-glass" onClick={() => phone.home()}>完成</Button>
  }/>}><ListSection header="当前机型">{context?.model}</ListSection></Page></AppFrame>;
}
```

页面挂载后调用 `waitForPhone()`，再用 `fetchNui()` 或 `phone.message()` 读取业务数据；后续更新通过 `onNuiEvent()` 或 `useNuiEvent()` 订阅，卸载时取消订阅。所有交易和权限必须由 App 自己的可信服务端验证。

## 安装

```bash
npm install github:xiaoha-6/xiaoha_phone_sdk#v1.0.0
```

三套 App 模板已经直接附带编译混淆后的 SDK，不需要下载或安装 tgz。React 模板通过 `file:vendor/xiaoha-phone-sdk` 引用本地发行目录，运行 `npm ci` 即可。Vue / 原生 JS 模板直接引入自带消息桥。项目需安装 React / ReactDOM 18.3 或 19，组件与 React 的版本保持一致。无需执行 SDK 编译命令，仓库直接提供可使用的发行文件。

## 组件与样式

公开组件：AppFrame、Page、Toolbar、Button、ListSection、ListRow、SearchBar、SegmentedControl、Slider、TabBar、TextField、Toggle、Alert、Sheet、ContextMenu。

`AppFrame` 接收机型、主题、安全区并提供 Portal 容器，必须包在页面最外层。CSS 只需导入一次。Pro Max 不预留 Duo 单手侧栏空间；Duo 跟随宽屏和折叠状态。属性类型见 `dist/types`，不要使用不存在的 Checkbox / Popover 导出。

## 请求数据

```tsx
import {useEffect, useState} from 'react';
import {waitForPhone, phone, useNuiEvent} from '@xiaoha/phone-sdk';

const context = await waitForPhone();
const result = await phone.message({action: 'profile'});
const unsubscribe = phone.on('message', data => console.log(data));
unsubscribe();
```

`message` 调用注册时的 `onMessage`，返回其业务结果；10 秒未响应返回 null。`fetchNui(name, data)` 调用当前 App 资源自己的 NUI 回调。首次数据在网页挂载并收到上下文后请求；`onOpen` 触发时 iframe 可能还没准备好。服务端后续更新用 `SendAppMessage` 推送。

事件有 ready、context、visibility、message。`onNuiEvent` 返回取消订阅函数，`useNuiEvent` 自动随组件卸载清理订阅。context 在初始化前为 null。

## 纯 HTML / JavaScript

```html
<script src="./vendor/xiaoha-phone-bridge.js"></script>
```

将本仓库 `dist/bridge.js` 复制到上面的路径。这是独立的混淆版消息 SDK，不需要 React；通过 `window.XiaohaPhone` 调用。React 组件 SDK 已内置该消息桥，不要重复加载。

## 手机控制

`phone.home()` 回到主屏幕，`phone.close()` 关闭 App，`phone.open(id)` 打开应用；`phone.toast(text)`、`phone.notify(options)`、`phone.badge(count)` 调用提示、通知与角标；`phone.fold('toggle')` 只对 Duo 生效。自定义应用 ID 在手机导航中使用 `custom:你的id`。

## 发行内容

dist/index.js、dist/bridge.js 是使用 Cy JSVMP 运行时保护与强混淆生成的代码；dist/styles.css 为压缩样式，dist/types 仅提供公开类型契约。仓库不包含组件实现源码、JSVMP 工具源码、构建源码、私有配置或源码映射。公开 API 名称保留，便于开发者正常调用；保护不代替服务端鉴权。

[完整官网文档](https://iphone.xiaoha.cloud/docs/sdk) · [App 模板](https://github.com/xiaoha-6/Xiaoha-mobile-app-template) · [English documentation](https://iphone.xiaoha.cloud/docs/sdk?lang=en-US)

English: Import the compiled package and stylesheet shown above. Render inside AppFrame, await waitForPhone before loading data, subscribe to later updates and clean up listeners. Authoritative business validation belongs on your own server. The package contains protected runtime code and public declarations, not component implementation source.
