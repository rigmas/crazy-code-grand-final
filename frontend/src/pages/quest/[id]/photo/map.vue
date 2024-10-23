<script setup lang="ts">
import type { GeoJSONSource } from "maplibre-gl"
import { Map as MglMap } from "maplibre-gl"
import { get } from "radash"
import { addUserMarker, UserMarkerLayerID } from "~/pages/quest/[id]/photo/addUserMarker"

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

const showAction = ref(true)

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
    await until(coords).toMatch(({
      latitude,
      longitude,
    }) => latitude !== Number.POSITIVE_INFINITY && longitude !== Number.POSITIVE_INFINITY)

    map.setZoom(16)
    map.setCenter([coords.value.longitude, coords.value.latitude])
    map.setPitch(45)

    map.on("click", () => {
      showAction.value = true
    })
  })
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
      <div id="map" class="map h-full w-full" />
    </div>

    <van-action-sheet v-model:show="showAction" title="" cancel-text="Cancel">
      <div
        class="box-border w-full px-4 py-6 shadow-lg"
      >
        <div class="mb-4 w-full text-lg">
          You have arrived at the dungeion
        </div>

        <VanButton
          type="default" class="w-full" @click="() => {
            router.push('/quest/1/photo/scan')
          }"
        >
          Go inside
        </VanButton>
      </div>
    </van-action-sheet>
  </div>
</template>

<style>
@import "maplibre-gl/dist/maplibre-gl.css";

.map--wrapper {
  height: calc(100% - 50px);
  width: 100%;
}
</style>
