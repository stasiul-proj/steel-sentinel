export const infrastructure = []

export function loadInfrastructure(map) {

// ELECTRICITY GRID - ELEKTROCIEPŁOWNIA STALOWA WOLA

const powerPlant = {

  name: "POWER GRID",
  type: "ENERGY",

  lat: 50.552474,
  lng: 22.081123,

  radius: 250

}

const powerPlantCircle = L.circle(
  [powerPlant.lat, powerPlant.lng],
  {
    color: "#ff3b30",
    fillColor: "#ff3b30",
    fillOpacity: 0.35,
    radius: powerPlant.radius
  }
).addTo(map)

powerPlantCircle.bindPopup(`
  <b>POWER GRID</b><br>
  Elektrociepłownia Stalowa Wola
`)

infrastructure.push(powerPlant)

// HUTA STALOWA WOLA

const hsw = {

  name: "HUTA STALOWA WOLA",
  type: "STRATEGIC_INDUSTRY",

  lat: 50.543072,
  lng: 22.058149,

  radius: 320

}

const hswCircle = L.circle(
  [hsw.lat, hsw.lng],
  {
    color: "#ff9500",
    fillColor: "#ff9500",
    fillOpacity: 0.28,
    radius: hsw.radius
  }
).addTo(map)

hswCircle.bindPopup(`
  <b>STRATEGIC INDUSTRY</b><br>
  Huta Stalowa Wola
`)

infrastructure.push(hsw)


// EURO-PARK

const euroPark = {

  name: "EURO-PARK",
  type: "INDUSTRIAL_ZONE",

  lat: 50.544156,
  lng: 22.064920,

  radius: 300

}

const euroParkCircle = L.circle(
  [euroPark.lat, euroPark.lng],
  {
    color: "#ffd60a",
    fillColor: "#ffd60a",
    fillOpacity: 0.25,
    radius: euroPark.radius
  }
).addTo(map)

euroParkCircle.bindPopup(`
  <b>INDUSTRIAL ZONE</b><br>
  Euro-Park Stalowa Wola
`)

infrastructure.push(euroPark)


// RAIL HUB ROZWADÓW

const railHubRozwadow = {

  name: "ROZWADOW RAIL HUB",
  type: "TRANSPORT",

  lat: 50.591000,
  lng: 22.041162,

  radius: 220

}

const railHubRozwadowCircle = L.circle(
  [railHubRozwadow.lat, railHubRozwadow.lng],
  {
    color: "#00c7ff",
    fillColor: "#00c7ff",
    fillOpacity: 0.28,
    radius: railHubRozwadow.radius
  }
).addTo(map)

railHubRozwadowCircle.bindPopup(`
  <b>TRANSPORT HUB</b><br>
  Stalowa Wola Rozwadów
`)

infrastructure.push(railHubRozwadow)


// RAIL HUB CENTRUM

const railHubCentrum = {

  name: "CENTRUM RAIL HUB",
  type: "TRANSPORT",

  lat: 50.570329,
  lng: 22.054706,

  radius: 220

}

const railHubCentrumCircle = L.circle(
  [railHubCentrum.lat, railHubCentrum.lng],
  {
    color: "#00c7ff",
    fillColor: "#00c7ff",
    fillOpacity: 0.28,
    radius: railHubCentrum.radius
  }
).addTo(map)

railHubCentrumCircle.bindPopup(`
  <b>TRANSPORT HUB</b><br>
  Stalowa Wola Centrum
`)

infrastructure.push(railHubCentrum)


// HOSPITAL

const hospital = {

  name: "CITY HOSPITAL",
  type: "EMERGENCY",

  lat: 50.563268,
  lng: 22.069512,

  radius: 180

}

const hospitalCircle = L.circle(
  [hospital.lat, hospital.lng],
  {
    color: "#30d158",
    fillColor: "#30d158",
    fillOpacity: 0.30,
    radius: hospital.radius
  }
).addTo(map)

hospitalCircle.bindPopup(`
  <b>EMERGENCY SERVICES</b><br>
  Powiatowy Szpital Specjalistyczny
`)

infrastructure.push(hospital)


// FIRE DEPARTMENT SOUTH

const fireDeptSouth = {

  name: "FIRE STATION SOUTH",
  type: "FIRE_RESPONSE",

  lat: 50.556337,
  lng: 22.046673,

  radius: 160

}

const fireDeptSouthCircle = L.circle(
  [fireDeptSouth.lat, fireDeptSouth.lng],
  {
    color: "#ff453a",
    fillColor: "#ff453a",
    fillOpacity: 0.30,
    radius: fireDeptSouth.radius
  }
).addTo(map)

fireDeptSouthCircle.bindPopup(`
  <b>FIRE RESPONSE</b><br>
  JRG 2 Stalowa Wola
`)

infrastructure.push(fireDeptSouth)


// FIRE DEPARTMENT NORTH

const fireDeptNorth = {

  name: "FIRE STATION NORTH",
  type: "FIRE_RESPONSE",

  lat: 50.577306,
  lng: 22.059184,

  radius: 160

}

const fireDeptNorthCircle = L.circle(
  [fireDeptNorth.lat, fireDeptNorth.lng],
  {
    color: "#ff453a",
    fillColor: "#ff453a",
    fillOpacity: 0.30,
    radius: fireDeptNorth.radius
  }
).addTo(map)

fireDeptNorthCircle.bindPopup(`
  <b>FIRE RESPONSE</b><br>
  PSP JRG 1 Stalowa Wola
`)

infrastructure.push(fireDeptNorth)


// CITY CENTER

const cityCenter = {

  name: "CITY CENTER",
  type: "CIVILIAN",

  lat: 50.569525,
  lng: 22.062218,

  radius: 280

}

const cityCenterCircle = L.circle(
  [cityCenter.lat, cityCenter.lng],
  {
    color: "#64d2ff",
    fillColor: "#64d2ff",
    fillOpacity: 0.18,
    radius: cityCenter.radius
  }
).addTo(map)

cityCenterCircle.bindPopup(`
  <b>CIVILIAN SECTOR</b><br>
  Stalowa Wola City Center
`)

infrastructure.push(cityCenter)


// WATER SUPPLY

const waterSupply = {

  name: "WATER SUPPLY",
  type: "WATER",

  lat: 50.584504,
  lng: 22.068588,

  radius: 220

}

const waterSupplyCircle = L.circle(
  [waterSupply.lat, waterSupply.lng],
  {
    color: "#0a84ff",
    fillColor: "#0a84ff",
    fillOpacity: 0.25,
    radius: waterSupply.radius
  }
).addTo(map)

waterSupplyCircle.bindPopup(`
  <b>WATER SUPPLY</b><br>
  Municipal Water Infrastructure
`)

infrastructure.push(waterSupply)


// POLICE HQ

const policeHQ = {

  name: "POLICE HQ",
  type: "LAW_ENFORCEMENT",

  lat: 50.566823,
  lng: 22.056496,

  radius: 170

}

const policeHQCircle = L.circle(
  [policeHQ.lat, policeHQ.lng],
  {
    color: "#5ac8fa",
    fillColor: "#5ac8fa",
    fillOpacity: 0.28,
    radius: policeHQ.radius
  }
).addTo(map)

policeHQCircle.bindPopup(`
  <b>LAW ENFORCEMENT</b><br>
  Komenda Powiatowa Policji
`)

infrastructure.push(policeHQ)
console.log(infrastructure)
}