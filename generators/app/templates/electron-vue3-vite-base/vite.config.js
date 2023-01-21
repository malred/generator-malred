import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // outDir: 'build',
    manifest: true,  //配置后才能让编译后的vue路径被正确识别
  },
  base: './',
})
