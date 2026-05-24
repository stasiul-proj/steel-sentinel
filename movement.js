export function moveTowardsTarget(
  entity
) {

  // VECTOR TO TARGET

  const dx =
    entity.targetLat - entity.lat

  const dy =
    entity.targetLng - entity.lng

  // DISTANCE

  const distance =
    Math.sqrt(dx * dx + dy * dy)

  if (distance === 0) return

  // NORMALIZED VECTOR

  let vx = dx / distance
  let vy = dy / distance

  // UAV FLIGHT BEHAVIOR

  if (
  entity.type &&
  !entity.base
) {

    // RANDOM DRIFT

    const driftStrength =
      0.03

    vx +=
      (Math.random() - 0.5)
      * driftStrength

    vy +=
      (Math.random() - 0.5)
      * driftStrength

    // ATTACK WEAVING

    if (distance < 0.04) {

      const wave =
        Math.sin(
          Date.now() * 0.001
        ) * 0.05

      vx += wave
      vy -= wave

    }

  }

  // RE-NORMALIZE

  const magnitude =
    Math.sqrt(vx * vx + vy * vy)

  vx /= magnitude
  vy /= magnitude

  // CONSTANT VELOCITY

  entity.lat +=
    vx * entity.speed

  entity.lng +=
    vy * entity.speed
    // SAVE REAL MOVEMENT VECTOR

entity.vx = vx
entity.vy = vy
  // ROTATION

// ROTATION

if (entity.marker) {

  const angle =

    Math.atan2(vy, vx)
    * 180 / Math.PI

  const markerElement =
    entity.marker.getElement()

  if (markerElement) {

    const icon =
      markerElement.querySelector(
        ".enemy-drone-icon, .interceptor-icon"
      )

    if (icon) {

      icon.style.transform =

  `translateZ(0)
   rotate(${angle}deg)`
    }

  }

}

}