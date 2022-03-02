import { computed, defineComponent, h, onMounted, ref } from "vue";
import EditableReview from "../components/Review.vue";
import EditableLoading from "../components/Loading.vue";
import EditablePoptip from "../components/Poptip.vue";

import type { VNode } from "vue";
import {defineClientAppEnhance} from "@vuepress/client";

// import "../styles/modal.scss";

// export default defineClientAppEnhance(({ app}) => {
//     debugger
//   // eslint-disable-next-line vue/match-component-file-name
//   app.component("EditableReview", EditableReview);
//   app.component("EditableLoading", EditableLoading);
//   app.component("EditablePoptip", EditablePoptip);
// })

/**
export default defineComponent({
  name: "PWAInstall",

  setup() {
    const locale = useLocaleConfig(locales);

    const canInstall = ref(false);
    const hasRelatedApps = ref(false);
    const isOpen = ref(false);
    const isIOS = ref(false);
    const isSafari = ref(false);
    const hinted = ref(false);

    const useHint = computed(
      () => isIOS.value && isSafari.value && hinted.value === false
    );

    const showInstall = computed(
      () => (hasRelatedApps.value && canInstall.value) || useHint.value
    );

    const getInstalledStatus = (): boolean => {
      if ((navigator as SafariNavigator).standalone)
        return (navigator as SafariNavigator).standalone;

      return matchMedia("(display-mode: standalone)").matches;
    };

    const hint = (): void => {
      isOpen.value = false;
      hinted.value = true;
      // do not notify again
      localStorage.setItem("iOS-pwa-hint", "hinted");
    };

    onMounted(() => {
      if (getInstalledStatus()) {
        const { userAgent } = navigator;

        // handle iOS specifically
        isIOS.value =
          // regular iPhone
          userAgent.includes("iPhone") ||
          // regular iPad
          userAgent.includes("iPad") ||
          // iPad pro
          Boolean(
            userAgent.includes("Macintosh") &&
              navigator.maxTouchPoints &&
              navigator.maxTouchPoints > 2
          );

        isSafari.value =
          navigator.userAgent.includes("Safari") &&
          !userAgent.includes("Chrome");

        hinted.value = Boolean(localStorage.getItem("iOS-pwa-hint"));
      }

      if ("getInstalledRelatedApps" in (navigator as ModernNavigator))
        void (navigator as ModernNavigator)
          .getInstalledRelatedApps()
          .then((result) => {
            hasRelatedApps.value = result.length > 0;
          });
    });

    return (): VNode =>
      h("div", { id: "pwa-install" }, [
        showInstall.value
          ? h(
              "button",
              {
                class: "modal-button",
                useHint: useHint.value,
                onClick: () => {
                  isOpen.value = true;
                },
              },
              locale.value.install
            )
          : null,
        h(PWAInstallModal, {
          style: {
            display: isOpen.value ? "block" : "none",
          },
          onCanInstall: (value: boolean) => {
            canInstall.value = value;
          },
          onHint: () => hint(),
          onToggle: (value: boolean) => {
            isOpen.value = value;
          },
        }),
      ]);
  },
});
*/