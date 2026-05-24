import { initMap } from "/core/map.js"
import { loadInfrastructure } from "/core/infrastructure.js"
import { createEnemyDrone } from "/core/drones.js"
import { initControls } from "/ui/controls.js"
import { createRadar }
from "/core/radar.js"
import {
  createInterceptorBase
}
from "/core/bases.js"

// MAP

const map = initMap()

// INFRASTRUCTURE

loadInfrastructure(map)
createRadar(map, {

  name: "NORTH RADAR",

  lat: 50.60,
  lng: 21.98,

  radius: 12000

})

createRadar(map, {

  name: "EAST RADAR",

  lat: 50.552,
  lng: 22.28,

  radius: 12000

})

createRadar(map, {

  name: "SOUTH RADAR",

  lat: 50.42,
  lng: 22.08,

  radius: 12000

})
createInterceptorBase(map, {

  name: "NORTH BASE",

  lat: 50.585,
  lng: 22.03,

  interceptors: 5,

  radius: 9000

})

createInterceptorBase(map, {

  name: "CITY BASE",

  lat: 50.50823,
  lng: 22.056496,

  interceptors: 6,

  radius: 9000

})

createInterceptorBase(map, {

  name: "INDUSTRIAL BASE",

  lat: 50.543072,
  lng: 22.158149,

  interceptors: 4,

  radius: 9000

})


// UI

initControls(map)

console.log("STEEL SENTINEL SYSTEM INITIALIZED")
