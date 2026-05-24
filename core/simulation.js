import { drones } from "./drones.js"

import { analyzeThreat }
from "./ai.js"

import { updateThreatPanel }
from "./logs.js"

import { updatePrediction }
from "./prediction.js"

import { addEvent }
from "./events.js"

import {
  updateBaseTelemetry
}
from "./baseTelemetry.js"

import {
  updateInterceptorPanel
}
from "./interceptorLogs.js"

import {
  interceptors,
  launchInterceptor
}
from "./interceptors.js"

import {
  environment
}
from "./environment.js"

import {
  calculatePriority
}
from "./prioritization.js"

import {
  moveTowardsTarget
}
from "./movement.js"

let simulationInterval = null
let simulationRunning = false

// START

export function startSimulation() {

  if (simulationRunning) return

  simulationRunning = true

  simulationInterval =
    setInterval(updateSimulation, 50)

}

// PAUSE

export function pauseSimulation() {

  simulationRunning = false

  clearInterval(simulationInterval)

}

// RESET

export function resetSimulation() {

  location.reload()

}

// MAIN LOOP

function updateSimulation() {

  // UAV LOOP

  drones.forEach(drone => {

    // MOVE UAV

    moveTowardsTarget(drone)

    drone.marker.setLatLng([

      drone.lat,
      drone.lng

    ])

    // AI ANALYSIS

    const analysis =
      analyzeThreat(drone)

    const priority =
      calculatePriority(analysis)

    analysis.priority =
      priority

    // EVENTS

    if (
      analysis.detectionState ===
      "LOCKED"
    ) {

      addEvent(
        `${drone.id} LOCK ACQUIRED`
      )

    }

    // AI MODES

    let shouldIntercept = false

    // DEFENSIVE

    if (
      environment.aiMode ===
      "Defensive"
    ) {

      if (

        analysis.threatLevel ===
        "HIGH"

        ||

        analysis.threatLevel ===
        "CRITICAL"

      ) {

        shouldIntercept = true

      }

    }

    // AGGRESSIVE

    if (
      environment.aiMode ===
      "Aggressive"
    ) {

      if (

        analysis.threatLevel ===
        "MEDIUM"

        ||

        analysis.threatLevel ===
        "HIGH"

        ||

        analysis.threatLevel ===
        "CRITICAL"

      ) {

        shouldIntercept = true

      }

    }

    // INTERCEPTOR LAUNCH

    if (
      shouldIntercept &&
      priority > 35
    ) {

      // CHECK IF UAV ALREADY TARGETED

      const alreadyEngaged =
        interceptors.some(

          interceptor =>

            interceptor.targetDrone ===
            drone

        )

      // ONLY LAUNCH IF FREE

      if (!alreadyEngaged) {

        launchInterceptor(
          drone.map,
          drone
        )

        addEvent(
          `INTERCEPTOR LAUNCHED AGAINST ${drone.id}`
        )

      }

    }

    // UI

    updateThreatPanel(
      analysis
    )

    updatePrediction(
      drone.map,
      drone
    )

  })

 // INTERCEPTOR LOOP

interceptors.forEach(interceptor => {

  // DISTANCE TO UAV

  const targetDx =
    interceptor.targetDrone.lat -
    interceptor.lat

  const targetDy =
    interceptor.targetDrone.lng -
    interceptor.lng

  const targetDistance =
    Math.sqrt(
      targetDx * targetDx +
      targetDy * targetDy
    )

  // DYNAMIC LEAD

  let leadFactor = 0

  // FAR RANGE

  if (targetDistance > 0.08) {

    leadFactor = 10

  }

  // MEDIUM RANGE

  else if (targetDistance > 0.04) {

    leadFactor = 6

  }

  // CLOSE RANGE

  else if (targetDistance > 0.015) {

    leadFactor = 2

  }

  // TERMINAL PHASE

  else {

    leadFactor = 0

  }

  // UAV DIRECTION VECTOR

  const futureDx =

    interceptor.targetDrone.targetLat -
    interceptor.targetDrone.lat

  const futureDy =

    interceptor.targetDrone.targetLng -
    interceptor.targetDrone.lng

  const futureDistance =
    Math.sqrt(
      futureDx * futureDx +
      futureDy * futureDy
    )

  let futureVx = 0
  let futureVy = 0

  if (futureDistance > 0) {

    futureVx =
      futureDx / futureDistance

    futureVy =
      futureDy / futureDistance

  }

  // PREDICTED TARGET

  interceptor.targetLat =

    interceptor.targetDrone.lat +

    (
      futureVx *
      leadFactor *
      interceptor.targetDrone.speed
    )

  interceptor.targetLng =

    interceptor.targetDrone.lng +

    (
      futureVy *
      leadFactor *
      interceptor.targetDrone.speed
    )

  // BOOST PHASE

  if (interceptor.boostPhase > 0) {

    interceptor.speed = 0.006

    interceptor.boostPhase--

  }

  else {

    interceptor.speed = 0.0035

  }

  // MOVE

  moveTowardsTarget(interceptor)

  interceptor.marker.setLatLng([

    interceptor.lat,
    interceptor.lng

  ])

  // PURSUIT LINE

  const pursuitCoords = [

    [
      interceptor.lat,
      interceptor.lng
    ],

    [
      interceptor.targetDrone.lat,
      interceptor.targetDrone.lng
    ]

  ]

  // CREATE ONCE

  if (!interceptor.trailLine) {

    interceptor.trailLine =
      L.polyline(

        pursuitCoords,

        {

          color: "#30d158",

          weight: 2,

          opacity: 0.6,

          dashArray: "6, 6"

        }

      ).addTo(interceptor.map)

  }

  // UPDATE ONLY

  else {

    interceptor.trailLine
      .setLatLngs(pursuitCoords)

  }

  // ANALYSIS

  const analysis =
    analyzeThreat(
      interceptor.targetDrone
    )

  // HIT PROBABILITY

  let hitProbability = 90

  // WEATHER

  if (
    environment.weather ===
    "Rain"
  ) {

    hitProbability -= 10

  }

  if (
    environment.weather ===
    "Fog"
  ) {

    hitProbability -= 25

  }

  if (
    environment.weather ===
    "Storm"
  ) {

    hitProbability -= 45

  }

  // RADAR

  hitProbability +=
    environment.radarSensitivity * 2

  // UAV SPEED

  if (
    interceptor.targetDrone.speed >
    0.005
  ) {

    hitProbability -= 15

  }

  // ALTITUDE

  const altitude =
    Number(

      document.getElementById(
        "droneAltitude"
      ).value

    )

  if (altitude < 120) {

    hitProbability -= 20

  }

  // AI BONUS

  hitProbability +=
    Math.floor(
      analysis.confidence * 0.15
    )

  // LIMITS

  hitProbability =
    Math.max(
      5,
      Math.min(98, hitProbability)
    )

  interceptor.hitProbability =
    hitProbability

  // TELEMETRY

  updateInterceptorPanel(
    interceptor
  )

  // DISTANCE

  const dx =
    interceptor.targetDrone.lat -
    interceptor.lat

  const dy =
    interceptor.targetDrone.lng -
    interceptor.lng

  const distance =
    Math.sqrt(dx * dx + dy * dy)

  // IMPACT

  if (distance < 0.002) {

    const hitRoll =
      Math.random() * 100

    // SUCCESS

    if (
      hitRoll <
      interceptor.hitProbability
    ) {

      interceptor.status =
        "TARGET DESTROYED"

      addEvent(
        `${interceptor.targetDrone.id} DESTROYED`
      )

      // REMOVE UAV

      interceptor.targetDrone
        .marker
        .remove()

      // REMOVE PREDICTION

      if (
        interceptor.targetDrone
        .predictionLine
      ) {

        interceptor.targetDrone.map
          .removeLayer(

            interceptor.targetDrone
            .predictionLine

          )

      }

      // REMOVE INTERCEPTOR

      interceptor.marker.remove()

      if (interceptor.trailLine) {

        interceptor.map.removeLayer(
          interceptor.trailLine
        )

      }

      // REMOVE UAV ARRAY

      const droneIndex =
        drones.indexOf(
          interceptor.targetDrone
        )

      if (droneIndex !== -1) {

        drones.splice(
          droneIndex,
          1
        )

      }

      // REMOVE INTERCEPTOR ARRAY

      const interceptorIndex =
        interceptors.indexOf(
          interceptor
        )

      if (interceptorIndex !== -1) {

        interceptors.splice(
          interceptorIndex,
          1
        )

      }

    }

    // FAILURE

    else {

      interceptor.status =
        "INTERCEPT FAILED"

      addEvent(
        `INTERCEPT FAILED AGAINST ${interceptor.targetDrone.id}`
      )

    }

  }

})

  // BASE TELEMETRY

  updateBaseTelemetry()

}