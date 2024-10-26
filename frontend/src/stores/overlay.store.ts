import { defineStore } from "pinia"

export const useOverlay = defineStore("overlayStore", () => {
  const visible = ref(false)
  const message = ref<string>("Loading...")
  const showSpinner = ref(true)

  watch(visible, () => {
    if (visible.value === false) {
      message.value = "Loading..."
    }
  })
  const show = (msg?: string) => {
    if (msg != null) {
      message.value = msg
    }

    visible.value = true
  }
  const hide = () => { visible.value = true }
  const setMessage = (msg: string) => {
    message.value = msg
  }

  return { visible, message, showSpinner, show, hide, setMessage }
})
