import { openBlock, createElementBlock, Fragment, renderList, toDisplayString, resolveComponent, normalizeStyle, createElementVNode, createVNode, createCommentVNode, pushScopeId, popScopeId, createTextVNode } from 'vue';
import { defineClientAppEnhance } from '@vuepress/client';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

/**
 * temp handler
 * event bus
 *
 */
// var mitt = require('mitt')
const bus = mitt();

const fetchOps = {
    mode: "cors",
    cache: "no-cache",
    redirect: "follow",
    referrer: "no-referrer", // *client, no-referrer
};

var script$3 = {
  props: {
    lines: {
      type: Number,
    },
  },
};

const _hoisted_1$3 = { class: "editable-lines" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.lines, (item) => {
      return (openBlock(), createElementBlock("span", { key: item }, toDisplayString(item), 1 /* TEXT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script$3.render = render$3;
script$3.__scopeId = "data-v-00405b77";
script$3.__file = "src/client/components/Position.vue";

var script$2 = {
  mounted() {
    this.originContentLine = this.countOriginContent(this.eventData.content);
    bus.$on("showReview", (data) => {
      this.eventData = data;
      this.originContentLine = this.countOriginContent(data.content);
      this.bodyScrollDefaultValue = this.switchBodyScroll();
    });
  },
  components: { Position: script$3 },
  data() {
    return {
      eventData: {
        content: "",
        status: false,
      },
      disabled: false,
      originContentLine: 0,
      otherDivLine: 0,
      bodyScrollDefaultValue: "",
    };
  },
  computed: {
    breakLines() {
      return this.originContentLine + this.otherDivLine;
    },
  },
  methods: {
    /**
     * disabled body scroll
     * @param {boolean} true | false
     */
    switchBodyScroll(isReset) {
      const body = document.querySelector("body");
      const tempOverflowValue = body.style.overflow;
      if (isReset) {
        body.style.overflow = this.bodyScrollDefaultValue;
        this.$nextTick(() => {
          this.bodyScrollDefaultValue = "";
        });
      } else {
        body.style.overflow = "hidden";
      }
      return tempOverflowValue;
    },
    countOriginContent(nodeOrContent, isNode) {
      let lines = 0;
      if (nodeOrContent) {
        let text = "";
        if (isNode) {
          text = nodeOrContent.textContent;
        } else {
          text = nodeOrContent;
        }
        for (let i in text) {
          if (text[i] === "\n") lines++;
        }
      }
      return lines;
    },
    closeModal() {
      location.reload();
    },
    debounce(fn, wait) {
      let timer = 0;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, wait);
      };
    },
    /**
     * contenteditable input event generate div element
     */
    onChange(event) {
      this.otherDivLine = (event.target.children || []).length;
      const firstTextNode = event.target.childNodes[0];
      const w = this;
      this.debounce(() => {
        if (firstTextNode === undefined) w.originContentLine = 1;
        w.originContentLine = w.countOriginContent(firstTextNode, true);
      }, 100)();
    },
    /**
     * apply pull request
     */
    onApplyPullRequest() {
      this.disabled = true;
      const contentNode = document.querySelector(".editable-new-content");
      const content = contentNode && contentNode.innerText;
      bus.$emit("showLoading", true);
      const { updateAPI } = this.$page.$editable || {};
      fetch(updateAPI, {
        body: JSON.stringify({
          owner: this.eventData.owner,
          repo: this.eventData.repo,
          path: this.eventData.path,
          content: content,
        }),
        method: "POST",
        ...fetchOps,
        headers: new Headers({
          "Access-Token": sessionStorage.githubOAuthAccessToken,
          "Content-Type": "Application/json",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.disabled = false;
          if (data.code === 0) {
            this.eventData.status = false;
            setTimeout(() => {
              location.reload();
            }, 5000);
          }
          this.switchBodyScroll();
          bus.$emit("showLoading", false);
          bus.$emit("onReceive", data, true);
        })
        .catch(() => {
          bus.$emit("showLoading", false);
          this.switchBodyScroll();
        });
    },
  },
};

const _withScopeId$1 = n => (pushScopeId("data-v-06859fa6"),n=n(),popScopeId(),n);
const _hoisted_1$2 = { class: "editable-review-warp" };
const _hoisted_2$2 = { class: "editable-review-code" };
const _hoisted_3$2 = { class: "editable-new-code editable-review-body" };
const _hoisted_4$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Powered by "),
  /*#__PURE__*/createElementVNode("a", {
    href: "https://github.com/veaba/vuepress-plugin-editable/",
    target: "_blank"
  }, " vuepress-plugin-editable "),
  /*#__PURE__*/createTextVNode(" and "),
  /*#__PURE__*/createElementVNode("a", {
    href: "https://github.com/veaba/veaba-bot/",
    target: "_blank"
  }, " veaba-bot ")
], -1 /* HOISTED */));
const _hoisted_5$1 = { class: "editable-review-btn" };
const _hoisted_6$1 = ["disabled"];

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Position = resolveComponent("Position");

  return ($data.eventData.status)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "editable-review",
        style: normalizeStyle({
      'z-index': this.eventData.status ? 2 : -1,
    })
      }, [
        createElementVNode("div", _hoisted_1$2, [
          createVNode(_component_Position, { lines: $options.breakLines }, null, 8 /* PROPS */, ["lines"]),
          createCommentVNode(" TODO: Get English version content"),
          createElementVNode("div", _hoisted_2$2, [
            createElementVNode("div", _hoisted_3$2, [
              _hoisted_4$1,
              createCommentVNode(" `<pre>` elements and content are not on the same line, there will be indentation problems."),
              createElementVNode("pre", {
                class: "editable-new-content",
                contenteditable: "true",
                onInput: _cache[0] || (_cache[0] = (...args) => ($options.onChange && $options.onChange(...args)))
              }, toDisplayString($data.eventData.content), 33 /* TEXT, HYDRATE_EVENTS */),
              createCommentVNode(" btn "),
              createElementVNode("div", _hoisted_5$1, [
                createElementVNode("button", {
                  onClick: _cache[1] || (_cache[1] = (...args) => ($options.onApplyPullRequest && $options.onApplyPullRequest(...args))),
                  disabled: $data.disabled
                }, " 应用(Apply) ", 8 /* PROPS */, _hoisted_6$1),
                createElementVNode("button", {
                  onClick: _cache[2] || (_cache[2] = (...args) => ($options.closeModal && $options.closeModal(...args)))
                }, "关闭(Close)")
              ])
            ])
          ])
        ])
      ], 4 /* STYLE */))
    : createCommentVNode("v-if", true)
}

