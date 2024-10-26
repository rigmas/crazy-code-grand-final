<script setup lang="ts">
import { storeToRefs } from "pinia"
import { get, sleep } from "radash"
import { fireConfetti } from "~/pages/quest/[id]/photo/fireConfetti"
import { QuestDummyList } from "~/schemas/quest"
import { finishQuest, getQuests } from "~/services/quest"
import { useAuthStore } from "~/stores/auth.store"
import { useQuestStore } from "~/stores/quest.store"
import "aframe"
import "mind-ar/dist/mindar-image.prod.js"
import "mind-ar/dist/mindar-image-aframe.prod.js"

enum QuestType {
  Question = "question",
  Photo = "photo",
}

interface Quest {
  id: number
  type: QuestType
  title: string
  description: string
  location: [number, number]
  reward: string
}

const route = useRoute()
const router = useRouter()
const selectedId = get<number>(route.params, "id", 1)

const sceneRef = ref<HTMLElement>()
const arEntityRef = ref<HTMLElement>()

onBeforeUnmount(() => {
  sceneRef.value?.systems["mindar-image-system"].stop()
})

const state = ref<"loading" | "scanning" | "found">("loading")

const { user, userLevel } = storeToRefs(useAuthStore())
const { quests, activeQuestIndex, activeQuest } = storeToRefs(useQuestStore())
activeQuestIndex.value = selectedId - 1
onBeforeMount(async () => {
  const res = await getQuests()
  quests.value = [
    ...res.data,
    ...QuestDummyList,
  ]
  activeQuestIndex.value = selectedId - 1
})

onMounted(async () => {
  sceneRef.value?.addEventListener("renderstart", async (e) => {
    state.value = "scanning"

    arEntityRef.value?.addEventListener("targetFound", async (e) => {
      await sleep(300)
      sceneRef.value?.systems["mindar-image-system"].pause()
      if (user.value != null) {
        await finishQuest(selectedId, user.value.id)
      }
      await sleep(300)
      fireConfetti()
      state.value = "found"
    })

    sceneRef.value?.systems["mindar-image-system"].start()
  })
})
</script>

<template>
  <div class="relative h-full w-full">
    <Transition name="van-slide-up" appear>
      <div v-if="state === 'found'" class="absolute left-0 top-0 z-36 h-full w-full flex flex-col items-center justify-center text-3xl text-white font-semibold" style="background-color: rgba(219, 90, 36, 0.2);">
        <div class="mb-2">
          Congratulation !
        </div>

        <div class="mb-2 text-xl">
          Quest Completed
        </div>

        <div class="mb-6 text-xl">
          {{ activeQuest?.title }}
        </div>

        <img class="mb-6" src="/boy-toss.png" width="380">

        <div class="mb-20 text-center text-lg font-normal">
          <div class="mb-2">
            You've earned: {{ activeQuest?.reward }}
          </div>

          <VanButton
            type="primary" plain round size="small" class="font-semibold" @click="() => {
              router.push('/quest')
            }"
          >
            Back Home
          </VanButton>
        </div>

        <div>
          <!--        <div -->
          <!--          class="h-[3rem] w-[3rem]" -->
          <!--          style="background: url(/lyf-logo.png)" -->
          <!--        /> -->
          <img class="" src="/lyf-logo.png" width="28">
        </div>
      </div>
    </Transition>

    <div class="map--wrapper absolute left-0 top-0">
      <div class="relative left-0 top-0 z-5 h-full w-full flex items-center justify-center">
        <Transition name="van-fade" mode="out-in">
          <van-loading v-if="state === 'loading'" size="120px" color="rgba(236, 81, 7, 0.8)" vertical>
            <div class="mt-4 text-lg font-semibold">
              Loading...
            </div>
          </van-loading>

          <div
            v-else-if="state === 'scanning'"
            class="camera-scanning--wrapper"
            style=""
          >
            <div class="camera-scanning relative h-full w-full">
              <div class="bg-primary absolute h-3 w-full" style="animation: move 2s linear infinite" />
            </div>
          </div>
        </Transition>
      </div>

      <a-scene
        id="ar-scene"
        ref="sceneRef"
        color-space="sRGB"
        mindar-image="imageTargetSrc: /targets.mind; uiError:no; uiLoading:no; uiScanning:no"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        renderer="colorManagement: true, physicallyCorrectLights"
      >
        <a-assets>
          <img
            id="card"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png"
            crossorigin="anonymous"
          >
          <a-asset-item
            id="avatarModel"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
            crossorigin
          />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: true" />
        <a-entity ref="arEntityRef" mindar-image-target="targetIndex: 0">
          <a-plane
            src="#card"
            position="0 0 0"
            height="0.552"
            width="1"
            rotation="0 0 0"
          />
          <a-gltf-model
            rotation="0 0 0 "
            position="0 0 0.1"
            scale="0.005 0.005 0.005"
            src="#avatarModel"
            animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          />
        </a-entity>
      </a-scene>
    </div>

    <div class="bg-base absolute bottom-0 z-10 box-border h-[80px] w-full flex items-center justify-between px-8">
      <div
        class="text-gray font-bold" @click="() => {
          console.log('back')
          router.push('/quest')
        }"
      >
        Back
      </div>
      <div class="text-primary font-bold">
        {{ activeQuest?.title }}
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

#ar-scene > canvas {
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
</style>
