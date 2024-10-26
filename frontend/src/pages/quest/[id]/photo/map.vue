<script setup lang="ts">
import type { GeoJSONSource } from "maplibre-gl"
import { Map as MglMap } from "maplibre-gl"
import { storeToRefs } from "pinia"
import { get } from "radash"
import { addUserMarker, UserMarkerLayerID } from "~/pages/quest/[id]/photo/addUserMarker"
import { QuestDummyList } from "~/schemas/quest"
import { getQuests } from "~/services/quest"
import { useQuestStore } from "~/stores/quest.store"

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
// const selectedQuest = ref<QuestDetail>(QuestDummyList[selectedId - 1])

let map!: MglMap

const {
  coords,
  error,
  resume,
  pause,
  isSupported,
} = useGeolocation({
  enableHighAccuracy: true,
  immediate: true,
})

const showAction = ref(false)

watchThrottled(coords, () => {
  const source = map.getSource(UserMarkerLayerID) as GeoJSONSource
  if (source == null) {
    return
  }

  source.setData({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [coords.value.longitude, coords.value.latitude],
    },
    properties: {
      heading: coords.value?.heading ?? 0,
    },
  })
}, { throttle: 500 })

onBeforeUnmount(() => {
  if (map != null) {
    map.remove()
  }
})

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

onMounted(() => {
  pause()
  map = new MglMap({
    container: "map",
    refreshExpiredTiles: false,
    attributionControl: false,
    style: {
      version: 8,
      glyphs: "https://fontstack-pbf.supermap.id/{fontstack}/{range}.pbf",
      sources: {
        osmLight: {
          type: "raster",
          tiles: [
            "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          ],
        },
      },
      layers: [
        {
          id: "osmLight",
          source: "osmLight",
          type: "raster",
        },
      ],
    },
    pitch: 45,
  })

  map.on("load", async () => {
    await addUserMarker(map)
    resume()
    map.on("click", () => {
      showAction.value = true
    })

    await until(coords).toMatch(({
      latitude,
      longitude,
    }) => latitude !== Number.POSITIVE_INFINITY && longitude !== Number.POSITIVE_INFINITY)

    map.setZoom(16)
    map.setCenter([coords.value.longitude, coords.value.latitude])
    map.setPitch(45)
  })
})
</script>

<template>
  <div class="relative h-full w-full">
    <div class="bg-base absolute left-0 top-0 z-5 box-border w-full px-6 py-4 font-400 shadow-lg" style="border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem;">
      <div class="text-primary mb-2 font-bold">
        {{ activeQuest?.title }}
      </div>

      <div class="text-sm">
        {{ activeQuest?.description }}
      </div>
    </div>

    <div class="map--wrapper absolute top-0">
      <div id="map" class="map h-full w-full" />
    </div>

    <div class="bg-base absolute bottom-0 box-border h-[80px] w-full flex items-center justify-between px-8 shadow-lg">
      <div
        class="text-gray font-bold" @click="() => {
          router.push('/quest')
        }"
      >
        Back
      </div>
      <div class="text-primary font-bold">
        Find the location
      </div>
      <div>
        <div class="i-solar:menu-dots-circle-linear text-xl text-gray" />
      </div>
    </div>
  </div>

  <van-action-sheet v-model:show="showAction" title="" cancel-text="Cancel">
    <div
      class="box-border w-full px-4 py-6 shadow-lg"
    >
      <div class="mb-4 w-full text-lg">
        You have arrived at the location
      </div>

      <VanButton
        type="primary" class="w-full" round @click="() => {
          router.push('/quest/1/photo/scan')
        }"
      >
        Go inside
      </VanButton>
    </div>
  </van-action-sheet>
</template>

<style>
@import "maplibre-gl/dist/maplibre-gl.css";

.map--wrapper {
  height: calc(100% - 50px);
  width: 100%;
}
</style>
