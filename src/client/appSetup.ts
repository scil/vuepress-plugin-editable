// @ts-nocheck

import { defineClientAppSetup, withBase } from "@vuepress/client";
import mitt from "mitt";
import { onMounted, provide } from "vue";
import "./styles/style.scss";
import {bus} from "../shared/eventBus";
import {fetchOps} from "./fetchConfig";



export default defineClientAppSetup(() => {


    const This= {

        preLine: null,
        preNode: null,
        preNodeContent: null,
        isPlainTextStatus: false,
        saveAccessToken() {
            // @ts-ignore
            const {accessToken, login} = this.$route.query;
            if (accessToken) {
                sessionStorage.githubOAuthAccessToken = accessToken;
                sessionStorage.githubLogin = login || "";
            }
        },
        /**
         * click outside
         */
        // @ts-ignore
        outsideClick(event) {
            const clickLine = event.target.getAttribute("data-editable-line");
            if (

                This.preLine &&

                clickLine !== This.preLine &&
                !event.target.classList.contains("no-need-close")
            ) {

                This.preNode.removeAttribute("contenteditable");

                This.preNode.classList.remove("focus-editable");

                This.preNode.classList.remove("no-edit");

                This.removeMenu();
            }
            // @ts-ignore
            This.bindMenuEvent(event);
        },
        /**
         * apply menu
         * restore menu
         * @param event
         * @param btnWords { Object}
         * {apply: "应用",
        restore: "还原", // redirect update
        update: "修改" // call console ui
        }
         */
        // @ts-ignore
        createMenu(event, btnWords) {
            // @ts-ignore
            This.removeMenu();

            const parenNode = document.createElement("strong");
            parenNode.classList.add("editable-menu");
            parenNode.classList.add("no-need-close");
            // @ts-ignore
            parenNode.setAttribute("contenteditable", false);
            const vNode = document.createDocumentFragment();

            for (let key in btnWords) {
                let childNode = null;
                if (key !== "oAuth") {
                    childNode = document.createElement("span");
                } else {
                    childNode = document.createElement("a");
                    const {githubOAuthUrl, clientId, redirectAPI} =

                    this.$page.$editable || {};
                    childNode.href = `${githubOAuthUrl}?client_id=${clientId}&redirect_uri=${redirectAPI}?reference=${location.href}`;
                }
                childNode.innerHTML = btnWords[key];

                childNode.setAttribute("contenteditable", false);
                childNode.classList.add("no-need-close");
                childNode.classList.add("editable-" + key);
                vNode.appendChild(childNode);
            }
            parenNode.appendChild(vNode);
            event.target.appendChild(parenNode);
        },
        /**
         * remove menu
         */
        removeMenu() {
            const editMenu = document.querySelector(".editable-menu");
            editMenu && editMenu.remove();
        },

        // @ts-ignore
        bindMenuEvent(event) {
            if (
                event.target.classList.contains("editable-apply") ||
                event.target.classList.contains("editable-update")
            ) {

                This.updatePR(event);
            }
            if (event.target.classList.contains("editable-restore")) {

                This.reloadPage(event);
            }
        },
        /**
         * @param event
         * */
        // @ts-ignore
        updatePR(event: any) {
            // @ts-ignore
            const repoPrefix = this.$themeConfig.repo || "";
            if (!repoPrefix || !repoPrefix.length) {
                console.warn("Warning: You have not set the repo url");
                return;
            }
            const node = document.querySelector(".focus-editable");
            const menuNode = document.querySelector(".editable-menu");
            // plain text 模式下，menuNode 不是node 的直接子级
            menuNode && menuNode.remove();
            // @ts-ignore
            const content = node.innerText.replace(/(\u00A0+)$/, "");
            // @ts-ignore
            const line = node.getAttribute("data-editable-line");
            // @ts-ignore
            const {owner, repo} = This.getOwnerRepo(repoPrefix);
            // @ts-ignore
            if (This.isPlainTextStatus) {

                This.onRemoveFocusEditable();

                This.postSinglePR(
                    owner,
                    repo,

                    this.$page.remoteRelativePath,
                    content,
                    line
                );
            } else {

                This.getOriginContent(owner, repo, this.$page.remoteRelativePath);
            }
        },
        /**
         * handler plain text PR
         */
        postSinglePR(owner: string, repo: string, path: string, content: string, line: string) {
            bus.emit("showLoading", true);
            bus.emit("onClose");

            // @ts-ignore
            const {updateAPI} = this.$page.$editable || {};
            fetch(updateAPI, {
                body: JSON.stringify({
                    owner,
                    repo,
                    path,
                    content,
                    line: Number(line),
                }),
                method: "POST",

                ...This.fetchOps,
                headers: new Headers({
                    "Access-Token": sessionStorage.githubOAuthAccessToken,
                    "Github-Login": sessionStorage.githubLogin,
                    "Content-Type": "Application/json",
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    bus.emit("onReceive", data);
                    bus.emit("showLoading", false);
                })
                .catch(() => {
                    bus.emit("showLoading", false);
                });
        },
        /**
         * @return {
         *  owner,
         *  repo
         * }
         */
        getOwnerRepo(ownerRepo: string) {
            const strArr = ownerRepo.split("/");
            return {
                owner: strArr[0] ? strArr[0] : "",
                repo: strArr[1] ? strArr[1] : "",
            };
        },
        reloadPage() {
            location.reload();
        },

        /**
         * is plain text，create children no is a async function.
         * @return {boolean}
         * thi
         */
        isPlainText(node: any) {
            if (
                !node.children.length ||
                (node.children.length &&
                    node.children[0].classList.contains("editable-menu"))
            ) {

                This.isPlainTextStatus = true;
                return true;
            } else {

                This.isPlainTextStatus = false;
                return false;
            }
        },

        /**
         * listener contenteditable input
         * contenteditable 里的内容被清空的行为导致丢失 textElement
         * 此举为了不丢失 contenteditbale 特性而追加的
         * @fix 提交只时，移除字符
         */
        listenerInput(event: any) {
            event.target.addEventListener("input", (inputEvent: any) => {
                const firstTextNode = inputEvent.target.childNodes[0];
                if (firstTextNode.nodeName !== "#text") {
                    console.log("firstTextNode=>", firstTextNode);
                    const emptyTextNode = document.createDocumentFragment();
                    const aNode = document.createTextNode("\u00A0");
                    emptyTextNode.appendChild(aNode);
                    inputEvent.target.insertBefore(emptyTextNode, firstTextNode);
                }
            });
        },
        /**
         * get origin source file content
         */
        getOriginContent(owner: string, repo: string, path: string) {
            bus.emit("showLoading", true);
            bus.emit("onClose");
            // @ts-ignore
            const {getContentAPI} = this.$page.$editable || {};
            fetch(
                getContentAPI + "?owner=" + owner + "&repo=" + repo + "&path=" + path,

                {
                    method: "GET",
                    ...fetchOps,
                    headers: new Headers({
                        "Access-Token": sessionStorage.githubOAuthAccessToken,
                        "Github-Login": sessionStorage.githubLogin,
                        "Content-Type": "Application/json",
                    }),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    bus.emit("showLoading", false);
                    if (data.code === 0) {
                        bus.emit("showReview", {
                            status: true,
                            owner,
                            repo,
                            path,
                            content: data.data,
                        });
                    } else {
                        bus.emit("onReceive", data);
                    }
                })
                .catch(() => {
                    bus.emit("showLoading", false);
                });
        },
        /*
         * 判断是否授权过，即检查本地是否存储 access token
         * @return  {boolean}
         */
        isOAuthStatus() {
            // @ts-ignore
            const accessToken = this.$route.query.accessToken;
            return !!(accessToken && accessToken.length === 40);
        },

        /**
         * remove focus class and contentEditable attribute
         *
         */
        onRemoveFocusEditable() {
            const focusNode = document.querySelector(".focus-editable");
            // @ts-ignore
            focusNode.removeAttribute("contenteditable");
            // @ts-ignore
            This.preNode.classList.remove("focus-editable");
        },

    };

    onMounted(() => {
        const targetNode = document.querySelector("body");
        debugger
        let isEditable = null;
        const dblClick = (event: any) => {
            const currentLine = event.target.getAttribute("data-editable-line");
            if (currentLine || currentLine != null) {
                isEditable = event.target.getAttribute("contenteditable");
                let oAuth = "Github OAuth";
                event.target.classList.add("focus-editable");

                if (!This?.isOAuthStatus()) {

                    This.createMenu(event, {oAuth});
                }

                if (This.isPlainText(event.target)) {
                    event.target.classList.remove("no-edit");

                    if (This.isOAuthStatus()) {

                        This.createMenu(event, {
                            apply: "应用",
                            restore: "还原",
                        });
                        event.target.setAttribute("contenteditable", true);

                        This.listenerInput(event);
                    }
                } else {
                    event.target.classList.add("no-edit");

                    if (This.isOAuthStatus()) {

                        This.createMenu(event, {
                            update: "修改",
                            restore: "还原",
                        });
                    }
                }


                This.preLine = currentLine;

                This.preNode = event.target;
                // temp handler 实际上这种处理方式欠妥

                This.preNodeContent = event.target.innerHTML.replace(
                    /<strong(.+?)strong>/g,
                    ""
                );
            }
        };

        if (targetNode) {
            targetNode.removeEventListener("dblclick", dblClick);
            targetNode.addEventListener("dblclick", dblClick);
            // @ts-ignore
            targetNode.removeEventListener("click", This.outsideClick);
            // @ts-ignore
            targetNode.addEventListener("click", This.outsideClick);
        }
        // @ts-ignore
        This.saveAccessToken();
    });


})

