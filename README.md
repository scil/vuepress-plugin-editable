# vuepress-plugin-editable2

```
npm install -D vuepress-plugin-editable2
```

开发思路
- 在原库基础上，进行兼容 vuepress2.0 的改造。 https://v2.vuepress.vuejs.org/reference/plugin-api.html#overview
  - 使用 mitt 作为 event bus
- 主要借鉴 vuepress-theme-hope\packages\copy-code2 等。
  - 编译工具 rollup
    - wsl下运行 rollup 不然
    - [rollup.config.js](https://github.com/scil/vuepress-plugin-editable2/blob/main/rollup.config.js) 不确定是否配置好了
  - 代码中注释中的 from 代表借鉴来源。

使用时有这两个错误，还不能工作 
```
routeLocale.js:12 Uncaught (in promise) Error: useRouteLocale() is called without provider.
    at useRouteLocale (routeLocale.js:12:15)
    at x (locales.ts:16:23)
    at appSetup.ts:55:57
    at setup (app.js:26:17)
    at callWithErrorHandling (runtime-core.esm-bundler.js:155:22)
    at setupStatefulComponent (runtime-core.esm-bundler.js:7056:29)
    at setupComponent (runtime-core.esm-bundler.js:7012:11)
    at mountComponent (runtime-core.esm-bundler.js:4922:13)
    at processComponent (runtime-core.esm-bundler.js:4897:17)
    at patch (runtime-core.esm-bundler.js:4489:21)
useRouteLocale @ routeLocale.js:12
x @ locales.ts:16
(anonymous) @ appSetup.ts:55
setup @ app.js:26
callWithErrorHandling @ runtime-core.esm-bundler.js:155
setupStatefulComponent @ runtime-core.esm-bundler.js:7056
setupComponent @ runtime-core.esm-bundler.js:7012
mountComponent @ runtime-core.esm-bundler.js:4922
processComponent @ runtime-core.esm-bundler.js:4897
patch @ runtime-core.esm-bundler.js:4489
render2 @ runtime-core.esm-bundler.js:5641
mount @ runtime-core.esm-bundler.js:3877
app.mount @ runtime-dom.esm-bundler.js:1590
(anonymous) @ app.js:62
Promise.then (async)
(anonymous) @ app.js:61
Promise.then (async)
(anonymous) @ app.js:60

appSetup.ts:23 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'query')
    at Object.saveAccessToken (appSetup.ts:23:54)
    at appSetup.ts:378:14
    at callWithErrorHandling (runtime-core.esm-bundler.js:155:22)
    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:164:21)
    at Array.hook.__weh.hook.__weh (runtime-core.esm-bundler.js:2667:29)
    at flushPostFlushCbs (runtime-core.esm-bundler.js:356:32)
    at render2 (runtime-core.esm-bundler.js:5643:9)
    at mount (runtime-core.esm-bundler.js:3877:25)
    at Object.app.mount (runtime-dom.esm-bundler.js:1590:23)
    at app.js:62:17
saveAccessToken @ appSetup.ts:23
(anonymous) @ appSetup.ts:378
callWithErrorHandling @ runtime-core.esm-bundler.js:155
callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:164
hook.__weh.hook.__weh @ runtime-core.esm-bundler.js:2667
flushPostFlushCbs @ runtime-core.esm-bundler.js:356
render2 @ runtime-core.esm-bundler.js:5643
mount @ runtime-core.esm-bundler.js:3877
app.mount @ runtime-dom.esm-bundler.js:1590
(anonymous) @ app.js:62
Promise.then (async)
(anonymous) @ app.js:61
Promise.then (async)
(anonymous) @ app.js:60
```

# vuepress-plugin-editable

<p align="center">

<a href="https://npmcharts.com/compare/vuepress-plugin-editable?minimal=true"><img src="https://img.shields.io/npm/dm/vuepress-plugin-editable.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vuepress-plugin-editable"><img src="https://img.shields.io/npm/v/vuepress-plugin-editable.svg" alt="Version"></a>
[![release docs CI](https://github.com/veaba/vuepress-plugin-editable/actions/workflows/release-docs.yml/badge.svg)](https://github.com/veaba/vuepress-plugin-editable/actions/workflows/release-docs.yml)

</p>

Let's editing vuepress generate docs so easy!

> Safety Warning: Currently, to facilitate functionality, veaba-bot explicitly redirects the Github AccessToken to the url of your launch oAuth page. For the security of your Github account, please always avoid revealing the AccessToken to third parties, including [veaba-bot](), veaba ](https://github.com/veaba/veaba-bot), `veaba-bot` will not keep storing your `AccessToken` information. Your `AccessToken` is passed to `veaba-bot` via the Request header `access-token` set in fetch.

> 安全警告：目前为了方便实现功能，`veaba-bot` 会显式地将 Github `AccessToken` 重定向到你的发起 oAuth 页面的 url，为了你的 Github 账号安全，请始终避免泄露 `AccessToken` 给第三方，包括 [veaba-bot](https://github.com/veaba/veaba-bot)，`veaba-bot` 不会保留存储你的 `AccessToken`信息。你的 `AccessToken` 是通过 fetch 里设置的 Request header `access-token` 传递给 `veaba-bot`。

## Why vuepress-plugin-editable

Based on vuepress + markdown ecosystem simplifies the intermediate process and can be quickly applied to the article
creation and revision process.

You don't even need to open vscode, you just find a mistake while reading the documentation and correct it as you go.

This will lower the threshold for developers to participate in open source documentation maintenance.

## Install

```sh
npm install -D vuepress-plugin-editable
# OR yarn add -D vuepress-plugin-editable
```

## Usage

1. Double-click on the vuepress generated content.

2. OAuth github account and PR to repo's source file.

## Features

- [x] vuepress ecosystem

- [x] plain text mode: HTML setting `contenteditable:true` redirect pull request.

- [x] complex text mode: diff origin source file content.

- [x] success/error alert ui

## Bug

Listed not supported yet!

1. custom container

```txt
::: warning
*here be dragons*
:::

```

2. definition code

```txt
:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

```

3. img

4. table

5. code

6. Emphasis

```txt

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~StrikeThrough~~

```

7. Positioning is not accurate

8. H1-H6 auth block position has been mask.

9. BUG: 再次发起请求时，应该关闭 dialog
## API

### options

| name          | description          | default                |
| ------------- | -------------------- | ---------------------- |
| appDomain     |                      | `https://bot.veaba.me` |
| getContentAPI |                      | `/api/content/get`     |
| updateAPI     |                      | `/api/content/update`  |
| redirectAPI   |                      | `/api/redirect/github` |
| clientId      | Github APP client id | {clientId}             |
|               |                      |                        |

## Reference

- [First draft](https://github.com/vuejs/docs-next-zh-cn/discussions/377#discussioncomment-298623)
