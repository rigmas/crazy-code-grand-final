import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import type { User } from "~/schemas/user"

export const useAuthStore = defineStore("authStore", () => {
  const authToken = useStorage<string | undefined>("token", undefined)
  const user = ref<User | null>(null)

  function setUser(userData: User) {
    user.value = userData
  }

  return { auth: authToken, user, setUser }
})
