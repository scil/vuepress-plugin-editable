import * as mitt from 'mitt';

declare const editablePlugin: (options: any, app: any) => {
    name: string;
    extendMarkdown(md: any): void;
    extendsPage(page: any): void;
    /** scil 用 clientAppEnhanceFiles 注册组件
     * 参考
     * - 官方文档那样 在这里注册组件
     * - https://github.com/vuepress/vuepress-next/blob/275ac05052de642e698bc0fb7fad61fce702a978/packages/%40vuepress/plugin-external-link-icon/src/node/externalLinkIconPlugin.ts
     * - D:\vagrant\vendors\vuepress-theme-hope\packages\theme\src\node\theme.ts
     *
     */
    /**
     * 另外一种方式注册组件：用 clientAppRootComponentFiles： D:\vagrant\vendors\vuepress-theme-hope\packages\pwa2\src\node\plugin.ts
     */
    define: {
        CAN_REVIEW: any;
    };
    clientAppSetupFiles: string;
};

/**
 * temp handler
 * event bus
 *
 */
declare const bus: mitt.Emitter<Record<mitt.EventType, unknown>>;

export { bus, editablePlugin as default, editablePlugin };
