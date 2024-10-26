import { defineStore } from "pinia"
import type { User } from "~/schemas/user"

export const useAuthStore = defineStore("authStore", () => {
  const email = useLocalStorage<string | undefined>("ccgf:email", "samueelgrs@gmail.com")
  const user = useLocalStorage<User | undefined>("ccgf:user", undefined)
  const userExp = ref(0)
  const userLevel = computed(() => {
    if (userExp.value === 0) {
      return 1
    }
    return Math.floor(userExp.value / 1000)
  })

  function setUser(userData: User) {
    user.value = userData
  }

  return { email, user, setUser, userExp, userLevel }
})
