import { analyzeThreat } from "./ai.js"
import { infrastructure } from "./infrastructure.js"

export function updatePrediction(
  map,
  drone
) {

  // REMOVE OLD

  if (drone.predictionLine) {

    map.removeLayer(
      drone.predictionLine
    )

  }

  // LINE TO PREDICTED TARGET

  drone.predictionLine =
  L.polyline(

    [

      [
        drone.lat,
        drone.lng
      ],

      [
        drone.targetLat,
        drone.targetLng
      ]

    ],

    {

      color: "#ff453a",

      weight: 2,

      opacity: 0.7,

      dashArray: "10, 10",

      lineCap: "round"

    }

  ).addTo(map)

}