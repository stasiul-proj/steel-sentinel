export const interceptors = []

import { environment }
from "./environment.js"

import { analyzeThreat }
from "./ai.js"

import {
  interceptorBases
}
from "./bases.js"

export function launchInterceptor(
  map,
  targetDrone
) {

  // FIND BEST BASE

  let selectedBase = null

  let shortestDistance =
    Infinity

  interceptorBases.forEach(base => {

    // NO AVAILABLE UAVs

    if (
      base.availableInterceptors <= 0
    ) return

    const dx =
      targetDrone.lat -
      base.lat

    const dy =
      targetDrone.lng -
      base.lng

    const distance =
      Math.sqrt(dx * dx + dy * dy)

    if (
      distance <
      shortestDistance
    ) {

      shortestDistance =
        distance

      selectedBase = base

    }

  })

  // NO AVAILABLE BASE

  if (!selectedBase) {

    console.log(
      "NO AVAILABLE INTERCEPTOR BASE"
    )

    return

  }

  // CONSUME INTERCEPTOR

  selectedBase
    .availableInterceptors--

  // INTERCEPTOR ICON

  const icon = L.divIcon({

    className: "",

    html: `

      <div class="interceptor-icon">
        ➤
      </div>

    `,

    iconSize: [22, 22],

    iconAnchor: [11, 11]

  })

  // MARKER

  const marker = L.marker(

    [

      selectedBase.lat,
      selectedBase.lng

    ],

    {

      icon

    }

  ).addTo(map)

  // POPUP

  marker.bindPopup(`

    <b>INT-001</b><br>

    ${selectedBase.name}

  `)

  // INTERCEPTOR OBJECT

  const interceptor = {

    id: "INT-001",

    map,

    marker,

    lat: selectedBase.lat,
    lng: selectedBase.lng,

    targetLat:
      targetDrone.lat,

    targetLng:
      targetDrone.lng,

    speed: 0.004,

    boostPhase: 5,

    targetDrone,

    base: selectedBase,

    status: "TRACKING",

    hitProbability: 0,

    trailLine: null

  }

  interceptors.push(
    interceptor
  )

}