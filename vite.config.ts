import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  alias: {

  },
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js'
      }, // 定义vue的别名，如果使用其他的插件，可能会用到别名}
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '@c',
        replacement: resolve(__dirname, 'src/components')
      },
      {
        find: '@v',
        replacement: resolve(__dirname, 'src/views')
      }
    ]
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
  ],
  server: {
    open: '/index.html',
    // 代理配置
    proxy: {
      '/dev-api': {
        target: 'https://api.github.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, '')
      }
    }
  }
})
