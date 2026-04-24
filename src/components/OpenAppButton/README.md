# OpenAppButton

微信小程序打开 App 按钮组件。

## appParameter

`appParameter` 对应微信小程序按钮的 `app-parameter` 属性。它是传给 App 的业务字符串，不是 AppID、包名或 URL Scheme。

推荐传 JSON 字符串：

```json
{"source":"zion","action":"openLunch","page":"orderDetail","orderId":"12345"}
```

App 端读取后自行解析并跳转：

- iOS: `WXLaunchMiniProgramResp.extMsg`
- Android: `WXLaunchMiniProgram.Resp.extMsg`

微信官方文档：[打开 App](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html)

## Props

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `buttonText` | `string` | 按钮文案 |
| `appParameter` | `string` | 传给 App 的业务参数 |
| `width` | `string` | 宽度，例如 `100%` |
| `height` | `string` | 高度，例如 `auto` |
| `paddingVertical` | `number` | 上下内边距 |
| `paddingHorizontal` | `number` | 左右内边距 |
| `paddingUnit` | `string` | 内边距单位 |
| `borderWidth` | `number` | 边框粗细 |
| `borderRadius` | `number` | 圆角 |
| `borderUnit` | `string` | 边框和圆角单位 |
| `borderColor` | `string` | 边框颜色 |
| `backgroundColor` | `string` | 背景颜色 |
| `textColor` | `string` | 文本颜色 |
| `fontSize` | `number` | 字号 |
| `fontUnit` | `string` | 字号单位 |
| `fontWeight` | `number` | 字重 |
| `disabled` | `boolean` | 禁用状态 |

## State

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `clickCount` | `State<number>` | 点击次数 |
| `lastErrorMessage` | `State<string>` | 打开 App 失败信息 |

## Event

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `onTap` | `EventHandler` | 点击时触发 |
| `onLaunchError` | `EventHandler` | 打开 App 失败时触发 |

## 限制

该能力必须由用户点击触发，并且小程序需要处于微信允许打开 App 的场景中。小程序不能用该按钮打开任意 App，只能跳回符合条件的来源 App。
