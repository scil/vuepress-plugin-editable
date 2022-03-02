'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@vuepress/utils');
var vuepressShared = require('@mr-hope/vuepress-shared');
var process = require('process');
var mitt = require('mitt');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mitt__default = /*#__PURE__*/_interopDefaultLegacy(mitt);

const _appDomain$1 = "https://bot.veaba.me";
var config = {
    _appDomain: _appDomain$1,
    _clientId: "Iv1.f8c5b24e304d03c9",
    _redirectAPI: "/api/redirect/github",
    _updateAPI: "/api/content/update",
    _getContentAPI: "/api/content/get",
    _githubOAuthUrl: "https://github.com/login/oauth/authorize",
};

// const {resolve} = require("path");
const { _appDomain, _redirectAPI, _clientId, _updateAPI, _getContentAPI, _githubOAuthUrl } = config;
// @ts-ignore
const editablePlugin = (options, app) => {
    const { appDomain, getContentAPI, updateAPI, redirectAPI, clientId, } = options;
    var pluginname = "vuepress-plugin-editable2";
    // from: D:\vagrant\vendors\vuepress-theme-hope\packages\pwa2\src\node\plugin.ts
    vuepressShared.addViteOptimizeDepsInclude(app, ["mitt", "register-service-worker"]);
    if (app.env.isDev)
        vuepressShared.addViteOptimizeDepsInclude(app, "@mr-hope/vuepress-shared/lib/client");
    vuepressShared.addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        pluginname
    ]);
    vuepressShared.addViteOptimizeDepsExclude(app, pluginname);
    // from: D:\vagrant\vendors\vuepress-theme-hope\packages\sitemap2\src\node\plugin.ts
    utils.logger.warn(`[${pluginname}] just test init`);
    return {
        name: pluginname,
        // @ts-ignore
        extendMarkdown(md) {
            md.use(require("./markdown-plugin-line"), app);
        },
        // @ts-ignore
        extendsPage(page) {
            const { _filePath = "" } = page;
            const cwdLen = process.cwd.length;
            page.data.remoteRelativePath = _filePath.substr(cwdLen).replace(/\\/g, "/");
            const tempUpdateAPI = (appDomain || _appDomain) + (updateAPI || _updateAPI);
            const tempGetContentAPI = (appDomain || _appDomain) + (getContentAPI || _getContentAPI);
            const tempRedirectAPI = (appDomain || _appDomain) + (redirectAPI || _redirectAPI);
            page.data.$editable = {
                appDomain: appDomain || _appDomain,
                getContentAPI: tempGetContentAPI,
                updateAPI: tempUpdateAPI,
                redirectAPI: tempRedirectAPI,
                clientId: clientId || _clientId,
                githubOAuthUrl: _githubOAuthUrl
            };
        },
        /** scil 用 clientAppEnhanceFiles 注册组件
         * 参考
         * - 官方文档那样 在这里注册组件
         * - https://github.com/vuepress/vuepress-next/blob/275ac05052de642e698bc0fb7fad61fce702a978/packages/%40vuepress/plugin-external-link-icon/src/node/externalLinkIconPlugin.ts
         * - D:\vagrant\vendors\vuepress-theme-hope\packages\theme\src\node\theme.ts
         *
         */
        /*
        clientAppEnhanceFiles: [ path.resolve(__dirname, "../client/appEnhance.js")],
         */
        /**
         * 另外一种方式注册组件：用 clientAppRootComponentFiles： D:\vagrant\vendors\vuepress-theme-hope\packages\pwa2\src\node\plugin.ts
         */
        // clientAppRootComponentFiles: ["EditableReview", "EditableLoading", "EditablePoptip"],
        // clientAppRootComponentFiles: [
        //     path.resolve(__dirname, "../client/global-components/Editable.js"),
        // ],
        // https://v2.vuepress.vuejs.org/advanced/cookbook/passing-data-to-client-code.html#use-define-hook
        define: {
            CAN_REVIEW: options.canReview,
        },
        clientAppSetupFiles: utils.path.resolve(__dirname, "../client/appSetup.js"),
    };
};

/**
 * temp handler
 * event bus
 *
 */
// var mitt = require('mitt')
const bus = mitt__default["default"]();

exports.bus = bus;
exports["default"] = editablePlugin;
exports.editablePlugin = editablePlugin;
//# sourceMappingURL=index.js.map
