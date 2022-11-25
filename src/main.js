import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/styles/common.less'
import UI from '@/components/library'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(UI)
app.mount('#app')
