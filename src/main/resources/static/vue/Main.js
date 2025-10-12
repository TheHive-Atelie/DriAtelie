import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { createRouter, createWebHashHistory } from 'https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.js'
import { Navbar } from './components/navbar.js'

const routes = [
    {
        path: '/navbar',
        component: { Navbar }
    },
    { path: '/', redirect: '/navbar' }
]

const router = createRouter({ history: createWebHashHistory(), routes })

const App = { template: `<router-view></router-view>` }

const app = createApp(App)
app.use(router)
app.mount('#app')