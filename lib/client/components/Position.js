import { openBlock, createElementBlock, Fragment, renderList, toDisplayString } from 'vue';
import './Position.vue?vue&type=style&index=0&id=00405b77&scoped=true&lang.css';

var script = {
  props: {
    lines: {
      type: Number,
    },
  },
};

const _hoisted_1 = { class: "editable-lines" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.lines, (item) => {
      return (openBlock(), createElementBlock("span", { key: item }, toDisplayString(item), 1 /* TEXT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script.render = render;
script.__scopeId = "data-v-00405b77";
script.__file = "src/client/components/Position.vue";

export { script as default };
//# sourceMappingURL=Position.js.map
