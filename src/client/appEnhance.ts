/**
import PhotoSwipe from "../components/PhotoSwipe.vue";
export default PhotoSwipe;
*/

/**
 * 参考
 * - https://v2.vuepress.vuejs.org/advanced/cookbook/usage-of-client-app-enhance.html#register-vue-components
 * - vuepress-webpack\node_modules\@vuepress\theme-default\lib\client\clientAppEnhance.js
 * - 搜索: D:\vagrant\vendors\vuepress-theme-hope\packages Enhance.ts
 * 
 * ?
 * 为什么有的用 h 函数，有的不用
 * 
 */

import EditableReview from "./components/Review.vue";
import EditableLoading from "./components/Loading.vue";
import EditablePoptip from "./components/Poptip.vue";
import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
export default defineClientAppEnhance(({ app }) => {
  // wrap the `<ExternalLinkIcon />` component with plugin options
  // app.component('ExternalLinkIcon', h(ExternalLinkIcon, { locales }))

  // eslint-disable-next-line vue/match-component-file-name
  app.component("EditableReview", EditableReview);
  app.component("EditableLoading", EditableLoading);
  app.component("EditablePoptip", EditablePoptip);
})

