import { createApp } from 'vue'
import App from './App.vue'
let app = createApp(App);


//element
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
app.use(ElementPlus, {
    locale: zhCn,
    // size: "small"
});

import "tailwindcss/tailwind.css";

app.mount('#app')
