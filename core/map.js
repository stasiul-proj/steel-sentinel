export function initMap() {

  const map = L.map("map").setView([50.565, 22.058], 13)

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      attribution: "&copy; OpenStreetMap & CARTO"
    }
  ).addTo(map)

  return map

}