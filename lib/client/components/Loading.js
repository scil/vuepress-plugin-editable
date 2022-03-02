import mitt from 'mitt';
import { openBlock, createElementBlock, createCommentVNode, pushScopeId, popScopeId, createElementVNode } from 'vue';
import './Loading.vue?vue&type=style&index=0&id=6ded6ade&scoped=true&lang.css';

/**
 * temp handler
 * event bus
 *
 */
// var mitt = require('mitt')
const bus = mitt();

var script = {
  name: "EditableLoading",
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    bus.$on("showLoading", (status) => {
      this.loading = status;
    });
  },
};

const _withScopeId = n => (pushScopeId("data-v-6ded6ade"),n=n(),popScopeId(),n);
const _hoisted_1 = {
  key: 0,
  class: "editable-loading"
};
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("div", { class: "editable-storm-loading" }, null, -1 /* HOISTED */));
const _hoisted_3 = [
  _hoisted_2
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($data.loading)
    ? (openBlock(), createElementBlock("div", _hoisted_1, _hoisted_3))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__scopeId = "data-v-6ded6ade";
script.__file = "src/client/components/Loading.vue";

export { script as default };
//# sourceMappingURL=Loading.js.map