script$2.render = render$2;
script$2.__scopeId = "data-v-06859fa6";
script$2.__file = "src/client/components/Review.vue";

var script$1 = {
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
const _hoisted_1$1 = {
  key: 0,
  class: "editable-loading"
};
const _hoisted_2$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("div", { class: "editable-storm-loading" }, null, -1 /* HOISTED */));
const _hoisted_3$1 = [
  _hoisted_2$1
];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return ($data.loading)
    ? (openBlock(), createElementBlock("div", _hoisted_1$1, _hoisted_3$1))
    : createCommentVNode("v-if", true)
}

script$1.render = render$1;
script$1.__scopeId = "data-v-6ded6ade";
script$1.__file = "src/client/components/Loading.vue";

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

/**
import PhotoSwipe from "../components/PhotoSwipe.vue";
export default PhotoSwipe;
*/
var appEnhance = defineClientAppEnhance(({ app }) => {
    // wrap the `<ExternalLinkIcon />` component with plugin options
    // app.component('ExternalLinkIcon', h(ExternalLinkIcon, { locales }))
    // eslint-disable-next-line vue/match-component-file-name
    app.component("EditableReview", script$2);
    app.component("EditableLoading", script$1);
    app.component("EditablePoptip", script);
});

export { appEnhance as default };
//# sourceMappingURL=appEnhance.js.map
