<script setup lang="ts">
import { sleep } from "radash"
import { fireConfetti } from "~/pages/quest/[id]/photo/fireConfetti"
import { fireImages } from "."
import "aframe"
import "mind-ar/dist/mindar-image.prod.js"
import "mind-ar/dist/mindar-image-aframe.prod.js"

const mindfile = `${import.meta.env.VITE_PUBLIC_API_URL}/api/quests/3/mindfile`

const router = useRouter()
const sceneRef = ref<HTMLElement>()
const arEntityRef = ref<HTMLElement>()

function removeImage() {
  const img = document.querySelector("img[data-fire-image]")
  if (img) {
    img.remove()
  }
};

function handleRouteChange(to, from) {
  if (from.path === "/quest/special-quest") {
    removeImage()
  }
};

onBeforeUnmount(() => {
  sceneRef.value?.systems["mindar-image-system"].stop()
})

const state = ref<"loading" | "scanning" | "found">("loading")

onMounted(async () => {
  router.beforeEach((to, from, next) => {
    handleRouteChange(to, from)
    next()
  })

  sceneRef.value?.addEventListener("renderstart", async () => {
    state.value = "scanning"

    arEntityRef.value?.addEventListener("targetFound", async () => {
      await sleep(300)
      sceneRef.value?.systems["mindar-image-system"].pause()

      await sleep(300)
      fireImages()
      fireConfetti()
      state.value = "found"
    })

    sceneRef.value?.systems["mindar-image-system"].start()
  })
})
</script>

<template>
  <div class="relative h-full w-full">
    <div class="map--wrapper absolute left-0 top-0">
      <div class="relative left-0 top-0 z-5 h-full w-full flex items-center justify-center">
        <Transition name="van-fade" mode="out-in">
          <van-loading v-if="state === 'loading'" size="120px" color="rgba(236, 81, 7, 0.8)" vertical>
            <div class="mt-4 text-lg font-semibold">
              Loading...
            </div>
          </van-loading>

          <div v-else-if="state === 'scanning'" class="camera-scanning--wrapper" style="">
            <div class="camera-scanning relative h-full w-full">
              <div class="bg-primary absolute h-3 w-full" style="animation: move 2s linear infinite" />
            </div>
          </div>
        </Transition>
      </div>
      <a-scene id="ar-scene" ref="sceneRef" color-space="sRGB"
        :mindar-image="`imageTargetSrc: ${mindfile}; uiError:no; uiLoading:no; uiScanning:no`"
        vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"
        renderer="colorManagement: true, physicallyCorrectLights">
        <a-assets>
          <a-asset-item id="avatarModel"
            src="https://cdn.jsdelivr.net/gh/rigmas/sandbox@main/picture1-removebg-preview.gltf" crossorigin />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: true" />
        <a-entity ref="arEntityRef" mindar-image-target="targetIndex: 0">

          <a-gltf-model rotation="0 0 0 " position="0 -0.25 0" scale="0.05 0.05 0.05" src="#avatarModel"
            animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate" />
        </a-entity>
      </a-scene>
    </div>

    <div class="bg-base absolute bottom-0 z-10 box-border h-[80px] w-full flex items-center justify-between px-8">
      <div class="text-gray font-bold" @click="() => {
        console.log('back')
        router.push('/quest')
      }">
        Back
      </div>
      <div>
        <div class="i-solar:menu-dots-circle-linear text-xl text-gray" />
      </div>
    </div>
  </div>
</template>

<style>
@import "maplibre-gl/dist/maplibre-gl.css";

.map--wrapper {
  height: calc(100% - 50px);
  width: 100%;
}

.map--wrapper video {
  z-index: 1 !important;
}

#ar-scene>canvas {
  z-index: 5 !important;
}

.a-enter-vr-button {
  display: none !important;
}

@media (min-aspect-ratio: 1/1) {
  .camera-scanning--wrapper {
    width: 50vh;
    height: 50vh;
  }
}

@media (max-aspect-ratio: 1/1) {
  .camera-scanning--wrapper {
    width: 80vw;
    height: 80vw;
  }
}

.camera-scanning {
  --scanning-color: var(--van-primary-color);
  opacity: 0.6;
  background:
    linear-gradient(to right, var(--scanning-color) 10px, transparent 10px) 0 0,
    linear-gradient(to right, var(--scanning-color) 10px, transparent 10px) 0 100%,
    linear-gradient(to left, var(--scanning-color) 10px, transparent 10px) 100% 0,
    linear-gradient(to left, var(--scanning-color) 10px, transparent 10px) 100% 100%,
    linear-gradient(to bottom, var(--scanning-color) 10px, transparent 10px) 0 0,
    linear-gradient(to bottom, var(--scanning-color) 10px, transparent 10px) 100% 0,
    linear-gradient(to top, var(--scanning-color) 10px, transparent 10px) 0 100%,
    linear-gradient(to top, var(--scanning-color) 10px, transparent 10px) 100% 100%;
  background-size: 40px 40px;
  background-repeat: no-repeat;
}

@keyframes move {

  0%,
  to {
    top: 0;
  }

  50% {
    top: calc(100% - 10px);
  }
}

.floating-image {
  animation: fall 5s linear infinite;
}

@keyframes fall {
  0% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }

  100% {
    opacity: 0;
    transform: translateY(100vh) rotate(360deg);
  }
}
</style>
