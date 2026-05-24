export const interceptorBases = []

export function createInterceptorBase(
  map,
  options = {}
) {

  const {

    name = "BASE",

    lat = 50.56,
    lng = 22.05,

    interceptors = 3,

    radius = 4000

  } = options

  // BASE OBJECT

  const base = {

    name,

    lat,
    lng,

    radius,

    availableInterceptors:
      interceptors

  }

  // RESPONSE ZONE

  base.zone = L.circle(

    [lat, lng],

    {

  radius,

  color: "#30d158",

  fillOpacity: 0,

  weight: 2,

  dashArray: "12, 12"

}

  ).addTo(map)

  // BASE MARKER

const icon = L.divIcon({

  className: "",

  html: `

    <div class="base-icon">
      ⬢
    </div>

  `,

  iconSize: [26, 26],

  iconAnchor: [13, 13]

})

const marker = L.marker(
  [lat, lng],
  { icon }
).addTo(map)

  interceptorBases.push(base)

}