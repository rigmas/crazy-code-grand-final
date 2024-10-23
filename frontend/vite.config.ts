/// <reference types="vitest" />

import path from "node:path"
import Vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import VueMacros from "unplugin-vue-macros/vite"
import { VueRouterAutoImports } from "unplugin-vue-router"
import VueRouter from "unplugin-vue-router/vite"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
          template: {
            compilerOptions: {
              isCustomElement: tag => tag.startsWith("a-"), // Treat a-frame tags as custom elements
            },
          },
        }),
      },
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          "vue-router/auto": ["useLink"],
        },
      ],
      dts: true,
      dirs: [
        "./src/composables",
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [VantResolver()],
      excludeNames: [/^a-.+/],
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom",
  },
})
