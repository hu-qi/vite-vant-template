import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import { setVant } from './Vant'
import router from './router'
import { store } from './store'

const app = createApp(App)
setVant(app)
app.use(store)
app.use(router)
app.mount('#app')
