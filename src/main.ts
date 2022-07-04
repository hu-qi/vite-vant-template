import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import { setVant } from './Vant'
import router from './router'

const app = createApp(App)
setVant(app)
app.use(router)
app.mount('#app')
