<script setup lang="ts">
import { get } from "radash"
import "aframe"
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
const selectedQuest = ref<Quest>({
  id: 1,
  type: QuestType.Photo,
  title: "Finding life",
  description: "In this labyrinth of endless life, thou shalt uncover the true meaning of existence, guided by the art of living itself",
  location: [0, 0],
  reward: "True meaning of life",
})

onMounted(() => {

})
</script>

<template>
  <div class="relative h-full w-full">
    <VanNavBar
      :title="`Quest ${selectedQuest.title}`"
      left-text="Back"
      left-arrow
      class="absolute top-0 h-[50px]"
    />

    <div class="map--wrapper absolute top-[50px]">
      <a-scene
        mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind;"
        vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false" />
        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane color="blue" opaciy="0.5" position="0 0 0" height="0.552" width="1" rotation="0 0 0" />
        </a-entity>
      </a-scene>
    </div>
  </div>
</template>

<style>
@import "maplibre-gl/dist/maplibre-gl.css";

.map--wrapper {
  height: calc(100% - 50px);
  width: 100%;
}
</style>
