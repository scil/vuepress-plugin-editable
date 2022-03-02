// from: vuepress-theme-hope/packages/copy-code2/rollup.config.js
import {rollupTypescript, rollupVue} from "./rollup";

// from: D:\vagrant\vendors\vuepress-theme-hope\packages\md-enhance\rollup.config.js

const config = [
    ...rollupTypescript("node/index", {
        external: [
     "@mr-hope/vuepress-shared",
            "@vuepress/utils",
            "@vuepress/shared",
            "@vuepress/utils",
            "vue",
            "mitt",
//      "vuepress-plugin-sass-palette",
        ],
    }),
    ...rollupVue("client/appEnhance.ts", {
        resolve: true,
        external: [
            "@vuepress/client",
            "vue",
            // "mitt",
            /\.scss$/,
        ],
        dtsExternal: [/\.scss$/],
        copy: [["client/styles", "client"]],
    }),
    ...rollupTypescript("client/appSetup", {
        external: [
     "@mr-hope/vuepress-shared/lib/client",
            "@vuepress/client",
//      "balloon-css/balloon.css",
            "vue",
            "vue-router",
            // "mitt",
            /\.scss$/,
        ],
        dtsExternal: [ /\.scss$/],
    }),

    // ...rollupVue("client/global-components/Editable.ts", {
    //     resolve: true,
    //     external: [
    //         "@vuepress/client",
    //         "vue",
    //         // "mitt",
    //         /\.scss$/,
    //     ],
    //     dtsExternal: [/\.scss$/],
    // }),
];
console.log(config)
export default config;