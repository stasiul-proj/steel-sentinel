export const drones = []

export function createEnemyDrone(
  map,
  options = {}
) {

  const {

    id = "THREAT",

    type = "FPV Attack Drone",

    lat = 50.61,
    lng = 21.96,

    targetLat = 50.565,
    targetLng = 22.058,

    speed = null

  } = options

  // UAV CONFIGURATION

  let color = "#ff3b30"

  let droneSpeed = 0.01

  // CUSTOM SPEED

  if (speed !== null) {

    droneSpeed = speed

  }

  // UAV TYPE COLORS

  if (type === "Recon UAV") {

    color = "#5ac8fa"

  }

  if (type === "Loitering Munition") {

    color = "#ff9f0a"

  }

  if (type === "Swarm UAV") {

    color = "#ff2d55"

  }

  // UAV ICON

  const icon = L.divIcon({

    className: "",

    html: `

<div class="enemy-drone-icon">

<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
>

<polygon
  points="10,2 18,18 10,14 2,18"
  fill="${color}"
/>

</svg>

</div>

`,

    iconSize: [24, 24],

iconAnchor: [12, 12]

  })

  // MARKER

  const marker = L.marker(

    [lat, lng],

    { icon }

  ).addTo(map)

  // POPUP

  marker.bindPopup(`

    <b>${id}</b><br>

    ${type}

  `)

  // DRONE OBJECT

  const drone = {

    id,

    type,

    map,

    marker,

    lat,
    lng,

    targetLat,
    targetLng,

    speed: droneSpeed,

    status: "INBOUND",

    predictionLine: null

  }

  // SAVE DRONE

  drones.push(drone)

}