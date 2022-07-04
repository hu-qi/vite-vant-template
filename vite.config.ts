import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
  },
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
