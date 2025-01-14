const imageUrl = "/find-mr-zhe.png"
const defaults = { zIndex: 99999999 }

export function fireImages() {
  const existingImg = document.querySelector("img[data-fire-image]")
  if (existingImg) {
    existingImg.remove()
  }

  const img = document.createElement("img")
  img.src = imageUrl
  img.setAttribute("data-fire-image", "true")
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

  img.onload = () => {
    img.style.opacity = "1"
  }

  document.body.appendChild(img)
}
