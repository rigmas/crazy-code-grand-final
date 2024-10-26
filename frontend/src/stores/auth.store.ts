import { defineStore } from "pinia"

export const useAuthStore = defineStore("authStore", () => {
  const authToken = useStorage<string | undefined>("token", undefined)

  return { auth: authToken }
})
