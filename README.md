# OpenAppButton

Zion 微信小程序代码组件：可配置样式的按钮，用于通过微信小程序开放能力打开来源 App。

已发布信息：

- Zion Package ExId: `27qxnJ91XAN`
- Version: `0.0.2`
- Platform: `WECHAT`
- Component: `OpenAppButton`

## 能力说明

该组件内部渲染一个小程序按钮，并设置：

```html
<button open-type="launchApp" app-parameter="..." binderror="...">
  打开 APP
</button>
```

根据微信官方文档，打开 App 必须由用户主动点击触发，不是普通 JS API 调用。小程序也不能打开任意 App，只能在具备打开 App 能力的场景下跳回拉起小程序的 App，例如小程序从 App 打开的场景值 `1069`。

官方参考：[打开 App | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html)

## appParameter 传什么

`appParameter` 对应微信小程序 `button` 的 `app-parameter` 属性。它不是 AppID、Bundle ID、包名或 URL Scheme，也不决定要打开哪个 App。

它只是小程序返回 App 时透传给 App 的业务字符串。打开哪个 App 由微信当前的打开场景和 App/小程序关联关系决定；App 收到这段字符串后，自行解析并跳转到对应业务页面。

推荐传 JSON 字符串，便于扩展：

```json
{"source":"zion","action":"openLunch","page":"orderDetail","orderId":"12345"}
```

也可以传 query string：

```text
source=zion&action=openLunch&page=orderDetail&orderId=12345
```

建议约定字段：

- `source`: 来源标识，例如 `zion`
- `action`: App 端动作，例如 `openLunch`、`openOrder`、`openHome`
- `page`: App 内目标页面
- `id` 或业务 ID: 例如订单 ID、用户 ID、活动 ID
- `extra`: 可选扩展参数，复杂内容建议继续用 JSON

不要在 `appParameter` 中放 token、手机号、身份证号等敏感信息。若需要携带一次性业务上下文，建议传短 ID，由 App 端回后端换取详情。

## App 端如何读取 appParameter

微信官方文档说明：App 需要接入 OpenSDK。

iOS 端在 `WXLaunchMiniProgramResp` 回调中读取：

```objc
NSString *string = resp.extMsg;
```

Android 端在 `WXLaunchMiniProgram.Resp` 回调中读取：

```java
String extraData = launchMiniProResp.extMsg;
```

这两个值对应小程序按钮中的 `app-parameter`。

## Zion 配置参数

### 文案与 App 参数

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `buttonText` | `string` | `打开 APP` | 按钮文本 |
| `appParameter` | `string` | 空字符串 | 传给 App 的业务参数 |
| `disabled` | `boolean` | `false` | 是否禁用 |

### 尺寸与间距

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `width` | `string` | `100%` | 按钮宽度，例如 `100%`、`240px`、`320rpx` |
| `height` | `string` | `auto` | 按钮高度。为 `auto` 时由内边距和字号撑开 |
| `paddingVertical` | `number` | `12` | 上下内边距数值 |
| `paddingHorizontal` | `number` | `18` | 左右内边距数值 |
| `paddingUnit` | `string` | `px` | 内边距单位，例如 `px`、`rpx` |

### 边框与颜色

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `borderWidth` | `number` | `1` | 边框粗细 |
| `borderRadius` | `number` | `8` | 圆角数值 |
| `borderUnit` | `string` | `px` | 边框和圆角单位，例如 `px`、`rpx` |
| `borderColor` | `string` | `#1f2937` | 边框颜色 |
| `backgroundColor` | `string` | `#111827` | 背景颜色 |
| `textColor` | `string` | `#ffffff` | 文本颜色 |

当前本地预览使用：

```json
{
  "borderColor": "#5BB1FF",
  "backgroundColor": "#EEF7FF",
  "textColor": "#5BB1FF",
  "borderWidth": 1,
  "borderRadius": 8
}
```

### 字体

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fontSize` | `number` | `16` | 字号数值 |
| `fontUnit` | `string` | `px` | 字号单位，例如 `px`、`rpx` |
| `fontWeight` | `number` | `600` | 字重，范围建议 `100` 到 `900` |

## State

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `clickCount` | `State<number>` | 用户点击次数 |
| `lastErrorMessage` | `State<string>` | 打开 App 失败时的错误信息 |

## Event

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `onTap` | `EventHandler` | 点击按钮时触发 |
| `onLaunchError` | `EventHandler` | 打开 App 失败时触发 |

## 常见失败

`invalid scene`: 当前小程序不具备打开 App 的能力。常见原因是小程序不是从 App 打开的，或者当前场景不符合微信开放能力规则。

本地网页预览只能检查按钮样式，不能验证 `launchApp`。需要在微信小程序真机预览或微信开发者工具对应能力环境中验证。
