import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import { setVant } from './Vant'

const app = createApp(App)
setVant(app)

app.mount('#app')
