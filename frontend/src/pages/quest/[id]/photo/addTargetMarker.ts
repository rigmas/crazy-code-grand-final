import type { Feature, Point } from "geojson"
import type { Map as MglMap } from "maplibre-gl"

export const TargetMarkerLayerID = "merchantMarker"

export async function addTargetMarker(map: MglMap, features: Feature<Point>[]) {
  const marker = await map.loadImage("/SolarMapPointFavouriteBold.png")
  map.addImage(TargetMarkerLayerID, marker.data, {})
  map.addSource(TargetMarkerLayerID, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features,
    },
  })

  map.addLayer({
    id: TargetMarkerLayerID,
    source: TargetMarkerLayerID,
    type: "symbol",
    layout: {
      "icon-image": TargetMarkerLayerID,
      "icon-size": 1,
      "icon-pitch-alignment": "viewport",
      "text-font": ["Montserrat Bold"],
      "text-field": ["get", "name"],
      "text-size": 8,
      "text-anchor": "top",
      "text-offset": [0, 2],
    },
  })
}
