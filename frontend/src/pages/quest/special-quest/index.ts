const imageUrl = "/find-mr-zhe.png"
const defaults = { zIndex: 99999999 }

export function fireImages() {
  const img = document.createElement("img")
  img.src = imageUrl
  img.style.position = "fixed"
  img.style.zIndex = defaults.zIndex
  img.style.width = "95vw"
  img.style.height = "auto"
  img.style.pointerEvents = "none"
  img.style.transition = "opacity 1s"
  img.style.opacity = "0"

  img.style.top = "50%"
  img.style.left = "50%"
  img.style.transform = "translate(-50%, -50%)"

  document.body.appendChild(img)

  setTimeout(() => {
    img.style.opacity = "1"
  }, 10)
}
