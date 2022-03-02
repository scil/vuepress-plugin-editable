import mitt from 'mitt';
import { openBlock, createElementBlock, Fragment, renderList, toDisplayString, resolveComponent, normalizeStyle, createElementVNode, createVNode, createCommentVNode, pushScopeId, popScopeId, createTextVNode } from 'vue';
import './Position.vue?vue&type=style&index=0&id=00405b77&scoped=true&lang.css';
import './Review.vue?vue&type=style&index=0&id=06859fa6&scoped=true&lang.css';

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

var script$1 = {
  props: {
    lines: {
      type: Number,
    },
  },
};

const _hoisted_1$1 = { class: "editable-lines" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.lines, (item) => {
      return (openBlock(), createElementBlock("span", { key: item }, toDisplayString(item), 1 /* TEXT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script$1.render = render$1;
script$1.__scopeId = "data-v-00405b77";
script$1.__file = "src/client/components/Position.vue";

var script = {
  mounted() {
    this.originContentLine = this.countOriginContent(this.eventData.content);
    bus.$on("showReview", (data) => {
      this.eventData = data;
      this.originContentLine = this.countOriginContent(data.content);
      this.bodyScrollDefaultValue = this.switchBodyScroll();
    });
  },
  components: { Position: script$1 },
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

const _withScopeId = n => (pushScopeId("data-v-06859fa6"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "editable-review-warp" };
const _hoisted_2 = { class: "editable-review-code" };
const _hoisted_3 = { class: "editable-new-code editable-review-body" };
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("p", null, [
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
const _hoisted_5 = { class: "editable-review-btn" };
const _hoisted_6 = ["disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Position = resolveComponent("Position");

  return ($data.eventData.status)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "editable-review",
        style: normalizeStyle({
      'z-index': this.eventData.status ? 2 : -1,
    })
      }, [
        createElementVNode("div", _hoisted_1, [
          createVNode(_component_Position, { lines: $options.breakLines }, null, 8 /* PROPS */, ["lines"]),
          createCommentVNode(" TODO: Get English version content"),
          createElementVNode("div", _hoisted_2, [
            createElementVNode("div", _hoisted_3, [
              _hoisted_4,
              createCommentVNode(" `<pre>` elements and content are not on the same line, there will be indentation problems."),
              createElementVNode("pre", {
                class: "editable-new-content",
                contenteditable: "true",
                onInput: _cache[0] || (_cache[0] = (...args) => ($options.onChange && $options.onChange(...args)))
              }, toDisplayString($data.eventData.content), 33 /* TEXT, HYDRATE_EVENTS */),
              createCommentVNode(" btn "),
              createElementVNode("div", _hoisted_5, [
                createElementVNode("button", {
                  onClick: _cache[1] || (_cache[1] = (...args) => ($options.onApplyPullRequest && $options.onApplyPullRequest(...args))),
                  disabled: $data.disabled
                }, " 应用(Apply) ", 8 /* PROPS */, _hoisted_6),
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

script.render = render;
script.__scopeId = "data-v-06859fa6";
script.__file = "src/client/components/Review.vue";

export { script as default };
//# sourceMappingURL=Review.js.map
