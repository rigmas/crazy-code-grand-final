import NProgress from "nprogress"
import { createPinia } from "pinia"
import { sleep } from "radash"
import { Dialog, Notify } from "vant"
import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"

import { routes } from "vue-router/auto-routes"
import { profileUsers } from "~/services/user"
import { useAuthStore } from "~/stores/auth.store"
import App from "./App.vue"
import "vant/lib/index.css"
import "./styles/main.css"
import "uno.css"

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
// router.beforeEach((to, from) => {
//   if (to.path !== from.path) {
//     NProgress.start()
//   }
// })
router.afterEach(async () => {
  await sleep(800)
  NProgress.done()
})

router.beforeEach(async () => {
  NProgress.start()

  const auth = useAuthStore()
  if (auth.email == null) {
    return
  }

  const res = await profileUsers(auth.email)
  auth.setUser(res.data)
})

const pinia = createPinia()
app.use(pinia)

app.use(router)
app.use(Dialog)
app.use(Notify)
app.mount("#app")
