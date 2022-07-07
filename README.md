# Vue 3 + TypeScript + Vite

## Step 0: Initial

```
npm create vite@latest
npm install
npm run dev
```

## Step 1: Formart and Lint

- ESLint

```
# selected standard
npx eslint --init
```

Add rules to .eslint.js:
```
'vue/no-multiple-template-root': 'off'
```

Add link script to package.json:
```
"lint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
"lint:fix": "eslint --ext .js,.jsx,.ts,.tsx,.vue --ignore-path .gitignore --fix src"
```

- Prettier

```
npm install prettier eslint-config-prettier --save-dev
```

Add .prettierrc.js:
```
module.exports = {
  // 超过100就换行
  printWidth: 100,
  // 不适用分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的最后一项加逗号
  trailingComma: 'none'
}
```

Add extends to .eslint.js:
```
'eslint:recommended',
'plugin:vue/vue3-recommended',
'prettier',
```

Link: [https://khalilstemmler.com/blogs/tooling/prettier/](https://khalilstemmler.com/blogs/tooling/prettier/)
Link: [https://github.com/LZHD/vue-vite-h5](https://github.com/LZHD/vue-vite-h5)

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Step 2: Vant and Viewport.

- Add Vant

```
npm install vant
```

- Change `vite.config.ts`

```javaScript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          // https://github.com/youzan/vant/issues/9957
          resolveStyle: name => `/node_modules/vant/es/${name}/style`
        }
      ]
    })
  ]
})

```

## Step 3: Vue Router 

- Add Vue Router

```
npm install vue-router@4
```

- Vue Router Config    
[Getting Started](https://router.vuejs.org/zh/guide/)

## Step 4: Axios

- Add Axios

```
npm install axios
```

Customize your HTTP request by axios interceptors.
In this step, we call the Github API to implement a simple Grid page.

![Grid](https://s2.loli.net/2022/07/04/K83vIjX9hYBHlot.png)

## Step 5: Add pinia.

```
npm install pinia
```
[Pinia Guide](https://pinia.vuejs.org/introduction.html)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
