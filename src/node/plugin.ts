// const {resolve} = require("path");
// import {resolve} from 'path'
import { path } from "@vuepress/utils";
import { logger } from "@vuepress/utils";

import {
    addViteOptimizeDepsInclude,
    addViteSsrNoExternal,
    // getLocales,
    // useCustomDevServer,
    addViteOptimizeDepsExclude,
} from "@mr-hope/vuepress-shared";
// import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

// const {cwd} = require("process");
import {cwd} from 'process'
import config from './config';


const {_appDomain, _redirectAPI, _clientId, _updateAPI, _getContentAPI, _githubOAuthUrl} = config;

// @ts-ignore
export const editablePlugin  = (options, app) => {
    const {appDomain, getContentAPI, updateAPI, redirectAPI, clientId,} = options;

    var pluginname= "vuepress-plugin-editable2"

    // from: D:\vagrant\vendors\vuepress-theme-hope\packages\pwa2\src\node\plugin.ts
    addViteOptimizeDepsInclude(app, ["mitt", "register-service-worker"]);
    if (app.env.isDev)
        addViteOptimizeDepsInclude(app, "@mr-hope/vuepress-shared/lib/client");
    addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        pluginname
    ]);
    addViteOptimizeDepsExclude(app, pluginname);


// from: D:\vagrant\vendors\vuepress-theme-hope\packages\sitemap2\src\node\plugin.ts
    logger.warn(`[${pluginname}] just test init`);
    
    return {
        name: pluginname,
        // @ts-ignore
        extendMarkdown(md) {
            md.use(require("./markdown-plugin-line"), app);
        },
        // @ts-ignore
        extendsPage(page) {
            const {_filePath = ""} = page;
            const cwdLen = cwd.length;
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
        clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
    };
};
