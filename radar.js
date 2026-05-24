export const radars = []

export function createRadar(map, options = {}) {

  const {

    name = "RADAR",

    lat = 50.56,
    lng = 22.05,

    radius = 12000,

    color = "#64d2ff"

  } = options

  // RADAR OBJECT

  const radar = {

    name,
    lat,
    lng,
    radius

  }

  // VISUAL RANGE

  radar.circle = L.circle(

    [lat, lng],

    {
      radius: radar.radius,
      color: "#64d2ff",
      fillOpacity: 0,
      weight: 1,
      dashArray: "10, 10",
       opacity: 0.8,
    }

  ).addTo(map)

  const icon = L.divIcon({

  className: "",

  html: `

    <div class="radar-icon">
      ◉
    </div>

  `,

  iconSize: [24, 24],

  iconAnchor: [12, 12],

})

const marker = L.marker(
  [lat, lng],
  { icon }
).addTo(map)

  radar.circle.bindPopup(`

    <b>${name}</b><br>
    Air Defense Radar

  `)

  radars.push(radar)

}