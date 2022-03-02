import mitt from 'mitt';
import { openBlock, createElementBlock, normalizeStyle, createElementVNode, toDisplayString, createCommentVNode, createTextVNode } from 'vue';
import './Poptip.vue?vue&type=style&index=0&id=74a56010&scoped=true&lang.css';

/**
 * temp handler
 * event bus
 *
 */
// var mitt = require('mitt')
const bus = mitt();

var script = {
  data() {
    return {
      borderColor: "#ddd",
      res: {
        code: 0,
        data: "",
        message: "",
      },
      status: false,
    };
  },
  mounted() {
    bus.$on("onClose", () => {
      this.status = false;
    });
    bus.$on("onReceive", (json = {}, status) => {
      const { code, data, message } = json;
      this.res = {
        code,
        data,
        message,
      };

      this.status = status;
      if (code === 0) {
        this.borderColor = "#3eaf7c";
      } else {
        this.borderColor = "#eb7350";
      }
    });
  },
  methods: {
    closePoptip() {
      this.status = false;
      if (this.res.code !== 0) {
        location.reload();
      }
    },
    subMessage(str) {
      return (str || "").replace(/^.*: /g, "");
    },
  },
};

const _hoisted_1 = { key: 0 };
const _hoisted_2 = /*#__PURE__*/createTextVNode(" message: ");
const _hoisted_3 = { class: "code" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = /*#__PURE__*/createTextVNode(" Fork first: ");
const _hoisted_6 = ["href"];
const _hoisted_7 = { key: 1 };
const _hoisted_8 = /*#__PURE__*/createTextVNode(" See: ");
const _hoisted_9 = ["href"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($data.status)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "editable-poptip",
        style: normalizeStyle({ borderColor: $data.borderColor })
      }, [
        createElementVNode("div", null, [
          createElementVNode("strong", null, toDisplayString($data.res.code === 0 ? "Successful！" : "Warning! "), 1 /* TEXT */),
          createElementVNode("span", {
            class: "close-poptip",
            onClick: _cache[0] || (_cache[0] = (...args) => ($options.closePoptip && $options.closePoptip(...args)))
          }, "x")
        ]),
        ($data.res.code !== 0)
          ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createElementVNode("p", null, [
                _hoisted_2,
                createElementVNode("code", _hoisted_3, toDisplayString($options.subMessage($data.res.message)), 1 /* TEXT */)
              ]),
              ($data.res.code === 403)
                ? (openBlock(), createElementBlock("p", _hoisted_4, [
                    _hoisted_5,
                    (_ctx.$themeConfig.repo)
                      ? (openBlock(), createElementBlock("a", {
                          key: 0,
                          href: 'https://github.com/' + _ctx.$themeConfig.repo,
                          target: "_blank"
                        }, toDisplayString(_ctx.$themeConfig.repo), 9 /* TEXT, PROPS */, _hoisted_6))
                      : createCommentVNode("v-if", true)
                  ]))
                : createCommentVNode("v-if", true)
            ]))
          : (openBlock(), createElementBlock("div", _hoisted_7, [
              _hoisted_8,
              createElementVNode("a", {
                href: $data.res.data && $data.res.data.html_url,
                target: "_blank"
              }, " Pull Request ", 8 /* PROPS */, _hoisted_9)
            ]))
      ], 4 /* STYLE */))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__scopeId = "data-v-74a56010";
script.__file = "src/client/components/Poptip.vue";

export { script as default };
//# sourceMappingURL=Poptip.js.map
