import { createApp } from 'vue'
import App from './App.vue'
import "./moblie/flexible.js"; // 适配
import "./styles/reset.css"; // 初始化样式  
import router from './router/index.js'
const app = createApp(App).use(router).mount('#app') 